import { expect, test } from '@playwright/test'
import { expectAxeClean } from './helpers/axe'

const stubPages = [
  { path: '/carte', heading: 'La carte' },
  { path: '/histoire', heading: 'Histoire' },
  { path: '/galerie', heading: 'Images' },
  { path: '/contact', heading: 'Trouver' },
  { path: '/mentions-legales', heading: 'Légales' },
  { path: '/confidentialite', heading: 'Confidentialité' },
]

test.describe('Navigation', () => {
  test('header has skip-to-content link in DOM', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Aller au contenu principal')).toBeAttached()
  })

  test('header logo navigates to home', async ({ page }) => {
    await page.goto('/carte')
    await page.locator('header a[href="/"]').first().click()
    await page.waitForURL('**/')
    await expect(page).toHaveURL(/\/$/)
  })

  for (const stub of stubPages) {
    test(`page ${stub.path} loads with expected heading`, async ({ page }) => {
      await page.goto(stub.path)
      await expect(
        page.getByRole('heading', { level: 1, name: new RegExp(stub.heading, 'i') }),
      ).toBeVisible()
    })
  }

  test('language switcher is accessible', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    const switcher = page.getByRole('button', { name: /Changer de langue/i }).first()
    await expect(switcher).toBeAttached()
    await expectAxeClean(page)
  })

  test('footer shows address and contact info', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer')
    await footer.scrollIntoViewIfNeeded()
    await expect(footer.getByText(/Rue Meynadier/i)).toBeVisible()
    await expect(footer.getByText(/06400 Cannes/i)).toBeVisible()
  })

  test('main content has correct id for skip-to-content', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('main#main-content')).toBeAttached()
  })
})
