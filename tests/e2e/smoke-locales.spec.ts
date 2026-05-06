import { expect, test } from '@playwright/test'

// Smoke test multilingue : pour chaque locale (FR/EN/IT) on visite chaque
// page publique et on vérifie : statut 200, lang attr, présence d'un h1,
// titre non vide, lang switcher accessible. Objectif : détecter en CI les
// régressions i18n (clés manquantes, redirections cassées, slug oublié).

const locales = [
  { code: 'fr', prefix: '', langAttr: 'fr-FR' },
  { code: 'en', prefix: '/en', langAttr: 'en-GB' },
  { code: 'it', prefix: '/it', langAttr: 'it-IT' },
] as const

const pages = {
  home: { fr: '/', en: '/en', it: '/it' },
  menu: { fr: '/carte', en: '/en/menu', it: '/it/menu' },
  history: { fr: '/histoire', en: '/en/about', it: '/it/storia' },
  gallery: { fr: '/galerie', en: '/en/gallery', it: '/it/galleria' },
  contact: { fr: '/contact', en: '/en/contact', it: '/it/contatto' },
} as const

test.describe('Smoke 3 locales', () => {
  for (const locale of locales) {
    test.describe(`locale: ${locale.code}`, () => {
      for (const [name, paths] of Object.entries(pages)) {
        const url = paths[locale.code]
        test(`${name} (${url}) — 200, lang, h1`, async ({ page }) => {
          const response = await page.goto(url)
          expect(response?.status(), `expected 200 for ${url}`).toBeLessThan(400)

          const lang = await page.locator('html').getAttribute('lang')
          expect(lang, `lang attr on ${url}`).toBe(locale.langAttr)

          await expect(page.locator('h1').first()).toBeVisible()
          await expect(page).toHaveTitle(/.+/)
        })
      }

      test(`switcher de langue présent (desktop)`, async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 800 })
        await page.goto(pages.home[locale.code])
        const switcher = page
          .getByRole('button', { name: /(Changer de langue|Change language|Cambia lingua)/i })
          .first()
        await expect(switcher).toBeAttached()
      })
    })
  }
})
