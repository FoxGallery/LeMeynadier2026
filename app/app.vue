<script setup lang="ts">
const { locale } = useI18n()

// Balises i18n SEO injectées dans le <head> :
// - <html lang="...">
// - <link rel="alternate" hreflang="fr-FR" href="..."> (et en-GB / it-IT / x-default)
// - <link rel="canonical" href="...">
// - <meta property="og:locale" content="...">
const head = useLocaleHead({
  dir: true,
  lang: true,
  seo: true,
})

useHead({
  htmlAttrs: {
    lang: () => head.value.htmlAttrs?.lang ?? locale.value,
    dir: () => (head.value.htmlAttrs?.dir as 'ltr' | 'rtl' | 'auto' | undefined) ?? 'ltr',
  },
  link: () => head.value.link ?? [],
  meta: () => [
    {
      name: 'description',
      content: 'Le Meynadier — pizzas signatures, bières pression et cocktails au cœur de Cannes.',
    },
    ...(head.value.meta ?? []),
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
