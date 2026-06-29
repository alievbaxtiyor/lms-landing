<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { features, getFeatureBySlug } from '../data/features'
import pauseIcon from '../assets/icons/pause.svg'
import muteIcon from '../assets/icons/mute.svg'
import expandIcon from '../assets/icons/expand.svg'
import shotLeft from '../assets/images/hero-left.png'
import shotRight from '../assets/images/hero-center.png'

const route = useRoute()
const feature = computed(() => getFeatureBySlug(String(route.params.slug)) ?? features[0])
</script>

<template>
  <section class="bg-black text-white">
    <div class="mx-auto max-w-296 px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 font-sf text-[14px] leading-4.5 tracking-[0.02em] text-[#777777]">
        <RouterLink to="/" class="transition-colors hover:text-white">Asosiy</RouterLink>
        <span>›</span>
        <span class="text-[#A4A4A4]">{{ feature.label }}</span>
      </nav>

      <div class="mt-10 flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <!-- Main content -->
        <article class="w-full max-w-160">
          <!-- Icon badge -->
          <div class="flex h-15 w-15 items-center justify-center rounded-2xl bg-[#9FE870]">
            <img :src="feature.icon" alt="" class="h-9 w-9" />
          </div>

          <h1 class="mt-6 font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-white">
            {{ feature.label }}
          </h1>

          <p class="mt-6 font-sf text-[16px] font-normal leading-6 tracking-[0.02em] text-[#D2D2D2]">
            {{ feature.description }}
          </p>

          <!-- Video player -->
          <div class="relative mt-8 aspect-video w-full overflow-hidden rounded-2xl bg-[#0B0E04]">
            <!-- Center branding -->
            <div
              class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span class="font-sf text-[11px] font-medium tracking-[0.25em] text-[#9FE870]">
                LMS.UZ — BOSHQARUV
              </span>
              <p class="mt-2 font-sf text-[32px] font-semibold tracking-[0.01em]">
                Imtihon <span class="text-[#9FE870]">proctoringi</span>
              </p>
              <p class="mt-1 font-sf text-[13px] text-[#A4A4A4]">
                Onlayn imtihonlarni kuzating — ishonchlilik to'liq nazoratda.
              </p>
            </div>

            <!-- Controls bar -->
            <div class="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
              <div class="flex flex-1 items-center gap-3">
                <button
                  type="button"
                  aria-label="Pauza"
                  class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-full bg-[#0B0E04A3] backdrop-blur-sm transition-colors hover:bg-[#0B0E04]"
                >
                  <img :src="pauseIcon" alt="" class="h-5 w-5" />
                </button>
                <div class="relative h-3 flex-1 rounded-lg bg-white/25">
                  <div class="absolute inset-y-0 left-0 w-2/5 rounded-lg bg-white"></div>
                  <div
                    class="absolute top-1/2 left-[40%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  ></div>
                </div>
              </div>
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

          <!-- Body copy -->
          <div class="mt-8 space-y-5">
            <p
              v-for="(para, i) in feature.body"
              :key="i"
              class="font-sf text-[14px] font-normal leading-5.5 tracking-[0.02em] text-[#A4A4A4]"
            >
              {{ para }}
            </p>
          </div>

          <!-- Screenshots -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <img :src="shotLeft" alt="" class="aspect-4/3 w-full rounded-2xl object-cover" />
            <img :src="shotRight" alt="" class="aspect-4/3 w-full rounded-2xl object-cover" />
          </div>
          <p class="mt-4 font-sf text-[14px] font-normal leading-5.5 tracking-[0.02em] text-[#A4A4A4]">
            {{ feature.description }}
          </p>
        </article>

        <!-- Sidebar: all features -->
        <aside class="w-full shrink-0 lg:w-64">
          <h2 class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-white">
            Imkoniyatlar
          </h2>
          <ul class="mt-6 space-y-4">
            <li v-for="f in features" :key="f.slug">
              <RouterLink
                :to="`/imkoniyatlar/${f.slug}`"
                class="block font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] transition-colors"
                :class="
                  f.slug === feature.slug
                    ? 'font-medium text-[#9FE870] underline'
                    : 'text-[#777777] hover:text-white'
                "
              >
                {{ f.label }}
              </RouterLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </section>
</template>
