<script setup lang="ts">
import { ChevronDown } from 'lucide-vue-next'
</script>

<template>
  <section
    aria-labelledby="hero-title"
    class="relative isolate flex min-h-[92dvh] items-center justify-center overflow-hidden bg-walnut-700 text-cream-50"
  >
    <!-- Variation tonale via dégradé doux -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-gradient-to-b from-walnut-800/30 via-transparent to-walnut-800/50"
    />
    <!-- Halo doré chaud diffus (lumière du lieu) -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_30%,rgba(221,193,138,0.22),transparent_70%)]"
    />
    <!-- Vignette aux coins pour ancrer la composition -->
    <div
      aria-hidden="true"
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(13,9,5,0.45)_100%)]"
    />
    <!-- Grain de bois subtil -->
    <WoodGrain :opacity="0.18" :color="'#1a1209'" />

    <!-- Contenu -->
    <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-32 text-center sm:pt-40">
      <p class="font-script text-3xl text-brass-300 sm:text-4xl">Bienvenue chez</p>
      <h1
        id="hero-title"
        class="mt-3 font-display text-6xl leading-[0.95] tracking-tight text-cream-50 sm:text-8xl"
      >
        Le Meynadier
      </h1>

      <GoldDivider size="md" ornament="diamond" class="mt-8 text-brass-400" />

      <p class="mt-8 max-w-xl text-lg leading-relaxed text-cream-100/90 sm:text-xl">
        Brasserie · Pizzeria · Pub<br>
        au cœur du vieux Cannes.
      </p>

      <p class="mt-3 text-sm uppercase tracking-[0.32em] text-brass-300">
        Pizzas signatures · Bières pression · Cocktails maison
      </p>

      <div class="mt-10 flex flex-col gap-3 sm:flex-row">
        <UiButton variant="primary" to="/carte">Voir la carte</UiButton>
        <UiButton variant="hero-outline" to="/contact">Nous trouver</UiButton>
      </div>
    </div>

    <!-- Indicateur de scroll -->
    <a
      href="#signature"
      aria-label="Faire défiler vers la suite"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-100/60 transition-colors hover:text-brass-300 focus-visible:outline-2 focus-visible:outline-brass-400"
    >
      <ChevronDown class="size-6 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
    </a>
  </section>
</template>
