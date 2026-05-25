<template>
  <section class="hero" data-screen-label="01 Hero">
    <div class="container hero__top">
      <h1 class="hero__title">
        Zamonaviy ta'lim uchun yagona<br/>
        <span class="accent" style="color: #9fe870 !important;">AI asosidagi</span> LMS ekotizimi.
      </h1>
      <p class="hero__sub">
        Kurslar, baholashlar, AI ish jarayonlari, analitika, proktoring va muassasa
        operatsiyalarini bitta xavfsiz platformada boshqaring — universitetlar, vazirliklar
        va yirik o'quv tashkilotlari uchun yaratilgan.
      </p>
      <div class="hero__ctas">
        <a href="#cta" class="btn btn--solid btn--lg">Demo so'rash</a>
        <a href="#platform" class="btn btn--link btn--lg" @click="smoothScroll">Platformani ko'rish <span aria-hidden="true">→</span></a>
      </div>
    </div>

    <div class="container hero__stage">
      <img class="hero__shot" src="/images/hero.png" alt="LMS.uz administrator boshqaruv paneli" />
    </div>
  </section>
</template>

<script setup>
const smoothScroll = (e) => {
  e.preventDefault()
  const platformSection = document.getElementById('platform')
  if (!platformSection) return

  const startPos = window.pageYOffset
  const targetPos = platformSection.offsetTop - 80
  const distance = targetPos - startPos
  const duration = 3000
  let startTime = null

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const easing = easeInOutCubic(progress)

    window.scrollTo(0, startPos + distance * easing)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
</script>
