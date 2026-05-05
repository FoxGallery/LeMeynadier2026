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

type Side = 'top' | 'right' | 'bottom' | 'left'

const props = defineProps<{
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
  side?: Side
  title: string
  description?: string
  hideTitle?: boolean
  hideClose?: boolean
  class?: string
}>()

defineEmits<{
  'update:open': [value: boolean]
}>()

const sideClasses: Record<Side, string> = {
  top: 'inset-x-0 top-0 border-b data-[state=open]:slide-in-from-top data-[state=closed]:slide-out-to-top',
  right:
    'inset-y-0 right-0 h-full w-[min(92vw,24rem)] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right',
  bottom:
    'inset-x-0 bottom-0 border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom',
  left: 'inset-y-0 left-0 h-full w-[min(92vw,24rem)] border-r data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left',
}
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
        class="fixed inset-0 z-50 bg-walnut-950/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out"
      />
      <DialogContent
        :class="cn(
          'fixed z-50 flex flex-col gap-4 border-walnut-200 bg-cream-50 p-6 text-walnut-800 shadow-(--shadow-deep)',
          'focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out',
          sideClasses[props.side ?? 'right'],
          props.class,
        )"
      >
        <header class="flex items-start justify-between">
          <div class="flex flex-col gap-1">
            <DialogTitle :class="cn('font-display text-2xl text-walnut-900', props.hideTitle && 'sr-only')">
              {{ props.title }}
            </DialogTitle>
            <DialogDescription
              v-if="props.description"
              class="text-sm text-walnut-700"
            >
              {{ props.description }}
            </DialogDescription>
          </div>
          <DialogClose
            v-if="!props.hideClose"
            aria-label="Fermer"
            class="rounded-md p-1 text-walnut-700 transition-colors hover:bg-cream-200 hover:text-walnut-900 focus-visible:outline-2 focus-visible:outline-brass-600"
          >
            <X class="size-5" aria-hidden="true" />
          </DialogClose>
        </header>

        <div class="flex-1 overflow-y-auto">
          <slot />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
