<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import muteIcon from '../assets/icons/mute.svg'
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
const SIDE_SCALE = 0.8
const SIDE_SHIFT = 920 // px each non-active card is pushed to its side
function cardStyle(idx: number) {
  const offset = idx - activeIndex.value
  const active = offset === 0
  return {
    transform: `translate(-50%, -50%) translateX(${offset * SIDE_SHIFT}px) scale(${active ? 1 : SIDE_SCALE})`,
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
    <div class="mx-auto max-w-296 px-8 py-20">
      <!-- Header: title + description (left), slider buttons (right) -->
      <div class="flex items-end justify-between gap-6">
        <div class="max-w-138">
          <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
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
      <div class="cf-stage relative left-1/2 mt-12 h-154 w-screen -translate-x-1/2 overflow-hidden">
        <div
          v-for="(src, idx) in slides"
          :key="idx"
          class="cf-card absolute left-1/2 top-1/2 h-154 w-268"
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
                  class="absolute inset-x-3 bottom-3 flex items-center justify-between"
                >
                  <!-- left pill: play/pause + timeline -->
                  <div class="flex h-12.5 items-center gap-5.5 rounded-full bg-[#33333329] py-1 pr-5.5 pl-1 backdrop-blur">
                    <button
                      type="button"
                      :aria-label="playPauseLabel"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] text-white backdrop-blur transition-colors hover:bg-[#0B0E04]"
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
                    <div class="relative h-1.5 w-59.25 cursor-pointer rounded-full bg-white/25" @click="seek">
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
                  <div class="flex h-12.5 items-center gap-1 rounded-full bg-[#33333329] p-1 backdrop-blur">
                    <button
                      type="button"
                      :aria-label="$t('introduction.mute')"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur transition-colors hover:bg-[#0B0E04]"
                      :class="{ 'opacity-50': isMuted }"
                      @click="toggleMute"
                    >
                      <img :src="muteIcon" alt="" class="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      :aria-label="$t('introduction.fullscreen')"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur transition-colors hover:bg-[#0B0E04]"
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
