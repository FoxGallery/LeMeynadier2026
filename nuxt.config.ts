import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/fonts'],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: {
    families: [
      {
        name: 'Cormorant Garamond',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal', 'italic'],
        subsets: ['latin', 'latin-ext'],
        preload: true,
      },
      {
        name: 'Inter Tight',
        provider: 'google',
        weights: [400, 500, 600, 700],
        styles: ['normal'],
        subsets: ['latin', 'latin-ext'],
        preload: true,
      },
      {
        name: 'Italianno',
        provider: 'google',
        weights: [400],
        styles: ['normal'],
        subsets: ['latin', 'latin-ext'],
      },
    ],
    defaults: {
      weights: [400, 500, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin', 'latin-ext'],
    },
    experimental: {
      processCSSVariables: true,
    },
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
