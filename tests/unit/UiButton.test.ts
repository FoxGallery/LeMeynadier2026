import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import UiButton from '~/components/ui/UiButton.vue'

describe('UiButton', () => {
  it('renders button by default with type="button"', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Click me' } })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.attributes('type')).toBe('button')
    expect(wrapper.text()).toContain('Click me')
  })

  it('applies primary variant by default', () => {
    const wrapper = mount(UiButton, { slots: { default: 'Go' } })
    expect(wrapper.classes()).toContain('bg-brass-500')
  })

  it('applies outline variant', () => {
    const wrapper = mount(UiButton, {
      props: { variant: 'outline' },
      slots: { default: 'Go' },
    })
    expect(wrapper.classes()).toContain('border-brass-500/70')
  })

  it('renders as anchor when href provided', () => {
    const wrapper = mount(UiButton, {
      props: { href: 'https://example.com' },
      slots: { default: 'Visit' },
    })
    expect(wrapper.element.tagName).toBe('A')
    expect(wrapper.attributes('href')).toBe('https://example.com')
  })

  it('shows loading spinner and sets aria-busy', () => {
    const wrapper = mount(UiButton, {
      props: { loading: true },
      slots: { default: 'Loading' },
    })
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('svg').exists()).toBe(true)
  })

  it('is disabled when prop set', () => {
    const wrapper = mount(UiButton, {
      props: { disabled: true },
      slots: { default: 'No' },
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })

  it('emits click event', async () => {
    const wrapper = mount(UiButton, { slots: { default: 'Tap' } })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('forwards aria-label', () => {
    const wrapper = mount(UiButton, {
      props: { ariaLabel: 'Toggle menu' },
      slots: { default: '☰' },
    })
    expect(wrapper.attributes('aria-label')).toBe('Toggle menu')
  })
})
