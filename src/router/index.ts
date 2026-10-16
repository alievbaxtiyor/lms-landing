import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FeatureDetail from '../views/FeatureDetail.vue'
import LegalPage from '../views/LegalPage.vue'

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
  ],
  // Scroll to a hashed section when present, otherwise respect back/forward
  // positions and start fresh navigations at the top.
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition ?? { top: 0 }
  },
})

export default router
