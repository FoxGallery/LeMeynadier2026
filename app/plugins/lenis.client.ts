/**
 * Smooth scroll Lenis — désactivé si l'utilisateur préfère reduce-motion.
 *
 * Le ticker GSAP est branché sur le RAF de Lenis pour synchroniser
 * ScrollTrigger (cohérent + perfomant que deux RAF concurrents).
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export default defineNuxtPlugin(() => {
  if (import.meta.server) return

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  gsap.registerPlugin(ScrollTrigger)

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
    smoothWheel: true,
    syncTouch: false,
  })

  // Sync GSAP ticker → Lenis raf, et ScrollTrigger sur scroll Lenis
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)

  // Expose pour debug et arrêt manuel si besoin (modals)
  return {
    provide: {
      lenis,
    },
  }
})
