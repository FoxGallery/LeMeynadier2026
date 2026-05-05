<script setup lang="ts">
defineI18nRoute({
  paths: {
    fr: '/mentions-legales',
    en: '/legal',
    it: '/note-legali',
  },
})

const { t } = useI18n()

useSeoMeta({
  title: () => t('seo.legal.title'),
  description: () => t('seo.legal.description'),
  ogTitle: () => `${t('seo.legal.title')} — Le Meynadier`,
  ogDescription: () => t('seo.legal.description'),
  robots: 'index, follow',
})
</script>

<template>
  <LegalPage
    path="/pages/mentions-legales"
    fallback-title="Mentions légales"
    fallback-description="Mentions légales du site Le Meynadier."
  />
</template>
