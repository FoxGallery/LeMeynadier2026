<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

interface Pillar {
  number: string
  image: string
  titleKey: string
  descKey: string
  to: string
  ctaKey: string
}

const pillars: Pillar[] = [
  {
    number: '01',
    image: '/images/signature/pizza.jpg',
    titleKey: 'home.signature.pillars.pizzas.title',
    descKey: 'home.signature.pillars.pizzas.description',
    to: '/carte#pizzas',
    ctaKey: 'home.signature.pillars.pizzas.cta',
  },
  {
    number: '02',
    image: '/images/signature/beer.jpg',
    titleKey: 'home.signature.pillars.drinks.title',
    descKey: 'home.signature.pillars.drinks.description',
    to: '/carte#bieres',
    ctaKey: 'home.signature.pillars.drinks.cta',
  },
  {
    number: '03',
    image: '/images/signature/cocktail.jpg',
    titleKey: 'home.signature.pillars.cocktails.title',
    descKey: 'home.signature.pillars.cocktails.description',
    to: '/carte#cocktails',
    ctaKey: 'home.signature.pillars.cocktails.cta',
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
        :kicker="t('home.signature.kicker')"
        :title="t('home.signature.title')"
        :tagline="t('home.signature.tagline')"
      />

      <div v-reveal:children="{ y: 32, stagger: 0.12, duration: 1 }" class="mt-20 grid gap-10 md:grid-cols-3">
        <article
          v-for="pillar in pillars"
          :key="pillar.number"
          class="group flex flex-col"
        >
          <!-- Image avec masque doré au hover -->
          <NuxtLink
            :to="localePath(pillar.to.split('#')[0] ?? '/') + (pillar.to.includes('#') ? `#${pillar.to.split('#')[1]}` : '')"
            class="relative block aspect-[4/5] overflow-hidden rounded-(--radius-card) ring-1 ring-walnut-200 shadow-(--shadow-paper) focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-4"
          >
            <img
              :src="pillar.image"
              :alt="t(pillar.titleKey)"
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
              {{ t(pillar.titleKey) }}
            </h3>
            <p class="mt-3 text-walnut-700">
              {{ t(pillar.descKey) }}
            </p>

            <NuxtLink
              :to="localePath(pillar.to.split('#')[0] ?? '/') + (pillar.to.includes('#') ? `#${pillar.to.split('#')[1]}` : '')"
              class="mt-5 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-brass-700 transition-colors hover:text-brass-800 focus-visible:outline-2 focus-visible:outline-brass-500 focus-visible:outline-offset-2"
            >
              <span class="h-px w-6 bg-current transition-[width] group-hover:w-10" />
              {{ t(pillar.ctaKey) }}
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
