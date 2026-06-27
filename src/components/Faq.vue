<script setup lang="ts">
import { ref } from 'vue'

interface QA {
  q: string
  a: string
}

// First answer is from Figma; the rest are placeholders — replace when provided.
const faqs: QA[] = [
  {
    q: "Ma'lumotlar xavfsizligi qanday ta'minlanadi?",
    a: "Ma'lumotlar shifrlangan holda saqlanadi, muntazam zaxira nusxalari olinadi va kirish huquqlari rollar bo'yicha boshqariladi. Serverlar O'zbekistonda joylashtirilishi mumkin.",
  },
  {
    q: "To'lov tizimlari bilan integratsiya bormi?",
    a: "Ha, Click, Payme, Uzcard, Humo va boshqa to'lov tizimlari bilan integratsiya mavjud.",
  },
  {
    q: 'lms.uz qanday muassasalar uchun mos?',
    a: "Universitetlar, institutlar, kollejlar va boshqa ta'lim muassasalari uchun mos keladi.",
  },
  {
    q: "Platformani o'rnatish qancha vaqt oladi?",
    a: "O'rnatish va sozlash odatda bir necha kun ichida yakunlanadi.",
  },
  {
    q: 'Narxlar qanday belgilanadi?',
    a: 'Narxlar muassasa hajmi va tanlangan imkoniyatlar to‘plamiga qarab belgilanadi.',
  },
]

const open = ref(0)
function toggle(i: number) {
  open.value = open.value === i ? -1 : i
}
</script>

<template>
  <section class="text-[#0B0E04]">
    <div class="mx-auto max-w-330 px-8 py-20">
      <div class="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
        <!-- Title -->
        <h2
          class="max-w-138 font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]"
        >
          Qaror qabul <br />
          qilishingizga yordam beradigan javoblar
        </h2>

        <!-- Accordion -->
        <div class="w-full shrink-0 space-y-3 lg:w-138">
          <div v-for="(faq, i) in faqs" :key="i" class="rounded-xl bg-white p-4">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-2.5 text-left"
              :aria-expanded="open === i"
              @click="toggle(i)"
            >
              <span class="font-sf text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04]">
                {{ faq.q }}
              </span>
              <svg
                class="h-5 w-5 shrink-0 text-[#0B0E04] transition-transform duration-200"
                :class="{ 'rotate-45': open === i }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>

            <!-- Smoothly expanding answer (grid-rows trick) -->
            <div
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="open === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
            >
              <div class="overflow-hidden">
                <p
                  class="pt-3 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]"
                >
                  {{ faq.a }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
