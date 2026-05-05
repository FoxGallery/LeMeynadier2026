<script setup lang="ts">
import {
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  label: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  delay?: number
  class?: string
}>()
</script>

<template>
  <TooltipProvider :delay-duration="props.delay ?? 250">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="props.side ?? 'top'"
          :side-offset="6"
          :class="cn(
            'z-50 rounded-md border border-walnut-200 bg-cream-50 px-3 py-1.5 text-xs text-walnut-800 shadow-(--shadow-deep)',
            'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out',
            props.class,
          )"
        >
          {{ props.label }}
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
