<script setup>
import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import UniversityCarousel from './components/UniversityCarousel.vue'
import AISection from './components/AISection.vue'
import PlatformSection from './components/PlatformSection.vue'
import ProctoringSect from './components/ProctoringSection.vue'
import AnalyticsSection from './components/AnalyticsSection.vue'
import IntegrationsSection from './components/IntegrationsSection.vue'
import MobileSection from './components/MobileSection.vue'
import WorkflowsSection from './components/WorkflowsSection.vue'
import CTASection from './components/CTASection.vue'
import { useScrollAnimation } from './composables/useScrollAnimation'

// Initialize scroll animations
useScrollAnimation()
</script>

<template>
  <div id="lms-app">
    <NavBar />

    <!-- Hero + Universities bitta viewport-balandligidagi konteynerda -->
    <div class="hero-viewport">
      <Hero />
      <UniversityCarousel />
    </div>

    <AISection />
    <PlatformSection />
    <ProctoringSect />
    <AnalyticsSection />
    <IntegrationsSection />
    <MobileSection />
    <WorkflowsSection />
    <CTASection />
  </div>
</template>

<style>
@import './assets/styles.css';
@import './assets/animations.css';

#lms-app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

#app {
  width: 100%;
  margin: 0;
  padding: 0;
}

/* Hero + University Carousel - Viewport Layout */
.hero-viewport {
  min-height: 100dvh;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Hero ichida 2 qator: tepa qator cho'ziluvchi, pastki qator rasm o'lchamida */
.hero-viewport > .hero {
  flex: 1 1 auto;
  display: grid;
  grid-template-rows: 1fr auto;   /* ⭐ asosiy qator */
  padding-bottom: 0;
}

/* Matn + CTA → tepa qator ichida VERTIKAL MARKAZDA */
.hero-viewport > .hero > .hero__top {
  align-self: center;             /* ⭐ markazlaydi */
}

/* Rasm → pastki qator (tabiiy ravishda yashil bandga yopishadi) */
.hero-viewport > .hero > .hero__stage {
  align-self: end;
  justify-self: center;        /* ⭐ gorizontal markazga */
  width: 100%;                 /* container o'z max-width ichida qolib markazlashadi */
  margin-top: 0;               /* faqat vertikal margin'ni nollash */
  margin-bottom: 0;
  padding-bottom: 0;
}

.hero-viewport > .unicarousel {
  margin-top: 0;
}
</style>
