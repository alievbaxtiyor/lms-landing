<script setup lang="ts">
import { nextTick, ref } from 'vue'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import pauseIcon from '../assets/icons/pause.svg'
import muteIcon from '../assets/icons/mute.svg'
import expandIcon from '../assets/icons/expand.svg'

const bg = 'radial-gradient(195.63% 106.74% at 50% -6.74%, #9FE870 0%, #FFFFFF 100%)'

// Placeholder slides — swap for real video posters/sources when available.
const slideCount = 3

const scroller = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function step(direction: number) {
  const n = slideCount
  activeIndex.value = (activeIndex.value + direction + n) % n
  nextTick(() => {
    const el = scroller.value?.children[activeIndex.value] as HTMLElement | undefined
    if (el && scroller.value) scroller.value.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
  })
}
</script>

<template>
  <section class="text-[#0B0E04]" :style="{ background: bg }">
    <div class="mx-auto max-w-330 px-8 py-20">
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
            @click="step(-1)"
          >
            <img :src="leftIcon" alt="" class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Keyingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="step(1)"
          >
            <img :src="rightIcon" alt="" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Video slider -->
      <div
        ref="scroller"
        class="no-scrollbar fade-right relative mt-12 mr-[calc(50%-50vw)] flex gap-6 overflow-x-auto pb-2"
      >
        <div v-for="i in slideCount" :key="i" class="h-106.5 w-185.25 shrink-0">
          <!-- Active card: green frame + video + controls -->
          <div
            v-if="i - 1 === activeIndex"
            class="h-full w-full rounded-[28px] border-[3px] border-[#9FE870] p-2.25"
          >
            <div class="relative h-full w-full overflow-hidden rounded-[20px] bg-white">
              <!-- poster placeholder -->
              <div class="flex h-full w-full items-center justify-center text-sm text-[#0B0E04]/30">
                Video
              </div>
              <!-- bottom scrim for control readability -->
              <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 to-transparent"></div>

              <!-- Controls: two pills, space-between, 12px inset -->
              <div class="absolute inset-x-3 bottom-3 flex items-center justify-between">
                <!-- left pill: pause + timeline -->
                <div class="flex h-12.5 items-center gap-5.5 rounded-full bg-[#33333329] py-1 pr-5.5 pl-1 backdrop-blur-sm">
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

                <!-- right pill: mute + expand -->
                <div class="flex h-12.5 items-center gap-1 rounded-full bg-[#33333329] p-1 backdrop-blur-sm">
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
          </div>

          <!-- Inactive card: plain dark preview -->
          <div
            v-else
            class="flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#0B0E04] text-sm text-white/30"
          >
            Video
          </div>
        </div>
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
/* Fade only the right (bleed) end of the slider. */
.fade-right {
  -webkit-mask-image: linear-gradient(to right, #000 calc(100% - 140px), transparent 100%);
          mask-image: linear-gradient(to right, #000 calc(100% - 140px), transparent 100%);
}
</style>
