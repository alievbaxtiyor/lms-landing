<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import logoOXU from '../assets/logos/partners/OXU.png'
import logoASTI from '../assets/logos/partners/ASTI.png'
import logoYangiAsr from '../assets/logos/partners/YANGI_ASR.png'
import logoAIFU from '../assets/logos/partners/AIFU.png'

const { t } = useI18n()

interface Review {
  text: string
  name: string
  org: string
  avatar: string
}

const reviews = computed<Review[]>(() => [
  {
    text: t('reviews.items.r1.text'),
    name: 'Nilufar Yusupova',
    org: t('reviews.items.r1.org'),
    avatar: logoOXU,
  },
  {
    text: t('reviews.items.r2.text'),
    name: 'Bekzod Rahimov',
    org: t('reviews.items.r2.org'),
    avatar: logoASTI,
  },
  {
    text: t('reviews.items.r3.text'),
    name: 'Dilnoza Karimova',
    org: t('reviews.items.r3.org'),
    avatar: logoYangiAsr,
  },
  {
    text: t('reviews.items.r4.text'),
    name: 'Nilufar Yusupova',
    org: t('reviews.items.r4.org'),
    avatar: logoAIFU,
  },
])

const scroller = ref<HTMLElement | null>(null)
function scroll(direction: number) {
  const el = scroller.value
  if (!el) return
  // Step by one card (card width + gap), derived from the live layout so it works
  // at every breakpoint instead of a hard-coded desktop value.
  const kids = el.children
  const step =
    kids.length > 1
      ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft
      : ((kids[0] as HTMLElement)?.offsetWidth ?? 336)
  el.scrollBy({ left: direction * step, behavior: 'smooth' })
}
</script>

<template>
  <section id="natijalar" class="text-[#0B0E04]">
    <div class="mx-auto max-w-296 px-5 md:px-8 py-14 md:py-20">
      <!-- Header: title + carousel buttons -->
      <div class="flex items-end justify-between gap-6">
        <h2 class="font-sf text-[28px] leading-9 sm:text-[38px] sm:leading-11 md:text-[48px] md:leading-14 font-semibold tracking-[0.01em] text-[#0B0E04]">
          {{ $t('reviews.titleLine1') }}<br />
          {{ $t('reviews.titleLine2') }}
        </h2>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#E7F9DB] p-1">
          <button
            type="button"
            :aria-label="$t('reviews.prev')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="scroll(-1)"
          >
            <img :src="leftIcon" alt="" class="h-5 w-5" />
          </button>
          <button
            type="button"
            :aria-label="$t('reviews.next')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="scroll(1)"
          >
            <img :src="rightIcon" alt="" class="h-5 w-5" />
          </button>
        </div>
      </div>

      <!-- Review cards -->
      <div
        ref="scroller"
        class="no-scrollbar edge-fade mt-10 md:mt-12 flex snap-x snap-mandatory items-start gap-4 md:gap-6 overflow-x-auto pb-2 md:snap-none"
      >
        <div
          v-for="(review, i) in reviews"
          :key="i"
          class="flex w-80 snap-start sm:w-90.5 shrink-0 flex-col gap-4 rounded-3xl bg-[#F4F4F4A3] p-5 sm:p-6"
        >
          <p class="font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#4A4A4A]">
            {{ review.text }}
          </p>
          <div class="flex items-center gap-3">
            <img :src="review.avatar" alt="" class="h-9 w-9 shrink-0 object-contain" />
            <div>
              <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#0B0E04]">
                {{ review.name }}
              </p>
              <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#777777]">
                {{ review.org }}
              </p>
            </div>
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
/* Fade the start/end of the card row so they don't cut on a hard line. Desktop
   only — on mobile the fade eats into the first card's text (it starts at the
   container edge), so the row reads as clipped/off-centre. */
@media (min-width: 768px) {
  .edge-fade {
    -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
            mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
  }
}
</style>
