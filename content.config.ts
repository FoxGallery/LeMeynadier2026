import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

/* ──────────────────────────────────────────────────────────────────────────
 * Le Meynadier — Configuration @nuxt/content (collections + schémas Zod)
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * Champ texte multilingue : `fr` requis (langue par défaut),
 * `en` et `it` optionnels avec fallback automatique sur `fr`.
 */
const i18nString = z.object({
  fr: z.string().min(1),
  en: z.string().optional(),
  it: z.string().optional(),
})

/**
 * Item de carte — pizza, panini, bière, vin, cocktail, etc.
 *
 * - `slug` : identifiant stable (kebab-case) — utilisé pour l'ancre URL et tracking.
 * - `name` : nom multilingue.
 * - `description` : description courte multilingue.
 * - `price` : nombre en EUR ou `null` si à valider auprès du client.
 * - `tags` : étiquettes libres (`classique`, `signature`, `épicé`, `végé`, …).
 * - `image` : chemin vers l'image dans `public/` ou URL absolue.
 * - `order` : ordre d'affichage dans la catégorie.
 * - `available` : `false` masque l'item (saisonnier, rupture).
 */
const menuItem = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/, 'slug doit être en kebab-case'),
  name: i18nString,
  description: i18nString.optional(),
  price: z.number().positive().nullable(),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  imageAlt: i18nString.optional(),
  order: z.number().int().optional(),
  available: z.boolean().optional().default(true),
})

/**
 * Catégorie (1 fichier YAML par catégorie) : métadonnées + items.
 *
 * Permet d'éditer la carte par catégorie en un seul fichier, et de réordonner
 * facilement les items en faisant glisser des lignes YAML.
 */
const menuCategory = z.object({
  /** Identifiant kebab-case de la catégorie (ex: pizzas, bieres-pression). */
  category: z.string().regex(/^[a-z0-9-]+$/),
  /** Nom affiché dans les onglets (multilingue). */
  label: i18nString,
  /** Description optionnelle de la catégorie (sous-titre dans la page Carte). */
  description: i18nString.optional(),
  /** Ordre d'affichage des onglets. */
  order: z.number().int(),
  /** Items de la catégorie. */
  items: z.array(menuItem).min(1),
})

export type I18nString = z.infer<typeof i18nString>
export type MenuItem = z.infer<typeof menuItem>
export type MenuCategory = z.infer<typeof menuCategory>

export default defineContentConfig({
  collections: {
    /**
     * Collection `menu` — toutes les catégories de la carte.
     *
     * Un fichier `content/menu/{category}.yml` par catégorie.
     */
    menu: defineCollection({
      type: 'data',
      source: 'menu/*.yml',
      schema: menuCategory,
    }),

    /**
     * Collection `pages` — contenu long localisé en Markdown
     * (histoire, mentions légales, confidentialité…).
     *
     * Convention : `content/pages/{slug}.{lang}.md`.
     */
    pages: defineCollection({
      type: 'page',
      source: 'pages/**/*.md',
    }),
  },
})
