<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Introduction from './components/Introduction.vue'
import Integrations from './components/Integrations.vue'
import WhyOurPlatform from './components/WhyOurPlatform.vue'
import Reviews from './components/Reviews.vue'
import Faq from './components/Faq.vue'
import Mobile from './components/Mobile.vue'
import Footer from './components/Footer.vue'

// Single continuous background shared by the Integrations → Mobile sections.
const sharedBg = 'radial-gradient(96.97% 32.16% at 50% 100%, #9FE870 0%, #FFFFFF 100%)'
</script>

<template>
  <Navbar />
  <Hero />
  <Features />
  <Introduction />

  <div :style="{ background: sharedBg }">
    <Integrations />
    <WhyOurPlatform />
    <Reviews />
    <Faq />
    <Mobile />
  </div>

  <Footer />
</template>
