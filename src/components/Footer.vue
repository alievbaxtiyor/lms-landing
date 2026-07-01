<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDemoModal } from '../composables/useDemoModal'
import logoMark from '../assets/logos/logo.svg'
import logoWordmark from '../assets/logos/lms.uz.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import telegramIcon from '../assets/icons/telegram.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import youtubeIcon from '../assets/icons/youtube.svg'

const { t } = useI18n()
const { openDemoModal } = useDemoModal()

interface FooterLink {
  label: string
  href: string
}

const platforma = computed<FooterLink[]>(() => [
  { label: t('footer.platformaFeatures'), href: '#imkoniyatlar' },
  { label: t('footer.aiAssistant'), href: '#ai' },
  { label: t('footer.proctoring'), href: '#proktoring' },
  { label: t('footer.analytics'), href: '#analitika' },
])

const imkoniyatlar = computed<FooterLink[]>(() => [
  { label: t('footer.integrations'), href: '#integratsiyalar' },
  { label: t('footer.mobileApp'), href: '#mobil' },
  { label: t('footer.workflows'), href: '#workflows' },
])

const phone = computed(() => t('common.phone'))
const email = computed(() => t('common.email'))

// Only Telegram is live for now; the rest are shown but disabled.
const socials = [
  { label: 'Telegram', href: 'https://t.me/lms_rasmiy', icon: telegramIcon, disabled: false },
  { label: 'Instagram', href: '', icon: instagramIcon, disabled: true },
  { label: 'Facebook', href: '', icon: facebookIcon, disabled: true },
  { label: 'YouTube', href: '', icon: youtubeIcon, disabled: true },
]
</script>

<template>
  <footer class="relative z-10 bg-[#0B0E04] text-white lg:-mt-28">
    <!-- Curved "moon" top edge: a black cap that arcs up into the green section
         above, leaving green visible above the curve. -->
    <div class="pointer-events-none absolute inset-x-0 bottom-full -mb-px">
      <svg
        class="block h-18 w-full"
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,72 L0,30 Q720,-8 1440,30 L1440,72 Z" fill="#0B0E04" />
      </svg>
    </div>

    <!-- Green glow at the bottom -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
      style="background: radial-gradient(80% 100% at 50% 100%, rgba(159, 232, 112, 0.22) 0%, rgba(159, 232, 112, 0) 70%)"
    ></div>

    <div class="relative mx-auto max-w-296 px-8 py-20">
      <!-- CTA -->
      <div class="flex flex-col items-center text-center">
        <h2
          class="mx-auto max-w-185.5 font-sf text-[64px] font-medium leading-18 tracking-[0.01em]"
        >
          <span class="text-[#9FE870]">lms.uz</span>{{ $t('footer.ctaTitleSuffix') }}
        </h2>
        <p
          class="mx-auto mt-6 max-w-185.5 font-sf text-[20px] font-normal leading-7 tracking-[0.02em] text-[#D2D2D2]"
        >
          {{ $t('footer.ctaDesc') }}
        </p>

        <button
          type="button"
          class="mt-8 inline-flex h-12.5 w-58.5 items-center justify-center gap-2 rounded-[100px] bg-[#9FE870] px-6 py-3.5 font-sf text-[16px] font-medium text-black shadow-[0px_8px_48px_0px_#9FE8704D] transition-colors hover:bg-[#aef07e]"
          @click="openDemoModal"
        >
          {{ $t('common.demo') }}
          <svg
            class="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <!-- Logo + link columns -->
      <div
        class="mt-20 flex flex-col gap-12 border-b border-white/10 pb-9 lg:flex-row lg:justify-between lg:gap-4"
      >
        <!-- Logo + tagline -->
        <div class="max-w-114.25">
          <a href="#home" class="flex items-center gap-2">
            <img :src="logoMark" alt="" class="h-5.5 w-auto" />
            <img :src="logoWordmark" alt="lms.uz" class="h-4.25 w-auto" />
          </a>
          <p
            class="mt-4 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#A4A4A4]"
          >
            {{ $t('footer.taglineLine1') }}<br />
            {{ $t('footer.taglineLine2') }}
          </p>
        </div>

        <!-- Columns -->
        <div class="flex flex-wrap gap-x-16 gap-y-10">
          <!-- Platforma -->
          <nav class="flex w-51.25 flex-col gap-6">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              {{ $t('footer.colPlatforma') }}
            </p>
            <a
              v-for="link in platforma"
              :key="link.href"
              :href="link.href"
              class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#A4A4A4] transition-colors hover:text-white"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- Imkoniyatlar -->
          <nav class="flex w-51.25 flex-col gap-6">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              {{ $t('footer.colImkoniyatlar') }}
            </p>
            <a
              v-for="link in imkoniyatlar"
              :key="link.href"
              :href="link.href"
              class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#A4A4A4] transition-colors hover:text-white"
            >
              {{ link.label }}
            </a>
          </nav>

          <!-- Bog'lanish -->
          <div class="flex w-51.25 flex-col gap-6">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              {{ $t('footer.colContact') }}
            </p>
            <a
              :href="`tel:${phone.replace(/[\s+]/g, '')}`"
              class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#9FE870]"
            >
              {{ phone }}
            </a>
            <a
              :href="`mailto:${email}`"
              class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#A4A4A4] transition-colors hover:text-white"
            >
              {{ email }}
            </a>

            <!-- Social icons — only enabled ones link out; the rest are disabled -->
            <div class="flex items-center gap-4">
              <template v-for="social in socials" :key="social.label">
                <a
                  v-if="!social.disabled"
                  :href="social.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="social.label"
                  class="inline-flex transition-opacity hover:opacity-80"
                >
                  <img :src="social.icon" :alt="social.label" class="h-5 w-5" />
                </a>
                <span
                  v-else
                  :aria-label="social.label"
                  aria-disabled="true"
                  class="inline-flex cursor-not-allowed opacity-40"
                >
                  <img :src="social.icon" :alt="social.label" class="h-5 w-5" />
                </span>
              </template>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <p
        class="mt-9 text-center font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-white/55"
      >
        {{ $t('footer.copyright') }}
      </p>
    </div>
  </footer>
</template>
