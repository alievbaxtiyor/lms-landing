<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDemoModal } from '../composables/useDemoModal'
import dashboardIcon from '../assets/icons/dashboard.svg'

const { t } = useI18n()
const { showModal, closeDemoModal } = useDemoModal()

const form = reactive({ name: '', phone: '', org: '', isStudent: null as boolean | null })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const submitLabel = computed(() =>
  status.value === 'sending' ? t('hero.modal.sending') : t('hero.modal.submit'),
)

const inputClass =
  'w-full rounded-full border border-[#4A4A4A] bg-[#333333] px-4 py-3.5 font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-white outline-none transition-colors placeholder:text-[#777777] focus:bg-[#4A4A4A]'

// Any scroll gesture dismisses the modal (its Transition plays the leave anim).
function closeOnScroll() {
  closeDemoModal()
}

// Reset to a clean state each time the modal opens, and wire up the
// scroll-to-close listeners only while the modal is actually visible.
watch(showModal, (open) => {
  if (open) {
    status.value = 'idle'
    window.addEventListener('wheel', closeOnScroll, { passive: true })
    window.addEventListener('touchmove', closeOnScroll, { passive: true })
  } else {
    window.removeEventListener('wheel', closeOnScroll)
    window.removeEventListener('touchmove', closeOnScroll)
  }
})

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
    (org ? `\n🏢 Tashkilot: ${org}` : '') +
    (form.isStudent !== null ? `\n🎓 Talaba: ${form.isStudent ? 'Ha' : "Yo'q"}` : '')

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
    form.isStudent = null
    window.setTimeout(closeDemoModal, 1800)
  } catch {
    status.value = 'error'
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeDemoModal()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('wheel', closeOnScroll)
  window.removeEventListener('touchmove', closeOnScroll)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="demo-modal">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-4"
        @click.self="closeDemoModal"
      >
        <div
          class="demo-modal__panel relative isolate flex w-105 max-w-full flex-col gap-6 overflow-hidden rounded-4xl p-8 font-sf"
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
              :aria-label="$t('hero.modal.close')"
              class="flex h-10.5 w-10.5 items-center justify-center self-end rounded-full bg-[#FFFFFF1A] p-2.75 text-[#BBBBBB] transition-colors hover:bg-[#FFFFFF26] hover:text-white"
              @click="closeDemoModal"
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
              {{ $t('hero.modal.title') }}
            </h2>
          </div>

          <!-- Form -->
          <form class="flex flex-col gap-6" @submit.prevent="submitDemo">
            <div class="flex flex-col gap-1.5">
              <label for="demo-name" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                {{ $t('hero.modal.name.label') }}
              </label>
              <input
                id="demo-name"
                v-model="form.name"
                type="text"
                :placeholder="$t('hero.modal.name.placeholder')"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="demo-phone" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                {{ $t('hero.modal.phone.label') }}
              </label>
              <input
                id="demo-phone"
                :value="form.phone"
                type="tel"
                inputmode="numeric"
                :placeholder="$t('hero.modal.phone.placeholder')"
                :class="inputClass"
                @input="formatPhone"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label for="demo-org" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                {{ $t('hero.modal.org.label') }}
              </label>
              <input
                id="demo-org"
                v-model="form.org"
                type="text"
                :placeholder="$t('hero.modal.org.placeholder')"
                :class="inputClass"
              />
            </div>

            <div class="flex flex-col gap-1.5" role="radiogroup" aria-labelledby="demo-student">
              <span id="demo-student" class="text-[14px] font-medium leading-4.5 tracking-[0.02em] text-[#BBBBBB]">
                {{ $t('hero.modal.student.label') }}
              </span>
              <div class="flex gap-3">
                <button
                  v-for="opt in [true, false]"
                  :key="String(opt)"
                  type="button"
                  role="radio"
                  :aria-checked="form.isStudent === opt"
                  class="flex-1 rounded-full border px-4 py-3.5 text-[14px] font-medium leading-4.5 tracking-[0.02em] transition-colors"
                  :class="
                    form.isStudent === opt
                      ? 'border-[#9FE870] bg-[#9FE8701A] text-[#9FE870]'
                      : 'border-[#4A4A4A] bg-[#333333] text-white hover:bg-[#4A4A4A]'
                  "
                  @click="form.isStudent = opt"
                >
                  {{ $t(opt ? 'hero.modal.student.yes' : 'hero.modal.student.no') }}
                </button>
              </div>
            </div>

            <p
              v-if="status === 'success'"
              class="text-center text-[12px] font-medium leading-none tracking-[0.02em] text-[#9FE870]"
            >
              {{ $t('hero.modal.success') }}
            </p>
            <p
              v-else-if="status === 'error'"
              class="text-center text-[12px] font-medium leading-none tracking-[0.02em] text-[#FB3748]"
            >
              {{ $t('hero.modal.error') }}
            </p>
            <p
              v-else
              class="text-center text-[12px] font-normal leading-none tracking-[0.02em] text-[#777777]"
            >
              {{ $t('hero.modal.consent') }}
            </p>

            <div class="flex items-center gap-3">
              <button
                type="submit"
                :disabled="status === 'sending'"
                class="flex h-12.5 flex-1 items-center justify-center rounded-full bg-[#9FE870] px-6 py-3.5 text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04] transition-colors hover:bg-[#aef07e] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{ submitLabel }}
              </button>

              <!-- Contact via Telegram (sales) -->
              <a
                href="https://t.me/lms_uz_sales"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                title="Telegram: @lms_uz_sales"
                class="flex h-12.5 w-12.5 shrink-0 items-center justify-center rounded-full bg-[#9FE8701A] text-[#9FE870] transition-colors hover:bg-[#9FE87033]"
              >
                <svg class="h-5.5 w-5.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM6.89 11.17L6.903 11.163L7.773 14.033C7.885 14.344 8.039 14.4 8.226 14.374C8.414 14.349 8.513 14.248 8.636 14.13L9.824 12.982L12.374 14.87C12.84 15.127 13.175 14.994 13.291 14.438L14.948 6.616C15.131 5.888 14.811 5.596 14.246 5.828L4.513 9.588C3.849 9.854 3.853 10.226 4.393 10.391L6.89 11.171V11.17Z" />
                </svg>
              </a>
            </div>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fades; the panel scales + lifts in for a smooth "pop" open. */
.demo-modal-enter-active,
.demo-modal-leave-active {
  transition: opacity 0.25s ease;
}
.demo-modal-enter-from,
.demo-modal-leave-to {
  opacity: 0;
}
.demo-modal-enter-active .demo-modal__panel,
.demo-modal-leave-active .demo-modal__panel {
  transition:
    transform 0.32s cubic-bezier(0.34, 1.4, 0.5, 1),
    opacity 0.28s ease;
}
.demo-modal-enter-from .demo-modal__panel,
.demo-modal-leave-to .demo-modal__panel {
  opacity: 0;
  transform: scale(0.92) translateY(16px);
}
@media (prefers-reduced-motion: reduce) {
  .demo-modal-enter-active .demo-modal__panel,
  .demo-modal-leave-active .demo-modal__panel {
    transition: none;
  }
  .demo-modal-enter-from .demo-modal__panel,
  .demo-modal-leave-to .demo-modal__panel {
    transform: none;
  }
}
</style>
