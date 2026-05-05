<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/mentions-legales',
    en: '/legal',
    it: '/note-legali',
  },
})
</script>

<template>
  <LegalPage
    path="/pages/mentions-legales"
    fallback-title="Mentions légales"
    fallback-description="Mentions légales du site Le Meynadier."
  />
</template>
