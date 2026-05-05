<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  as?: string
  variant?: 'default' | 'paper' | 'wood'
  class?: string
}>()

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'paper':
      return 'bg-cream-50 text-walnut-900 shadow-(--shadow-paper) border border-walnut-200'
    case 'wood':
      return 'bg-walnut-50 text-walnut-900 border border-walnut-200 shadow-(--shadow-warm)'
    default:
      return 'bg-cream-100 text-walnut-800 border border-walnut-200 shadow-(--shadow-paper)'
  }
})
</script>

<template>
  <component
    :is="props.as ?? 'div'"
    :class="cn('rounded-(--radius-card) p-6', variantClasses, props.class)"
  >
    <slot />
  </component>
</template>
