import { AxeBuilder } from '@axe-core/playwright'
import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export async function expectAxeClean(page: Page, selector?: string) {
  const builder = new AxeBuilder({ page }).withTags([
    'wcag2a',
    'wcag2aa',
    'wcag21a',
    'wcag21aa',
    'wcag22aa',
  ])
  if (selector) builder.include(selector)
  const results = await builder.analyze()
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([])
}
