<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  size?: number
  class?: string
}>()
</script>

<template>
  <svg
    :width="props.size ?? 64"
    :height="props.size ?? 64"
    viewBox="0 0 80 80"
    fill="none"
    aria-hidden="true"
    role="presentation"
    :class="cn('text-current', props.class)"
  >
    <!-- Cercle ornemental -->
    <circle cx="40" cy="40" r="36" stroke="currentColor" stroke-width="0.6" opacity="0.55" />
    <circle cx="40" cy="40" r="32" stroke="currentColor" stroke-width="0.4" opacity="0.4" />
    <!-- Petits losanges aux 4 cardinaux -->
    <g fill="currentColor" opacity="0.7">
      <path d="M40 6 L42 9 L40 12 L38 9 Z" />
      <path d="M74 40 L71 42 L68 40 L71 38 Z" />
      <path d="M40 74 L42 71 L40 68 L38 71 Z" />
      <path d="M6 40 L9 42 L12 40 L9 38 Z" />
    </g>
    <!-- Monogramme L M entrelacé, style serif -->
    <g
      fill="none"
      stroke="currentColor"
      stroke-width="1.4"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <!-- L -->
      <path d="M28 24 L28 52 L40 52" />
      <!-- M -->
      <path d="M36 56 L36 28 L46 44 L56 28 L56 56" />
    </g>
    <!-- Petit empattement décoratif -->
    <line x1="26" y1="24" x2="30" y2="24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
    <line x1="34" y1="56" x2="38" y2="56" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
    <line x1="54" y1="56" x2="58" y2="56" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
  </svg>
</template>
