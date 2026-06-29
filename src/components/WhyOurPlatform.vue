<script setup lang="ts">
import { computed, ref } from 'vue'
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
const aiStats: Stat[] = [
  { icon: clockIcon, color: '#71DD2B', label: 'Generatsiya vaqti', value: "o'rtacha 3 daqiqa" },
  { icon: fastIcon, color: '#0073F2', label: 'Tezligi', value: "4x tezroq qo'lda yaratishdan" },
  {
    icon: securityRowIcon,
    color: '#EF4444',
    label: 'Maxfiylik',
    value: "ma'lumotlar 100% muhofazalangan",
  },
]
const courseTags: Tag[] = [
  { text: 'Interaktiv video kurslar', color: '#99EE5C8F' },
  { text: 'Topshiriqlar', color: '#FFF3748F' },
  { text: 'Davomat', color: '#FFAFEE8F' },
  { text: 'Jadval boshqaruvi', color: '#6FE6A18F' },
  { text: 'Testlar va baholash', color: '#AFD5FF8F' },
  { text: 'Elektron jurnal', color: '#FFBC748F' },
  { text: 'Elektron resurslar', color: '#C0AFFF8F' },
]
const proctorCards: ProctorCard[] = [
  { icon: faceIcon, label: 'Yuzni tanish' },
  { icon: microphoneIcon, label: 'Audio tahlili' },
  { icon: eyeIcon, label: 'SMOWL' },
  { icon: screenIcon, label: 'Tailview' },
  { icon: secureIcon, label: 'SecureProctor' },
]

const NODE_BG: Record<TreeNode['variant'], string> = {
  purple: '#D9C7FF',
  green: '#9FE870',
  white: '#FFFFFF',
}

// Orthogonal rounded "elbow" connector between two points (480×210 space).
function elbow(x1: number, y1: number, x2: number, y2: number, r = 12): string {
  const midX = Math.round((x1 + x2) / 2)
  const dirV = y2 > y1 ? 1 : -1
  if (Math.abs(y2 - y1) < 2) return `M ${x1} ${y1} H ${x2}`
  // Clamp the corner radius so short spans don't overshoot / reverse.
  const rr = Math.min(r, Math.abs(x2 - x1) / 2, Math.abs(y2 - y1) / 2)
  return `M ${x1} ${y1} H ${midX - rr} Q ${midX} ${y1} ${midX} ${y1 + dirV * rr} V ${y2 - dirV * rr} Q ${midX} ${y2} ${midX + rr} ${y2} H ${x2}`
}

// "Analitika va hisobotlar" node tree — two-row layout in a 488×112 space so the
// pills fit full-size with clear spacing inside the fixed card.
const analyticsTree = {
  nodes: [
    { label: 'Kurs analitikasi', x: 0, y: 0, variant: 'purple' },
    { label: 'Hisobotlar', x: 16, y: 62, variant: 'green' },
    { label: 'Talaba', x: 210, y: 4, variant: 'white' },
    { label: "O'qituvchi", x: 360, y: 4, variant: 'white' },
    { label: "So'rovnoma", x: 210, y: 66, variant: 'white' },
    { label: 'Davomat', x: 365, y: 66, variant: 'white' },
  ] as TreeNode[],
  paths: [
    elbow(150, 86, 210, 24), // Hisobotlar → Talaba
    // Hisobotlar → O'qituvchi (routes through the row gap, up to the top row)
    'M 150 86 H 182 Q 190 86 190 78 V 62 Q 190 54 198 54 H 344 Q 352 54 352 46 V 32 Q 352 24 360 24',
    // Hisobotlar → passes through So'rovnoma → continues to Davomat
    'M 150 86 H 365',
  ],
}

const items: Item[] = [
  {
    rowIcon: starIcon,
    label: 'AI yordamchi - kontent yaratish',
    title: 'AI yordamchi - kontent yaratish',
    description:
      "O'z materiallaringizdan test savollari, mashqlar, rubrikalar va qo'shimcha tushuntirish kontentini avtomatik yarating — ochiq internetdan emas.",
    stats: aiStats,
  },
  {
    rowIcon: opportunityIcon,
    label: 'Kurs uchun zarur barcha imkoniyatlar',
    title: 'Kurs uchun zarur barcha imkoniyatlar',
    description:
      "Yettita asosiy modul, bitta ma'lumotlar modeli. Turli vositalar o'rtasida sakrashga hojat yo'q — har bir topshiriq, davomat va baho bir xil yozuvga jamlanadi.",
    tags: courseTags,
  },
  {
    rowIcon: securityRowIcon,
    label: 'Ishonchli imtihon tizimi - proktoring',
    title: 'Ishonchli imtihon tizimi - proktoring',
    description:
      "Biometrik, xulq-atvor va audio signallar bilan ko'p ta'minlovchili proktoring qatlami — birinchi kadrdan oxirgi hisobotgacha auditga tayyor.",
    cards: proctorCards,
  },
  {
    rowIcon: analyticsIcon,
    label: 'Analitika va hisobotlar',
    title: 'Analitika va hisobotlar',
    description:
      "LMS.uz dagi har bir ma'lumot shaxs, kurs va hodisaga bog'langan — shu sababli har bir hisobot qayta tiklanadigan, auditga tayyor va vazirlik qabul qiladigan formatda eksport qilinadi.",
    tree: analyticsTree,
  },
]

