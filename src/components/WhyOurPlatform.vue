<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import PhysicsTags from './PhysicsTags.vue'
import whyusBack from '../assets/images/whyusback.png'
import whyusOn from '../assets/images/whyuson.png'
import stepSecure from '../assets/images/step-secure.png'
// Row icons as raw markup so they can be recolored via currentColor.
import starIcon from '../assets/icons/star.svg?raw'
import opportunityIcon from '../assets/icons/opportunity.svg?raw'
import securityRowIcon from '../assets/icons/security.svg?raw'
import analyticsIcon from '../assets/icons/analytics.svg?raw'
// Stat icons inlined too, so each can be tinted via currentColor.
import clockIcon from '../assets/icons/clock.svg?raw'
import fastIcon from '../assets/icons/fast.svg?raw'
// Proctoring card icons (already colored — rendered as <img>).
import faceIcon from '../assets/icons/cards/face.svg'
import microphoneIcon from '../assets/icons/cards/microphone.svg'
import eyeIcon from '../assets/icons/cards/eye.svg'
import screenIcon from '../assets/icons/cards/screen.svg'
import secureIcon from '../assets/icons/cards/secure.svg'

const { t } = useI18n()

// Swap hard-coded stroke/fill colors for currentColor (keeps fill="none").
function recolor(svg: string): string {
  return svg
    .replace(/stroke="#[0-9a-fA-F]{3,8}"/g, 'stroke="currentColor"')
    .replace(/fill="#[0-9a-fA-F]{3,8}"/g, 'fill="currentColor"')
}

interface Stat {
  icon: string
  color: string
  label: string
  value: string
}
interface Tag {
  text: string
  color: string
}
interface ProctorCard {
  icon: string
  label: string
}
interface TreeNode {
  label: string
  x: number
  y: number
  variant: 'purple' | 'green' | 'white'
}
interface Item {
  rowIcon: string
  label: string
  title: string
  description: string
  stats?: Stat[]
  tags?: Tag[]
  cards?: ProctorCard[]
  tree?: { nodes: TreeNode[]; paths: string[] }
}

// Stats for the first item (items 3-4 TODO — fill when content is provided).
const aiStats = computed<Stat[]>(() => [
  { icon: clockIcon, color: '#71DD2B', label: t('why.aiStats.time.label'), value: t('why.aiStats.time.value') },
  { icon: fastIcon, color: '#0073F2', label: t('why.aiStats.speed.label'), value: t('why.aiStats.speed.value') },
  {
    icon: securityRowIcon,
    color: '#EF4444',
    label: t('why.aiStats.privacy.label'),
    value: t('why.aiStats.privacy.value'),
  },
])
const courseTags = computed<Tag[]>(() => [
  { text: t('why.courseTags.video'), color: '#99EE5C8F' },
  { text: t('why.courseTags.assignments'), color: '#FFF3748F' },
  { text: t('why.courseTags.attendance'), color: '#FFAFEE8F' },
  { text: t('why.courseTags.schedule'), color: '#6FE6A18F' },
  { text: t('why.courseTags.tests'), color: '#AFD5FF8F' },
  { text: t('why.courseTags.journal'), color: '#FFBC748F' },
  { text: t('why.courseTags.resources'), color: '#C0AFFF8F' },
])
const proctorCards = computed<ProctorCard[]>(() => [
  { icon: faceIcon, label: t('why.proctorCards.face') },
  { icon: microphoneIcon, label: t('why.proctorCards.audio') },
  { icon: eyeIcon, label: t('why.proctorCards.smowl') },
  { icon: screenIcon, label: t('why.proctorCards.tailview') },
  { icon: secureIcon, label: t('why.proctorCards.secureProctor') },
])

const NODE_BG: Record<TreeNode['variant'], string> = {
  purple: 'rgba(230, 194, 255, 0.56)',
  green: 'rgba(153, 238, 92, 0.56)',
  white: 'rgba(255, 255, 255, 0.56)',
}

// "Grow tree" reveal timings (seconds). Sources (Kurs analitikasi, Hisobotlar)
// pop first, connectors draw outward, then the leaf nodes pop as lines reach them.
const TREE_NODE_DELAY = [0, 0.08, 0.55, 0.65, 0.75, 0.85]
const TREE_LINE_DELAY = [0.28, 0.38, 0.48, 0.58]

