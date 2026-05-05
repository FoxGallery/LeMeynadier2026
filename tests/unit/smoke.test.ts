import { describe, expect, it } from 'vitest'

describe('smoke', () => {
  it('runs Vitest', () => {
    expect(1 + 1).toBe(2)
  })

  it('has access to happy-dom globals', () => {
    expect(typeof window).toBe('object')
    expect(typeof document).toBe('object')
  })
})
