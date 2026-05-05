<script setup lang="ts">
import { TabsTrigger } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  value: string
  disabled?: boolean
  class?: string
}>()
</script>

<template>
  <TabsTrigger
    :value="props.value"
    :disabled="props.disabled"
    :class="cn(
      'inline-flex items-center gap-2 rounded-(--radius-pill) px-4 py-1.5 text-sm font-medium tracking-wide text-walnut-100/80 transition-colors',
      'hover:bg-walnut-700 hover:text-cream',
      'data-[state=active]:bg-brass-500 data-[state=active]:text-walnut-900 data-[state=active]:shadow-(--shadow-warm)',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <slot />
  </TabsTrigger>
</template>
