<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import pauseIcon from '../assets/icons/pause.svg'
import muteIcon from '../assets/icons/mute.svg'
import expandIcon from '../assets/icons/expand.svg'

// Auto-import every feature icon as a URL, keyed by file name (no extension).
const iconModules = import.meta.glob('../assets/icons/features/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const iconMap: Record<string, string> = {}
for (const [path, url] of Object.entries(iconModules)) {
  const name = (path.split('/').pop() ?? '').replace(/\.svg$/, '')
  iconMap[name] = url
}

// Per-feature modal descriptions (keyed by icon name).
// TODO: fill the remaining descriptions from Figma.
const DESCRIPTIONS: Record<string, string> = {
  'face id':
    "Face ID, Object Detection va sun'iy intellekt texnologiyalari yordamida imtihon jarayonlarini real vaqt rejimida nazorat qiling. Shaxsni tasdiqlash, qoidabuzarliklarni aniqlash va akademik halollikni ta'minlash imkonini beradi.",
}
const FALLBACK_DESCRIPTION =
  "Ushbu imkoniyat haqida batafsil ma'lumot tez orada qo'shiladi."

interface Feature {
  key: string
  icon: string
  label: string
  description: string
}

const features: Feature[] = [
  { icon: 'face id', label: 'Face ID va AI nazorati bilan xavfsiz imtihonlar' },
  { icon: 'features', label: "Kiberxavfsizlik bosqichidan o'tgan platforma" },
  { icon: 'sync', label: 'HEMIS bilan real vaqt rejimida sinxronizatsiya' },
  { icon: 'hemis', label: 'Baholarni HEMIS tizimiga avtomatik uzatish' },
  { icon: 'ai', label: "Mashhur ta'lim va AI xizmatlari bilan integratsiya" },
  { icon: 'mobile', label: 'Barcha imkoniyatlarga ega mobil ilova' },
  { icon: 'calendar', label: 'QR-kod va Face ID orqali aqlli davomat' },
  { icon: 'globe', label: 'Global standartlarga mos kurs konstruktori' },
  { icon: 'chart', label: 'Chuqur analitika va kengaytirilgan hisobotlar' },
  { icon: 'repeat', label: "Qayta o'qish jarayonlarini avtomatlashtirish" },
  { icon: 'magic', label: 'AI yordamida baholash, tekshirish va kontent yaratish' },
  { icon: 'schedule', label: 'Moslashuvchan va dinamik dars jadvali' },
  { icon: 'dashboard', label: "Talabalar uchun zamonaviy o'quv platformasi" },
  { icon: 'exam', label: 'Nazorat va imtihonlarni moslashuvchan boshqarish' },
  { icon: 'feedback', label: "So'rovnomalar va fikr-mulohazalarni yig'ish" },
  { icon: 'messages', label: "Talabalar va o'qituvchilar uchun yagona chat" },
  { icon: 'history', label: 'Har bir harakatni qayd etuvchi audit loglar' },
  { icon: 'money', label: "Kontrakt va to'lovlarni nazorat qilish" },
  { icon: 'bell', label: 'Aqlli va maqsadli bildirishnomalar' },
  { icon: 'time add', label: "Kunduzgi, masofaviy va sirtqi ta'limni birlashtirish" },
].map((f) => ({
  key: f.icon,
  label: f.label,
  icon: iconMap[f.icon] ?? '',
  description: DESCRIPTIONS[f.icon] ?? FALLBACK_DESCRIPTION,
}))

const scroller = ref<HTMLElement | null>(null)

function scroll(direction: number) {
  scroller.value?.scrollBy({ left: direction * 360, behavior: 'smooth' })
}

// ----- Modal -----
const activeIndex = ref<number | null>(null)
const active = computed(() => (activeIndex.value === null ? null : features[activeIndex.value]))

function openModal(i: number) {
  activeIndex.value = i
}
function closeModal() {
  activeIndex.value = null
}
function stepModal(direction: number) {
  if (activeIndex.value === null) return
  const n = features.length
  activeIndex.value = (activeIndex.value + direction + n) % n
}

function onKeydown(e: KeyboardEvent) {
  if (activeIndex.value === null) return
  if (e.key === 'Escape') closeModal()
  else if (e.key === 'ArrowLeft') stepModal(-1)
  else if (e.key === 'ArrowRight') stepModal(1)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section class="bg-black text-white">
    <div class="mx-auto max-w-330 px-8 py-20">
      <!-- Header: title + carousel arrows -->
      <div class="flex items-end justify-between gap-6">
        <h2 class="font-sf text-5xl font-bold leading-tight tracking-tight">
          Bitta platforma,<br />
          <span class="text-[#9FE870]">20+</span> kuchli imkoniyat
        </h2>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#333333] p-1">
          <button
            type="button"
            aria-label="Oldingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(-1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Keyingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable cards -->
      <div ref="scroller" class="no-scrollbar edge-fade mt-12 flex gap-6 overflow-x-auto px-12 pb-2">
        <button
          v-for="(f, i) in features"
          :key="i"
          type="button"
          class="flex w-43.25 shrink-0 flex-col items-center text-center transition-opacity hover:opacity-80"
          @click="openModal(i)"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#333333] p-4">
            <img :src="f.icon" alt="" class="h-12 w-12" />
          </div>
          <span
            class="mt-4 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
          >
            {{ f.label }}
          </span>
        </button>
      </div>
    </div>

    <!-- Feature modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="active"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          @click.self="closeModal"
        >
          <div
            class="flex h-138.5 w-138 max-w-full flex-col gap-4 rounded-3xl bg-[#333333] p-8 shadow-[0px_16px_42px_0px_#00000080]"
          >
            <!-- Title + close -->
            <div class="flex items-start justify-between gap-4">
              <h3
                class="line-clamp-2 min-h-16 font-sf text-[24px] font-semibold leading-8 tracking-[0.02em] text-white"
              >
                {{ active.label }}
              </h3>
              <button
                type="button"
                aria-label="Yopish"
                class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#4A4A4A] text-white transition-colors hover:bg-[#5a5a5a]"
                @click="closeModal"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <!-- Description (fixed 3-line height so the player stays pinned) -->
            <p
              class="line-clamp-3 min-h-13.5 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#BBBBBB]"
            >
              {{ active.description }}
            </p>

            <!-- Video player (controls styled; hook up a real <video> when sources exist) -->
            <div class="relative h-68.5 w-full shrink-0 overflow-hidden rounded-2xl bg-[#0B0E04]">
              <!-- Controls bar -->
              <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                <!-- left: pause + timeline -->
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Pauza"
                    class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                  >
                    <img :src="pauseIcon" alt="" class="h-5 w-5" />
                  </button>
                  <div class="relative h-3 w-59.25 rounded-lg bg-white/25">
                    <div class="absolute inset-y-0 left-0 w-2/5 rounded-lg bg-white"></div>
                    <div
                      class="absolute top-1/2 left-[40%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    ></div>
                  </div>
                </div>
                <!-- right: mute + expand -->
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Ovozsiz"
                    class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                  >
                    <img :src="muteIcon" alt="" class="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    aria-label="To'liq ekran"
                    class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                  >
                    <img :src="expandIcon" alt="" class="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Prev / next nav -->
            <div class="flex h-12.5 w-full shrink-0 items-center justify-between rounded-full bg-[#0B0E04] p-1">
              <button
                type="button"
                aria-label="Oldingi"
                class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#333333] text-white transition-colors hover:bg-[#444]"
                @click="stepModal(-1)"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Keyingi"
                class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#333333] text-white transition-colors hover:bg-[#444]"
                @click="stepModal(1)"
              >
                <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Fade the start/end edges of the scroll row (like the partners marquee).
   Fixed 40px stops align with the row's px-12 (48px) gutter so the first/last
   cards stay fully readable at rest and only fade once scrolled. */
.edge-fade {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 40px,
    #000 calc(100% - 40px),
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0,
    #000 40px,
    #000 calc(100% - 40px),
    transparent 100%
  );
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
