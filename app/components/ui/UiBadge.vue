<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/cn'

const badge = cva(
  'inline-flex items-center justify-center rounded-(--radius-pill) px-3 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brass-500 text-walnut-900',
        outline: 'border border-brass-500/60 text-brass-300',
        muted: 'bg-walnut-700 text-walnut-100',
        burgundy: 'bg-burgundy text-cream',
      },
    },
    defaultVariants: { variant: 'default' },
  },
)

type Variant = NonNullable<VariantProps<typeof badge>['variant']>

const props = defineProps<{
  variant?: Variant
  class?: string
}>()
</script>

<template>
  <span :class="cn(badge({ variant: props.variant }), props.class)">
    <slot />
  </span>
</template>
