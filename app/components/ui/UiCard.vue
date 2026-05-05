<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  as?: string
  variant?: 'default' | 'paper'
  class?: string
}>()

const variantClasses = computed(() =>
  props.variant === 'paper'
    ? 'bg-cream text-walnut-900 shadow-(--shadow-warm)'
    : 'bg-walnut-800/60 text-cream backdrop-blur-sm shadow-(--shadow-deep) border border-walnut-700',
)
</script>

<template>
  <component
    :is="props.as ?? 'div'"
    :class="cn('rounded-(--radius-card) p-6', variantClasses, props.class)"
  >
    <slot />
  </component>
</template>
