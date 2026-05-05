/**
 * Bascule un état booléen quand le scroll dépasse un seuil en pixels.
 * Utilisé pour faire passer le header de transparent à opaque.
 */
export function useScrollPast(threshold = 24) {
  const past = ref(false)

  if (import.meta.client) {
    const update = () => {
      past.value = window.scrollY > threshold
    }
    onMounted(() => {
      update()
      window.addEventListener('scroll', update, { passive: true })
    })
    onBeforeUnmount(() => {
      window.removeEventListener('scroll', update)
    })
  }

  return past
}