const active = ref(0)
const current = computed(() => items[active.value])

// Security-expertise steps (second big card). Each step's badge gets a
// progressively darker green.
const securitySteps = [
  {
    num: 1,
    color: '#71DD2B',
    title: "Axborot yig‘ish va tizimni tahlil qilish",
    desc: "Platforma arxitekturasi, ma'lumotlar oqimi va xavf yuzasi tahlil qilindi",
  },
  {
    num: 2,
    color: '#5FC11F',
    title: "Texnik vazifa va me'yoriy talablarga moslikni tekshirish",
    desc: "Tizim standartlar va texnik talablar asosida tekshirildi",
  },
  {
    num: 3,
    color: '#4E9F1A',
    title: "Zaifliklarni aniqlash va ekspertiza xulosasi",
    desc: "Zaifliklar aniqlandi, bartaraf etildi va ekspertiza xulosasi berildi",
  },
]

// Stat cards inside the big green card.
const stats = [
  { value: '40K+', label: 'Talabalar soni', wide: false },
  { value: '14K+', label: 'Video kontent soni', wide: false },
  { value: '650K+', label: 'Otkazilgan imtihonlar soni', wide: true },
  { value: '115+', label: 'Xizmatlar soni', wide: false },
  { value: '3K', label: 'Profesional kurslar', wide: false },
]
</script>

