<script setup lang="ts">
import { Beer, Pizza, Wine } from 'lucide-vue-next'

interface Pillar {
  icon: typeof Pizza
  title: string
  description: string
  to: string
  cta: string
}

const pillars: Pillar[] = [
  {
    icon: Pizza,
    title: 'Pizzas signatures',
    description:
      'Pâte fine cuite au four, sauce tomate maison, ingrédients frais. Neuf recettes signatures, du classique Margarita à la généreuse Raffinée.',
    to: '/carte#pizzas',
    cta: 'Voir les pizzas',
  },
  {
    icon: Beer,
    title: 'Bières pression',
    description:
      'Trois pressions au comptoir — Falcon, Affligem, Pelforth — et une sélection de bouteilles belges et internationales.',
    to: '/carte#bieres',
    cta: 'Voir les bières',
  },
  {
    icon: Wine,
    title: 'Cocktails & vins',
    description:
      'Cocktails maison signatures, vins du Domaine Source Marine et Côtes du Rhône, smoothies frais — pour tous les moments.',
    to: '/carte#cocktails',
    cta: 'Voir les cocktails',
  },
]
</script>

<template>
  <section
    id="signature"
    aria-labelledby="signature-title"
    class="relative bg-walnut-900 py-24"
  >
    <div class="mx-auto max-w-6xl px-6">
      <header class="text-center">
        <p class="font-script text-2xl text-brass-500">Notre</p>
        <h2 id="signature-title" class="mt-1 font-display text-4xl text-cream sm:text-5xl">
          Signature
        </h2>
        <GoldDivider class="mt-6" />
      </header>

      <div class="mt-16 grid gap-8 md:grid-cols-3">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="group relative flex flex-col overflow-hidden rounded-(--radius-card) border border-walnut-700 bg-walnut-800/40 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/50 hover:shadow-(--shadow-warm)"
        >
          <span
            class="inline-flex size-14 items-center justify-center rounded-full border border-brass-500/40 bg-walnut-950 text-brass-500 transition-colors group-hover:bg-brass-500 group-hover:text-walnut-900"
            aria-hidden="true"
          >
            <component :is="pillar.icon" class="size-6" />
          </span>

          <h3 class="mt-6 font-display text-2xl text-cream">
            {{ pillar.title }}
          </h3>
          <p class="mt-3 flex-1 text-walnut-100/80">
            {{ pillar.description }}
          </p>

          <NuxtLink
            :to="pillar.to"
            class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-brass-300 transition-colors hover:text-brass-100 focus-visible:outline-2 focus-visible:outline-brass-500"
          >
            {{ pillar.cta }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
