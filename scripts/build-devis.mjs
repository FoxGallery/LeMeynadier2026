#!/usr/bin/env node

/**
 * Génère le PDF du devis client à partir de docs/devis/devis-lemeynadier.html
 * via Playwright (mêmes principes que build-report.mjs).
 *
 * Usage : node scripts/build-devis.mjs
 */

import { existsSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
const HTML_PATH = resolve(ROOT, 'docs/devis/devis-lemeynadier.html')
const PDF_PATH = resolve(ROOT, 'docs/devis/Devis-Le-Meynadier-Site-Web.pdf')

if (!existsSync(HTML_PATH)) {
  console.error(`✘ Source not found: ${HTML_PATH}`)
  process.exit(1)
}

const browser = await chromium.launch()
const ctx = await browser.newContext({ reducedMotion: 'reduce' })
const page = await ctx.newPage()

await page.emulateMedia({ media: 'print' })
await page.goto(`file://${HTML_PATH}`, { waitUntil: 'networkidle' })

await page
  .waitForFunction(() => document.fonts.ready.then(() => true).catch(() => false), {
    timeout: 10_000,
  })
  .catch(() => {})
await page.waitForTimeout(500)

await page.pdf({
  path: PDF_PATH,
  format: 'A4',
  printBackground: true,
  preferCSSPageSize: true,
  margin: { top: 0, right: 0, bottom: 0, left: 0 },
})

await browser.close()

const sizeKB = (statSync(PDF_PATH).size / 1024).toFixed(0)
console.log(`✓ Devis généré : ${PDF_PATH}`)
console.log(`  Poids : ${sizeKB} Ko`)
