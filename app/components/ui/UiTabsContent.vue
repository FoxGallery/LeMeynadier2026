<script setup lang="ts">
import { TabsContent } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  value: string
  class?: string
}>()
</script>

<template>
  <TabsContent
    :value="props.value"
    :class="cn('mt-6 outline-none', props.class)"
  >
    <slot />
  </TabsContent>
</template>
