<script setup lang="ts">
interface Pillar {
  number: string
  image: string
  title: string
  description: string
  to: string
  cta: string
}

const pillars: Pillar[] = [
  {
    number: '01',
    image: '/images/signature/pizza.jpg',
    title: 'Pizzas signatures',
    description:
      "Pâte fine, four à pizza, sauce tomate maison, ingrédients frais. Neuf recettes signatures, du classique Margarita à la généreuse Raffinée à l'huile de truffe.",
    to: '/carte#pizzas',
    cta: 'Voir les pizzas',
  },
  {
    number: '02',
    image: '/images/signature/beer.jpg',
    title: 'Bières & vins',
    description:
      'Trois pressions au comptoir — Pelforth, Affligem, Monaco — sélection de bouteilles belges et internationales, vins du Domaine Source Marine.',
    to: '/carte#bieres',
    cta: 'Voir la sélection',
  },
  {
    number: '03',
    image: '/images/signature/cocktail.jpg',
    title: 'Cocktails maison',
    description:
      'Spritz, Pina Colada, Dragon, Tabula — recettes maison à siroter au comptoir ou sur la terrasse, du déjeuner au dernier verre.',
    to: '/carte#cocktails',
    cta: 'Voir les cocktails',
  },
]
</script>

<template>
  <section
    id="signature"
    aria-labelledby="signature-title"
    class="relative bg-walnut-50 py-32"
  >
    <div class="mx-auto max-w-6xl px-6">
      <SectionLabel
        number="01 · 02 · 03"
        kicker="Notre"
        title="Signature"
        tagline="Trois piliers, une promesse : produits frais, recettes maison, ambiance chaleureuse — comme on les aime depuis toujours."
      />

      <div v-reveal:children="{ y: 32, stagger: 0.12, duration: 1 }" class="mt-20 grid gap-10 md:grid-cols-3">
        <article
          v-for="pillar in pillars"
          :key="pillar.title"
          class="group flex flex-col"
        >
          <!-- Image avec masque doré au hover -->
          <NuxtLink
            :to="pillar.to"
            class="relative block aspect-[4/5] overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-200 shadow-(--shadow-paper) focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
          >
            <img
              :src="pillar.image"
              :alt="pillar.title"
              loading="lazy"
              decoding="async"
              class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            >
            <div
              aria-hidden="true"
              class="absolute inset-0 bg-gradient-to-t from-walnut-950/60 via-walnut-950/0 to-transparent transition-opacity duration-500 group-hover:opacity-80"
            />
            <span
              aria-hidden="true"
              class="absolute left-5 top-5 inline-flex size-12 items-center justify-center rounded-full border border-cream-50/60 bg-walnut-950/40 font-display text-sm font-medium tabular-nums text-cream-50 backdrop-blur-sm"
            >
              {{ pillar.number }}
            </span>
          </NuxtLink>

          <div class="mt-6">
            <h3 class="font-display text-2xl text-walnut-900 sm:text-3xl">
              {{ pillar.title }}
            </h3>
            <p class="mt-3 text-walnut-700">
              {{ pillar.description }}
            </p>

            <NuxtLink
              :to="pillar.to"
              class="mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brass-700 transition-colors hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2"
            >
              <span class="h-px w-6 bg-current transition-[width] group-hover:w-10" />
              {{ pillar.cta }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
