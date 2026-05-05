import { expect, test } from '@playwright/test'
import { expectAxeClean } from './helpers/axe'

test.describe('Home page', () => {
  test('renders the brand name', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Le Meynadier/)
    await expect(page.getByRole('heading', { level: 1, name: /Le Meynadier/ })).toBeVisible()
  })

  test('passes axe accessibility audit', async ({ page }) => {
    await page.goto('/')
    await expectAxeClean(page)
  })
})
