<script setup lang="ts">
import { TabsRoot } from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  modelValue?: string
  defaultValue?: string
  orientation?: 'horizontal' | 'vertical'
  class?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <TabsRoot
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="props.orientation ?? 'horizontal'"
    :class="cn('w-full', props.class)"
    @update:model-value="$emit('update:modelValue', String($event))"
  >
    <slot />
  </TabsRoot>
</template>
