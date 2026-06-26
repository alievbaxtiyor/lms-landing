<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Matter from 'matter-js'

interface Tag {
  text: string
  color: string
}

const props = defineProps<{ tags: Tag[] }>()

const PILL =
  'inline-flex items-center rounded-[20px] px-4 py-2 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] whitespace-nowrap text-[#0B0E04]'

const container = ref<HTMLElement | null>(null)
const tagRefs = ref<HTMLElement[]>([])
function setTagRef(el: Element | null, i: number) {
  if (el) tagRefs.value[i] = el as HTMLElement
}

let engine: Matter.Engine | null = null
let rafId = 0
let observer: IntersectionObserver | null = null
let stopTimer: ReturnType<typeof setTimeout> | null = null
const dropTimers: ReturnType<typeof setTimeout>[] = []
let items: { body: Matter.Body; el: HTMLElement; w: number; h: number }[] = []
let boxH = 0
let started = false

function paint(it: (typeof items)[number]) {
  const { x, y } = it.body.position
  it.el.style.transform = `translate(${x - it.w / 2}px, ${y - it.h / 2}px) rotate(${it.body.angle}rad)`
}

// Once settled: keep every pill inside the box (top AND bottom, using the body's
// real rotated bounds) and release the compositor hint.
function settle() {
  for (const it of items) {
    let dy = 0
    if (it.body.bounds.min.y < 1) dy = 1 - it.body.bounds.min.y
    else if (it.body.bounds.max.y > boxH - 1) dy = boxH - 1 - it.body.bounds.max.y
    if (dy !== 0) {
      Matter.Body.setPosition(it.body, { x: it.body.position.x, y: it.body.position.y + dy })
    }
    paint(it)
    it.el.style.willChange = ''
  }
}

function start() {
  const el = container.value
  if (started || !el) return
  const W = el.clientWidth
  const H = el.clientHeight
  const els = tagRefs.value.filter(Boolean)
  if (!W || !H || !els.length) return
  started = true
  boxH = H

  engine = Matter.Engine.create({ enableSleeping: true })
  engine.gravity.y = 1.3

  // Static walls: bottom, left, right (top open so tags fall in).
  const t = 80
  Matter.Composite.add(engine.world, [
    Matter.Bodies.rectangle(W / 2, H + t / 2, W + t * 2, t, { isStatic: true }),
    Matter.Bodies.rectangle(-t / 2, H / 2, t, H * 4, { isStatic: true }),
    Matter.Bodies.rectangle(W + t / 2, H / 2, t, H * 4, { isStatic: true }),
  ])

  items = els.map((tagEl) => {
    const w = tagEl.offsetWidth
    const h = tagEl.offsetHeight
    tagEl.style.willChange = 'transform'
    // Random x (not ordered) so they pile into a heap, not a climbing staircase.
    const x = w / 2 + 6 + Math.random() * Math.max(0, W - w - 12)
    const body = Matter.Bodies.rectangle(x, -50 - Math.random() * 90, w, h, {
      restitution: 0.4,
      friction: 0.4,
      frictionAir: 0.012,
      chamfer: { radius: Math.min(h / 2, 18) },
      angle: (Math.random() - 0.5) * 0.3,
    })
    // Lock rotation so long pills can't tumble upright (they wouldn't fit the
    // short box) — they still fall, collide, bounce and pile, just stay flat.
    Matter.Body.setInertia(body, Infinity)
    return { body, el: tagEl, w, h }
  })

  // Drop them in one after another.
  items.forEach((item, i) => {
    dropTimers.push(
      setTimeout(() => {
        if (engine) Matter.Composite.add(engine.world, item.body)
      }, i * 130),
    )
  })

  let last = 0
  const sync = (now = 0) => {
    if (!engine) return
    // Real, clamped delta so the drop runs at the same speed on any refresh rate.
    const dt = last ? Math.min(now - last, 32) : 1000 / 60
    last = now
    Matter.Engine.update(engine, dt)

    let awake = false
    for (const it of items) {
      paint(it)
      if (!it.body.isSleeping) awake = true
    }
    if (awake) {
      rafId = requestAnimationFrame(sync)
    } else {
      rafId = 0
      settle()
    }
  }
  rafId = requestAnimationFrame(sync)

  // Safety: stop after the animation has had time to settle.
  stopTimer = setTimeout(() => {
    if (rafId) {
      cancelAnimationFrame(rafId)
      rafId = 0
    }
    settle()
  }, 9000)
}

function cleanup() {
  if (rafId) cancelAnimationFrame(rafId)
  if (stopTimer) clearTimeout(stopTimer)
  dropTimers.forEach(clearTimeout)
  observer?.disconnect()
  if (engine) {
    Matter.World.clear(engine.world, false)
    Matter.Engine.clear(engine)
    engine = null
  }
  items = []
}

onMounted(() => {
  const el = container.value
  if (!el) return
  // Park the tags above the card until the drop begins.
  tagRefs.value.forEach((tagEl) => {
    if (tagEl) tagEl.style.transform = 'translate(0, -400px)'
  })

  if (typeof IntersectionObserver === 'undefined') {
    start()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        observer?.disconnect()
        start()
      }
    },
    { threshold: 0.25 },
  )
  observer.observe(el)
})

onBeforeUnmount(cleanup)
</script>

<template>
  <div ref="container" class="relative h-full min-h-28 w-full overflow-hidden">
    <span
      v-for="(tag, i) in props.tags"
      :key="i"
      :ref="(el) => setTagRef(el as Element | null, i)"
      :class="['absolute top-0 left-0', PILL]"
      :style="{ backgroundColor: tag.color }"
      >{{ tag.text }}</span
    >
  </div>
</template>
