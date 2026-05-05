<script setup lang="ts">
useHead({
  title: 'Accueil',
  meta: [
    {
      name: 'description',
      content: 'Le Meynadier — pizzas signatures, bières pression et cocktails au cœur de Cannes.',
    },
  ],
})
</script>

<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
