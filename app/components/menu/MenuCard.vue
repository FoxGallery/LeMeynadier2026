<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  name: string
  description?: string
  price: number | null
  currency?: string
  locale?: string
  tags?: string[]
  image?: string
  imageAlt?: string
  class?: string
}>()

const formattedPrice = computed(() => {
  if (props.price == null) return null
  return new Intl.NumberFormat(props.locale ?? 'fr-FR', {
    style: 'currency',
    currency: props.currency ?? 'EUR',
    minimumFractionDigits: props.price % 1 === 0 ? 0 : 2,
  }).format(props.price)
})
</script>

<template>
  <article
    :class="cn(
      'group relative flex h-full flex-col overflow-hidden rounded-(--radius-card)',
      'bg-cream text-walnut-900 shadow-(--shadow-warm) transition-transform duration-300',
      'hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(201,164,94,0.35)]',
      props.class,
    )"
  >
    <div v-if="props.image" class="relative aspect-[4/3] overflow-hidden bg-walnut-100">
      <img
        :src="props.image"
        :alt="props.imageAlt ?? props.name"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
    </div>

    <div class="flex flex-1 flex-col gap-2 p-5">
      <header class="flex items-start justify-between gap-3">
        <h3 class="font-display text-xl leading-tight text-walnut-900">
          {{ props.name }}
        </h3>
        <span
          v-if="formattedPrice"
          class="inline-flex shrink-0 items-center rounded-(--radius-pill) bg-walnut-900 px-3 py-1 text-sm font-medium text-brass-300 ring-1 ring-brass-500/40"
        >
          {{ formattedPrice }}
        </span>
        <span
          v-else
          class="inline-flex shrink-0 items-center rounded-(--radius-pill) bg-walnut-100 px-3 py-1 text-xs font-medium text-walnut-500"
        >
          —
        </span>
      </header>

      <p
        v-if="props.description"
        class="text-sm leading-relaxed text-walnut-700"
      >
        {{ props.description }}
      </p>

      <ul
        v-if="props.tags && props.tags.length"
        class="mt-auto flex flex-wrap gap-1.5 pt-2"
        aria-label="Tags"
      >
        <li
          v-for="tag in props.tags"
          :key="tag"
          class="inline-flex items-center rounded-(--radius-pill) border border-walnut-300 bg-transparent px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-walnut-500"
        >
          {{ tag }}
        </li>
      </ul>
    </div>
  </article>
</template>
