<template>
  <header class="nav" data-screen-label="00 Nav">
    <div class="nav__inner">
      <a href="#" class="brand" aria-label="LMS.uz" @click.prevent="scrollToTop">
        <span class="brand__mark" aria-hidden="true">
          <img src="/images/logos/lms-icon.svg" width="22" height="22" alt="" />
        </span>
        <span class="brand__word">LMS<span class="brand__dot">.</span>uz</span>
      </a>
      <nav class="nav__links" aria-label="Asosiy menyu">
        <a href="#platform" @click.prevent="scrollToSection('platform')">Platforma</a>
        <a href="#ai" @click.prevent="scrollToSection('ai')">AI</a>
        <a href="#proctoring" @click.prevent="scrollToSection('proctoring')">Proktoring</a>
        <a href="#analytics" @click.prevent="scrollToSection('analytics')">Analitika</a>
        <a href="#integrations" @click.prevent="scrollToSection('integrations')">Integratsiyalar</a>
        <a href="#mobile" @click.prevent="scrollToSection('mobile')">Mobil</a>
      </nav>
      <div class="nav__cta">
        <a href="#cta" class="btn btn--solid" @click.prevent="scrollToSection('cta')">Demo so'rash <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </header>
</template>

<script setup>
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>
