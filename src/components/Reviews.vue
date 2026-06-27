<script setup lang="ts">
import { ref } from 'vue'
import leftIcon from '../assets/icons/left.svg'
import rightIcon from '../assets/icons/right.svg'
import logoOXU from '../assets/logos/partners/OXU.png'
import logoASTI from '../assets/logos/partners/ASTI.png'
import logoYangiAsr from '../assets/logos/partners/YANGI_ASR.png'
import logoAIFU from '../assets/logos/partners/AIFU.png'

interface Review {
  text: string
  name: string
  org: string
  avatar: string
}

const reviews: Review[] = [
  {
    text: "Mobil ilova orqali o'quvchilar uy vazifasini o'z vaqtida topshiradi. Avtomatik baholash menga haftasiga bir necha soat vaqt qoldiradi. Tahliliy hisobotlar qaror qabul qilishni sezilarli yengillashtirdi.",
    name: 'Nilufar Yusupova',
    org: "Matematika o'qituvchisi · Osiyo xalqaro Universiteti",
    avatar: logoOXU,
  },
  {
    text: "Minglab talaba uchun jonli darslar va testlarni masshtablash juda oson kechdi. Tahliliy hisobotlar qaror qabul qilishni sezilarli yengillashtirdi. Mobil ilova orqali o'quvchilar uy vazifasini o'z vaqtida topshiradi.",
    name: 'Bekzod Rahimov',
    org: "O'quv ishlari prorektori · Texnika universiteti",
    avatar: logoASTI,
  },
  {
    text: "lms.uz bizning o'quv jarayonimizni butunlay o'zgartirdi. Endi davomat, baholash va ota-onalar bilan aloqa bitta tizimda. O'qituvchilarning vaqti tejaldi.",
    name: 'Dilnoza Karimova',
    org: 'Direktor · Yangi asr universiteti',
    avatar: logoYangiAsr,
  },
  {
    text: "Mobil ilova orqali o'quvchilar uy vazifasini o'z vaqtida topshiradi. Avtomatik baholash menga haftasiga bir necha soat vaqt qoldiradi. Tahliliy hisobotlar qaror qabul qilishni sezilarli yengillashtirdi.",
    name: 'Nilufar Yusupova',
    org: 'Direktor · Aniq va ijtimoiy fanlar universiteti',
    avatar: logoAIFU,
  },
]

const scroller = ref<HTMLElement | null>(null)
function scroll(direction: number) {
  scroller.value?.scrollBy({ left: direction * 386, behavior: 'smooth' })
}
</script>

<template>
  <section class="text-[#0B0E04]">
    <div class="mx-auto max-w-330 px-8 py-20">
      <!-- Header: title + carousel buttons -->
      <div class="flex items-end justify-between gap-6">
        <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
          Muassasa rahbarlari<br />
          qanday fikrdalar
        </h2>

        <div class="flex h-12.5 w-24 shrink-0 items-center justify-center gap-1 rounded-full bg-[#E7F9DB] p-1">
          <button
            type="button"
            aria-label="Oldingi"
            class="flex h-10.5 w-10.5 items-center justify-center rounded-full bg-[#9FE870] transition-colors hover:bg-[#8fdc60]"
            @click="scroll(-1)"
          >
            <img :src="leftIcon" alt="" class="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Keyingi"
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
        class="no-scrollbar edge-fade mt-12 flex items-stretch gap-6 overflow-x-auto pb-2"
      >
        <div
          v-for="(review, i) in reviews"
          :key="i"
          class="flex w-90.5 shrink-0 flex-col gap-4 rounded-3xl bg-[#F4F4F4A3] p-6"
        >
          <p class="font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#4A4A4A]">
            {{ review.text }}
          </p>
          <div class="mt-auto flex items-center gap-3">
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
/* Fade the start/end of the card row so they don't cut on a hard line. */
.edge-fade {
  -webkit-mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 6%, #000 94%, transparent);
}
</style>
