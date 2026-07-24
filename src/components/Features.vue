<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { features } from '../data/features'

const { t } = useI18n()

const scroller = ref<HTMLElement | null>(null)

// Scroll by whole cards (card width + gap) so a card always lands centred.
const CARD_STEP = 43.25 * 4 + 24 // w-43.25 + gap-6
function scroll(direction: number) {
  scroller.value?.scrollBy({ left: direction * CARD_STEP * 3, behavior: 'smooth' })
}

// Coverflow effect: cards in the middle stay full-size and sharp; they shrink
// and fade as they slide toward either edge, dissolving into the blurred
// gutters. `edge` (the plateau boundary) is capped at the first card's resting
// centre, so at rest card #1 sits at the container-start line at FULL size —
// only once scrolled do the leading cards drop away to the left. Recomputed
// every animation frame while the row scrolls, so the scale tracks the slide.
let raf = 0
function paint() {
  raf = 0
  const el = scroller.value
  if (!el || !el.children.length) return
  // On small screens skip the coverflow scale/opacity — on a narrow row it just
  // makes the edge cards look faded and hard to read. Show them all full-size.
  if (window.innerWidth < 768) {
    for (const card of Array.from(el.children) as HTMLElement[]) {
      card.style.transform = 'scale(1)'
      card.style.opacity = '1'
    }
    return
  }
  const W = el.clientWidth || 1
  const first = el.children[0] as HTMLElement
  const edge = Math.min(W * 0.18, first.offsetLeft + first.offsetWidth / 2)
  const sl = el.scrollLeft
  for (const card of Array.from(el.children) as HTMLElement[]) {
    const pos = card.offsetLeft + card.offsetWidth / 2 - sl // card centre, in viewport px
    let f = 1
    if (pos < edge) f = pos / edge
    else if (pos > W - edge) f = (W - pos) / edge
    f = f < 0 ? 0 : f > 1 ? 1 : f
    const e = (1 - f) * (1 - f) // ease-in: full across the middle, dropping off near the edges
    card.style.transform = `scale(${(1 - 0.45 * e).toFixed(3)})`
    card.style.opacity = (1 - 0.78 * e).toFixed(3)
  }
}
function onScroll() {
  if (!raf) raf = requestAnimationFrame(paint)
}

onMounted(() => {
  paint()
  scroller.value?.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onBeforeUnmount(() => {
  scroller.value?.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section id="imkoniyatlar" class="overflow-x-clip bg-black text-white">
    <div class="mx-auto max-w-296 px-5 md:px-8 py-14 md:py-20">
      <!-- Header: title + carousel arrows -->
      <div class="flex items-end justify-between gap-6">
        <h2 class="font-sf text-[28px] sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          {{ $t('features.titlePre') }}<br />
          <span class="text-[#9FE870]">{{ $t('features.titleHighlight') }}</span>
          {{ $t('features.titlePost') }}
        </h2>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#333333] p-1">
          <button
            type="button"
            :aria-label="t('features.detail.prev')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(-1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            :aria-label="t('features.detail.next')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable cards -> each links to its feature detail page.
           Full-bleed width for room. Left padding lines the FIRST card up with
           the title/container start; right padding is half the viewport (minus
           half a card) so the LAST card can still be scrolled to the centre. -->
      <div
        ref="scroller"
        class="no-scrollbar edge-fade relative left-1/2 mt-10 md:mt-12 flex w-screen -translate-x-1/2 scroll-smooth gap-6 overflow-x-auto pb-6 pl-[max(1.25rem,calc((100vw-74rem)/2+2rem))] pr-5 md:pr-[calc(50vw-86.5px)]"
      >
        <RouterLink
          v-for="f in features"
          :key="f.slug"
          :to="`/imkoniyatlar/${f.slug}`"
          class="flex w-43.25 shrink-0 origin-center flex-col items-center text-center will-change-transform"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#333333] p-4">
            <img :src="f.icon" alt="" class="h-12 w-12" />
          </div>
          <span
            class="mt-4 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
          >
            {{ $t('features.items.' + f.slug + '.label') }}
          </span>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* The coverflow's per-card scale + opacity does the heavy fading; this mask
   only dissolves the last sliver at each edge. Kept to a small 28px inset —
   inside even the tightest gutter — so it never touches the first card's label
   when it rests on the container-start line. */
/* Only fade the row edges on desktop, where the coverflow is active. On mobile
   the mask just dims the visible cards and makes them look blurry, so drop it. */
@media (min-width: 768px) {
  .edge-fade {
    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 28px,
      #000 calc(100% - 28px),
      transparent 100%
    );
    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 28px,
      #000 calc(100% - 28px),
      transparent 100%
    );
  }
}
</style>
