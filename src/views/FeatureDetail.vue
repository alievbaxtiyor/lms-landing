<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, RouterLink } from 'vue-router'
import { features, getFeatureBySlug } from '../data/features'
import muteIcon from '../assets/icons/mute.svg'
import expandIcon from '../assets/icons/expand.svg'
import shotLeft from '../assets/images/hero-left.png'
import shotRight from '../assets/images/hero-center.png'
import featureVideo from '../assets/videos/introdaction1.mp4'

const { t, tm, rt } = useI18n()

const route = useRoute()
const feature = computed(() => getFeatureBySlug(String(route.params.slug)) ?? features[0])

// Video player (same controls model as the Introduction section).
const videoEl = ref<HTMLVideoElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const progress = ref(0)
const playPauseLabel = computed(() =>
  isPlaying.value ? t('features.detail.pause') : t('features.detail.play'),
)

// Seek a few seconds in so the paused player shows a real frame as its poster
// instead of the dark intro.
const POSTER_TIME = 3
function showPoster() {
  const v = videoEl.value
  if (v && v.paused && v.currentTime < 0.1) {
    try {
      v.currentTime = Math.min(POSTER_TIME, (v.duration || POSTER_TIME) - 0.1)
    } catch {
      /* seeking can throw before data is ready — ignore */
    }
  }
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
  <section class="bg-white text-[#0B0E04]">
    <div class="mx-auto max-w-296 px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-sf text-[14px] leading-4.5 tracking-[0.02em] text-[#777777]">
        <RouterLink to="/" class="transition-colors hover:text-[#0B0E04]">{{
          $t('features.detail.breadcrumb')
        }}</RouterLink>
        <span>›</span>
        <span class="text-[#4A4A4A]">{{ $t('features.items.' + feature.slug + '.label') }}</span>
      </nav>

      <div class="mt-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <!-- Main content -->
        <article class="w-full max-w-160">
          <!-- Icon badge -->
          <div class="flex h-15 w-15 items-center justify-center rounded-2xl bg-[#9FE870]">
            <img :src="feature.icon" alt="" class="h-9 w-9" />
          </div>

          <h1 class="mt-6 font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
            {{ $t('features.items.' + feature.slug + '.label') }}
          </h1>

          <p class="mt-6 font-sf text-[16px] font-normal leading-6 tracking-[0.02em] text-[#4A4A4A]">
            {{ $t('features.items.' + feature.slug + '.description') }}
          </p>

          <!-- Video player -->
          <div class="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-[#0B0E04]">
            <video
              ref="videoEl"
              :src="featureVideo"
              class="h-full w-full object-cover"
              playsinline
              preload="metadata"
              @loadedmetadata="showPoster"
              @timeupdate="onTimeUpdate"
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @click="togglePlay"
            ></video>

            <!-- Bottom scrim so the controls stay legible over bright frames -->
            <div
              class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/55 to-transparent"
            ></div>

            <!-- Controls bar -->
            <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
              <div class="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  :aria-label="playPauseLabel"
                  class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] text-white backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
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
                <div class="relative h-1.5 flex-1 cursor-pointer rounded-full bg-white/25" @click="seek">
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
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  :aria-label="t('features.detail.mute')"
                  class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                  :class="{ 'opacity-50': isMuted }"
                  @click="toggleMute"
                >
                  <img :src="muteIcon" alt="" class="h-5 w-5" />
                </button>
                <button
                  type="button"
                  :aria-label="t('features.detail.fullscreen')"
                  class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                  @click="toggleFullscreen"
                >
                  <img :src="expandIcon" alt="" class="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <!-- Body copy -->
          <div class="mt-8 space-y-5">
            <p
              v-for="(para, i) in tm('features.defaultBody')"
              :key="i"
              class="font-sf text-[14px] font-normal leading-5.5 tracking-[0.02em] text-[#606060]"
            >
              {{ rt(para) }}
            </p>
          </div>

          <!-- Screenshots -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <img :src="shotLeft" alt="" class="aspect-4/3 w-full rounded-2xl object-cover" />
            <img :src="shotRight" alt="" class="aspect-4/3 w-full rounded-2xl object-cover" />
          </div>
          <p class="mt-4 font-sf text-[14px] font-normal leading-5.5 tracking-[0.02em] text-[#606060]">
            {{ $t('features.items.' + feature.slug + '.description') }}
          </p>
        </article>

        <!-- Sidebar: all features -->
        <aside class="w-full shrink-0 lg:w-64">
          <h2 class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]">
            {{ $t('features.detail.sidebar') }}
          </h2>
          <ul class="mt-6 space-y-4">
            <li v-for="f in features" :key="f.slug">
              <RouterLink
                :to="`/imkoniyatlar/${f.slug}`"
                class="block font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] transition-colors"
                :class="
                  f.slug === feature.slug
                    ? 'font-medium text-[#0B0E04] underline decoration-[#9FE870] decoration-2 underline-offset-4'
                    : 'text-[#777777] hover:text-[#0B0E04]'
                "
              >
                {{ $t('features.items.' + f.slug + '.label') }}
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
