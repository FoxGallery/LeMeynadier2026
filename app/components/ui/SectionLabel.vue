<script setup lang="ts">
import { cn } from '~/utils/cn'

const props = defineProps<{
  /** Numéro de section (formaté "01"). */
  number?: string
  /** Petit label en script (ex: "Notre"). */
  kicker?: string
  /** Titre principal serif. */
  title: string
  /** Texte descriptif sous le titre. */
  tagline?: string
  /** Centré ou aligné à gauche. */
  align?: 'center' | 'left'
  /** Couleur sombre (sur fond clair) ou claire (sur fond bois). */
  tone?: 'dark' | 'light'
  /** Niveau de heading sémantique (h1 pour titre de page, h2 pour section). */
  level?: 1 | 2
  class?: string
}>()

const alignValue = computed(() => props.align ?? 'center')
const toneValue = computed(() => props.tone ?? 'dark')
const headingTag = computed(() => `h${props.level ?? 2}`)
</script>

<template>
  <header
    :class="cn(
      alignValue === 'center' ? 'text-center' : 'text-left',
      props.class,
    )"
  >
    <div
      :class="cn(
        'inline-flex items-center gap-3',
        alignValue === 'center' ? 'justify-center' : 'justify-start',
      )"
    >
      <span
        v-if="props.number"
        :class="cn(
          'font-display text-xs tabular-nums tracking-widest',
          toneValue === 'light' ? 'text-brass-300' : 'text-brass-700',
        )"
      >
        — {{ props.number }} —
      </span>
      <span
        v-if="props.kicker"
        :class="cn(
          'font-script text-2xl sm:text-3xl',
          toneValue === 'light' ? 'text-brass-300' : 'text-brass-700',
        )"
      >
        {{ props.kicker }}
      </span>
    </div>

    <component
      :is="headingTag"
      :class="cn(
        'mt-1 font-display text-balance leading-[1.05] tracking-tight',
        alignValue === 'center' ? 'mx-auto' : '',
        toneValue === 'light' ? 'text-cream-50' : 'text-walnut-900',
        props.level === 1 ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl',
      )"
    >
      {{ props.title }}
    </component>

    <div
      :class="cn(
        'mt-5',
        alignValue === 'center' ? 'mx-auto' : '',
      )"
    >
      <GoldDivider
        size="sm"
        ornament="diamond"
        :class="cn(
          toneValue === 'light' ? 'text-brass-400' : 'text-brass-600',
          alignValue === 'left' && '!ml-0',
        )"
      />
    </div>

    <p
      v-if="props.tagline"
      :class="cn(
        'mt-6 max-w-2xl text-base leading-relaxed text-balance sm:text-lg',
        alignValue === 'center' ? 'mx-auto' : '',
        toneValue === 'light' ? 'text-cream-100/85' : 'text-walnut-700',
      )"
    >
      {{ props.tagline }}
    </p>
  </header>
</template>
