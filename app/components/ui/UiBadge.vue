<script setup lang="ts">
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/cn'

const badge = cva(
  'inline-flex items-center justify-center rounded-(--radius-pill) px-3 py-1 text-xs font-medium tracking-wide transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-brass-500 text-walnut-900',
        outline: 'border border-walnut-300 text-walnut-700 bg-transparent',
        muted: 'bg-walnut-100 text-walnut-800',
        burgundy: 'bg-burgundy text-cream-50',
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
