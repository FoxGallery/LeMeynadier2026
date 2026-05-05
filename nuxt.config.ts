import tailwindcss from '@tailwindcss/vite'

const isDev = process.env.NODE_ENV !== 'production'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-05-01',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/fonts', '@nuxt/image', '@nuxt/content', '@nuxtjs/i18n', '@nuxtjs/seo'],
  // URL canonique + identité du site — consommée par @nuxtjs/seo (sitemap,
  // robots, schema-org, og-image) pour absoluer les URLs et hreflang.
  site: {
    url: 'https://lemeynadier.fr',
    name: 'Le Meynadier',
    description:
      'Brasserie · Pizzeria · Pub au cœur du vieux Cannes. Pizzas signatures, bières pression, cocktails maison.',
    defaultLocale: 'fr',
    indexable: true,
  },
  schemaOrg: {
    identity: {
      type: 'BarOrPub',
      name: 'Le Meynadier',
      logo: 'https://lemeynadier.fr/og/og-fr.jpg',
      url: 'https://lemeynadier.fr',
      address: {
        streetAddress: '1 rue Meynadier (angle 5 rue du Maréchal Joffre)',
        addressLocality: 'Cannes',
        postalCode: '06400',
        addressRegion: "Provence-Alpes-Côte d'Azur",
        addressCountry: 'FR',
      },
      telephone: '+33493302312',
      priceRange: '€€',
      servesCuisine: ['Pizza', 'Italian', 'French', 'Brasserie'],
    },
  },
  ogImage: {
    enabled: true,
    // Composant par défaut : OgImageMeynadier (papier crème + bois + brass).
    // Chaque page définit son composant via defineOgImage('Meynadier', …).
    // Les polices (Cormorant Garamond, Inter Tight, Italianno) sont auto-détectées
    // par satori à partir des CSS font-family du composant ; aucune config dédiée.
    defaults: {
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7, // 1 semaine
    },
  },
  // @nuxtjs/seo > link-checker : ignorer les protocoles non-http (geo:, tel:,
  // mailto:) — le link-checker ne sait que GET en HTTP, donc une simple
  // présence de geo:… déclenche un faux 404. Les patterns string utilisent
  // radix3 (URL paths) ; pour des préfixes de protocole on passe par RegExp.
  linkChecker: {
    enabled: true,
    excludeLinks: [/^tel:/, /^mailto:/, /^geo:/, /^sms:/, /^whatsapp:/],
  },
  image: {
    format: ['avif', 'webp', 'jpg'],
    quality: 80,
    densities: [1, 2],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1920,
    },
  },
  sitemap: {
    autoLastmod: true,
    // Exclure les pages dev-only (dev-tokens, dev-components) du sitemap public.
    exclude: ['/dev-*', '/en/dev-*', '/it/dev-*'],
    // Hreflang auto-généré pour chaque route via l'intégration native
    // avec @nuxtjs/i18n (slugs localisés inclus).
  },
  i18n: {
    defaultLocale: 'fr',
    strategy: 'prefix_except_default',
    baseUrl: 'https://lemeynadier.fr',
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        language: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
      },
      {
        code: 'en',
        iso: 'en-GB',
        language: 'en-GB',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'it',
        iso: 'it-IT',
        language: 'it-IT',
        name: 'Italiano',
        file: 'it.json',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'meynadier-lang',
      cookieSecure: true,
      cookieCrossOrigin: false,
      redirectOn: 'root',
      fallbackLocale: 'fr',
      alwaysRedirect: false,
    },
  },
  css: ['~/assets/css/tailwind.css'],
  // Auto-import composants à plat (sans préfixe de dossier).
  // Nos noms sont déjà uniques (UiButton, AppHeader, GoldDivider…).
  components: [{ path: '~/components', pathPrefix: false }],
  // Pages dev-only (catalogue du DS) : ignorées en prod
  ignore: isDev ? [] : ['app/pages/dev-*.vue'],
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
