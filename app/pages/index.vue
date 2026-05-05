<script setup lang="ts">
useHead({ title: 'Accueil' })
</script>

<template>
  <main class="relative flex min-h-dvh items-center justify-center bg-walnut-900 text-cream">
    <div class="absolute inset-0 -z-10 bg-gradient-to-b from-walnut-900 via-walnut-800 to-walnut-950" />
    <section class="mx-auto max-w-3xl px-6 text-center">
      <p class="font-script text-3xl text-brass-500">Bienvenue chez</p>
      <h1 class="mt-2 font-display text-6xl tracking-tight text-cream sm:text-7xl">
        Le Meynadier
      </h1>
      <div class="mx-auto mt-6 h-px w-32 bg-brass-500/70" />
      <p class="mt-6 text-lg text-walnut-100/90">
        Brasserie · Pizzeria · Pub — au cœur de Cannes.
      </p>
      <p class="mt-2 text-sm uppercase tracking-[0.3em] text-brass-300/80">
        En construction
      </p>
    </section>
  </main>
</template>
