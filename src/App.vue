<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import DemoModal from './components/DemoModal.vue'

// Fade images in as they finish loading so the first paint isn't a series of
// abrupt pop-ins. Already-cached images stay visible (no flash on revisits).
let observer: MutationObserver | null = null

function reveal(img: HTMLImageElement) {
  if (img.dataset.reveal) return
  img.dataset.reveal = '1'
  img.decoding = 'async'
  // Skip images that are already loaded (cached) — they're shown immediately.
  if (img.complete && img.naturalWidth > 0) return
  img.style.opacity = '0'
  img.style.transition = 'opacity 0.5s ease'
  const show = () => (img.style.opacity = '1')
  img.addEventListener('load', show, { once: true })
  img.addEventListener('error', show, { once: true })
}

function scan(root: ParentNode) {
  root.querySelectorAll('img').forEach((el) => reveal(el as HTMLImageElement))
}

onMounted(() => {
  scan(document)
  // Catch images mounted later (route changes, the demo modal, etc.).
  observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node instanceof HTMLImageElement) reveal(node)
        else if (node instanceof HTMLElement) scan(node)
      })
    }
  })
  observer.observe(document.body, { childList: true, subtree: true })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <Navbar />
  <div class="relative">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page">
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </div>
  <Footer />

  <!-- Single global demo-request modal (opened from Hero, Footer, …) -->
  <DemoModal />
</template>

<style>
/* Page transition: a cross-fade. We stay in the default (simultaneous) mode —
   NOT mode="out-in", which hangs on the home page's infinite marquee animations.
   The leaving page is taken out of flow and overlaid so the two pages cross-fade
   cleanly instead of the old one vanishing abruptly. */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease;
}
.page-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
