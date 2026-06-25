<script setup lang="ts">
import { ref } from 'vue'
import logoMark from '../assets/logos/logo.svg'
import logoWordmark from '../assets/logos/lms.uz.svg'
import translateIcon from '../assets/icons/language.svg'

interface NavLink {
  label: string
  href: string
}

const links: NavLink[] = [
  { label: 'Imkoniyatlar', href: '#imkoniyatlar' },
  { label: 'Integratsiyalar', href: '#integratsiyalar' },
  { label: 'Natijalar', href: '#natijalar' },
  { label: 'FAQ', href: '#faq' },
]

const languages = ["O'zb", 'Рус', 'Eng'] as const
type Language = (typeof languages)[number]

const currentLang = ref<Language>("O'zb")
const isLangOpen = ref(false)
const isOpen = ref(false)

const phone = '+998 77 013 78 04'

function selectLang(lang: Language) {
  currentLang.value = lang
  isLangOpen.value = false
}
</script>

<template>
  <header class="bg-[#0c0f0b] text-white">
    <nav class="mx-auto flex max-w-330 items-center justify-between px-8 py-5">
      <!-- Left: logo + links -->
      <div class="flex items-center gap-10">
        <a href="#home" class="flex items-center gap-2">
          <img :src="logoMark" alt="" class="h-5.5 w-auto" />
          <img :src="logoWordmark" alt="lms.uz" class="h-4.25 w-auto" />
        </a>

        <ul class="hidden items-center gap-8 md:flex">
          <li v-for="link in links" :key="link.href">
            <a
              :href="link.href"
              class="font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#E8E8E8] transition-colors hover:text-white"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Right: language switcher + phone -->
      <div class="hidden items-center gap-6 md:flex">
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5 font-sf text-[16px] font-normal text-[#E8E8E8] transition-colors hover:text-white"
            :aria-expanded="isLangOpen"
            @click="isLangOpen = !isLangOpen"
          >
            <img :src="translateIcon" alt="" class="h-5 w-5" />
            {{ currentLang }}
          </button>
          <ul
            v-if="isLangOpen"
            class="absolute right-0 z-10 mt-3 w-24 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 py-1 shadow-lg"
          >
            <li v-for="lang in languages" :key="lang">
              <button
                type="button"
                class="block w-full px-4 py-2 text-left font-sf text-[16px] text-slate-300 hover:bg-white/5 hover:text-white"
                :class="{ 'text-white': lang === currentLang }"
                @click="selectLang(lang)"
              >
                {{ lang }}
              </button>
            </li>
          </ul>
        </div>

        <a
          :href="`tel:${phone.replace(/[\s+]/g, '')}`"
          class="inline-flex h-12.5 w-47.75 items-center justify-center gap-2 rounded-[100px] bg-[#9FE8701A] px-6 py-3.5 font-sf text-[16px] font-medium text-[#9FE870] transition-colors hover:bg-[#9FE87033]"
        >
          {{ phone }}
        </a>
      </div>

      <!-- Mobile toggle -->
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md p-2 text-slate-300 md:hidden"
        :aria-expanded="isOpen"
        aria-label="Toggle navigation"
        @click="isOpen = !isOpen"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path
            v-if="!isOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile menu -->
    <div v-if="isOpen" class="border-t border-white/10 md:hidden">
      <ul class="space-y-1 px-6 py-4">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block rounded-md px-3 py-2 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#E8E8E8] hover:bg-white/5 hover:text-white"
            @click="isOpen = false"
          >
            {{ link.label }}
          </a>
        </li>
        <li class="flex items-center justify-between gap-4 px-3 pt-4">
          <div class="flex gap-3">
            <button
              v-for="lang in languages"
              :key="lang"
              type="button"
              class="text-sm font-medium text-slate-400 hover:text-white"
              :class="{ 'text-white': lang === currentLang }"
              @click="selectLang(lang)"
            >
              {{ lang }}
            </button>
          </div>
          <a
            :href="`tel:${phone.replace(/[\s+]/g, '')}`"
            class="inline-flex h-12.5 items-center justify-center gap-2 rounded-[100px] bg-[#9FE8701A] px-6 py-3.5 font-sf text-[16px] font-medium text-[#9FE870]"
          >
            {{ phone }}
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