// Orthogonal rounded "elbow" connector between two points (480×210 space).
function elbow(x1: number, y1: number, x2: number, y2: number, r = 12, bendX?: number): string {
  // bendX lets a connector turn upward closer to its target (default: midpoint).
  const midX = bendX ?? Math.round((x1 + x2) / 2)
  const dirV = y2 > y1 ? 1 : -1
  if (Math.abs(y2 - y1) < 2) return `M ${x1} ${y1} H ${x2}`
  // Clamp the corner radius so short spans don't overshoot / reverse.
  const rr = Math.min(r, Math.abs(midX - x1), Math.abs(x2 - midX), Math.abs(y2 - y1) / 2)
  return `M ${x1} ${y1} H ${midX - rr} Q ${midX} ${y1} ${midX} ${y1 + dirV * rr} V ${y2 - dirV * rr} Q ${midX} ${y2} ${midX + rr} ${y2} H ${x2}`
}

// "Analitika va hisobotlar" node tree — matches the Figma frame 1:1 (472×145
// space). Nodes are staggered and every connector fans out from "Hisobotlar"'s
// right-center (160,88) to each target node's left-center.
const analyticsTree = computed<{ nodes: TreeNode[]; paths: string[] }>(() => ({
  nodes: [
    { label: t('why.analyticsTree.courseAnalytics'), x: 0, y: 12, variant: 'purple' }, // 144×46
    { label: t('why.analyticsTree.reports'), x: 52, y: 65, variant: 'green' }, // 108×46
    { label: t('why.analyticsTree.student'), x: 212, y: 0, variant: 'white' }, // 73×42
    { label: t('why.analyticsTree.teacher'), x: 308, y: 29, variant: 'white' }, // 99×42
    { label: t('why.analyticsTree.survey'), x: 233, y: 103, variant: 'white' }, // 106×42
    { label: t('why.analyticsTree.attendance'), x: 383, y: 85, variant: 'white' }, // 89×42
  ] as TreeNode[],
  paths: [
    // Talaba: run right (below Kurs analitikasi) then rise close to Talaba, so
    // the line clearly belongs to Hisobotlar and not the purple pill above.
    elbow(160, 88, 212, 21, 12, 200), // Hisobotlar → Talaba
    elbow(160, 88, 308, 50), // Hisobotlar → O'qituvchi
    elbow(160, 88, 233, 124), // Hisobotlar → So'rovnoma
    elbow(160, 88, 383, 106), // Hisobotlar → Davomat
  ],
}))

const items = computed<Item[]>(() => [
  {
    rowIcon: starIcon,
    label: t('why.items.ai.label'),
    title: t('why.items.ai.title'),
    description: t('why.items.ai.description'),
    stats: aiStats.value,
  },
  {
    rowIcon: opportunityIcon,
    label: t('why.items.course.label'),
    title: t('why.items.course.title'),
    description: t('why.items.course.description'),
    tags: courseTags.value,
  },
  {
    rowIcon: securityRowIcon,
    label: t('why.items.proctoring.label'),
    title: t('why.items.proctoring.title'),
    description: t('why.items.proctoring.description'),
    cards: proctorCards.value,
  },
  {
    rowIcon: analyticsIcon,
    label: t('why.items.analytics.label'),
    title: t('why.items.analytics.title'),
    description: t('why.items.analytics.description'),
    tree: analyticsTree.value,
  },
])

const active = ref(0)
const current = computed(() => items.value[active.value])

// Sliding active-pill indicator on the selector rail: one pill that animates to
// the active row's vertical center, instead of a per-row element that teleports.
const PILL_H = 32
const listEl = ref<HTMLElement | null>(null)
const btnEls = ref<HTMLElement[]>([])
function setBtnRef(el: Element | null, i: number) {
  if (el) btnEls.value[i] = el as HTMLElement
}
const pillY = ref(0)
const pillReady = ref(false)
function updatePill() {
  const btn = btnEls.value[active.value]
  if (!btn) return
  pillY.value = btn.offsetTop + btn.offsetHeight / 2
}
watch(active, () => nextTick(updatePill))
let pillRO: ResizeObserver | null = null
onMounted(() => {
  nextTick(() => {
    updatePill()
    pillReady.value = true
  })
  if (typeof ResizeObserver !== 'undefined') {
    pillRO = new ResizeObserver(() => updatePill())
    if (listEl.value) pillRO.observe(listEl.value)
  }
})
onUnmounted(() => pillRO?.disconnect())

