<script setup lang="ts">
import { X } from 'lucide-vue-next'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import { cn } from '~/utils/cn'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  title: string
  description?: string
  hideTitle?: boolean
  hideClose?: boolean
  class?: string
}>()

defineEmits<{
  'update:open': [value: boolean]
}>()
</script>

<template>
  <DialogRoot
    :open="props.open"
    :default-open="props.defaultOpen"
    :modal="props.modal ?? true"
    @update:open="$emit('update:open', $event)"
  >
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-walnut-950/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      />
      <DialogContent
        :class="cn(
          'fixed left-1/2 top-1/2 z-50 w-[min(92vw,42rem)] -translate-x-1/2 -translate-y-1/2',
          'rounded-(--radius-card) border border-walnut-700 bg-walnut-900 p-6 text-cream shadow-(--shadow-deep)',
          'focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95',
          props.class,
        )"
      >
        <DialogTitle :class="cn('font-display text-2xl text-cream', props.hideTitle && 'sr-only')">
          {{ props.title }}
        </DialogTitle>
        <DialogDescription
          v-if="props.description"
          class="mt-1 text-sm text-walnut-100/80"
        >
          {{ props.description }}
        </DialogDescription>

        <div class="mt-4">
          <slot />
        </div>

        <DialogClose
          v-if="!props.hideClose"
          aria-label="Fermer"
          class="absolute right-4 top-4 rounded-md p-1 text-walnut-100/80 transition-colors hover:bg-walnut-800 hover:text-cream focus-visible:outline-2 focus-visible:outline-brass-500"
        >
          <X class="size-5" aria-hidden="true" />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
