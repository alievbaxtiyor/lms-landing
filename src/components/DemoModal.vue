<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDemoModal } from '../composables/useDemoModal'
import dashboardIcon from '../assets/icons/dashboard.svg'

const { t } = useI18n()
const { showModal, closeDemoModal } = useDemoModal()

const form = reactive({ name: '', phone: '', org: '' })
const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle')

const submitLabel = computed(() =>
  status.value === 'sending' ? t('hero.modal.sending') : t('hero.modal.submit'),
)

const inputClass =
  'w-full rounded-full border border-[#4A4A4A] bg-[#333333] px-4 py-3.5 font-sf text-[14px] font-medium leading-4.5 tracking-[0.02em] text-white outline-none transition-colors placeholder:text-[#777777] focus:bg-[#4A4A4A]'

// Reset to a clean state each time the modal opens.
watch(showModal, (open) => {
  if (open) status.value = 'idle'
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
    window.setTimeout(closeDemoModal, 1800)
  } catch {
    status.value = 'error'
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') closeDemoModal()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
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

            <button
              type="submit"
              :disabled="status === 'sending'"
              class="flex h-12.5 w-full items-center justify-center rounded-full bg-[#9FE870] px-6 py-3.5 text-[16px] font-medium leading-5.5 tracking-[0.02em] text-[#0B0E04] transition-colors hover:bg-[#aef07e] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {{ submitLabel }}
            </button>
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
