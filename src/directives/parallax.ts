// src/directives/parallax.ts
import type { DirectiveBinding } from 'vue'

interface ParallaxHTMLElement extends HTMLElement {
  _cleanupParallax?: () => void
}

export const vParallax = {
  mounted(el: ParallaxHTMLElement, binding: DirectiveBinding) {
    const speed = binding.value || 0.5

    const handleScroll = () => {
      const scrollPosition = window.scrollY
      el.style.transform = `translateY(${scrollPosition * -speed}px)`
    }

    window.addEventListener('scroll', handleScroll)
    el._cleanupParallax = handleScroll
  },

  unmounted(el: ParallaxHTMLElement) {
    if (el._cleanupParallax) {
      window.removeEventListener('scroll', el._cleanupParallax)
      delete el._cleanupParallax
    }
  }
}
