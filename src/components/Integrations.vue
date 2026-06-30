<script setup lang="ts">
// Integrations — bento grid (4 cols x 2 rows, 268px cells, 16px gap):
//   row 1: [big horizontal (2)] [small] [vertical (rows 1-2)]
//   row 2: [small]              [big horizontal (2)]  ^continues
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import hemisIcon from '../assets/icons/integration/hemis.svg'
import clockIcon from '../assets/icons/integration/clock.svg'
import starIcon from '../assets/icons/integration/star.svg'
import zoomIcon from '../assets/icons/integration/zoom.svg'
import zoomCameraIcon from '../assets/icons/integration/zoom-camera.svg'
import smsIcon from '../assets/icons/integration/sms.svg'
import clickIcon from '../assets/icons/integration/click.svg'
import paymeIcon from '../assets/icons/integration/payme.svg'
import uzcardIcon from '../assets/icons/integration/uzcard.svg'
import humoIcon from '../assets/icons/integration/humo.svg'
import ebscoIcon from '../assets/icons/integration/ebsco.svg'
import springerIcon from '../assets/icons/integration/springer.svg'
import jstorIcon from '../assets/icons/integration/jstor.svg'
import ziyonetIcon from '../assets/icons/integration/ziyonet.svg'
import listImg from '../assets/icons/integration/list.svg'
import cornerIcon from '../assets/icons/integration/corner.svg'
import checkIcon from '../assets/icons/integration/check.svg'
import cancelIcon from '../assets/icons/integration/cancel.svg'
import artificialImg from '../assets/images/books/artificial.png'
import discoverImg from '../assets/images/books/discover.png'
import yellowbookImg from '../assets/images/books/yellowbook.png'
import surgeryImg from '../assets/images/books/surgery.png'
import bmcImg from '../assets/images/books/bmc.png'
import logoMark from '../assets/logos/logo.svg'

const { t } = useI18n()

// Card 1 — "HEMIS sinxronizatsiyasi" radar. Coordinates are absolute px within
// the 552x268 card; the radar rings are concentric, centred at (432, 132).
const RADAR = { cx: 432, cy: 132 }
const radarRings = [232, 170, 110, 52] // diameters, outer -> inner

// Floating labels — CENTER coords (cx,cy) in the 552x268 card.
const radarPills = computed(() => [
  { label: t('integrations.pillStudents'), cx: 446, cy: 51 },
  { label: t('integrations.pillGrades'), cx: 463, cy: 92 },
  { label: t('integrations.pillCurriculum'), cx: 326, cy: 114 },
  { label: t('integrations.pillAttendance'), cx: 374, cy: 148 },
  { label: t('integrations.pillGroups'), cx: 445, cy: 171 },
])

// Card 4 — "To'lov tizimlari". Each logo sits in a tilted white badge (left/top
// of the 68x68 badge + Figma angle). The logo's own rotation is baked into its
// svg, so only the badge is rotated here; the logo is centred and left upright.
const payments = [
  { src: paymeIcon, alt: 'Payme', left: 67, top: 25, rotate: -14.25, w: 50, h: 28 },
  { src: uzcardIcon, alt: 'Uzcard', left: 128, top: 25, rotate: 4.49, w: 35, h: 35 },
  { src: humoIcon, alt: 'Humo', left: 165, top: 46, rotate: 23.12, w: 48, h: 48 },
]

// Card 5 — "E-kutubxona". Tilted logo badges (logo tilt baked in svg, only the
// badge rotated via CSS) + an overlapping stack of book covers (back -> front).
// lw/lh = logo svg canvas size; rotate = CSS clockwise (= -Figma angle).
const libraries = [
  { src: ebscoIcon, alt: 'EBSCO', left: 59, top: 33, w: 90, h: 64, lw: 64, lh: 45, rotate: -13.37 },
  { src: springerIcon, alt: 'Springer', left: 198, top: 48, w: 114, h: 58, lw: 86, lh: 45, rotate: 13.9 },
  { src: jstorIcon, alt: 'JSTOR', left: 334, top: 74, w: 68, h: 80, lw: 49, lh: 57, rotate: 16.37 },
  { src: ziyonetIcon, alt: 'ZiyoNET', left: 427, top: 37, w: 91.87, h: 54.14, lw: 64, lh: 36, rotate: 13.46 },
]

