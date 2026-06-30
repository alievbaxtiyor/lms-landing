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

// Exactly two videos.
const slides = [video1, video2]
const STEP = 741 + 24 // card width (w-185.25) + gap (gap-6)

const activeIndex = ref(0)

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
  <section class="text-[#0B0E04]" :style="{ background: bg }">
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

      <!-- Video slider (two videos) -->
      <div class="fade-right mt-12 mr-[calc(50%-50vw)] overflow-hidden">
        <div
          class="flex gap-6 pb-2 transition-transform duration-500 ease-out"
          :style="{ transform: `translateX(-${activeIndex * STEP}px)` }"
        >
          <div v-for="(src, idx) in slides" :key="idx" class="h-106.5 w-185.25 shrink-0">
            <!-- Same frame for every card (border just turns green when active),
                 so the shape never changes while sliding. -->
            <div
              class="h-full w-full rounded-[28px] border-[3px] p-2.25"
              :class="idx === activeIndex ? 'border-[#9FE870]' : 'border-transparent'"
            >
              <div class="relative h-full w-full overflow-hidden rounded-[20px] bg-black">
                <video
                  :ref="(el) => setVideoRef(idx, el)"
                  :src="src"
                  class="h-full w-full object-cover transition-opacity"
                  :class="{ 'opacity-60': idx !== activeIndex }"
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
