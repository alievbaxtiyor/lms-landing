// Single source of truth for the platform features — used by both the Features
// carousel (Home) and the feature detail page.

// Auto-import every feature icon as a URL, keyed by file name (no extension).
const iconModules = import.meta.glob('../assets/icons/features/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const iconMap: Record<string, string> = {}
for (const [path, url] of Object.entries(iconModules)) {
  const name = (path.split('/').pop() ?? '').replace(/\.svg$/, '')
  iconMap[name] = url
}

export interface Feature {
  slug: string
  icon: string
  label: string
  description: string
  body: string[]
}

// Per-feature descriptions (keyed by icon name). TODO: fill from Figma.
const DESCRIPTIONS: Record<string, string> = {
  'face id':
    "Face ID, Object Detection va sun'iy intellekt texnologiyalari yordamida imtihon jarayonlarini real vaqt rejimida nazorat qiling. Shaxsni tasdiqlash, qoidabuzarliklarni aniqlash va akademik halollikni ta'minlash imkonini beradi.",
  ai: "Face ID, Object Detection va sun'iy intellekt texnologiyalari yordamida imtihon jarayonlarini real vaqt rejimida nazorat qiling. Shaxsni tasdiqlash, qoidabuzarliklarni aniqlash va akademik halollikni ta'minlash imkonini beradi.",
}
const FALLBACK_DESCRIPTION =
  "Ushbu imkoniyat haqida batafsil ma'lumot tez orada qo'shiladi."

// Shared placeholder body — replace with per-feature copy from Figma later.
const DEFAULT_BODY: string[] = [
  "Platforma Zoom, Telegram, YouTube, Google Workspace, Gemini, Antiplagiat.uz va boshqa yetakchi xizmatlar bilan integratsiyalashgan bo'lib, ta'lim, muloqot va boshqaruv jarayonlarini yagona raqamli ekotizimda birlashtiradi. Bu esa ma'lumot almashinuvini soddalashtiradi, ish jarayonlarini avtomatlashtiradi va foydalanuvchilarga tanish vositalar bilan samarali ishlash imkonini beradi.",
  "Keng ko'lamli integratsiyalar yordamida platforma mavjud ta'lim tizimlari, kommunikatsiya vositalari va sun'iy intellekt xizmatlari bilan uzluksiz ishlaydi. Bu ma'lumotlarni qo'lda ko'chirish zaruratini kamaytiradi, jarayonlarni tezlashtiradi va barcha muhim xizmatlarni yagona boshqaruv muhitida birlashtiradi.",
  "Ta'lim jarayonlarini yanada samarali boshqarish uchun platforma mashhur ta'lim, kommunikatsiya va AI xizmatlari bilan chuqur integratsiyalashgan. Natijada barcha vositalar yagona ekotizimda ishlaydi, ma'lumotlar avtomatik almashiladi va foydalanuvchilar uchun uzluksiz raqamli tajriba yaratiladi.",
  "Kengaytirilgan integratsiya imkoniyatlari platformani mavjud infratuzilmangizning ajralmas qismiga aylantiradi. Video konferensiyalar, messenjerlar, sun'iy intellekt xizmatlari va tashqi tizimlar bilan ishlash orqali barcha jarayonlar yagona boshqaruv markazida jamlanadi.",
]

const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-')

export const features: Feature[] = [
  { icon: 'face id', label: 'Face ID va AI nazorati bilan xavfsiz imtihonlar' },
  { icon: 'features', label: "Kiberxavfsizlik bosqichidan o'tgan platforma" },
  { icon: 'sync', label: 'HEMIS bilan real vaqt rejimida sinxronizatsiya' },
  { icon: 'hemis', label: 'Baholarni HEMIS tizimiga avtomatik uzatish' },
  { icon: 'ai', label: "Mashhur ta'lim va AI xizmatlari bilan integratsiya" },
  { icon: 'mobile', label: 'Barcha imkoniyatlarga ega mobil ilova' },
  { icon: 'calendar', label: 'QR-kod va Face ID orqali aqlli davomat' },
  { icon: 'globe', label: 'Global standartlarga mos kurs konstruktori' },
  { icon: 'chart', label: 'Chuqur analitika va kengaytirilgan hisobotlar' },
  { icon: 'repeat', label: "Qayta o'qish jarayonlarini avtomatlashtirish" },
  { icon: 'magic', label: 'AI yordamida baholash, tekshirish va kontent yaratish' },
  { icon: 'schedule', label: 'Moslashuvchan va dinamik dars jadvali' },
  { icon: 'dashboard', label: "Talabalar uchun zamonaviy o'quv platformasi" },
  { icon: 'exam', label: 'Nazorat va imtihonlarni moslashuvchan boshqarish' },
  { icon: 'feedback', label: "So'rovnomalar va fikr-mulohazalarni yig'ish" },
  { icon: 'messages', label: "Talabalar va o'qituvchilar uchun yagona chat" },
  { icon: 'history', label: 'Har bir harakatni qayd etuvchi audit loglar' },
  { icon: 'money', label: "Kontrakt va to'lovlarni nazorat qilish" },
  { icon: 'bell', label: 'Aqlli va maqsadli bildirishnomalar' },
  { icon: 'time add', label: "Kunduzgi, masofaviy va sirtqi ta'limni birlashtirish" },
].map((f) => ({
  slug: slugify(f.icon),
  label: f.label,
  icon: iconMap[f.icon] ?? '',
  description: DESCRIPTIONS[f.icon] ?? FALLBACK_DESCRIPTION,
  body: DEFAULT_BODY,
}))

export const getFeatureBySlug = (slug: string): Feature | undefined =>
  features.find((f) => f.slug === slug)
