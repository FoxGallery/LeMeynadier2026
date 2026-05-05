import { test } from '@playwright/test'
import { expectAxeClean } from './helpers/axe'

// Audit axe complet sur toutes les pages publiques + leurs variantes locale.
// Critères : WCAG 2.0 / 2.1 / 2.2 niveau A et AA. Le helper `expectAxeClean`
// échoue à la première violation, en exposant tout le détail JSON pour
// faciliter le debug en CI.
const routes = [
  { path: '/', name: 'home' },
  { path: '/carte', name: 'menu' },
  { path: '/histoire', name: 'history' },
  { path: '/galerie', name: 'gallery' },
  { path: '/contact', name: 'contact' },
  { path: '/mentions-legales', name: 'legal' },
  { path: '/confidentialite', name: 'privacy' },
] as const

const localePrefixes = [
  { code: 'fr', prefix: '' },
  { code: 'en', prefix: '/en' },
  { code: 'it', prefix: '/it' },
] as const

// Slugs localisés par langue pour les paths qui ne sont pas identiques.
const localizedPath: Record<string, Record<'fr' | 'en' | 'it', string>> = {
  '/carte': { fr: '/carte', en: '/menu', it: '/menu' },
  '/histoire': { fr: '/histoire', en: '/about', it: '/storia' },
  '/galerie': { fr: '/galerie', en: '/gallery', it: '/galleria' },
  '/contact': { fr: '/contact', en: '/contact', it: '/contatto' },
  '/mentions-legales': { fr: '/mentions-legales', en: '/legal', it: '/note-legali' },
  '/confidentialite': { fr: '/confidentialite', en: '/privacy', it: '/privacy' },
}

test.describe('axe a11y — toutes les pages × locales', () => {
  for (const { code, prefix } of localePrefixes) {
    for (const route of routes) {
      const localizedSlug = localizedPath[route.path]?.[code] ?? route.path
      const url = code === 'fr' ? localizedSlug : `${prefix}${localizedSlug}`

      test(`${code} · ${route.name} (${url})`, async ({ page }) => {
        await page.goto(url)
        // Attend la stabilisation du DOM (animations init, fonts, images).
        await page.waitForLoadState('networkidle')
        await expectAxeClean(page)
      })
    }
  }
})
