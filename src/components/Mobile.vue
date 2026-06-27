<script setup lang="ts">
import mobileImg from '../assets/images/mobile.png'
import user1 from '../assets/images/user1.png'
import user2 from '../assets/images/user2.png'
import user3 from '../assets/images/user3.png'
import qrIcon from '../assets/icons/qr.svg'
import appleIcon from '../assets/icons/apple.svg'
import googlePlayIcon from '../assets/icons/google-play.svg'
import starIcon from '../assets/icons/mobile-star.svg'
import bookIcon from '../assets/icons/book.svg'

const badge = 'rounded-full bg-[#FFFFFFA3] shadow-[0_6px_24px_rgba(0,0,0,0.10)] backdrop-blur-sm'
</script>

<template>
  <section class="overflow-x-clip text-[#0B0E04]">
    <div class="mx-auto max-w-330 px-8 py-20">
      <div class="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <!-- Left column -->
        <div class="w-full shrink-0 lg:max-w-138">
          <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
            Barcha foydalanuvchilar uchun qulay mobil ilova
          </h2>
          <p class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]">
            To'liq oflayn kursli, sinf darajasidagi push xabarnomali va mintaqadagi past traffik
            tarmoqlar uchun moslashtirilgan native iOS hamda Android ilovalari.
          </p>

          <!-- QR card -->
          <div
            class="mt-8 flex h-43.25 w-90.75 max-w-full items-center justify-between gap-6 rounded-[20px] bg-[#FFFFFFA3] p-4"
          >
            <span
              class="self-end font-sf text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              Yuklash uchun skanerlang
            </span>
            <img :src="qrIcon" alt="QR" class="h-32.25 w-32.25 shrink-0" />
          </div>

          <!-- Store cards -->
          <div class="mt-4 flex gap-4">
            <div
              class="flex h-43.25 w-43.25 flex-col items-start justify-between rounded-[20px] bg-[#FFFFFFA3] p-4"
            >
              <img :src="appleIcon" alt="" class="h-8 w-auto" />
              <span class="font-sf text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04]">
                AppStore
              </span>
            </div>
            <div
              class="flex h-43.25 w-43.25 flex-col items-start justify-between rounded-[20px] bg-[#FFFFFFA3] p-4"
            >
              <img :src="googlePlayIcon" alt="" class="h-8 w-8" />
              <span class="font-sf text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04]">
                Google Play
              </span>
            </div>
          </div>
        </div>

        <!-- Phone mockup + floating badges -->
        <div class="relative hidden shrink-0 lg:block" style="width: 757px; height: 846px">
          <img :src="mobileImg" alt="" class="h-full w-auto" />

          <!-- users badge -->
          <div
            class="absolute flex items-center gap-2 py-2 pr-4 pl-2"
            :class="badge"
            style="top: 170px; left: 341px"
          >
            <div class="flex -space-x-2">
              <img :src="user1" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
              <img :src="user2" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
              <img :src="user3" alt="" class="h-10 w-10 rounded-full border-2 border-white object-cover" />
            </div>
            <div>
              <p class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]">
                4 244+
              </p>
              <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#4A4A4A]">
                foydalanuvchilar
              </p>
            </div>
          </div>

          <!-- star / rating badge -->
          <div
            class="absolute flex items-center gap-1 py-3 pr-4 pl-3"
            :class="badge"
            style="top: 307px; left: 71px"
          >
            <img :src="starIcon" alt="" class="h-5 w-5" />
            <span class="font-sf text-[16px] font-medium leading-none text-[#0B0E04]">4.8</span>
          </div>

          <!-- book badge -->
          <div
            class="absolute flex h-14 w-14 items-center justify-center p-3"
            :class="badge"
            style="top: 445px; left: 510px"
          >
            <img :src="bookIcon" alt="" class="h-7 w-7" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