<template>
  <section class="text-[#0B0E04]">
    <div class="mx-auto max-w-296 px-8 py-20">
      <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
        Nima uchun bizning platforma?
      </h2>

      <!-- Selector list + info card -->
      <div class="mt-12 flex max-w-280 flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
        <!-- Left: list selector -->
        <div class="relative w-full shrink-0 space-y-1 lg:w-114.25">
          <!-- vertical track rail -->
          <div class="absolute top-1 bottom-1 left-2 w-0.5 rounded-full bg-[#F4F4F4]"></div>

          <button
            v-for="(item, i) in items"
            :key="i"
            type="button"
            class="relative flex w-full items-center text-left"
            @click="active = i"
          >
            <!-- active indicator: green pill sitting on the rail, rounded right + white halo -->
            <span
              v-if="i === active"
              class="absolute top-1/2 left-2 z-10 h-6 w-2 -translate-y-1/2 rounded-r-lg bg-[#88E24E] ring-[6px] ring-white"
            ></span>
            <!-- card (offset right of the rail gutter) -->
            <div
              class="ml-7 flex flex-1 items-center gap-6 rounded-2xl px-6 py-4 transition-colors"
              :class="i === active ? 'bg-[#F4F4F4]' : 'hover:bg-[#F4F4F4]/60'"
            >
              <span
                class="block h-6 w-6 shrink-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                :style="{ color: i === active ? '#0B0E04' : '#777777' }"
                v-html="recolor(item.rowIcon)"
              ></span>
              <span
                class="font-sf text-[16px] leading-5.5 tracking-[0.02em]"
                :class="i === active ? 'font-medium text-[#0B0E04]' : 'text-[#777777]'"
              >
                {{ item.label }}
              </span>
            </div>
          </button>
        </div>

        <!-- Right: info card — 294px to fit content; taller only for the tag physics -->
        <div
          class="flex w-full shrink-0 flex-col gap-6 rounded-3xl border border-[#F4F4F4] bg-[#F4F4F4] p-8 lg:w-138 lg:overflow-hidden"
          :class="current.tags ? 'lg:h-90' : 'lg:h-73.5'"
        >
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
          <template v-if="current.stats">
            <!-- horizontal divider -->
            <div class="h-px w-full bg-[#E8E8E8]"></div>

            <!-- 3 stat cards, 12px gap with a vertical divider in each gap -->
            <div class="flex items-stretch">
              <template v-for="(stat, i) in current.stats" :key="i">
                <div v-if="i > 0" class="mx-1.5 w-px self-stretch bg-[#E8E8E8]"></div>
                <div class="flex flex-1 flex-col items-center gap-2 rounded-[20px] text-center">
                  <span
                    class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#4A4A4A]"
                  >
                    {{ stat.label }}
                  </span>
                  <span
                    class="h-7 w-7 [&>svg]:block [&>svg]:h-full [&>svg]:w-full"
                    :style="{ color: stat.color }"
                    v-html="recolor(stat.icon)"
                  ></span>
                  <span
                    class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#333333]"
                  >
                    {{ stat.value }}
                  </span>
                </div>
              </template>
            </div>
          </template>

          <!-- tag-cloud body (Matter.js physics drop animation) -->
          <PhysicsTags v-else-if="current.tags" :tags="current.tags" />

          <!-- white pill cards body (row 1: 2 cards, row 2: the rest) -->
          <div
            v-else-if="current.cards"
            class="flex flex-wrap items-center justify-start gap-2"
          >
            <template v-for="(card, i) in current.cards" :key="i">
              <span
                class="inline-flex items-center gap-2 rounded-[30px] bg-white px-4 py-2"
              >
                <img :src="card.icon" alt="" class="h-6 w-6" />
                <span
                  class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#333333]"
                >
                  {{ card.label }}
                </span>
              </span>
              <div v-if="i === 1" class="basis-full"></div>
            </template>
          </div>

          <!-- node-tree body (analitika) -->
          <div v-else-if="current.tree" class="relative mx-auto h-28 w-122 max-w-full">
            <!-- connector lines -->
            <svg
              viewBox="0 0 488 112"
              preserveAspectRatio="none"
              class="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                v-for="(d, i) in current.tree.paths"
                :key="i"
                :d="d"
                fill="none"
                stroke="#D6D6D6"
                stroke-width="1.5"
              />
            </svg>

            <!-- pills -->
            <div
              v-for="(node, i) in current.tree.nodes"
              :key="i"
              class="absolute rounded-full font-sf font-semibold whitespace-nowrap text-[#1A1A1A]"
              :class="
                node.variant === 'white'
                  ? 'px-6 py-2.75 text-[15px] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.05)]'
                  : 'px-7 py-3.25 text-[17px]'
              "
              :style="{ left: node.x + 'px', top: node.y + 'px', backgroundColor: NODE_BG[node.variant] }"
            >
              {{ node.label }}
            </div>
          </div>
          </div>
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
        <!-- green frame around the front dashboard -->
        <div
          class="absolute rounded-[18px] border-2 border-[#71DD2B]"
          style="top: 169px; left: -45px; width: 616px; height: 454px"
        ></div>
        <!-- front dashboard (overlaps, bleeds off the left edge) -->
        <img
          :src="whyusOn"
          alt=""
          class="absolute rounded-xl shadow-2xl"
          style="top: 177px; left: -37px; width: 600px; height: 428px"
        />

        <!-- stat cards -->
        <div class="absolute grid grid-cols-2 gap-1" style="top: 32px; left: 752px; width: 336px">
          <div
            v-for="(s, i) in stats"
            :key="i"
            class="flex h-36 flex-col justify-center gap-2 rounded-2xl bg-[#E7F9DBB2] p-4"
            :class="{ 'col-span-2': s.wide }"
          >
            <span class="font-sf text-[48px] font-medium leading-14 tracking-[0.01em] text-[#0B0E04]">
              {{ s.value }}
            </span>
            <span class="font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#3D7D14]">
              {{ s.label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Security expertise card -->
      <div
        class="relative mt-8 h-119 w-full max-w-280 overflow-hidden rounded-3xl bg-cover bg-center"
        :style="{ backgroundImage: `url(${stepSecure})` }"
      >
        <div class="absolute top-14 left-14 w-147.75 max-w-[calc(100%-7rem)]">
          <h3
            class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]"
          >
            3 bosqichli xavfsizlik<br />
            ekspertizasidan o'tgan
          </h3>

          <div class="mt-6 space-y-3">
            <div
              v-for="step in securitySteps"
              :key="step.num"
              class="flex h-17 items-center gap-4 rounded-2xl bg-[#FFFFFFA3] p-3"
            >
              <span
                class="flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-full border border-white/70 font-sf text-[16px] font-semibold text-white"
                :style="{ backgroundColor: step.color }"
              >
                {{ step.num }}
              </span>
              <p
                class="w-60.25 shrink-0 font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
              >
                {{ step.title }}
              </p>
              <p
                class="w-64 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#4A4A4A]"
              >
                {{ step.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
