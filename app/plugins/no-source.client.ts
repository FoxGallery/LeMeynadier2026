/**
 * Dissuasif anti-source-snooping (production uniquement).
 *
 * Bloque les chemins « grand public » qui exposent le code source ou
 * permettent de l'archiver d'un clic :
 *   - clic droit (menu contextuel → Inspecter, Voir le code source)
 *   - F12 (DevTools)
 *   - Ctrl/Cmd + U (Voir le code source)
 *   - Ctrl/Cmd + Shift + I / J / C (DevTools panels)
 *   - Ctrl/Cmd + S (Enregistrer sous → archive HTML)
 *   - drag des images (récupération photo)
 *
 * ⚠ C'est un dissuasif, PAS une protection. Quiconque sait ouvrir
 * `view-source:lemeynadier.fr` dans la barre d'URL ou utilise `curl`
 * récupère le HTML quand même. La sélection de texte reste autorisée
 * pour que les visiteurs puissent copier adresse / téléphone /
 * horaires sans friction.
 *
 * Désactivé en dev pour ne pas gêner l'équipe technique.
 */
export default defineNuxtPlugin(() => {
  if (import.meta.dev) return

  const block = (e: Event) => {
    e.preventDefault()
    e.stopPropagation()
  }

  // Menu contextuel (clic droit) — désactivé partout.
  // Sauf sur les éléments marqués <... data-allow-context="true">
  // (utile si on a besoin du clic droit ailleurs un jour).
  document.addEventListener(
    'contextmenu',
    (e) => {
      const t = e.target as HTMLElement | null
      if (t?.closest('[data-allow-context="true"]')) return
      block(e)
    },
    { capture: true },
  )

  // Raccourcis clavier (F12, Ctrl/Cmd+U, +Shift+I/J/C, +S).
  document.addEventListener(
    'keydown',
    (e) => {
      const meta = e.ctrlKey || e.metaKey
      const k = e.key

      if (k === 'F12') return block(e)
      if (meta && !e.shiftKey && (k === 'u' || k === 'U')) return block(e)
      if (meta && !e.shiftKey && (k === 's' || k === 'S')) return block(e)
      if (meta && e.shiftKey && /^[ijcIJC]$/.test(k)) return block(e)
    },
    { capture: true },
  )

  // Drag d'images (récupération via glisser sur le bureau).
  document.addEventListener(
    'dragstart',
    (e) => {
      const t = e.target as HTMLElement | null
      if (t?.tagName === 'IMG') block(e)
    },
    { capture: true },
  )
})
