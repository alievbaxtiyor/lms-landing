<template>
  <section class="cta" id="cta" data-screen-label="10 CTA">
    <div class="container cta__inner">
      <div class="section-eyebrow">— Demo so'rash</div>
      <h2 class="cta__title">LMS haqida konsultatsiya</h2>
      <p class="cta__sub">
        Yechimlar jamoamiz bilan 45 daqiqalik tanishuv. Muassasangiz hajmiga
        mos namuna ma'lumotlarni olib kelamiz — slayd taqdimoti emas.
      </p>

      <form
        v-if="status !== 'success'"
        class="cta__form"
        @submit.prevent="handleSubmit"
        novalidate
      >
        <div class="form-grid">
          <!-- Ism -->
          <div class="field" :class="{ 'has-error': errors.name }">
            <label for="cta-name">
              Ismingiz <span class="req">*</span>
            </label>
            <input
              id="cta-name"
              v-model.trim="form.name"
              type="text"
              autocomplete="name"
              placeholder="Aliyev Anvar"
              :disabled="status === 'submitting'"
              @input="errors.name = ''"
            />
            <span v-if="errors.name" class="err">{{ errors.name }}</span>
          </div>

          <!-- Telefon -->
          <div class="field" :class="{ 'has-error': errors.phone }">
            <label for="cta-phone">
              Telefon raqamingiz <span class="req">*</span>
            </label>
            <div class="phone-input">
              <span class="phone-prefix">+998</span>
              <input
                id="cta-phone"
                v-model="form.phone"
                type="tel"
                inputmode="numeric"
                autocomplete="tel-national"
                placeholder="90 123 45 67"
                maxlength="12"
                :disabled="status === 'submitting'"
                @input="onPhoneInput"
              />
            </div>
            <span v-if="errors.phone" class="err">{{ errors.phone }}</span>
          </div>

          <!-- Email -->
          <div class="field" :class="{ 'has-error': errors.email }">
            <label for="cta-email">Email</label>
            <input
              id="cta-email"
              v-model.trim="form.email"
              type="email"
              autocomplete="email"
              placeholder="rektor@universitet.uz"
              :disabled="status === 'submitting'"
              @input="errors.email = ''"
            />
            <span v-if="errors.email" class="err">{{ errors.email }}</span>
          </div>

          <!-- Tashkilot -->
          <div class="field">
            <label for="cta-org">Tashkilot nomi</label>
            <input
              id="cta-org"
              v-model.trim="form.organization"
              type="text"
              autocomplete="organization"
              placeholder="Toshkent davlat universiteti"
              :disabled="status === 'submitting'"
            />
          </div>

          <!-- Xabar (full width) -->
          <div class="field field--full">
            <label for="cta-message">Xabar yoki savol</label>
            <textarea
              id="cta-message"
              v-model.trim="form.message"
              rows="4"
              placeholder="Bizga muassasangiz haqida qisqacha yozing — talabalar soni, asosiy ehtiyojlar va h.k."
              :disabled="status === 'submitting'"
            ></textarea>
          </div>
        </div>

        <div class="cta__form-footer">
          <button
            type="submit"
            class="btn btn--solid btn--lg"
            :disabled="status === 'submitting'"
          >
            <span v-if="status === 'submitting'" class="spinner"></span>
            <span v-else>Demo so'rash</span>
            <svg
              v-if="status !== 'submitting'"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              style="margin-left: 6px"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

          <span v-if="status === 'error'" class="cta__error">
            ⚠ Yuborishda xatolik. Iltimos qayta urinib ko'ring yoki bizga
            qo'ng'iroq qiling: +998 77 013 78 04
          </span>
        </div>
      </form>

      <!-- Success banner -->
      <div v-else class="cta__success" role="status" aria-live="polite">
        <div class="cta__success-ic">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#9fe870" />
            <path
              d="M7 12.5l3.5 3.5L17 9"
              stroke="#365a1a"
              stroke-width="2.6"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div>
          <b>So'rovingiz qabul qilindi</b>
          <span>24 soat ichida siz bilan bog'lanamiz.</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID

const form = reactive({
  name: '',
  phone: '',
  email: '',
  organization: '',
  message: '',
})

const errors = reactive({
  name: '',
  phone: '',
  email: '',
})

const status = ref('idle') // 'idle' | 'submitting' | 'success' | 'error'

// Phone input: digits only, auto-format "90 123 45 67"
const onPhoneInput = () => {
  errors.phone = ''
  let digits = form.phone.replace(/\D/g, '').slice(0, 9)
  let out = ''
  if (digits.length > 0) out = digits.slice(0, 2)
  if (digits.length > 2) out += ' ' + digits.slice(2, 5)
  if (digits.length > 5) out += ' ' + digits.slice(5, 7)
  if (digits.length > 7) out += ' ' + digits.slice(7, 9)
  form.phone = out
}

const validate = () => {
  let ok = true
  errors.name = ''
  errors.phone = ''
  errors.email = ''

  if (!form.name || form.name.length < 2) {
    errors.name = 'Ismingizni kiriting'
    ok = false
  }

  const phoneDigits = form.phone.replace(/\D/g, '')
  if (phoneDigits.length !== 9) {
    errors.phone = "Telefon to'liq emas (9 raqam)"
    ok = false
  }

  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Email noto'g'ri"
    ok = false
  }

  return ok
}

const formatMessage = () => {
  const lines = [
    '<b>🎓 Yangi demo so\'rovi · LMS.uz</b>',
    '',
    `👤 <b>Ism:</b> ${escape(form.name)}`,
    `📱 <b>Telefon:</b> +998 ${escape(form.phone)}`,
  ]
  if (form.email) lines.push(`✉️ <b>Email:</b> ${escape(form.email)}`)
  if (form.organization)
    lines.push(`🏢 <b>Tashkilot:</b> ${escape(form.organization)}`)
  if (form.message) {
    lines.push('')
    lines.push(`💬 <b>Xabar:</b>`)
    lines.push(escape(form.message))
  }
  lines.push('')
  lines.push(`🕒 ${new Date().toLocaleString('uz-UZ')}`)
  return lines.join('\n')
}

