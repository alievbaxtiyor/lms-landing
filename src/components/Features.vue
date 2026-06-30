<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { features } from '../data/features'

const { t } = useI18n()

const scroller = ref<HTMLElement | null>(null)

function scroll(direction: number) {
  scroller.value?.scrollBy({ left: direction * 360, behavior: 'smooth' })
}
</script>

<template>
  <section id="imkoniyatlar" class="bg-black text-white">
    <div class="mx-auto max-w-296 px-8 py-20">
      <!-- Header: title + carousel arrows -->
      <div class="flex items-end justify-between gap-6">
        <h2 class="font-sf text-5xl font-bold leading-tight tracking-tight">
          {{ $t('features.titlePre') }}<br />
          <span class="text-[#9FE870]">{{ $t('features.titleHighlight') }}</span>
          {{ $t('features.titlePost') }}
        </h2>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#333333] p-1">
          <button
            type="button"
            :aria-label="t('features.detail.prev')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(-1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            :aria-label="t('features.detail.next')"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#0B0E04] text-white transition-colors hover:bg-[#151a08]"
            @click="scroll(1)"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Scrollable cards -> each links to its feature detail page -->
      <div ref="scroller" class="no-scrollbar edge-fade mt-12 flex gap-6 overflow-x-auto px-12 pb-2">
        <RouterLink
          v-for="f in features"
          :key="f.slug"
          :to="`/imkoniyatlar/${f.slug}`"
          class="flex w-43.25 shrink-0 flex-col items-center text-center transition-opacity hover:opacity-80"
        >
          <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#333333] p-4">
            <img :src="f.icon" alt="" class="h-12 w-12" />
          </div>
          <span
            class="mt-4 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
          >
            {{ $t('features.items.' + f.slug + '.label') }}
          </span>
        </RouterLink>
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
</style>
