<script setup lang="ts">
import { Separator } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}>()
</script>

<template>
  <Separator
    :orientation="props.orientation ?? 'horizontal'"
    :decorative="props.decorative ?? true"
    :class="cn(
      'shrink-0 bg-walnut-200',
      (props.orientation ?? 'horizontal') === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
      props.class,
    )"
  />
</template>