// Minimal HTML escape (Telegram parse_mode=HTML supports only a few tags)
const escape = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const handleSubmit = async () => {
  if (!validate()) return
  if (!BOT_TOKEN || !CHAT_ID) {
    console.error(
      'Telegram credentials missing. Add VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID to your .env'
    )
    status.value = 'error'
    return
  }

  status.value = 'submitting'
  try {
    const res = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: formatMessage(),
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
      }
    )
    const data = await res.json()
    if (!res.ok || !data.ok) throw new Error(data.description || 'TG error')
    status.value = 'success'
  } catch (err) {
    console.error('Telegram send failed:', err)
    status.value = 'error'
  }
}
</script>

<style scoped>
.cta {
  /* keep existing .cta section spacing from styles.css */
}

.cta__inner {
  text-align: center;
}

.cta__title {
  font-size: clamp(36px, 5vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.025em;
  margin: 16px 0 20px;
  font-weight: 500;
  color: #0a0a0a;
}
.cta__sub {
  font-size: 18px;
  line-height: 1.6;
  color: #1a3a0a;
  margin: 0 auto 48px;
  max-width: 680px;
  font-weight: 400;
}

/* ============================================================
   Form
   ============================================================ */
.cta__form {
  max-width: 820px;
  margin: 0 auto;
  text-align: left;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(159, 232, 112, 0.4);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px -20px rgba(0, 0, 0, 0.15);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 24px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field--full {
  grid-column: span 2;
}

.field label {
  font-size: 14px;
  font-weight: 600;
  color: #0a0a0a;
  letter-spacing: 0.005em;
}
.field .req {
  color: #ef4444;
  font-weight: 700;
}

.field input,
.field textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #d4d4d0;
  border-radius: 12px;
  background: #fff;
  font-size: 15px;
  font-family: inherit;
  color: #0a0a0a;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  outline: none;
}
.field input::placeholder,
.field textarea::placeholder {
  color: #a8a6a0;
}
.field input:focus,
.field textarea:focus {
  border-color: #7bc950;
  box-shadow: 0 0 0 3px rgba(159, 232, 112, 0.25);
}
.field input:disabled,
.field textarea:disabled {
  background: #fafaf9;
  color: #7a7872;
  cursor: not-allowed;
}
.field textarea {
  resize: vertical;
  min-height: 96px;
  line-height: 1.5;
}

.field.has-error input,
.field.has-error textarea,
.field.has-error .phone-input {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
}
.field.has-error .phone-input input {
  border: 0;
  box-shadow: none;
}
.field .err {
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 2px;
}

/* Phone input with +998 prefix */
.phone-input {
  display: flex;
  align-items: stretch;
  border: 1.5px solid #d4d4d0;
  border-radius: 12px;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.phone-input:focus-within {
  border-color: #7bc950;
  box-shadow: 0 0 0 3px rgba(159, 232, 112, 0.25);
}
.phone-prefix {
  display: flex;
  align-items: center;
  padding: 0 12px;
  background: #fafaf9;
  border-right: 1px solid #e7e5e4;
  font-size: 15px;
  font-weight: 600;
  color: #0a0a0a;
  user-select: none;
}
.phone-input input {
  flex: 1;
  border: 0 !important;
  border-radius: 0 !important;
  background: transparent !important;
  box-shadow: none !important;
}
.phone-input input:focus {
  box-shadow: none !important;
}

/* ============================================================
   Footer (submit + error)
   ============================================================ */
.cta__form-footer {
  margin-top: 36px;
  padding-top: 32px;
  border-top: 1px solid rgba(159, 232, 112, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.cta__form-footer .btn {
  min-width: 240px;
  height: 52px;
  font-size: 16px;
  justify-content: center;
  display: inline-flex;
  align-items: center;
  font-weight: 600;
}
.cta__form-footer .btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.cta__error {
  font-size: 13px;
  color: #b91c1c;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 10px 16px;
  border-radius: 10px;
  max-width: 540px;
  text-align: center;
}

/* ============================================================
   Success banner
   ============================================================ */
.cta__success {
  max-width: 540px;
  margin: 28px auto 0;
  background: linear-gradient(135deg, #f8fdf5, #e8f7db);
  border: 1px solid #9fe870;
  border-radius: 14px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  box-shadow: 0 14px 30px -18px rgba(123, 201, 80, 0.4);
  animation: successIn 0.45s ease-out;
}
.cta__success-ic {
  flex: 0 0 auto;
  display: grid;
  place-items: center;
}
.cta__success b {
  display: block;
  font-size: 16px;
  font-weight: 700;
  color: #0a0a0a;
  margin-bottom: 2px;
}
.cta__success span {
  font-size: 13.5px;
  color: #365a1a;
}
@keyframes successIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ============================================================
   Responsive
   ============================================================ */
@media (max-width: 720px) {
  .cta__form {
    padding: 28px 20px;
    border-radius: 16px;
  }
  .form-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .field--full {
    grid-column: span 1;
  }
  .cta__title {
    font-size: 32px;
  }
  .cta__sub {
    font-size: 16px;
    margin-bottom: 36px;
  }
  .cta__form-footer {
    margin-top: 28px;
    padding-top: 24px;
  }
  .cta__form-footer .btn {
    min-width: 100%;
    width: 100%;
  }
}

/* respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .spinner,
  .cta__success {
    animation: none;
  }
}
</style>
