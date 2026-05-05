/**
 * Liens de navigation principaux. Centralisé ici pour Header + Footer + Sheet mobile.
 *
 * Les `to` sont en français (locale par défaut). M4 introduira la résolution
 * multilingue via `<NuxtLinkLocale>` et `i18n` config `pages`.
 */
export interface NavLink {
  to: string
  label: string
  /** Description ARIA pour les liens dont le label seul ne suffit pas. */
  ariaLabel?: string
}

export function useNavLinks(): readonly NavLink[] {
  return [
    { to: '/', label: 'Accueil' },
    { to: '/carte', label: 'La carte' },
    { to: '/histoire', label: 'Notre histoire' },
    { to: '/galerie', label: 'Galerie' },
    { to: '/contact', label: 'Contact' },
  ] as const
}
