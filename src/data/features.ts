// Single source of truth for the platform features — used by both the Features
// carousel (Home) and the feature detail page. Translatable text (labels,
// descriptions, body) lives in src/i18n/messages/features.ts, keyed by slug.

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
}

const slugify = (s: string) => s.trim().toLowerCase().replace(/\s+/g, '-')

// Order matters — drives both the carousel and the detail-page sidebar.
const iconNames = [
  'face id',
  'features',
  'sync',
  'hemis',
  'ai',
  'mobile',
  'calendar',
  'globe',
  'chart',
  'repeat',
  'magic',
  'schedule',
  'dashboard',
  'exam',
  'feedback',
  'messages',
  'history',
  'money',
  'bell',
  'time add',
]

export const features: Feature[] = iconNames.map((icon) => ({
  slug: slugify(icon),
  icon: iconMap[icon] ?? '',
}))

export const getFeatureBySlug = (slug: string): Feature | undefined =>
  features.find((f) => f.slug === slug)
