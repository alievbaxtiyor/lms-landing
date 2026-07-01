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
    <div class="mx-auto max-w-296 px-8 py-20">
      <div class="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <!-- Left column -->
        <div class="w-full shrink-0 lg:max-w-138">
          <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
            {{ $t('mobile.title') }}
          </h2>
          <p class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]">
            {{ $t('mobile.description') }}
          </p>

          <!-- Download the app: QR card + store badges -->
          <div class="mt-8 w-90.75 max-w-full">
            <!-- QR card -->
            <div
              class="flex items-center justify-between gap-5 rounded-[20px] bg-[#FFFFFFA3] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.06)] ring-1 ring-white/50 backdrop-blur-sm"
            >
              <!-- left: the area "in front of" the QR the boss wanted designed -->
              <div class="flex flex-col">
                <span
                  class="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#9FE870]/60 px-2.5 py-1 font-sf text-[12px] font-medium tracking-[0.02em] text-[#2E6B0F]"
                >
                  <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="7" y="2" width="10" height="20" rx="2.5" />
                    <path d="M11 18.5h2" />
                  </svg>
                  {{ $t('mobile.mobileTag') }}
                </span>
                <p class="mt-2.5 font-sf text-[18px] font-semibold leading-6 tracking-[0.01em] text-[#0B0E04]">
                  {{ $t('mobile.downloadTitle') }}
                </p>
                <p class="mt-1.5 max-w-40 font-sf text-[13px] font-normal leading-4.5 tracking-[0.02em] text-[#4A4A4A]">
                  {{ $t('mobile.scanHint') }}
                </p>
              </div>
              <!-- right: framed QR so it reads as intentional, not bare -->
              <div class="shrink-0 rounded-2xl bg-white p-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                <img :src="qrIcon" alt="QR" class="h-27 w-27" />
              </div>
            </div>

            <!-- Store badges (clear mobile-app signal) -->
            <div class="mt-4 flex gap-3">
              <a
                href="https://apps.apple.com/uz/app/next-lms-univer/id6755327218"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-1 items-center gap-3 rounded-2xl bg-[#FFFFFFA3] px-4 py-3.5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-white/50 backdrop-blur-sm transition-colors hover:bg-white/85"
              >
                <img :src="appleIcon" alt="" class="h-9 w-auto shrink-0" />
                <span class="flex flex-col leading-tight">
                  <span class="font-sf text-[11px] font-normal tracking-[0.02em] text-[#4A4A4A]">
                    {{ $t('mobile.getItOn') }}
                  </span>
                  <span class="font-sf text-[16px] font-semibold tracking-[0.01em] text-[#0B0E04]">
                    App Store
                  </span>
                </span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=uz.nextlmsuniver.nextlmsuniver"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-1 items-center gap-3 rounded-2xl bg-[#FFFFFFA3] px-4 py-3.5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] ring-1 ring-white/50 backdrop-blur-sm transition-colors hover:bg-white/85"
              >
                <img :src="googlePlayIcon" alt="" class="h-8 w-8 shrink-0" />
                <span class="flex flex-col leading-tight">
                  <span class="font-sf text-[11px] font-normal tracking-[0.02em] text-[#4A4A4A]">
                    {{ $t('mobile.getItOn') }}
                  </span>
                  <span class="font-sf text-[16px] font-semibold tracking-[0.01em] text-[#0B0E04]">
                    Google Play
                  </span>
                </span>
              </a>
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
                {{ $t('mobile.usersLabel') }}
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
