import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'fr' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
      titleTemplate: '%s — Le Meynadier',
    },
  },
  typescript: {
    strict: true,
    typeCheck: false,
  },
  experimental: {
    viewTransition: true,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },
})
