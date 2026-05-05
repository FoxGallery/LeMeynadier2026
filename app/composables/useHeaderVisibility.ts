/**
 * État partagé pour cacher la navbar du header — utilisé par certaines
 * pages (ex: /carte) qui collent leur propre barre sticky au top et
 * souhaitent prendre la place de la nav au scroll.
 *
 * Le header lit `useHeaderVisibility().hidden` et applique une transition
 * de translate-y / opacity quand `true`.
 */
export function useHeaderVisibility() {
  const hidden = useState<boolean>('meyn-header-hidden', () => false)
  return { hidden }
}
