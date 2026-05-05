<script setup lang="ts">
const { t } = useI18n()
const venue = useVenue()
const jsonLd = venueJsonLd(venue)

// Méta SEO localisées : title, description, OG, Twitter card.
// `useSeoMeta` (Nuxt SEO) génère <title>, <meta description>, og:*,
// twitter:* en une seule passe. Les valeurs sont reactives sur la locale.
useSeoMeta({
  title: () => t('seo.home.title'),
  description: () => t('seo.home.description'),
  ogTitle: () => `${t('seo.home.title')} — Le Meynadier`,
  ogDescription: () => t('seo.home.description'),
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// OG image générée à la volée à partir du composant OgImage/Meynadier.
defineOgImage('Meynadier', {
  kicker: 'Brasserie · Pizzeria · Pub',
  title: 'Le Meynadier',
  description: 'Au cœur du vieux Cannes — pizzas signatures, bières pression, cocktails maison.',
})

// JSON-LD BarOrPub/Restaurant — la home est la page la plus crawlée,
// donc on y déclare l'identité Schema.org complète (adresse, horaires,
// géo, cuisine, prix). Google s'en sert pour le Knowledge Panel.
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ],
})
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
