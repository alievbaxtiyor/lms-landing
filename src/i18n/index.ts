import { createI18n } from 'vue-i18n'

// Each component ships its own message file under ./messages/<namespace>.ts,
// exporting { uz, ru, en }. They're auto-merged here under their namespace, so
// adding a new component's translations needs no edits to this file.
const modules = import.meta.glob('./messages/*.ts', { eager: true }) as Record<
  string,
  { default: Record<string, Record<string, unknown>> }
>

export const LOCALES = ['uz', 'ru', 'en'] as const
export type Locale = (typeof LOCALES)[number]

const messages: Record<Locale, Record<string, unknown>> = { uz: {}, ru: {}, en: {} }
for (const [path, mod] of Object.entries(modules)) {
  const ns = (path.split('/').pop() ?? '').replace(/\.ts$/, '')
  for (const locale of LOCALES) {
    messages[locale][ns] = mod.default[locale] ?? {}
  }
}

function readStored(): Locale {
  try {
    const v = localStorage.getItem('locale')
    if (v && (LOCALES as readonly string[]).includes(v)) return v as Locale
  } catch {
    /* localStorage may be unavailable */
  }
  return 'uz'
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: readStored(),
  fallbackLocale: 'uz',
  messages: messages as Record<string, never>,
})

export function setLocale(locale: Locale) {
  ;(i18n.global.locale as unknown as { value: string }).value = locale
  try {
    localStorage.setItem('locale', locale)
  } catch {
    /* ignore */
  }
  document.documentElement.lang = locale
}

document.documentElement.lang = readStored()
