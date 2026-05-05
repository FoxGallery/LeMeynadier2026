<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  size?: 'sm' | 'md' | 'lg'
  ornament?: 'diamond' | 'leaf' | 'dot'
  class?: string
}>()

const widthClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'max-w-24'
    case 'lg':
      return 'max-w-96'
    default:
      return 'max-w-56'
  }
})
</script>

<template>
  <div
    :class="cn('mx-auto flex items-center gap-3 text-brass-500/70', widthClass, props.class)"
    role="presentation"
    aria-hidden="true"
  >
    <span class="h-px flex-1 bg-current opacity-60" />

    <svg
      v-if="(props.ornament ?? 'diamond') === 'diamond'"
      class="size-4 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
    >
      <path d="M8 1 L15 8 L8 15 L1 8 Z" />
      <path d="M8 4 L12 8 L8 12 L4 8 Z" fill="currentColor" fill-opacity="0.4" />
    </svg>

    <svg
      v-else-if="props.ornament === 'leaf'"
      class="size-4 shrink-0"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 1 C5 4 5 9 8 15 C11 9 11 4 8 1 Z" opacity="0.7" />
      <line x1="8" y1="2" x2="8" y2="14" stroke="currentColor" stroke-width="0.5" />
    </svg>

    <span
      v-else
      class="size-1.5 shrink-0 rounded-full bg-current"
    />

    <span class="h-px flex-1 bg-current opacity-60" />
  </div>
</template>
