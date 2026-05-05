import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MenuCard from '~/components/menu/MenuCard.vue'

describe('MenuCard', () => {
  it('renders name and description', () => {
    const wrapper = mount(MenuCard, {
      props: { name: 'Margarita', description: 'Tomate, mozzarella, basilic', price: 9 },
    })
    expect(wrapper.text()).toContain('Margarita')
    expect(wrapper.text()).toContain('Tomate, mozzarella, basilic')
  })

  it('formats price in EUR fr-FR by default (no decimals when integer)', () => {
    const wrapper = mount(MenuCard, { props: { name: 'X', price: 9 } })
    expect(wrapper.text()).toMatch(/9\s*€/)
  })

  it('formats price with decimals when fractional', () => {
    const wrapper = mount(MenuCard, { props: { name: 'X', price: 6.5 } })
    expect(wrapper.text()).toMatch(/6,50\s*€/)
  })

  it('formats price in en-US locale', () => {
    const wrapper = mount(MenuCard, {
      props: { name: 'X', price: 6.5, locale: 'en-US' },
    })
    expect(wrapper.text()).toMatch(/€6\.50/)
  })

  it('formats price in it-IT locale', () => {
    const wrapper = mount(MenuCard, {
      props: { name: 'X', price: 6.5, locale: 'it-IT' },
    })
    expect(wrapper.text()).toMatch(/6,50/)
  })

  it('shows placeholder when price is null', () => {
    const wrapper = mount(MenuCard, { props: { name: 'X', price: null } })
    expect(wrapper.text()).toContain('—')
  })

  it('renders tags list with aria-label', () => {
    const wrapper = mount(MenuCard, {
      props: { name: 'X', price: 9, tags: ['signature', 'épicé'] },
    })
    const list = wrapper.find('ul[aria-label="Tags"]')
    expect(list.exists()).toBe(true)
    expect(list.findAll('li')).toHaveLength(2)
  })

  it('renders image with alt fallback', () => {
    const wrapper = mount(MenuCard, {
      props: { name: 'Margarita', price: 9, image: '/img/marg.jpg' },
    })
    const img = wrapper.find('img')
    expect(img.attributes('src')).toBe('/img/marg.jpg')
    expect(img.attributes('alt')).toBe('Margarita')
    expect(img.attributes('loading')).toBe('lazy')
  })
})
