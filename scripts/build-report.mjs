#!/usr/bin/env node

/**
 * Build PDF report from docs/reports/compte-rendu.html via Playwright.
 *
 * Pourquoi Playwright et pas un binding direct (Puppeteer/PDFKit) :
 * on a déjà l'outil installé pour les e2e, et la fidélité de rendu
 * (fontes Google, gradients, SVG, @page rules) est sans concurrence.
 *
 * Usage : node scripts/build-report.mjs
 *         (ou pnpm report:pdf)
 */

import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// pnpm hoist crée des chemins ésotériques (.pnpm/playwright@1.59.1_xxx/...)
// → on résout dynamiquement au lieu d'imposer un import statique fragile.
async function loadPlaywright() {
  try {
    return await import('playwright')
  } catch {
    const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'node_modules', '.pnpm')
    const dir = readdirSync(root).find((d) => d.startsWith('playwright@'))
    if (!dir) throw new Error('playwright introuvable dans node_modules/.pnpm')
    return import(resolve(root, dir, 'node_modules/playwright/index.mjs'))
  }
}
const { chromium } = await loadPlaywright()

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const HTML_PATH = resolve(ROOT, 'docs/reports/compte-rendu.html')
const PDF_PATH = resolve(ROOT, 'docs/reports/Le-Meynadier-Compte-Rendu.pdf')

if (!existsSync(HTML_PATH)) {
  console.error(`✘ Source not found: ${HTML_PATH}`)
  process.exit(1)
}

const browser = await chromium.launch()
const ctx = await browser.newContext({
  // print emulation pour respecter les @page CSS rules + couleurs
  reducedMotion: 'reduce',
})
const page = await ctx.newPage()

await page.emulateMedia({ media: 'print' })
await page.goto(`file://${HTML_PATH}`, { waitUntil: 'networkidle' })

// Petite attente pour laisser les fontes Google charger complètement
// (sinon la page de couverture peut se rendre en serif système).
await page
  .waitForFunction(() => document.fonts.ready.then(() => true).catch(() => false), {
    timeout: 10_000,
  })
  .catch(() => {})
await page.waitForTimeout(400)

await page.pdf({
  path: PDF_PATH,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true, // respecte @page size
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()

const size = statSync(PDF_PATH).size
const sizeKB = (size / 1024).toFixed(0)
console.log(`✓ PDF généré : ${PDF_PATH}`)
console.log(`  Poids : ${sizeKB} Ko`)
