import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FeatureDetail from '../views/FeatureDetail.vue'
import LegalPage from '../views/LegalPage.vue'
import { i18n } from '../i18n'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/imkoniyatlar/:slug', name: 'feature', component: FeatureDetail },
    // Mobile app legal pages (App Store / Google Play link to these).
    { path: '/privacy', name: 'privacy', component: LegalPage, props: { doc: 'privacy' } },
    { path: '/terms', name: 'terms', component: LegalPage, props: { doc: 'terms' } },
    // The old mobile app links here (paths match case-insensitively).
    { path: '/Privacyandterms', redirect: '/privacy' },
    // Google Play's data-deletion link: the privacy policy's "deleting your data" section.
    {
      path: '/delete-account',
      redirect: () => {
        const locale = (i18n.global.locale as unknown as { value: string }).value
        const lang = ['uz', 'ru', 'en'].includes(locale) ? locale : 'uz'
        return { path: '/privacy', hash: `#${lang}-11` }
      },
    },
  ],
  // Scroll to a hashed section when present, otherwise respect back/forward
  // positions and start fresh navigations at the top.
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition ?? { top: 0 }
  },
})

export default router