// Security-expertise steps (second big card). Each step's badge gets a
// progressively darker green.
const securitySteps = computed(() => [
  {
    num: 1,
    color: '#71DD2B',
    title: t('why.securitySteps.step1.title'),
    desc: t('why.securitySteps.step1.desc'),
  },
  {
    num: 2,
    color: '#5FC11F',
    title: t('why.securitySteps.step2.title'),
    desc: t('why.securitySteps.step2.desc'),
  },
  {
    num: 3,
    color: '#4E9F1A',
    title: t('why.securitySteps.step3.title'),
    desc: t('why.securitySteps.step3.desc'),
  },
])

// Recognition / compliance facts — now shown inside the security modal.
const securityExtras = computed(() => [
  {
    title: t('why.securityExtras.recognition.title'),
    desc: t('why.securityExtras.recognition.desc'),
  },
  {
    title: t('why.securityExtras.compliance.title'),
    desc: t('why.securityExtras.compliance.desc'),
  },
])

// Security recognition modal (opened from the hero button).
const showSecurityModal = ref(false)
const onKey = (e: KeyboardEvent) => {
  if (e.key === 'Escape') showSecurityModal.value = false
}
onMounted(() => window.addEventListener('keydown', onKey))
onUnmounted(() => window.removeEventListener('keydown', onKey))

// Stat cards inside the big green card.
const stats = computed(() => [
  { value: '40K+', label: t('why.stats.students'), wide: false },
  { value: '14K+', label: t('why.stats.videoContent'), wide: false },
  { value: '650K+', label: t('why.stats.exams'), wide: true },
  { value: '115+', label: t('why.stats.services'), wide: false },
  { value: '3K', label: t('why.stats.courses'), wide: false },
])
</script>