// Exact Figma CSS placement (position + transform: rotate about centre),
// rendered back -> front per the Figma layer order. The covers are clean
// full-bleed images, so the Figma box-shadows apply directly.
const books = [
  { src: artificialImg, left: 296, top: 171, w: 110, h: 168, rotate: -47.83, shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' },
  { src: bmcImg, left: 438, top: 86, w: 107, h: 151, rotate: 28.69, shadow: '-2px 4px 4px rgba(0, 0, 0, 0.32)' },
  { src: discoverImg, left: 334, top: 169, w: 95.36, h: 126.44, rotate: -13.48, shadow: '-1px 4px 4px rgba(0, 0, 0, 0.32)' },
  { src: yellowbookImg, left: 381, top: 105, w: 103.66, h: 156.18, rotate: -20.02, shadow: '-1px 4px 4px rgba(0, 0, 0, 0.32)' },
  { src: surgeryImg, left: 465.93, top: 129.59, w: 119, h: 160, rotate: 4.48, shadow: '-3px 4px 4px rgba(0, 0, 0, 0.32)' },
]

function bookStyle(b: (typeof books)[number]) {
  return {
    left: `${b.left}px`,
    top: `${b.top}px`,
    width: `${b.w}px`,
    height: `${b.h}px`,
    transform: `rotate(${b.rotate}deg)`,
    boxShadow: b.shadow,
  }
}
</script>

<template>
  <section id="integratsiyalar" class="text-[#0B0E04]">
    <div class="mx-auto max-w-296 px-8 py-20">
      <!-- Header -->
      <div class="max-w-185.25">
        <h2 class="font-sf text-[48px] font-semibold leading-14 tracking-[0.01em] text-[#0B0E04]">
          {{ $t('integrations.titleLine1') }}<br />
          {{ $t('integrations.titleLine2') }}
        </h2>
        <p
          class="mt-4 font-sf text-[16px] font-normal leading-5.5 tracking-[0.02em] text-[#333333]"
        >
          {{ $t('integrations.descLine1') }}<br />
          {{ $t('integrations.descLine2') }}
        </p>
      </div>

      <!-- Bento grid -->
      <div
        class="mt-16 grid auto-rows-[268px] grid-cols-[repeat(4,minmax(0,268px))] justify-start gap-4"
      >
        <!-- row 1: big horizontal — HEMIS sinxronizatsiyasi radar -->
        <div class="relative col-span-2 overflow-hidden rounded-3xl bg-[#F4F4F4]">
          <!-- Radar rings (concentric, centred at 432,132) -->
          <div
            v-for="d in radarRings"
            :key="d"
            class="absolute rounded-full border border-[#E8E8E8]"
            :style="{
              left: `${RADAR.cx - d / 2}px`,
              top: `${RADAR.cy - d / 2}px`,
              width: `${d}px`,
              height: `${d}px`,
            }"
          ></div>

          <!-- HEMIS source node: white disc + smaller logo -->
          <div
            class="absolute flex items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
            style="left: 304px; top: 23px; width: 77px; height: 77px"
          >
            <img :src="hemisIcon" alt="HEMIS" style="width: 44px" />
          </div>

          <!-- lms.uz destination node: white disc -->
          <div
            class="absolute flex flex-col items-center justify-center gap-0.5 rounded-full bg-white shadow-[0_4px_14px_rgba(0,0,0,0.05)]"
            style="left: 460px; top: 158px; width: 77px; height: 77px"
          >
            <img :src="logoMark" alt="" class="h-5.5 w-auto" />
            <span class="font-sf text-[16px] font-medium leading-none text-[#0B0E04]">lms.uz</span>
          </div>

          <!-- Clock badge -->
          <div
            class="absolute flex items-center justify-center rounded-full bg-[#FFFFFFA3] p-2"
            style="left: 380px; top: 76px; width: 32px; height: 32px"
          >
            <img :src="clockIcon" alt="" class="h-4 w-4" />
          </div>

          <!-- Star badge -->
          <div
            class="absolute flex items-center justify-center rounded-full bg-[#FFFFFFA3] p-2"
            style="left: 443px; top: 118px; width: 32px; height: 32px"
          >
            <img :src="starIcon" alt="" class="h-4 w-4" />
          </div>

          <!-- Floating labels (center-anchored) -->
          <span
            v-for="pill in radarPills"
            :key="pill.label"
            class="absolute -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-[#FFFFFFB8] px-2 py-1 font-sf text-[12px] font-medium leading-none tracking-[0.02em] whitespace-nowrap text-[#777777]"
            :style="{ left: `${pill.cx}px`, top: `${pill.cy}px` }"
          >
            {{ pill.label }}
          </span>

          <!-- Title + description -->
          <div class="absolute flex flex-col gap-1" style="left: 32px; top: 156px; width: 331px">
            <h3
              class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              {{ $t('integrations.hemisTitle') }}
            </h3>
            <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]">
              {{ $t('integrations.hemisDesc') }}
            </p>
          </div>
        </div>
        <!-- row 1: small — ZOOM -->
        <div class="relative overflow-hidden rounded-3xl bg-[#F4F4F4]">
          <!-- Zoom logo (blue circle + gradient border baked into the svg) -->
          <img
            :src="zoomIcon"
            alt="Zoom"
            class="absolute"
            style="left: 72.59px; top: 23.59px; width: 123.82px; height: 123.82px"
          />

          <!-- Camera badge (rotation + blur baked into the svg) -->
          <img
            :src="zoomCameraIcon"
            alt=""
            class="absolute"
            style="left: 30px; top: 33px; width: 30px; height: 30px"
          />

          <!-- SMS / chat badge -->
          <div
            class="absolute flex items-center justify-center rounded-full bg-[#FFFFFFA3] p-2"
            style="left: 179px; top: 99px; width: 32px; height: 32px; transform: rotate(-12.02deg)"
          >
            <img :src="smsIcon" alt="" class="h-4 w-4 object-contain" />
          </div>

          <!-- Title + description -->
          <div class="absolute flex flex-col gap-1" style="left: 32px; top: 156px; width: 204px">
            <h3
              class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              ZOOM
            </h3>
            <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]">
              {{ $t('integrations.zoomDesc') }}
            </p>
          </div>
        </div>
        <!-- col 4: big vertical (spans both rows) — Antiplag.uz (268x552) -->
        <div class="relative row-span-2 overflow-hidden rounded-3xl bg-[#F4F4F4]">
          <!-- 88% origin pill (check + label rotate with the pill) -->
          <div
            class="absolute flex items-center gap-1.5 rounded-[20px] bg-[#FFFFFFB8] px-3 py-2"
            style="left: 15px; top: 50px; transform: rotate(-14.51deg)"
          >
            <img :src="checkIcon" alt="" class="h-5 w-5" />
            <span class="font-sf text-[12px] font-medium leading-none tracking-[0.02em] text-[#1FC16B]">
              88% original
            </span>
          </div>

          <!-- Document mockup (bg, green top border, lines baked into the svg) -->
          <img
            :src="listImg"
            alt=""
            class="absolute"
            style="left: 49px; top: 132px; width: 170px; height: 230px"
          />

          <!-- Green glow band over the document (soft, edges feathered) -->
          <div
            class="pointer-events-none absolute"
            style="
              left: 24px;
              top: 256px;
              width: 220px;
              height: 54px;
              background: linear-gradient(180deg, rgba(183, 238, 148, 0) 0%, #b7ee94 50.48%, rgba(183, 238, 148, 0) 100%);
              filter: blur(20px);
            "
          ></div>

          <!-- Top corner icon (rotation + blur baked into the svg) -->
          <img
            :src="cornerIcon"
            alt=""
            class="absolute"
            style="left: 193px; top: 105px; width: 53px; height: 54px"
          />

          <!-- Bottom corner cancel badge -->
          <div
            class="absolute flex items-center justify-center rounded-full bg-[#FFFFFFA3]"
            style="left: 188px; top: 341px; width: 36px; height: 36px; transform: rotate(12.02deg)"
          >
            <img :src="cancelIcon" alt="" class="h-3 w-3" />
          </div>

          <!-- Title + description -->
          <div class="absolute flex flex-col gap-1" style="left: 32px; top: 400px; width: 204px">
            <h3
              class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              Antiplag.uz
            </h3>
            <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]">
              {{ $t('integrations.antiplagDesc') }}
            </p>
          </div>
        </div>
        <!-- row 2: small — To'lov tizimlari -->
        <div class="relative overflow-hidden rounded-3xl bg-[#F4F4F4]">
          <!-- Click logo in a white badge (logo rotates with the badge) -->
          <div
            class="absolute flex items-center justify-center rounded-[22px] bg-[#FFFFFFA3] p-4 shadow-[0px_2px_12px_0px_#0000000A]"
            style="left: 22px; top: 46px; width: 68px; height: 68px; transform: rotate(28.47deg)"
          >
            <img :src="clickIcon" alt="Click" class="h-9 w-9" />
          </div>

          <!-- Payme / Uzcard / Humo — tilted badge + centred logo (tilt baked in svg) -->
          <div
            v-for="p in payments"
            :key="p.alt"
            class="absolute"
            :style="{ left: `${p.left}px`, top: `${p.top}px`, width: '68px', height: '68px' }"
          >
            <div
              class="absolute inset-0 rounded-[22px] bg-[#FFFFFFA3] shadow-[0px_2px_12px_0px_#0000000A]"
              :style="{ transform: `rotate(${p.rotate}deg)` }"
            ></div>
            <img
              :src="p.src"
              :alt="p.alt"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :style="{ width: `${p.w}px`, height: `${p.h}px` }"
            />
          </div>

          <!-- Title + description -->
          <div class="absolute flex flex-col gap-1" style="left: 32px; top: 156px; width: 204px">
            <h3
              class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              {{ $t('integrations.paymentsTitle') }}
            </h3>
            <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]">
              {{ $t('integrations.paymentsDesc') }}
            </p>
          </div>
        </div>
        <!-- row 2: big horizontal — E-kutubxona -->
        <div class="relative col-span-2 overflow-hidden rounded-3xl bg-[#F4F4F4]">
          <!-- Book stack (rendered back -> front) -->
          <img
            v-for="(book, i) in books"
            :key="i"
            :src="book.src"
            alt=""
            class="absolute"
            :style="bookStyle(book)"
          />

          <!-- Logo badges sit on top of the books (frosted glass, tilt baked in svg) -->
          <div
            v-for="lib in libraries"
            :key="lib.alt"
            class="absolute"
            :style="{ left: `${lib.left}px`, top: `${lib.top}px`, width: `${lib.w}px`, height: `${lib.h}px` }"
          >
            <div
              class="absolute inset-0 rounded-xl bg-[#FFFFFF52] shadow-[0px_2px_12px_0px_#0000000A] backdrop-blur"
              :style="{ transform: `rotate(${lib.rotate}deg)` }"
            ></div>
            <img
              :src="lib.src"
              :alt="lib.alt"
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              :style="{ width: `${lib.lw}px`, height: `${lib.lh}px` }"
            />
          </div>

          <!-- Bottom fade: the covers dissolve into the card background -->
          <div
            class="pointer-events-none absolute inset-x-0"
            style="top: 182px; height: 86px; background: linear-gradient(180deg, rgba(244, 244, 244, 0) 0%, #f4f4f4 100%)"
          ></div>

          <!-- Title + description -->
          <div class="absolute flex flex-col gap-1" style="left: 32px; top: 174px; width: 331px">
            <h3
              class="font-sf text-[16px] font-semibold leading-5.5 tracking-[0.02em] text-[#0B0E04]"
            >
              {{ $t('integrations.libraryTitle') }}
            </h3>
            <p class="font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#606060]">
              {{ $t('integrations.libraryDesc') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
