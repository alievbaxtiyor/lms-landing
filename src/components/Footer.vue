<script setup lang="ts">
import logoMark from '../assets/logos/logo.svg'
import logoWordmark from '../assets/logos/lms.uz.svg'
import instagramIcon from '../assets/icons/instagram.svg'
import telegramIcon from '../assets/icons/telegram.svg'
import facebookIcon from '../assets/icons/facebook.svg'
import youtubeIcon from '../assets/icons/youtube.svg'

interface FooterLink {
  label: string
  href: string
}

const platforma: FooterLink[] = [
  { label: 'Platforma imkoniyatlari', href: '#imkoniyatlar' },
  { label: 'AI yordamchisi', href: '#ai' },
  { label: 'Proktoring', href: '#proktoring' },
  { label: 'Analitika', href: '#analitika' },
]

const imkoniyatlar: FooterLink[] = [
  { label: 'Integratsiyalar', href: '#integratsiyalar' },
  { label: 'Mobil ilova', href: '#mobil' },
  { label: 'Workflows', href: '#workflows' },
]

const phone = '+998 77 013 78 04'
const email = 'info@lms.uz'

const socials = [
  { label: 'Instagram', href: '#', icon: instagramIcon },
  { label: 'Telegram', href: '#', icon: telegramIcon },
  { label: 'Facebook', href: '#', icon: facebookIcon },
  { label: 'YouTube', href: '#', icon: youtubeIcon },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-[#0B0E04] text-white">
    <!-- Green glow at the bottom -->
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 h-[60%]"
      style="background: radial-gradient(80% 100% at 50% 100%, rgba(159, 232, 112, 0.22) 0%, rgba(159, 232, 112, 0) 70%)"
    ></div>

    <div class="relative mx-auto max-w-330 px-8 py-20">
      <!-- CTA -->
      <div class="flex flex-col items-center text-center">
        <h2
          class="mx-auto max-w-185.5 font-sf text-[64px] font-medium leading-18 tracking-[0.01em]"
        >
          <span class="text-[#9FE870]">lms.uz</span> ni jonli ko’ring
        </h2>
        <p
          class="mx-auto mt-6 max-w-185.5 font-sf text-[20px] font-normal leading-7 tracking-[0.02em] text-[#D2D2D2]"
        >
          Yechimlar jamoamiz bilan 15 daqiqalik tanishuv. Muassasangiz hajmiga mos namuna
          ma'lumotlarni olib kelamiz — slayd taqdimoti emas.
        </p>

        <a
          href="#demo"
          class="mt-8 inline-flex h-12.5 w-58.5 items-center justify-center gap-2 rounded-[100px] bg-[#9FE870] px-6 py-3.5 font-sf text-[16px] font-medium text-black shadow-[0px_8px_48px_0px_#9FE8704D] transition-colors hover:bg-[#aef07e]"
        >
          Demo so'rash - bepul
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
        </a>
      </div>

      <!-- Logo + link columns -->
      <div
        class="mt-20 flex flex-col gap-12 border-b border-white/10 pb-9 lg:flex-row lg:justify-between lg:gap-4"
      >
        <!-- Logo + tagline -->
        <div class="max-w-65">
          <a href="#home" class="flex items-center gap-2">
            <img :src="logoMark" alt="" class="h-5.5 w-auto" />
            <img :src="logoWordmark" alt="lms.uz" class="h-4.25 w-auto" />
          </a>
          <p
            class="mt-4 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#A4A4A4]"
          >
            Zamonaviy ta'lim muassasalari uchun kompleks LMS platformasi
          </p>
        </div>

        <!-- Columns -->
        <div class="flex flex-wrap gap-x-16 gap-y-10">
          <!-- Platforma -->
          <nav class="flex flex-col gap-4">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              Platforma
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
          <nav class="flex flex-col gap-4">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              Imkoniyatlar
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
          <div class="flex flex-col gap-4">
            <p class="font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#E8E8E8]">
              Bog'lanish
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

            <!-- Social icons -->
            <div class="mt-1 flex items-center gap-4">
              <a
                v-for="social in socials"
                :key="social.label"
                :href="social.href"
                :aria-label="social.label"
                class="inline-flex transition-opacity hover:opacity-80"
              >
                <img :src="social.icon" :alt="social.label" class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <p
        class="mt-9 text-center font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-white/55"
      >
        © 2026 LMS.uz — Barcha huquqlar himoyalangan
      </p>
    </div>
  </footer>
</template>
