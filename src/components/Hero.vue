<script setup lang="ts">
// Hero section: title, hero image, university logos.
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import starsIcon from '../assets/icons/stars.svg'
import dashboardIcon from '../assets/icons/dashboard.svg'
import heroCenter from '../assets/images/hero-center.png'
import heroLeft from '../assets/images/hero-left.png'
import heroRight from '../assets/images/hero-right.png'

// ----- Demo request modal -----
const showModal = ref(false)
const form = reactive({ name: '', phone: '', org: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const inputClass =
  'w-full rounded-full border border-[#4A4A4A] bg-[#333333] px-4 py-3.5 font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-white outline-none transition-colors placeholder:text-[#777777] focus:bg-[#4A4A4A]'

function openModal() {
  status.value = 'idle'
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}

// Formats the phone field as a +998 XX XXX XX XX mask while typing.
function formatPhone(e: Event) {
  const el = e.target as HTMLInputElement
  let d = el.value.replace(/\D/g, '')
  if (d.startsWith('998')) d = d.slice(3)
  d = d.slice(0, 9)
  const groups = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)].filter(Boolean)
  const formatted = d ? `+998 ${groups.join(' ')}` : ''
  form.phone = formatted
  el.value = formatted
}

// Sends the request to the Telegram bot (one message per configured recipient).
async function submitDemo() {
  if (status.value === 'sending') return

  const name = form.name.trim()
  const org = form.org.trim()
  const phoneDigits = form.phone.replace(/\D/g, '')
  if (!name || phoneDigits.length < 12) {
    status.value = 'error'
    return
  }

  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
  const recipients = (import.meta.env.VITE_TELEGRAM_RECIPIENTS ?? '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
  if (!token || recipients.length === 0) {
    status.value = 'error'
    return
  }

  const text =
    `🆕 Yangi demo so'rovi\n\n` +
    `👤 Ism: ${name}\n` +
    `📞 Telefon: ${form.phone}` +
    (org ? `\n🏢 Tashkilot: ${org}` : '')

  status.value = 'sending'
  try {
    await Promise.all(
      recipients.map((chatId) =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text }),
        }).then((r) => {
          if (!r.ok) throw new Error('Telegram request failed')
        }),
      ),
    )
    status.value = 'success'
    form.name = ''
    form.phone = ''
    form.org = ''
    window.setTimeout(closeModal, 1800)
  } catch {
    status.value = 'error'
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeModal()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

// Auto-import every partner logo (png/jpg/svg) as a URL.
const logoModules = import.meta.glob('../assets/logos/partners/*.{png,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

// Display names keyed by file name (without extension).
const NAMES: Record<string, string> = {
  ADPI: "Andijon davlat pedagogika instituti",
  AIFU: "Aniq va ijtimoiy fanlar universiteti",
  ASTI: "Andijon davlat texnika institut",
  AUNIVER: "Angren universiteti",
  BFA: "Bank-moliya akademiyasi",
  BUI: "Buxoro innovatsiyalar universiteti",
  BXU: "Buxoro xalqaro universiteti",
  CSU: "Cyber university",
  DIPLOMAT: "Diplomat university",
  DSBA: "O'zbekiston Respublikasi Prezidenti huzuridagi Davlat siyosati va boshqaruvi akademiyasi",
  FDU: "Fargʻona davlat universiteti",
  IPU: "Iqtisodiyot va pedagogika universiteti",
  JBNUU: "Mirzo Ulug'bek nomidagi O'zbekiston Milliy universitetining Jizzax filyali",
  KOKANDSU: "Qo'qon davlat universiteti",
  KUAF: "Qo'qon universiteti Andijon filiali",
  OXU: "Osiyo xalqaro universiteti",
  RENESSANS: "RENESANS TA'LIM UNIVERSITETI",
  SILKROAD: "“Ipak yoʻli” turizm xalqaro universiteti",
  TERSU: "Termiz davlat universiteti",
  TIIAME:
    "Toshkent irrigatsiya va qishloq xo‘jaligini mexanizatsiyalash muhandislari instituti Milliy tadqiqot universiteti",
  TIME: "Toshkent menedjment va iqtisodiyot instituti",
  TSUULL: "Toshkent davlat o‘zbek tili va adabiyoti universiteti",
  TTYSI: "Toshkent toʻqimachilik va yengil sanoat instituti",
  TUES: "Termiz iqtisodiyot va servis universiteti",
  UIT: "Nukus innovatsion instituti",
  UTAS: "Toshkent Amaliy fanlar universiteti",
  YANGI_ASR: "Yangi Asr Universiteti",
}

interface Partner {
  key: string
  name: string
  url: string
}

const partners: Partner[] = Object.entries(logoModules)
  .map(([path, url]) => {
    const key = (path.split('/').pop() ?? '').replace(/\.[^.]+$/, '')
    return { key, name: NAMES[key] ?? key, url }
  })
  .sort((a, b) => a.key.localeCompare(b.key))

// First marquee row (scrolls right -> left), second row (left -> right).
const rowOne = partners.slice(0, 14)
const rowTwo = partners.slice(14)
</script>

<template>
  <section class="overflow-x-clip bg-black text-white">
    <div class="mx-auto max-w-296 px-8">
      <!-- 1. Title -->
      <div class="py-20">
        <h1
          class="mx-auto max-w-4xl text-center font-sf text-[64px] font-medium leading-18 tracking-[0.01em] text-white"
        >
          <span class="relative inline-block text-[#9FE870]">
            AI
            <svg
              class="pointer-events-none absolute left-1/2 top-1/2 h-[2em] w-[2.7em] -translate-x-1/2 -translate-y-1/2 overflow-visible"
              viewBox="0 0 200 120"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ai-orbit" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stop-color="#9FE870" stop-opacity="0" />
                  <stop offset="0.5" stop-color="#9FE870" stop-opacity="1" />
                  <stop offset="1" stop-color="#9FE870" stop-opacity="0" />
                </linearGradient>
              </defs>
              <ellipse
                cx="100"
                cy="60"
                rx="90"
                ry="30"
                stroke="url(#ai-orbit)"
                stroke-width="3"
                transform="rotate(-18 100 60)"
              />
            </svg>
          </span>
          asosidagi yagona <br />
          <span class="relative inline-block">
            <img
              :src="starsIcon"
              alt=""
              class="pointer-events-none absolute left-[-0.85em] top-[0.15em] h-[0.8em] w-[0.8em]"
            />
            LMS ekotizimi
          </span>
        </h1>

        <p
          class="mx-auto mt-6 whitespace-nowrap text-center font-sf text-[20px] font-normal leading-7 tracking-[0.02em] text-[#D2D2D2]"
        >
          Universitetlar va ta'lim tashkilotlari uchun yaratilgan AI ekotizimi. Kurslar, baholash, <br />
          analitika va proktoring jarayonlarini boshqarish imkonini beradi.
        </p>

        <div class="mt-8 flex justify-center">
          <button
            type="button"
            class="inline-flex h-12.5 w-58.5 items-center justify-center gap-2 rounded-[100px] bg-[#9FE870] px-6 py-3.5 font-sf text-[16px] font-medium text-black shadow-[0px_8px_48px_0px_#9FE8704D] transition-colors hover:bg-[#aef07e]"
            @click="openModal"
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
          </button>
        </div>
      </div>

      <!-- 2. Hero image -->
      <div class="relative flex items-end justify-center">
        <!-- green radial glow (background) -->
        <div
          class="pointer-events-none absolute left-1/2 top-[-6%] z-0 h-[90%] w-[70%] -translate-x-1/2 blur-3xl"
          style="background: radial-gradient(50% 50% at 50% 40%, rgba(159,232,112,0.30), rgba(159,232,112,0) 70%)"
        ></div>

        <!-- image group (gets the curved bottom mask via .hero-stage) -->
        <div class="hero-stage relative flex w-full items-end justify-center">
          <!-- Each panel: green border on the wrapper (AROUND the image), with a
               transparent padding gap between the image and the border. Panels
               overlap so the frames intersect at the seams. -->
          <div
            class="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-[40%] rounded-2xl border-[3px] border-primary-400/90 p-2 md:block"
          >
            <img
              :src="heroLeft"
              alt=""
              class="block aspect-5/3 w-full rounded-lg object-cover object-top brightness-50"
            />
          </div>
          <div
            class="pointer-events-none absolute bottom-0 right-0 z-0 hidden w-[40%] rounded-2xl border-[3px] border-primary-400/90 p-2 md:block"
          >
            <img
              :src="heroRight"
              alt=""
              class="block aspect-5/3 w-full rounded-lg object-cover object-top brightness-50"
            />
          </div>
          <div
            class="relative z-10 w-[48%] rounded-2xl border-[3px] border-primary-400/90 p-2 shadow-[0_0_60px_rgba(159,232,112,0.25),0_30px_60px_rgba(0,0,0,0.6)]"
          >
            <img
              :src="heroCenter"
              alt="LMS boshqaruv paneli"
              class="block aspect-video w-full rounded-lg object-cover object-top"
            />
          </div>
        </div>
      </div>

      <!-- 3. University logos (full-bleed band) -->
      <div class="relative left-1/2 w-screen -translate-x-1/2 space-y-6 py-16">
        <p
          class="text-center font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
        >
          O'zbekistondagi 20+ ta'lim muassasasi ishonadi
        </p>

        <!-- Row 1: scrolls right -> left -->
        <div class="marquee">
          <div class="marquee__track marquee__track--left">
            <div
              v-for="(p, i) in [...rowOne, ...rowOne]"
              :key="`r1-${i}-${p.key}`"
              class="mr-4 flex shrink-0 items-center gap-3"
            >
              <img :src="p.url" :alt="p.name" class="h-14 w-14 shrink-0 object-contain" />
              <span
                class="max-w-50 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
                >{{
                p.name
              }}</span>
            </div>
          </div>
        </div>

        <!-- Row 2: scrolls left -> right -->
        <div class="marquee">
          <div class="marquee__track marquee__track--right">
            <div
              v-for="(p, i) in [...rowTwo, ...rowTwo]"
              :key="`r2-${i}-${p.key}`"
              class="mr-4 flex shrink-0 items-center gap-3"
            >
              <img :src="p.url" :alt="p.name" class="h-14 w-14 shrink-0 object-contain" />
              <span
                class="max-w-50 font-sf text-[14px] font-normal leading-4.5 tracking-[0.02em] text-[#D2D2D2]"
                >{{
                p.name
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Demo request modal -->
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
        @click.self="closeModal"
      >
        <div
          class="relative isolate flex w-105 max-w-full flex-col gap-6 overflow-hidden rounded-4xl p-8 font-sf"
          style="background: #2a2a2a"
        >
          <!-- Top round highlight -->
          <div
            class="pointer-events-none absolute left-1/2 -top-72.5 -z-10 h-105 w-105 -translate-x-1/2 rounded-full"
            style="background: linear-gradient(180deg, rgba(74, 74, 74, 0) 70.03%, #4a4a4a 100%)"
          ></div>

          <!-- Header: close + logo + title -->
          <div class="flex flex-col items-center gap-4">
            <button
              type="button"
              aria-label="Yopish"
              class="flex h-10.5 w-10.5 items-center justify-center self-end rounded-full bg-[#FFFFFF1A] p-2.75 text-[#BBBBBB] transition-colors hover:bg-[#FFFFFF26] hover:text-white"
              @click="closeModal"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div
              class="flex h-15 w-15 items-center justify-center rounded-2xl p-3"
              style="background: linear-gradient(180deg, #5fc11f 0%, #9fe870 110.42%)"
            >
              <img :src="dashboardIcon" alt="" class="h-9 w-9" />
            </div>

            <h2 class="text-center text-[24px] font-semibold leading-8 tracking-[0.02em] text-white">
              Demo so'rash-bepul
            </h2>
          </div>

          <!-- Form -->
          <form class="flex flex-col gap-6" @submit.prevent="submitDemo">
            <div class="flex flex-col gap-1.5">
              <label for="demo-name" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                Ismingiz
              </label>
              <input
                id="demo-name"
                v-model="form.name"
                type="text"
                placeholder="Ismingizni yozing"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="demo-phone" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                Telefon raqamingiz
              </label>
              <input
                id="demo-phone"
                :value="form.phone"
                type="tel"
                inputmode="numeric"
                placeholder="+998"
                :class="inputClass"
                @input="formatPhone"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="demo-org" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                Tashkilot nomi
              </label>
              <input
                id="demo-org"
                v-model="form.org"
                type="text"
                placeholder="Tashkilot nomini yozing"
                :class="inputClass"
              />
            </div>

            <p
              v-if="status === 'success'"
              class="text-center text-[12px] font-medium leading-none tracking-[0.02em] text-[#9FE870]"
            >
              Rahmat! Tez orada siz bilan bog'lanamiz.
            </p>
            <p
              v-else-if="status === 'error'"
              class="text-center text-[12px] font-medium leading-none tracking-[0.02em] text-[#FB3748]"
            >
              Xatolik yuz berdi. Iltimos, ism va telefonni tekshirib qayta urinib ko'ring.
            </p>
            <p
              v-else
              class="text-center text-[12px] font-normal leading-none tracking-[0.02em] text-[#777777]"
            >
              Men ma'lumotlarimdan foydalanish shartlariga roziman
            </p>

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="flex h-12.5 w-full items-center justify-center rounded-full bg-[#9FE870] px-6 py-3.5 text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04] transition-colors hover:bg-[#aef07e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ status === 'sending' ? 'Yuborilmoqda...' : "Jo'natish" }}
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Curved bottom edge: center raised, sides curving down (Figma look). */
.hero-stage {
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20preserveAspectRatio='none'%3E%3Cpath%20d='M0,0%20L100,0%20L100,92%20Q50,76%200,92%20Z'%20fill='%23000'/%3E%3C/svg%3E");
          mask-image: url("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%20preserveAspectRatio='none'%3E%3Cpath%20d='M0,0%20L100,0%20L100,92%20Q50,76%200,92%20Z'%20fill='%23000'/%3E%3C/svg%3E");
  -webkit-mask-size: 100% 100%; mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat;
}

/* Logo marquee rows. Track holds the list twice; animating to -50% loops seamlessly. */
.marquee {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}
.marquee__track {
  display: flex;
  width: max-content;
}
.marquee__track--left {
  animation: marquee-left 60s linear infinite;
}
.marquee__track--right {
  animation: marquee-right 60s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
@keyframes marquee-left {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@keyframes marquee-right {
  from { transform: translateX(-50%); }
  to { transform: translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
