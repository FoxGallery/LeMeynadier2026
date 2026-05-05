<script setup lang="ts">
useHead({
  title: 'Accueil',
  meta: [
    {
      name: 'description',
      content:
        'Brasserie · Pizzeria · Pub au cœur de Cannes. Pizzas signatures, bières pression, cocktails maison. Rue Meynadier — 7j/7.',
    },
  ],
})

// Le layout `default` (Header + Footer) est appliqué automatiquement.
// La page enchaîne 5 sections immersives : Hero → Signature → Ambiance →
// MenuPreview → Practical, séparées par des divisions sobres.
</script>

<template>
  <div>
    <HomeHero />
    <HomeSignature />
    <HomeAmbiance />
    <HomeMenuPreview />
    <HomePractical />
  </div>
</template>