<template>
  <section class="text-[#0B0E04]">
    <div class="mx-auto max-w-296 px-8 py-20">
      <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
        {{ $t('why.sectionTitle') }}
      </h2>

      <!-- Selector list + info card -->
      <div class="mt-12 flex max-w-280 flex-col gap-10 lg:flex-row lg:items-stretch lg:justify-between">
        <!-- Left: list selector — stretches to the info card's height and spreads
             its items evenly so the two columns line up top and bottom. -->
        <div ref="listEl" class="relative flex w-full shrink-0 flex-col gap-2.5 lg:w-114.25">
          <!-- vertical track rail -->
          <div class="absolute top-1 bottom-1 left-2 w-0.5 rounded-full bg-[#F4F4F4]"></div>

          <!-- active indicator: a single green pill that slides to the active row -->
          <span
            class="pointer-events-none absolute top-0 left-2 z-10 w-2 rounded-r-lg bg-[#88E24E] ring-[6px] ring-white transition-[transform,opacity] duration-300 ease-out"
            :class="pillReady ? 'opacity-100' : 'opacity-0'"
            :style="{ height: PILL_H + 'px', transform: `translateY(${pillY - PILL_H / 2}px)` }"
          ></span>

          <button
            v-for="(item, i) in items"
            :key="i"
            :ref="(el) => setBtnRef(el as Element | null, i)"
            type="button"
            class="relative flex w-full items-stretch text-left lg:flex-1"
            @click="active = i"
          >
            <!-- card (offset right of the rail gutter) -->
            <div
              class="ml-7 flex flex-1 items-center gap-4 rounded-2xl px-5 py-4 transition-colors duration-300"
              :class="i === active ? 'bg-[#F4F4F4]' : 'hover:bg-[#F4F4F4]/60'"
            >
              <span
                class="block h-7 w-7 shrink-0 transition-colors duration-300 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                :style="{ color: i === active ? '#0B0E04' : '#777777' }"
                v-html="recolor(item.rowIcon)"
              ></span>
              <span
                class="font-sf text-[19px] leading-6.5 tracking-[0.01em] transition-colors duration-300"
                :class="i === active ? 'font-semibold text-[#0B0E04]' : 'font-medium text-[#777777]'"
              >
                {{ item.label }}
              </span>
            </div>
          </button>
        </div>

        <!-- Right: info card — one fixed height for every selector so the box
             never resizes; its content cross-fades on change (.why-swap below). -->
        <div
          class="flex w-full shrink-0 flex-col rounded-3xl border border-[#F4F4F4] bg-[#F4F4F4] p-8 lg:h-90 lg:w-138 lg:overflow-hidden"
        >
          <Transition name="why-swap" mode="out-in">
            <div :key="active" class="flex min-h-0 flex-1 flex-col gap-6">
          <div class="shrink-0">
            <h3 class="font-sf text-[24px] font-semibold leading-8 tracking-[0.02em] text-[#0B0E04]">
              {{ current.title }}
            </h3>
            <p
              class="mt-2 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]"
            >
              {{ current.description }}
            </p>
          </div>

          <!-- body region: fills remaining height, content vertically centered -->
          <div class="flex flex-1 flex-col justify-center gap-6">
            <!-- stat-card body -->
          <div v-if="current.stats" class="flex flex-1 flex-col gap-6">
            <!-- horizontal divider -->
            <div class="h-px w-full bg-[#E8E8E8]"></div>

            <!-- 3 stat cards fill the remaining height; each stat's label/icon/
                 value are spread evenly so the card doesn't read as empty -->
            <div class="flex flex-1 items-stretch">
              <template v-for="(stat, i) in current.stats" :key="i">
                <div v-if="i > 0" class="mx-1.5 w-px self-stretch bg-[#E8E8E8]"></div>
                <div class="flex flex-1 flex-col items-center justify-evenly gap-3 rounded-[20px] py-1 text-center">
                  <span
                    class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#4A4A4A]"
                  >
                    {{ stat.label }}
                  </span>
                  <span
                    class="h-9 w-9 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                    :style="{ color: stat.color }"
                    v-html="recolor(stat.icon)"
                  ></span>
                  <span
                    class="block min-h-12 font-sf text-[18px] font-semibold leading-6 tracking-[0.02em] text-[#333333]"
                  >
                    {{ stat.value }}
                  </span>
                </div>
              </template>
            </div>
          </div>

          <!-- tag-cloud body (Matter.js physics drop animation) -->
          <PhysicsTags v-else-if="current.tags" :tags="current.tags" />

          <!-- white pill cards body (row 1: 2 cards, row 2: the rest). Rows sit
               together as a centered group (a comfortable row gap, not spread to
               the card edges). -->
          <div
            v-else-if="current.cards"
            class="flex flex-1 flex-wrap content-center items-center justify-start gap-x-2 gap-y-4"
          >
            <template v-for="(card, i) in current.cards" :key="i">
              <span
                class="inline-flex items-center gap-2 rounded-[30px] bg-white px-4 py-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <img :src="card.icon" alt="" class="h-7 w-7" />
                <span
                  class="font-sf text-[18px] font-semibold leading-6.5 tracking-[0.02em] text-[#333333]"
                >
                  {{ card.label }}
                </span>
              </span>
              <div v-if="i === 1" class="basis-full"></div>
            </template>
          </div>

          <!-- node-tree body (analitika) — 1:1 with the Figma frame; grows in
               with a staggered "tree" reveal each time it's selected. -->
          <div v-else-if="current.tree" class="relative mx-auto h-[145px] w-[472px] max-w-full">
            <!-- connector lines (draw outward from Hisobotlar) -->
            <svg
              viewBox="0 0 472 145"
              preserveAspectRatio="none"
              class="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                v-for="(d, i) in current.tree.paths"
                :key="i"
                :d="d"
                pathLength="1"
                fill="none"
                stroke="#D2D2D2"
                stroke-width="1"
                class="tree-line"
                :style="{ animationDelay: TREE_LINE_DELAY[i] + 's' }"
              />
            </svg>

            <!-- pills -->
            <div
              v-for="(node, i) in current.tree.nodes"
              :key="i"
              class="tree-node absolute whitespace-nowrap px-4 py-3 font-sf tracking-[0.02em] text-[#0B0E04]"
              :class="
                node.variant === 'white'
                  ? 'rounded-[32px] text-[14px] font-normal leading-[18px]'
                  : 'rounded-3xl text-[16px] font-medium leading-[22px]'
              "
              :style="{ left: node.x + 'px', top: node.y + 'px', backgroundColor: NODE_BG[node.variant], animationDelay: TREE_NODE_DELAY[i] + 's' }"
            >
              {{ node.label }}
            </div>
          </div>
          </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Big card -->
      <div class="relative mt-8 h-138 w-full max-w-280 overflow-hidden rounded-3xl bg-[#9FE870]">
        <!-- green frame around the back dashboard -->
        <div
          class="absolute rounded-[18px] border-2 border-[#71DD2B]"
          style="top: 32px; left: 104px; width: 616px; height: 454px"
        ></div>
        <!-- back dashboard -->
        <img
          :src="whyusBack"
          alt=""
          class="absolute rounded-xl shadow-lg"
          style="top: 40px; left: 112px; width: 600px; height: 438px"
        />
        <!-- soft blur shadow behind the front dashboard (Figma: Rectangle 1902) -->
        <div
          class="absolute"
          style="top: 177px; left: 135px; width: 463px; height: 375px; background: #333333; opacity: 0.2; filter: blur(40px)"
        ></div>
        <!-- green frame around the front dashboard -->
        <div
          class="absolute rounded-[18px] border-2 border-[#71DD2B]"
          style="top: 169px; left: -45px; width: 616px; height: 454px"
        ></div>
        <!-- front dashboard (overlaps, bleeds off the left edge) -->
        <img
          :src="whyusOn"
          alt=""
          class="absolute rounded-xl"
          style="top: 177px; left: -37px; width: 600px; height: 428px"
        />

        <!-- stat cards -->
        <div class="absolute grid grid-cols-2 gap-1" style="top: 32px; left: 752px; width: 336px">
          <div
            v-for="(s, i) in stats"
            :key="i"
            class="flex h-29.5 flex-col justify-start gap-2 rounded-2xl bg-[#E7F9DBB2] p-4"
            :class="{ 'col-span-2': s.wide }"
          >
            <span class="font-sf text-[48px] font-medium leading-14 tracking-[0.01em] text-[#0B0E04]">
              {{ s.value }}
            </span>
            <span class="font-sf text-[14px] font-normal leading-5.5 tracking-[0.02em] text-[#3D7D14]">
              {{ s.label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Security expertise hero: full shield background + title + intro + the
           3 expertise steps, held in a width-capped left column so the shields
           stay fully visible on the right. The "Rasmiy e'tirof va hujjatlar"
           button opens the recognition modal (registry № 2430 + the two facts). -->
      <div
        class="relative mt-8 w-full max-w-280 overflow-hidden rounded-[28px]"
        style="background: linear-gradient(135deg, #f5f9fc 0%, #e9f0f6 100%)"
      >
        <img :src="stepSecure" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover object-right" />
        <div
          class="pointer-events-none absolute inset-0"
          style="background: linear-gradient(90deg, rgba(245,249,252,0.96) 0%, rgba(245,249,252,0.88) 42%, rgba(245,249,252,0) 66%)"
        ></div>

        <div class="relative max-w-165 p-12 sm:p-14">
          <h3 class="font-sf text-[32px] font-semibold leading-10 tracking-[0.01em] text-[#0B0E04]">
            {{ $t('why.security.cardTitle') }}
          </h3>
          <p class="mt-3.5 font-sf text-[16px] leading-[23px] tracking-[0.02em] text-[#333]">
            {{ $t('why.security.cardIntro') }}
          </p>

          <div class="mt-6 flex max-w-135 flex-col gap-2.5">
            <div
              v-for="step in securitySteps"
              :key="step.num"
              class="flex items-start gap-4 rounded-2xl bg-white/[0.78] p-3.5 px-4.5 backdrop-blur-sm"
            >
              <span
                class="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-full border border-white/70 font-sf text-[15px] font-semibold text-white"
                :style="{ backgroundColor: step.color }"
              >
                {{ step.num }}
              </span>
              <div class="flex flex-col gap-0.5">
                <p class="font-sf text-[15px] font-semibold leading-5 tracking-[0.01em] text-[#0B0E04]">{{ step.title }}</p>
                <p class="font-sf text-[13px] leading-[18px] tracking-[0.01em] text-[#5A5A5A]">{{ step.desc }}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            @click="showSecurityModal = true"
            class="mt-6 inline-flex items-center gap-2.5 rounded-full bg-primary-400 px-6 py-3.5 font-sf text-[15px] font-semibold tracking-[0.01em] text-[#0B0E04] shadow-[0_6px_18px_rgba(159,232,112,0.45)] transition hover:bg-[#8fdc5c]"
          >
            Rasmiy e'tirof va hujjatlar
            <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200" enter-from-class="opacity-0"
      leave-active-class="transition duration-150" leave-to-class="opacity-0"
    >
      <div
        v-if="showSecurityModal"
        @click.self="showSecurityModal = false"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0B0E04]/55 p-6 backdrop-blur-sm"
      >
        <div class="relative w-full max-w-155 overflow-hidden rounded-3xl bg-white shadow-[0px_30px_80px_0px_#0B0E0440]">
          <!-- Header: signature bright-green band with dark text (mirrors the
               big stats card), so the modal reads as part of the brand. -->
          <div class="relative overflow-hidden bg-[#9FE870] p-8 pb-9">
            <svg class="pointer-events-none absolute -top-6 -right-5 opacity-[0.14]" width="200" height="220" viewBox="0 0 24 24" fill="none" stroke="#0B0E04" stroke-width="1">
              <path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" />
            </svg>
            <button
              type="button" @click="showSecurityModal = false"
              class="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#0B0E04]/[0.07] text-[#0B0E04] transition hover:bg-[#0B0E04]/[0.13]"
            >
              <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
            <h3 class="mt-2 max-w-110 font-sf text-[24px] font-semibold leading-[30px] tracking-[0.01em] text-[#0B0E04]">
              Davlat tomonidan tan olingan ishonchli tizim
            </h3>
          </div>

          <!-- Registry number: floating card overlapping the header, with a soft
               green-tinted shadow (same green glow used on the site's buttons). -->
          <div class="relative mx-7 -mt-6 flex items-center gap-4 rounded-2xl border border-[#EAF2E1] bg-white p-4.5 shadow-[0px_10px_30px_0px_#9FE8702E]">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#9FE870] text-[#0B0E04]">
              <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l7 4v6c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-4z" /><path d="M9 12l2 2 4-4" /></svg>
            </span>
            <div>
              <span class="block font-sf text-[12px] font-medium tracking-[0.03em] text-[#777777] uppercase">Davlat reyestri raqami</span>
              <span class="block font-sf text-[28px] font-semibold leading-tight tracking-[0.01em] text-[#0B0E04]">№ 2430</span>
            </div>
          </div>

          <!-- Recognition / compliance facts -->
          <div class="px-7 pt-5 pb-7">
            <div
              v-for="(x, i) in securityExtras"
              :key="x.title"
              class="flex items-start gap-3.5 py-4"
              :class="i > 0 && 'border-t border-[#F1F1F1]'"
            >
              <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7F9DB] text-[#3D7D14]">
                <svg class="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7" /></svg>
              </span>
              <div>
                <p class="font-sf text-[16px] font-semibold leading-[21px] tracking-[0.01em] text-[#0B0E04]">{{ x.title }}</p>
                <p class="mt-1.5 font-sf text-[14px] leading-5 tracking-[0.01em] text-[#606060]">{{ x.desc }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Smooth cross-fade when switching selectors. The info box keeps a fixed
   height, so only its content swaps — no layout jump. */
.why-swap-enter-active,
.why-swap-leave-active {
  transition:
    opacity 0.24s ease,
    transform 0.24s ease;
}
.why-swap-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.why-swap-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* "Grow tree" reveal for the analytics selector card: connectors draw outward
   from Hisobotlar while nodes pop in, staggered (see TREE_*_DELAY). */
.tree-line {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: tree-draw 0.55s ease-out forwards;
}
@keyframes tree-draw {
  to {
    stroke-dashoffset: 0;
  }
}
.tree-node {
  opacity: 0;
  animation: tree-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
@keyframes tree-pop {
  from {
    opacity: 0;
    transform: scale(0.82);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .tree-line {
    animation: none;
    stroke-dashoffset: 0;
  }
  .tree-node {
    animation: none;
    opacity: 1;
  }
}
</style>
