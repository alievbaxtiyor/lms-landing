<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

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
  <RouterView />
  <Footer />
</template>
