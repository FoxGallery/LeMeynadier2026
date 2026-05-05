<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

const button = cva(
  [
    'relative inline-flex items-center justify-center gap-2 whitespace-nowrap',
    'font-medium tracking-wide select-none transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-brass-500 text-walnut-900 shadow-(--shadow-warm)',
          'hover:bg-brass-300 hover:shadow-[0_14px_40px_-10px_rgba(201,164,94,0.45)]',
          'active:bg-brass-700 active:translate-y-px',
        ],
        outline: [
          'border border-brass-500/70 bg-transparent text-brass-300',
          'hover:bg-brass-500 hover:text-walnut-900 hover:border-brass-500',
          'active:bg-brass-700 active:translate-y-px',
        ],
        ghost: [
          'bg-transparent text-brass-300',
          'hover:text-brass-100 hover:underline hover:underline-offset-4 hover:decoration-brass-500',
        ],
        link: [
          'bg-transparent p-0 h-auto text-brass-300 underline-offset-4',
          'hover:text-brass-100 hover:underline',
        ],
      },
      size: {
        sm: 'h-9 rounded-(--radius-pill) px-4 text-sm',
        md: 'h-11 rounded-(--radius-pill) px-6 text-base',
        lg: 'h-13 rounded-(--radius-pill) px-8 text-lg',
      },
    },
    compoundVariants: [
      { variant: 'link', size: 'sm', class: 'h-auto px-0' },
      { variant: 'link', size: 'md', class: 'h-auto px-0' },
      { variant: 'link', size: 'lg', class: 'h-auto px-0' },
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
  as?: 'button' | 'a' | 'NuxtLink'
  href?: string
  to?: string
  ariaLabel?: string
  class?: string
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()

const tag = computed(() => {
  if (props.as) return props.as
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
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
    <span :class="props.loading ? 'opacity-80' : undefined">
      <slot />
    </span>
    <slot name="trailing" />
  </component>
</template>
