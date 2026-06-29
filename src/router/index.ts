import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import FeatureDetail from '../views/FeatureDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/imkoniyatlar/:slug', name: 'feature', component: FeatureDetail },
  ],
  // Scroll to a hashed section when present, otherwise respect back/forward
  // positions and start fresh navigations at the top.
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return savedPosition ?? { top: 0 }
  },
})

export default router
