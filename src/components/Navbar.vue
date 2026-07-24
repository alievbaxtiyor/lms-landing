<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { setLocale, type Locale } from '../i18n'
import logoMark from '../assets/logos/logo.svg'
import logoWordmark from '../assets/logos/lms.uz.svg'
import translateIcon from '../assets/icons/language.svg'

const { t, locale } = useI18n()

interface NavLink {
  key: string
  to: string
}

// Hash targets resolve to the matching section id on the home page (and work
// from other routes too — the router navigates home then scrolls to it).
const links: NavLink[] = [
  { key: 'nav.features', to: '/#imkoniyatlar' },
  { key: 'nav.integrations', to: '/#integratsiyalar' },
  { key: 'nav.results', to: '/#natijalar' },
  { key: 'nav.faq', to: '/#faq' },
]

const languages: { code: Locale; label: string }[] = [
  { code: 'uz', label: "O'zb" },
  { code: 'ru', label: 'Рус' },
  { code: 'en', label: 'Eng' },
]

const isLangOpen = ref(false)
const isOpen = ref(false)
const langWrap = ref<HTMLElement | null>(null)

const currentLangLabel = computed(
  () => languages.find((l) => l.code === locale.value)?.label ?? "O'zb",
)
const phone = computed(() => t('common.phone'))

function selectLang(code: Locale) {
  setLocale(code)
  isLangOpen.value = false
}

// Close the dropdown on any scroll or on a click/tap outside of it, so it never
// stays stuck open after the user scrolls away and comes back.
function onOutsideInteract(e: Event) {
  if (e.type === 'scroll') {
    isLangOpen.value = false
    return
  }
  if (langWrap.value && !langWrap.value.contains(e.target as Node)) {
    isLangOpen.value = false
  }
}

watch(isLangOpen, (open) => {
  if (open) {
    window.addEventListener('scroll', onOutsideInteract, true)
    document.addEventListener('click', onOutsideInteract, true)
  } else {
    window.removeEventListener('scroll', onOutsideInteract, true)
    document.removeEventListener('click', onOutsideInteract, true)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onOutsideInteract, true)
  document.removeEventListener('click', onOutsideInteract, true)
})
</script>

<template>
  <header class="bg-black text-white">
    <nav class="mx-auto flex max-w-296 items-center justify-between px-5 md:px-8 py-4 md:py-5">
      <!-- Left: logo + links -->
      <div class="flex items-center gap-10">
        <RouterLink to="/" class="flex items-center gap-2">
          <img :src="logoMark" alt="" class="h-5.5 w-auto" />
          <img :src="logoWordmark" alt="lms.uz" class="h-4.25 w-auto" />
        </RouterLink>

        <ul class="hidden items-center gap-8 md:flex">
          <li v-for="link in links" :key="link.to">
            <RouterLink
              :to="link.to"
              class="font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#E8E8E8] transition-colors hover:text-white"
            >
              {{ $t(link.key) }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Right: language switcher + phone -->
      <div class="hidden items-center gap-6 md:flex">
        <div ref="langWrap" class="relative">
          <button
            type="button"
            class="flex items-center gap-1.5 font-sf text-[16px] font-normal text-[#E8E8E8] transition-colors hover:text-white"
            :aria-expanded="isLangOpen"
            @click="isLangOpen = !isLangOpen"
          >
            <img :src="translateIcon" alt="" class="h-5 w-5" />
            {{ currentLangLabel }}
          </button>
          <ul
            v-if="isLangOpen"
            class="absolute right-0 z-10 mt-3 w-24 overflow-hidden rounded-lg border border-white/10 bg-zinc-900 py-1 shadow-lg"
          >
            <li v-for="lang in languages" :key="lang.code">
              <button
                type="button"
                class="block w-full px-4 py-2 text-left font-sf text-[16px] text-slate-300 hover:bg-white/5 hover:text-white"
                :class="{ 'text-white': lang.code === locale }"
                @click="selectLang(lang.code)"
              >
                {{ lang.label }}
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

        <!-- Contact via Telegram (sales) -->
        <a
          href="https://t.me/lms_uz_sales"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          title="Telegram: @lms_uz_sales"
          class="inline-flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full bg-[#9FE8701A] text-[#9FE870] transition-colors hover:bg-[#9FE87033]"
        >
          <svg class="h-5.5 w-5.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM6.89 11.17L6.903 11.163L7.773 14.033C7.885 14.344 8.039 14.4 8.226 14.374C8.414 14.349 8.513 14.248 8.636 14.13L9.824 12.982L12.374 14.87C12.84 15.127 13.175 14.994 13.291 14.438L14.948 6.616C15.131 5.888 14.811 5.596 14.246 5.828L4.513 9.588C3.849 9.854 3.853 10.226 4.393 10.391L6.89 11.171V11.17Z" />
          </svg>
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
        <li v-for="link in links" :key="link.to">
          <RouterLink
            :to="link.to"
            class="block rounded-md px-3 py-2 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#E8E8E8] hover:bg-white/5 hover:text-white"
            @click="isOpen = false"
          >
            {{ $t(link.key) }}
          </RouterLink>
        </li>
        <li class="flex items-center justify-between gap-4 px-3 pt-4">
          <div class="flex gap-3">
            <button
              v-for="lang in languages"
              :key="lang.code"
              type="button"
              class="text-sm font-medium text-slate-400 hover:text-white"
              :class="{ 'text-white': lang.code === locale }"
              @click="selectLang(lang.code)"
            >
              {{ lang.label }}
            </button>
          </div>
          <div class="flex items-center gap-2">
            <a
              :href="`tel:${phone.replace(/[\s+]/g, '')}`"
              class="inline-flex h-12.5 items-center justify-center gap-2 rounded-[100px] bg-[#9FE8701A] px-6 py-3.5 font-sf text-[16px] font-medium text-[#9FE870]"
            >
              {{ phone }}
            </a>
            <a
              href="https://t.me/lms_uz_sales"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              class="inline-flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full bg-[#9FE8701A] text-[#9FE870]"
            >
              <svg class="h-5.5 w-5.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM6.89 11.17L6.903 11.163L7.773 14.033C7.885 14.344 8.039 14.4 8.226 14.374C8.414 14.349 8.513 14.248 8.636 14.13L9.824 12.982L12.374 14.87C12.84 15.127 13.175 14.994 13.291 14.438L14.948 6.616C15.131 5.888 14.811 5.596 14.246 5.828L4.513 9.588C3.849 9.854 3.853 10.226 4.393 10.391L6.89 11.171V11.17Z" />
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </header>
</template>
