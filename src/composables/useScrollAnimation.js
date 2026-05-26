import { onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  let observer = null

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  }

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }

  const initAnimations = () => {
    observer = new IntersectionObserver(observerCallback, observerOptions)

    // Animate section titles and content
    document.querySelectorAll('.section__title, .section__lede, .section-eyebrow').forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // Animate all sections
    document.querySelectorAll('.section').forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // Animate KPI cards
    document.querySelectorAll('.kpi').forEach((el) => {
      el.classList.add('scale-in')
      observer.observe(el)
    })

    // Animate module items
    document.querySelectorAll('.modules li').forEach((el) => {
      el.classList.add('fade-in-left')
      observer.observe(el)
    })

    // Animate AI features
    document.querySelectorAll('.ai__feature').forEach((el) => {
      el.classList.add('fade-in-right')
      observer.observe(el)
    })

    // Animate integration cards
    document.querySelectorAll('.ig').forEach((el) => {
      el.classList.add('scale-in')
      observer.observe(el)
    })

    // Animate vendor cards
    document.querySelectorAll('.vendor').forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // Animate workflow rows
    document.querySelectorAll('.wf__row').forEach((el) => {
      el.classList.add('fade-in-left')
      observer.observe(el)
    })

    // Animate university logos (but not in carousel)
    document.querySelectorAll('.trust__logos .unilogo').forEach((el) => {
      el.classList.add('scale-in')
      observer.observe(el)
    })

    // Animate reports list
    document.querySelectorAll('.reports-list li').forEach((el) => {
      el.classList.add('fade-in-right')
      observer.observe(el)
    })

    // Animate mobile bullets
    document.querySelectorAll('.mobile__bullets li').forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })

    // Animate CTA
    document.querySelectorAll('.cta__title, .cta__sub, .cta__actions').forEach((el) => {
      el.classList.add('fade-in')
      observer.observe(el)
    })
  }

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  }

  onMounted(() => {
    initAnimations()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    initAnimations,
    cleanup
  }
}
