/**
 * Renvoie l'image à afficher pour un item de la carte.
 *
 * Priorité :
 * 1. `item.image` explicitement défini dans le YAML
 * 2. Image dédiée à un slug spécifique (ex: margarita, spritz)
 * 3. Image générique de la sous-catégorie (ex: pression vs bouteille)
 * 4. Image générique de la catégorie principale
 *
 * Toutes les images sont dans `public/images/items/` (téléchargées Unsplash).
 */

interface ResolveOptions {
  category: string
  slug: string
  tags?: string[]
  /** Image explicite depuis le YAML (override). */
  override?: string
}

/** Map slug → image (pour items ayant une photo dédiée). */
const SLUG_MAP: Record<string, string> = {
  // Pizzas
  margarita: '/images/items/pizza-margarita.jpg',
  diavola: '/images/items/pizza-diavola.jpg',
  '3-fromages': '/images/items/pizza-fromages.jpg',
  // Cocktails
  spritz: '/images/items/cocktail-spritz.jpg',
  'pinacolada-shake': '/images/items/cocktail-pink.jpg',
  exotic: '/images/items/cocktail-orange.jpg',
  dragon: '/images/items/cocktail-bar.jpg',
  tabula: '/images/items/cocktail-pink.jpg',
  'rouge-diesel': '/images/items/cocktail-bar.jpg',
  // Vins
  'rose-domaine-source-marine': '/images/items/wine-rose.jpg',
  'blanc-domaine-source-marine': '/images/items/wine-glass.jpg',
  'rouge-domaine-source-marine': '/images/items/wine-red.jpg',
  'cotes-du-rhone': '/images/items/wine-red.jpg',
  // Smoothies / Frappés / Milkshakes par slug si besoin
  florida: '/images/items/milkshake.jpg',
  california: '/images/items/smoothie-pink.jpg',
  manhattan: '/images/items/milkshake.jpg',
  seattle: '/images/items/cafe-latte.jpg',
  hawaii: '/images/items/milkshake.jpg',
  // Boissons chaudes
  espresso: '/images/items/espresso.jpg',
  cappuccino: '/images/items/cappuccino.jpg',
  'cafe-latte': '/images/items/cafe-latte.jpg',
  'cafe-allonge': '/images/items/espresso.jpg',
  'double-espresso': '/images/items/espresso.jpg',
  the: '/images/items/the.jpg',
  'chocolat-chaud': '/images/items/chocolat.jpg',
  'chocolat-viennois': '/images/items/chocolat.jpg',
  'cafe-viennois': '/images/items/cafe-latte.jpg',
  'latte-macchiato': '/images/items/cafe-latte.jpg',
  'matcha-glace': '/images/items/the.jpg',
  // Softs
  'coca-cola': '/images/items/soft-cola.jpg',
  'coca-zero': '/images/items/soft-cola.jpg',
  jus: '/images/items/jus-orange.jpg',
  'eau-50cl': '/images/items/eau.jpg',
  'eau-emporter': '/images/items/eau.jpg',
  'eau-petillante-emporter': '/images/items/eau.jpg',
}

/** Map catégorie → image fallback. */
const CATEGORY_MAP: Record<string, string> = {
  pizzas: '/images/items/pizza-generic.jpg',
  paninis: '/images/items/panini.jpg',
  bieres: '/images/items/beer-tap.jpg',
  vins: '/images/items/wine-glass.jpg',
  cocktails: '/images/items/cocktail-spritz.jpg',
  smoothies: '/images/items/smoothie.jpg',
  'boissons-chaudes': '/images/items/cappuccino.jpg',
  softs: '/images/items/soft-cola.jpg',
}

/** Heuristiques par tag (pour bières pression vs bouteille, frappés vs smoothies, etc.). */
function resolveByTag(category: string, tags: string[] = []): string | null {
  const t = new Set(tags)
  if (category === 'bieres') {
    if (t.has('pression')) return '/images/items/beer-draft.jpg'
    if (t.has('bouteille')) return '/images/items/beer-bottle.jpg'
  }
  if (category === 'smoothies') {
    if (t.has('milkshake')) return '/images/items/milkshake.jpg'
    if (t.has('frappé')) return '/images/items/frappe.jpg'
    if (t.has('smoothie')) return '/images/items/smoothie.jpg'
  }
  if (category === 'softs') {
    if (t.has('eau')) return '/images/items/eau.jpg'
    if (t.has('jus')) return '/images/items/jus-orange.jpg'
    if (t.has('soda')) return '/images/items/soft-cola.jpg'
    if (t.has('emporter')) return '/images/items/soft-cola.jpg'
  }
  if (category === 'paninis') return '/images/items/panini.jpg'
  return null
}

export function useMenuImage() {
  function resolve({ category, slug, tags, override }: ResolveOptions): string {
    if (override) return override
    if (SLUG_MAP[slug]) return SLUG_MAP[slug] as string
    const byTag = resolveByTag(category, tags)
    if (byTag) return byTag
    return CATEGORY_MAP[category] ?? '/images/items/pizza-generic.jpg'
  }

  return { resolve }
}
