/**
 * Directive `v-reveal` — fade-up un élément à l'entrée du viewport.
 *
 * Usage :
 *   <h2 v-reveal>Titre</h2>
 *   <div v-reveal:children>...</div>           // stagger sur enfants directs
 *   <div v-reveal="{ y: 40, duration: 1.2 }">  // options custom
 *
 * - SSR : no-op avec `getSSRProps` vide → l'élément est rendu tel quel.
 * - Client : applique l'animation GSAP avec ScrollTrigger.
 * - Respecte `prefers-reduced-motion` → animation désactivée, élément visible.
 */
import type { DirectiveBinding } from 'vue'

interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  once?: boolean
}

export default defineNuxtPlugin(async (nuxtApp) => {
  // Côté serveur : enregistre une directive no-op pour éviter
  // "Cannot read properties of undefined (reading 'getSSRProps')".
  if (import.meta.server) {
    nuxtApp.vueApp.directive('reveal', {
      getSSRProps: () => ({}),
    })
    return
  }

  // Côté client : import dynamique de GSAP pour ne pas bloquer le bundle.
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])
  gsap.registerPlugin(ScrollTrigger)

  const TRIGGERS = new WeakMap<HTMLElement, ScrollTrigger>()

  function applyReveal(el: HTMLElement, binding: DirectiveBinding<RevealOptions | undefined>) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const opts = binding.value ?? {}
    const y = opts.y ?? 24
    const duration = opts.duration ?? 0.9
    const stagger = opts.stagger ?? 0.08
    const start = opts.start ?? 'top 88%'
    const once = opts.once ?? true

    const useChildren = binding.arg === 'children'
    const items = useChildren ? (Array.from(el.children) as HTMLElement[]) : [el]

    gsap.set(items, { opacity: 0, y })
    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger: useChildren ? stagger : 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? 'play none none none' : 'play reverse play reverse',
      },
    })
    const trigger = tween.scrollTrigger
    if (trigger) TRIGGERS.set(el, trigger)
  }

  nuxtApp.vueApp.directive<HTMLElement, RevealOptions | undefined>('reveal', {
    mounted(el, binding) {
      applyReveal(el, binding)
    },
    getSSRProps: () => ({}),
    unmounted(el) {
      TRIGGERS.get(el)?.kill()
      TRIGGERS.delete(el)
    },
  })
})
