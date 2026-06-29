<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import pauseIcon from '../assets/icons/pause.svg'
import muteIcon from '../assets/icons/mute.svg'
import expandIcon from '../assets/icons/expand.svg'
import video1 from '../assets/videos/introdaction1.mp4'
import video2 from '../assets/videos/introdaction2.mp4'

const bg = 'radial-gradient(195.63% 106.74% at 50% -6.74%, #9FE870 0%, #FFFFFF 100%)'

const slides = [video1, video2]
const N = slides.length

// Infinite carousel: render 3 copies and live in the middle one, resetting
// seamlessly at the edges so "next" can advance forever in either direction.
const loopSlides = [...slides, ...slides, ...slides]
const STEP = 741 + 24 // card width (w-185.25) + gap (gap-6)
const pos = ref(N) // index into loopSlides currently in the main slot
const animating = ref(true)

// ----- Active video playback state -----
const videoEl = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const progress = ref(0)

// Becomes true after the first navigation so the new main video auto-plays.
const autoplay = ref(false)

// Function ref: the controlled <video> lives inside v-for, so a string ref
// would collect into an array. This keeps videoEl pointing at the active video.
const setVideoEl = (el: any) => {
  videoEl.value = (el as HTMLVideoElement) ?? null
}

// Whenever the active video element changes (slide or seamless reset), play it.
watch(
  videoEl,
  (v) => {
    if (v && autoplay.value) v.play().catch(() => {})
  },
  { flush: 'post' },
)

const offset = computed(() => pos.value * STEP)

function move(dir: number) {
  if (!animating.value) return
  pos.value += dir
  autoplay.value = true
  progress.value = 0
}

function onTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform') return
  // Jumped past the middle copy → snap back by one set (visually identical).
  if (pos.value >= 2 * N || pos.value < N) {
    animating.value = false
    pos.value = N + (((pos.value % N) + N) % N)
    requestAnimationFrame(() => requestAnimationFrame(() => (animating.value = true)))
  }
}

function togglePlay() {
  const v = videoEl.value
  if (!v) return
  if (v.paused) v.play()
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
  <section class="text-[#0B0E04]" :style="{ background: bg }">
    <div class="mx-auto max-w-296 px-8 py-20">
      <!-- Header: title + description (left), slider buttons (right) -->
      <div class="flex items-end justify-between gap-6">
        <div class="max-w-138">
          <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
            Tizimimiz bilan<br />
            2 daqiqada tanishing
          </h2>
          <p
            class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]"
          >
            Platforma qanday ishlashini, o'qituvchi va o'quvchi tajribasini<br />
            qisqa videoda ko'ring.
          </p>
        </div>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#E7F9DB] p-1">
          <button
            type="button"
            aria-label="Oldingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="move(-1)"
          >
            <img :src="leftIcon" alt="" class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Keyingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="move(1)"
          >
            <img :src="rightIcon" alt="" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Video slider (transform-based infinite loop) -->
      <div class="fade-right mt-12 mr-[calc(50%-50vw)] overflow-hidden">
        <div
          class="flex gap-6 pb-2"
          :class="animating ? 'transition-transform duration-500 ease-out' : ''"
          :style="{ transform: `translateX(-${offset}px)` }"
          @transitionend="onTransitionEnd"
        >
          <div v-for="(src, idx) in loopSlides" :key="idx" class="h-106.5 w-185.25 shrink-0">
            <!-- Active card: green frame + video + controls -->
            <div
              v-if="idx === pos"
              class="h-full w-full rounded-[28px] border-[3px] border-[#9FE870] p-2.25"
            >
              <div class="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
                <video
                  :ref="setVideoEl"
                  :src="src"
                  class="h-full w-full object-cover"
                  playsinline
                  preload="metadata"
                  @timeupdate="onTimeUpdate"
                  @play="isPlaying = true"
                  @pause="isPlaying = false"
                  @click="togglePlay"
                ></video>

                <!-- bottom scrim for control readability -->
                <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 to-transparent"></div>

                <!-- Controls: two pills, space-between, 12px inset -->
                <div class="absolute inset-x-3 bottom-3 flex items-center justify-between">
                  <!-- left pill: pause + timeline -->
                  <div class="flex h-12.5 items-center gap-5.5 rounded-full bg-[#33333329] py-1 pr-5.5 pl-1 backdrop-blur-sm">
                    <button
                      type="button"
                      :aria-label="isPlaying ? 'Pauza' : 'Ijro etish'"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] text-white backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                      @click="togglePlay"
                    >
                      <img v-if="isPlaying" :src="pauseIcon" alt="" class="h-5 w-5" />
                      <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                    <div class="relative h-3 w-59.25 cursor-pointer rounded-lg bg-white/25" @click="seek">
                      <div
                        class="absolute inset-y-0 left-0 rounded-lg bg-white"
                        :style="{ width: `${progress * 100}%` }"
                      ></div>
                      <div
                        class="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                        :style="{ left: `${progress * 100}%` }"
                      ></div>
                    </div>
                  </div>

                  <!-- right pill: mute + expand -->
                  <div class="flex h-12.5 items-center gap-1 rounded-full bg-[#33333329] p-1 backdrop-blur-sm">
                    <button
                      type="button"
                      aria-label="Ovozsiz"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                      :class="{ 'opacity-50': isMuted }"
                      @click="toggleMute"
                    >
                      <img :src="muteIcon" alt="" class="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      aria-label="To'liq ekran"
                      class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                      @click="toggleFullscreen"
                    >
                      <img :src="expandIcon" alt="" class="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Inactive card: video preview, click to advance -->
            <button
              v-else
              type="button"
              class="block h-full w-full overflow-hidden rounded-[28px] bg-[#0B0E04]"
              @click="move(idx - pos)"
            >
              <video
                :src="src"
                class="h-full w-full object-cover opacity-70 transition-opacity hover:opacity-100"
                muted
                preload="metadata"
                playsinline
              ></video>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Fade only the right (bleed) end of the slider. */
.fade-right {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 140px), transparent 100%);
          mask-image: linear-gradient(to right, #000 calc(100% - 140px), transparent 100%);
}
</style>
