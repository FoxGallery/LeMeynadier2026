<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight, Loader2 } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

/* ──────────────────────────────────────────────────────────────────────────
 * UiButton — système unifié de boutons "luxe brasserie".
 *
 * - Forme pill (rounded-full), letter-spacing wide.
 * - Hairline borders pour l'élégance, hover stately (lift + color shift).
 * - 4 variantes : primary, outline, hero-outline (sur fond bois),
 *   ghost, link.
 * ────────────────────────────────────────────────────────────────────────── */
const button = cva(
  [
    'group relative inline-flex items-center justify-center gap-3 whitespace-nowrap',
    'font-body font-medium tracking-[0.18em] uppercase select-none',
    'transition-all duration-300 ease-out',
    'focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        // Walnut profond avec accent laiton — CTA principal universel
        primary: [
          'bg-walnut-900 text-cream-50 border border-walnut-900',
          'shadow-[0_10px_24px_-12px_rgba(63,45,26,0.35)]',
          'hover:bg-walnut-800 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(63,45,26,0.55)]',
          'active:translate-y-0 active:bg-walnut-950',
        ],
        // Or massif — pour les moments d'emphase forte
        gold: [
          'bg-brass-500 text-walnut-950 border border-brass-600',
          'shadow-[0_10px_24px_-12px_rgba(184,138,61,0.45)]',
          'hover:bg-brass-400 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(184,138,61,0.55)]',
          'active:translate-y-0 active:bg-brass-600',
        ],
        // Hairline noir — sobre et élégant sur fond clair
        outline: [
          'bg-transparent text-walnut-900 border border-walnut-800/80',
          'hover:bg-walnut-900 hover:text-cream-50 hover:border-walnut-900',
          'active:bg-walnut-950',
        ],
        // Hairline crème — pour fonds bois warm/foncé (hero)
        'hero-outline': [
          'bg-transparent text-cream-50 border border-cream-50/40',
          'hover:bg-cream-50 hover:text-walnut-950 hover:border-cream-50',
          'active:translate-y-0',
        ],
        // Texte seul avec underline animé
        ghost: [
          'bg-transparent text-walnut-900 border border-transparent normal-case tracking-normal',
          "after:content-[''] after:absolute after:bottom-2 after:left-1/2 after:h-px after:w-0 after:bg-brass-600 after:transition-[width,left] after:duration-300",
          'hover:text-brass-700 hover:after:w-[calc(100%-2rem)] hover:after:left-4',
        ],
        // Lien inline
        link: [
          'inline-flex h-auto bg-transparent p-0 text-brass-700 normal-case tracking-normal underline-offset-4',
          'hover:text-brass-800 hover:underline',
        ],
      },
      size: {
        sm: 'h-10 rounded-full px-5 text-[11px]',
        md: 'h-12 rounded-full px-7 text-xs',
        lg: 'h-14 rounded-full px-9 text-sm',
      },
    },
    compoundVariants: [
      { variant: 'link', size: 'sm', class: 'h-auto px-0 text-sm' },
      { variant: 'link', size: 'md', class: 'h-auto px-0 text-base' },
      { variant: 'link', size: 'lg', class: 'h-auto px-0 text-lg' },
    ],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type Variant = NonNullable<VariantProps<typeof button>['variant']>
type Size = NonNullable<VariantProps<typeof button>['size']>

const props = defineProps<{
  variant?: Variant
  size?: Size
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  /** Affiche une flèche → après le contenu (auto pour primary/gold). */
  withArrow?: boolean
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  to?: string
  ariaLabel?: string
  class?: string
}>()

defineEmits<{ click: [event: MouseEvent] }>()

const tag = computed(() => {
  if (props.as) return props.as
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
})

const showArrow = computed(() => {
  if (props.withArrow) return true
  // Auto-affiche la flèche sur les variants forts
  return false
})
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? (props.type ?? 'button') : undefined"
    :href="tag === 'a' ? props.href : undefined"
    :to="tag === 'NuxtLink' ? props.to : undefined"
    :disabled="tag === 'button' ? (props.disabled || props.loading) : undefined"
    :aria-disabled="tag !== 'button' && (props.disabled || props.loading) ? 'true' : undefined"
    :aria-busy="props.loading ? 'true' : undefined"
    :aria-label="props.ariaLabel"
    :class="cn(button({ variant: props.variant, size: props.size }), props.class)"
    @click="$emit('click', $event)"
  >
    <Loader2
      v-if="props.loading"
      class="size-4 animate-spin"
      aria-hidden="true"
    />
    <slot v-else name="leading" />
    <span class="relative">
      <slot />
    </span>
    <slot name="trailing">
      <ArrowRight
        v-if="showArrow && !props.loading"
        class="size-4 transition-transform group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </slot>
  </component>
</template>
