import type { Directive } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

/**
 * v-reveal: fades and lifts an element in once it enters the viewport.
 * Optional numeric value = delay in milliseconds.
 */
export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (typeof binding.value === 'number') {
      el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    }

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible')
            observer.disconnect()
            observers.delete(el)
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    )
    observers.set(el, observer)
    observer.observe(el)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

declare module 'vue' {
  interface GlobalDirectives {
    vReveal: typeof reveal
  }
}
