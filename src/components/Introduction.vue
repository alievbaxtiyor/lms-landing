<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import expandIcon from '../assets/icons/expand.svg'
import video1 from '../assets/videos/introdaction1.mp4'
import video2 from '../assets/videos/introdaction2.mp4'

const { t } = useI18n()

const bg = 'radial-gradient(195.63% 106.74% at 50% -6.74%, #9FE870 0%, #FFFFFF 100%)'

// Exactly two videos (introdaction2 shown first, introdaction1 second).
const slides = [video2, video1]

const activeIndex = ref(0)

// Coverflow placement: the active video sits centred at full size; the other is
// pushed to its side (right if it comes after the active one, left if before),
// shrunk and dimmed. Switching just re-runs this and the CSS transition on
// .cf-card slides + scales each card smoothly between the two states.
//
// The card is a fixed 1072×616 on desktop, but on small screens that (and the
// off-screen control pills sitting at its inset edges) breaks — so the card
// size and side-shift track the viewport width below.
const SIDE_SCALE = 0.8
const viewport = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
function onResize() {
  viewport.value = window.innerWidth
}
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => window.removeEventListener('resize', onResize))

const isMobile = computed(() => viewport.value < 768)
const cardW = computed(() => (isMobile.value ? Math.min(viewport.value * 0.9, 560) : 1072))
const cardH = computed(() => (isMobile.value ? Math.round((cardW.value * 9) / 16) : 616))
// On mobile push the inactive card fully off to the side; on desktop keep the
// designed peek.
const sideShift = computed(() => (isMobile.value ? cardW.value * 1.05 : 920))
const stageStyle = computed(() => ({ height: cardH.value + 'px' }))

function cardStyle(idx: number) {
  const offset = idx - activeIndex.value
  const active = offset === 0
  return {
    width: cardW.value + 'px',
    height: cardH.value + 'px',
    transform: `translate(-50%, -50%) translateX(${offset * sideShift.value}px) scale(${active ? 1 : SIDE_SCALE})`,
    opacity: active ? '1' : '0.5',
  }
}

// Each card keeps its own persistent <video> element.
const videoEls = ref<(HTMLVideoElement | null)[]>([])
function setVideoRef(idx: number, el: any) {
  videoEls.value[idx] = (el as HTMLVideoElement) ?? null
}
const videoEl = computed(() => videoEls.value[activeIndex.value] ?? null)

const isPlaying = ref(false)
const isMuted = ref(false)
const progress = ref(0)

const playPauseLabel = computed(() =>
  isPlaying.value ? t('introduction.pause') : t('introduction.play'),
)

// Seek a few seconds in so the paused player shows a real frame as its poster
// instead of the dark intro. Playing videos are left alone.
const POSTER_TIME = 3
function showPoster(e: Event) {
  const v = e.target as HTMLVideoElement
  if (v.paused && v.currentTime < 0.1) {
    try {
      v.currentTime = Math.min(POSTER_TIME, (v.duration || POSTER_TIME) - 0.1)
    } catch {
      /* seeking can throw before data is ready — ignore */
    }
  }
}

function goTo(idx: number) {
  if (idx === activeIndex.value) return
  videoEl.value?.pause()
  activeIndex.value = idx
  progress.value = 0
}
function move(dir: number) {
  goTo((activeIndex.value + dir + slides.length) % slides.length)
}

function togglePlay() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) v.play().catch(() => {})
  else v.pause()
}
function onTimeUpdate() {
  const v = videoEl.value
  if (v && v.duration) progress.value = v.currentTime / v.duration
}
function toggleMute() {
  const v = videoEl.value
  if (!v) return
  v.muted = !v.muted
  isMuted.value = v.muted
}

// Pause the active video as soon as the user scrolls the page while it plays.
// The listener only exists while something is playing, and @pause tears it down.
function pauseOnScroll() {
  videoEl.value?.pause()
}
watch(isPlaying, (playing) => {
  if (playing) window.addEventListener('scroll', pauseOnScroll, { passive: true })
  else window.removeEventListener('scroll', pauseOnScroll)
})
onBeforeUnmount(() => window.removeEventListener('scroll', pauseOnScroll))
function seek(e: MouseEvent) {
  const v = videoEl.value
  if (!v || !v.duration) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration
}
function toggleFullscreen() {
  videoEl.value?.requestFullscreen?.()
}
</script>

