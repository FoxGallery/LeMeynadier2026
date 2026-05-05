<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/confidentialite',
    en: '/privacy',
    it: '/privacy',
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.privacy.title'),
  description: () => t('seo.privacy.description'),
  ogTitle: () => `${t('seo.privacy.title')} — Le Meynadier`,
  ogDescription: () => t('seo.privacy.description'),
  robots: 'index, follow',
})
</script>

<template>
  <LegalPage
    path="/pages/confidentialite"
    fallback-title="Politique de confidentialité"
    fallback-description="Politique de confidentialité du site Le Meynadier — privacy-first, sans cookie publicitaire."
  />
</template>
