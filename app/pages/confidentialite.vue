<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/confidentialite',
    en: '/privacy',
    it: '/privacy',
  },
})
</script>

<template>
  <LegalPage
    path="/pages/confidentialite"
    fallback-title="Politique de confidentialité"
    fallback-description="Politique de confidentialité du site Le Meynadier — privacy-first, sans cookie publicitaire."
  />
</template>
