import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface RevealOptions {
  /** Selector CSS pour cibler les enfants à animer en stagger. */
  children?: string
  /** Décalage vertical de départ en px. */
  y?: number
  /** Durée en secondes. */
  duration?: number
  /** Stagger entre les enfants en secondes. */
  stagger?: number
  /** Position dans le viewport pour déclencher (0–1). */
  start?: string
  /** Joue une seule fois (true) ou à chaque entrée (false). */
  once?: boolean
}

/**
 * Anime un élément (et optionnellement ses enfants) en fade-up à l'entrée
 * du viewport via ScrollTrigger.
 *
 * Respecte `prefers-reduced-motion` : si activé, les éléments restent visibles
 * sans animation.
 */
export function useScrollReveal(
  target: Ref<HTMLElement | null> | (() => HTMLElement | null),
  options: RevealOptions = {},
) {
  if (import.meta.server) return

  const {
    children,
    y = 24,
    duration = 0.9,
    stagger = 0.08,
    start = 'top 85%',
    once = true,
  } = options

  let ctx: gsap.Context | null = null

  onMounted(() => {
    const el = typeof target === 'function' ? target() : target.value
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger)

    ctx = gsap.context(() => {
      const items = children ? el.querySelectorAll<HTMLElement>(children) : [el]
      gsap.set(items, { opacity: 0, y })
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration,
        stagger: children ? stagger : 0,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      })
    }, el)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
  })
}
