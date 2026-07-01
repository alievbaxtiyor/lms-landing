<script setup lang="ts">
import Hero from '../components/Hero.vue'
import Features from '../components/Features.vue'
import Introduction from '../components/Introduction.vue'
import Integrations from '../components/Integrations.vue'
import WhyOurPlatform from '../components/WhyOurPlatform.vue'
import Reviews from '../components/Reviews.vue'
import Faq from '../components/Faq.vue'
import Mobile from '../components/Mobile.vue'

// Single continuous background shared by the Integrations → Mobile sections.
const sharedBg = 'radial-gradient(96.97% 32.16% at 50% 100%, #9FE870 0%, #FFFFFF 100%)'
</script>

<template>
  <!-- Single root element so the route <Transition> can track enter/leave. -->
  <div>
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
  </div>
</template>
