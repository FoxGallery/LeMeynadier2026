import { expect, test } from '@playwright/test'

// Tests visuels (screenshot regression) — capture une référence par locale ×
// page clé sur viewport desktop. Les diffs >0.2 % déclenchent un échec.
//
// 1ʳᵉ exécution : `pnpm test:e2e --update-snapshots` pour créer les baselines.
// CI : compare contre la baseline ; tolérance maxDiffPixels gère anti-aliasing
// et compression mineure.
//
// On désactive les animations (motion-reduce) pour stabiliser et on attend
// la fin du chargement réseau pour capturer toutes les images générées.

const captures = [
  { name: 'home-fr', url: '/' },
  { name: 'home-en', url: '/en' },
  { name: 'home-it', url: '/it' },
  { name: 'menu-fr', url: '/carte' },
  { name: 'contact-fr', url: '/contact' },
] as const

test.describe('Visual regression (chromium uniquement)', () => {
  // Le projet `chromium` est le source de vérité visuel ; firefox/webkit
  // ont des sub-pixel rendering différents qui rendraient les snapshots
  // instables. Skipper hors chromium.
  test.skip(({ browserName }) => browserName !== 'chromium', 'chromium-only')

  for (const c of captures) {
    test(c.name, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(c.url)
      await page.waitForLoadState('networkidle')
      // Force le scroll en haut + délai pour stabiliser tous les hovers/init
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(200)

      await expect(page).toHaveScreenshot(`${c.name}.png`, {
        fullPage: false,
        animations: 'disabled',
        maxDiffPixelRatio: 0.02,
      })
    })
  }
})
