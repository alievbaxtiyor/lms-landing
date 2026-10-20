<script setup lang="ts">
import { computed, nextTick, onMounted, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink, useRoute } from 'vue-router'
import { legalBodies, legalTitles, type LegalDoc, type LegalLocale } from '../data/legal'

// /privacy, /terms, and /Privacyandterms (the old mobile app's link) all land here.
const props = defineProps<{ doc: LegalDoc }>()

const { locale } = useI18n()
const lang = computed<LegalLocale>(() =>
  (['uz', 'ru', 'en'] as const).includes(locale.value as LegalLocale) ? (locale.value as LegalLocale) : 'uz',
)
const body = computed(() => legalBodies[props.doc][lang.value])
const tabs = computed(() =>
  (['privacy', 'terms'] as const).map((doc) => ({ doc, to: '/' + doc, label: legalTitles[doc][lang.value] })),
)

// Links like /privacy#uz-11 (and /delete-account, which redirects there): the text is rendered
// with v-html after the page transition, so jump to the section once it exists.
const route = useRoute()
onMounted(async () => {
  if (!route.hash) return
  await nextTick()
  for (let i = 0; i < 20; i++) {
    const el = document.getElementById(decodeURIComponent(route.hash.slice(1)))
    if (el) {
      el.scrollIntoView({ block: 'start' })
      return
    }
    await new Promise((r) => setTimeout(r, 50))
  }
})

watchEffect(() => {
  document.title = `${legalTitles[props.doc][lang.value]} — lms.uz`
})
</script>

<template>
  <section class="bg-white text-[#0B0E04]">
    <div class="mx-auto max-w-190 px-5 md:px-8 py-10 md:py-14">
      <nav class="flex flex-wrap gap-2" aria-label="Legal">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.doc"
          :to="tab.to"
          class="rounded-full px-4 py-2 font-sf text-[14px] font-medium tracking-[0.02em] transition-colors"
          :class="tab.doc === doc ? 'bg-[#0B0E04] text-white' : 'bg-[#F2F2F2] text-[#4A4A4A] hover:bg-[#E6E6E6]'"
        >
          {{ tab.label }}
        </RouterLink>
      </nav>

      <h1
        class="mt-8 font-sf text-[30px] leading-9 sm:text-[38px] sm:leading-11 md:text-[44px] md:leading-13 font-semibold tracking-[0.01em]"
      >
        {{ legalTitles[doc][lang] }}
      </h1>

      <!-- Trusted, static content from src/data/legal.ts (no user input). -->
      <article class="legal mt-4" v-html="body" />
    </div>
  </section>
</template>

<style scoped>
.legal {
  font-family: var(--font-sf);
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: #2b2b2b;
}
.legal :deep(.meta) { color: #777777; font-size: 14px; margin: 0 0 24px; }
.legal :deep(.lead) { font-size: 18px; color: #4a4a4a; }
.legal :deep(h2) {
  font-size: 22px;
  font-weight: 600;
  color: #0b0e04;
  margin: 40px 0 10px;
  padding-top: 24px;
  border-top: 1px solid #ececec;
  scroll-margin-top: 96px;
}
.legal :deep(p) { margin: 10px 0; }
.legal :deep(ul), .legal :deep(ol) { padding-left: 22px; margin: 10px 0; }
.legal :deep(ul) { list-style: disc; }
.legal :deep(ol) { list-style: decimal; }
.legal :deep(li) { margin: 4px 0; }
.legal :deep(b) { font-weight: 600; color: #0b0e04; }
.legal :deep(a) { color: #0b0e04; text-decoration: underline; text-decoration-color: #9fe870; text-underline-offset: 3px; text-decoration-thickness: 2px; }
.legal :deep(nav ol) { columns: 2; column-gap: 32px; color: #777777; }
@media (max-width: 560px) { .legal :deep(nav ol) { columns: 1; } }
.legal :deep(.table-wrap) { overflow-x: auto; }
.legal :deep(table) { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 15px; }
.legal :deep(th), .legal :deep(td) { text-align: left; vertical-align: top; padding: 10px 12px; border-bottom: 1px solid #ececec; }
.legal :deep(th) { background: #f6f6f6; font-weight: 600; color: #0b0e04; }
.legal :deep(.note) { background: #f3fbe9; border-radius: 14px; padding: 14px 18px; margin: 16px 0; }
.legal :deep(.todo) { background: #fff4d6; color: #7a5600; border-radius: 6px; padding: 1px 6px; font-weight: 600; }
</style>