<template>
  <section class="overflow-x-clip text-[#0B0E04]" :style="{ background: bg }">
    <div class="mx-auto max-w-296 px-5 md:px-8 py-14 md:py-20">
      <!-- Header: title + description (left), slider buttons (right) -->
      <div class="flex items-end justify-between gap-6">
        <div class="max-w-138">
          <h2 class="font-sf text-[28px] leading-9 sm:text-[38px] sm:leading-11 md:text-[48px] md:leading-14 font-semibold tracking-[0.01em] text-[#0B0E04]">
            {{ $t('introduction.titleLine1') }}<br />
            {{ $t('introduction.titleLine2') }}
          </h2>
          <p
            class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]"
          >
            {{ $t('introduction.descLine1') }}<br />
            {{ $t('introduction.descLine2') }}
          </p>
        </div>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#E7F9DB] p-1">
          <button
            type="button"
            :aria-label="$t('introduction.prev')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="move(-1)"
          >
            <img :src="leftIcon" alt="" class="h-5 w-5" />
          </button>
          <button
            type="button"
            :aria-label="$t('introduction.next')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="move(1)"
          >
            <img :src="rightIcon" alt="" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Video coverflow (two videos): the active one sits centred at full
           size; the other is smaller, dimmer and peeks from its side. Switching
           slides the active card off to the left and brings the other in from
           the right (and vice-versa) via the .cf-card transition. -->
      <div class="cf-stage relative left-1/2 mt-10 md:mt-12 w-screen -translate-x-1/2 overflow-hidden" :style="stageStyle">
        <div
          v-for="(src, idx) in slides"
          :key="idx"
          class="cf-card absolute left-1/2 top-1/2"
          :class="idx === activeIndex ? 'z-20' : 'z-10'"
          :style="cardStyle(idx)"
        >
          <!-- Same frame for every card (border just turns green when active),
               so the shape never changes while sliding. -->
          <div
            class="h-full w-full rounded-[28px] border-[3px] p-2.25 transition-colors duration-500"
            :class="idx === activeIndex ? 'border-[#9FE870]' : 'border-transparent'"
          >
            <div class="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
              <video
                :ref="(el) => setVideoRef(idx, el)"
                :src="src"
                class="h-full w-full cursor-pointer object-cover"
                playsinline
                preload="metadata"
                @loadedmetadata="showPoster"
                @timeupdate="onTimeUpdate"
                @play="isPlaying = true"
                @pause="isPlaying = false"
                @click="idx === activeIndex ? togglePlay() : goTo(idx)"
              ></video>

              <!-- Controls (active card only): two pills, 12px inset -->
                <div
                  v-if="idx === activeIndex"
                  class="absolute inset-x-2 md:inset-x-3 bottom-2 md:bottom-3 flex items-center justify-between gap-2"
                >
                  <!-- left pill: play/pause + timeline -->
                  <div class="flex h-11 md:h-12.5 items-center gap-2.5 md:gap-5.5 rounded-full bg-[#33333329] py-1 pr-3 md:pr-5.5 pl-1 backdrop-blur">
                    <button
                      type="button"
                      :aria-label="playPauseLabel"
                      class="flex h-9 w-9 md:h-10.5 md:w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] text-white backdrop-blur transition-colors hover:bg-[#0B0E04]"
                      @click="togglePlay"
                    >
                      <svg v-if="isPlaying" class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <rect x="6.5" y="5" width="3.5" height="14" rx="1.75" />
                        <rect x="14" y="5" width="3.5" height="14" rx="1.75" />
                      </svg>
                      <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div class="relative h-1.5 w-24 sm:w-40 md:w-59.25 cursor-pointer rounded-full bg-white/25" @click="seek">
                      <div
                        class="absolute inset-y-0 left-0 rounded-full bg-white"
                        :style="{ width: `${progress * 100}%` }"
                      ></div>
                      <div
                        class="absolute top-1/2 h-4.5 w-4.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_1px_4px_rgba(0,0,0,0.3)]"
                        :style="{ left: `${progress * 100}%` }"
                      ></div>
                    </div>
                  </div>

                  <!-- right pill: mute + expand -->
                  <div class="flex h-11 md:h-12.5 items-center gap-1 rounded-full bg-[#33333329] p-1 backdrop-blur">
                    <button
                      type="button"
                      :aria-label="$t('introduction.mute')"
                      class="flex h-9 w-9 md:h-10.5 md:w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] text-white backdrop-blur transition-colors hover:bg-[#0B0E04]"
                      @click="toggleMute"
                    >
                      <!-- Muted: speaker with an X. Unmuted: speaker with waves. -->
                      <svg
                        v-if="isMuted"
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M18.333 7.5 13.333 12.5M13.333 7.5 18.333 12.5" />
                        <path d="M8.028 3.638 5.39 6.276c-.144.144-.216.216-.3.268a.83.83 0 0 1-.241.104c-.096.023-.198.023-.402.023H3a1.51 1.51 0 0 0-.878.09.83.83 0 0 0-.365.365c-.09.178-.09.411-.09.878v4c0 .467 0 .7.09.878.08.157.208.285.365.365.178.09.411.09.878.09h1.448c.204 0 .306 0 .402.023a.83.83 0 0 1 .241.104c.084.052.156.124.3.268l2.638 2.638c.357.357.535.535.689.547a.42.42 0 0 0 .35-.145c.099-.117.099-.369.099-.874V4.109c0-.505 0-.757-.1-.874a.42.42 0 0 0-.349-.145c-.154.012-.332.19-.69.548Z" />
                      </svg>
                      <svg
                        v-else
                        class="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M14.167 6.667a4.17 4.17 0 0 1 0 6.666M16.583 4.583a7.5 7.5 0 0 1 0 10.834" />
                        <path d="M8.028 3.638 5.39 6.276c-.144.144-.216.216-.3.268a.83.83 0 0 1-.241.104c-.096.023-.198.023-.402.023H3a1.51 1.51 0 0 0-.878.09.83.83 0 0 0-.365.365c-.09.178-.09.411-.09.878v4c0 .467 0 .7.09.878.08.157.208.285.365.365.178.09.411.09.878.09h1.448c.204 0 .306 0 .402.023a.83.83 0 0 1 .241.104c.084.052.156.124.3.268l2.638 2.638c.357.357.535.535.689.547a.42.42 0 0 0 .35-.145c.099-.117.099-.369.099-.874V4.109c0-.505 0-.757-.1-.874a.42.42 0 0 0-.349-.145c-.154.012-.332.19-.69.548Z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      :aria-label="$t('introduction.fullscreen')"
                      class="flex h-9 w-9 md:h-10.5 md:w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur transition-colors hover:bg-[#0B0E04]"
                      @click="toggleFullscreen"
                    >
                      <img :src="expandIcon" alt="" class="h-5 w-5" />
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Each video card eases between its centred and off-to-the-side states. */
.cf-card {
  transition:
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.55s ease;
  will-change: transform, opacity;
}
/* Soften both bleed edges so the peeking side video melts into the section. */
.cf-stage {
  -webkit-mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 7%, #000 93%, transparent 100%);
}
</style>
