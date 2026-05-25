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
  <div>
    <NavBar />
    <Hero />
    <UniversityCarousel />
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
</style>
