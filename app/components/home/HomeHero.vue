<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section
    aria-labelledby="hero-title"
    class="relative isolate flex min-h-[92dvh] items-center justify-center overflow-hidden bg-walnut-900 text-cream"
  >
    <!-- Backgrounds -->
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-20 bg-gradient-to-b from-walnut-950 via-walnut-900 to-walnut-800"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(201,164,94,0.18),transparent_60%)]"
    />
    <WoodGrain :opacity="0.07" />
    <StringLights :count="13" class="!h-20" />

    <!-- Content -->
    <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-16 text-center sm:pt-24">
      <p class="font-script text-3xl text-brass-500 sm:text-4xl">
        Bienvenue chez
      </p>
      <h1
        id="hero-title"
        class="mt-3 font-display text-6xl leading-[0.95] tracking-tight text-cream sm:text-8xl"
      >
        Le Meynadier
      </h1>

      <GoldDivider size="md" ornament="diamond" class="mt-8" />

      <p class="mt-8 max-w-xl text-lg leading-relaxed text-walnut-100/90 sm:text-xl">
        Brasserie · Pizzeria · Pub<br>
        au cœur du vieux Cannes.
      </p>

      <p class="mt-3 text-sm uppercase tracking-[0.32em] text-brass-300/80">
        Pizzas signatures · Bières pression · Cocktails maison
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        <UiButton variant="primary" to="/carte">Voir la carte</UiButton>
        <UiButton variant="outline" to="/contact">Nous trouver</UiButton>
      </div>
    </div>

    <!-- Indicateur de scroll -->
    <a
      href="#signature"
      aria-label="Faire défiler vers la suite"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 text-brass-300/70 transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-500"
    >
      <ChevronDown class="size-7 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
    </a>
  </section>
</template>
