<script setup lang="ts">
import { TabsList } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  loop?: boolean
  class?: string
}>()
</script>

<template>
  <TabsList
    :loop="props.loop ?? true"
    :class="cn(
      'inline-flex flex-wrap items-center gap-1 rounded-(--radius-pill) border border-walnut-200 bg-cream-50 p-1 shadow-(--shadow-paper)',
      props.class,
    )"
  >
    <slot />
  </TabsList>
</template>
