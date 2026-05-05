/**
 * Liens de navigation principaux. Centralisé ici pour Header + Footer + Sheet mobile.
 *
 * Les chemins sont localisés via @nuxtjs/i18n — `to` est le chemin source
 * (FR par défaut), résolu par `<NuxtLinkLocale>` ou `useLocalePath()`.
 */
export interface NavLink {
  /** Nom de la route (résolu via useLocalePath ou NuxtLink). */
  to: string
  /** Clé i18n pour le label affiché. */
  i18nKey: string
}

export function useNavLinks(): readonly NavLink[] {
  return [
    { to: '/', i18nKey: 'nav.home' },
    { to: '/carte', i18nKey: 'nav.menu' },
    { to: '/histoire', i18nKey: 'nav.history' },
    { to: '/galerie', i18nKey: 'nav.gallery' },
    { to: '/contact', i18nKey: 'nav.contact' },
  ] as const
}
