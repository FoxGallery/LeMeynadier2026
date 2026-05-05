# Cahier des charges technique — Le Meynadier 2026

**Site vitrine** — Brasserie / Pub — Cannes
**Repo :** `FoxGallery/LeMeynadier2026`
**Date :** 2026-05-05
**Version :** 1.0

---

## 1. Contexte & objectifs

### 1.1 Le client
**Le Meynadier** est une brasserie / pub située à Cannes (rue Meynadier). L'établissement propose une carte de pizzas signatures, paninis, bières pression et bouteilles, vins, cocktails et boissons chaudes. L'ambiance est celle d'un pub français haut de gamme : bois noyer massif, accents laiton/doré, guirlandes lumineuses, verdure, atmosphère chaleureuse et urbaine.

### 1.2 Objectifs du site
- **Vitrine** : présenter le lieu, l'ambiance, la carte et les coordonnées.
- **Image de marque** : transmettre l'ADN du lieu — chaleureux, qualitatif, moderne, méditerranéen.
- **Conversion locale** : faire venir les passants et touristes (Cannes → forte audience EN / IT).
- **Performance** : ultra-rapide, 100 % statique, hébergeable sur FTP mutualisé classique.
- **Évolutivité** : architecture qui supportera plus tard une carte dynamique, réservations, événements, multi-établissements.

### 1.3 Hors périmètre (v1)
- Réservations en ligne.
- Click & collect / commande en ligne.
- Back-office / CMS (le contenu est en dur dans le code, géré via PR Git).
- Paiement, programme fidélité, newsletter.
- Tracking publicitaire (privacy-first).

---

## 2. Stack technique

> Choix : la stack la plus récente, la plus rapide, la plus sécurisée et la plus propre disponible en 2026, avec une contrainte forte : **build statique déployable par FTP**.

### 2.1 Cœur applicatif
| Brique | Choix | Pourquoi |
|---|---|---|
| Framework | **Nuxt 4** (SSG via `nuxi generate`) | Génération statique pure, file-based routing, DX top, écosystème Vue mature |
| UI runtime | **Vue 3.5+** (option Vapor mode pour composants critiques) | Réactivité fine, perf, écosystème |
| Langage | **TypeScript 5.x strict** | Sécurité de typage, refactoring sûr |
| Package manager | **pnpm** | Rapide, store déduplique, lockfile déterministe |
| Node runtime build | **Node 22 LTS** | Support officiel, perf V8 |

### 2.2 Styling & UI
| Brique | Choix | Pourquoi |
|---|---|---|
| CSS | **Tailwind CSS v4** (Oxide engine, Rust) | La stack CSS la plus moderne et la plus rapide en 2026, config CSS-first via `@theme`, JIT instantané |
| Composants headless accessibles | **Reka UI** (port Vue de Radix) via **shadcn-vue** | Composants copiés dans le repo, pleinement contrôlables, accessibles WCAG 2.2 AA |
| Icônes | **Lucide** (via `unplugin-icons`) + pictos custom SVG | Léger, tree-shaken |
| Polices | **@nuxt/fonts** (self-hosting auto) | Zéro requête tierce, perf optimale, RGPD-friendly |

### 2.3 Animation & interactions
| Brique | Choix | Pourquoi |
|---|---|---|
| Animations composants | **Motion-v** (port Framer Motion pour Vue) | API déclarative, perf GPU |
| Animations scroll cinématiques | **GSAP** + **ScrollTrigger** | Référence de l'industrie pour parallax / pin / reveal |
| Smooth scroll | **Lenis** | Scroll inertiel haut de gamme, accessible (respect `prefers-reduced-motion`) |
| Transitions de page | **View Transitions API** (native + polyfill Vue) | Transitions fluides FR↔EN↔IT et entre pages |

### 2.4 Internationalisation
| Brique | Choix |
|---|---|
| i18n | **@nuxtjs/i18n v9** |
| Locales | `fr` (défaut), `en`, `it` |
| Routing | Préfixé : `/fr/*`, `/en/*`, `/it/*` |
| Détection | Auto via `navigator.language` à la 1re visite, cookie de persistance |
| Formats | Devise EUR, dates locale, nombres locale via `Intl` |

### 2.5 Images, contenu & SEO
| Brique | Choix |
|---|---|
| Images | **@nuxt/image** + IPX → AVIF/WebP responsive, `loading="lazy"`, `fetchpriority` |
| Contenu de la carte | **@nuxt/content v3** (collections Markdown/YAML typées) — la carte est versionnée en Git |
| SEO | **@nuxtjs/seo** (sitemap multi-locale avec `hreflang`, robots.txt, OG, Twitter, canonical, JSON-LD) |
| Données structurées | **JSON-LD** : `Restaurant` / `BarOrPub` (horaires, géo, menu, images) |

### 2.6 Qualité, tests & DX
| Brique | Choix |
|---|---|
| Linter / formatter | **Biome** (remplace ESLint + Prettier — plus rapide, config unique) |
| Tests unitaires | **Vitest** + **@nuxt/test-utils** + **@vue/test-utils** |
| Tests E2E | **Playwright** (Chromium + WebKit + Firefox) |
| Tests visuels | **Playwright** screenshots + diff |
| Tests a11y | **axe-core** intégré dans Playwright |
| Hooks Git | **Husky** + **lint-staged** |
| Convention de commit | **Conventional Commits** + **commitlint** |
| Types validation | **Zod** (validation runtime des collections de contenu) |
| Perf monitoring CI | **Lighthouse CI** avec budgets stricts |

### 2.7 CI / CD
- **GitHub Actions** :
  - PR : lint, typecheck, tests unit, E2E headless, Lighthouse CI, build.
  - Tag `v*` : build → upload artefact `dist/` → déploiement FTP via `SamKirkland/FTP-Deploy-Action`.
- Secrets FTP stockés en `Repository secrets` chiffrés (`FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PATH`).

---

## 3. Architecture du projet

```
LeMeynadier2026/
├── app/                          # Nuxt 4 app directory
│   ├── components/
│   │   ├── layout/               # Header, Footer, LangSwitcher
│   │   ├── home/                 # Hero, Signature, Ambiance, BeerCount, MapTeaser
│   │   ├── menu/                 # MenuSection, MenuItem, PriceTag
│   │   ├── ui/                   # shadcn-vue: Button, Card, Dialog, Tabs…
│   │   └── effects/              # StringLights, GoldDivider, WoodGrain, ParallaxImage
│   ├── composables/              # useScrollReveal, useReducedMotion, useGeoLang
│   ├── layouts/                  # default.vue, minimal.vue
│   ├── pages/                    # index, carte, histoire, galerie, contact, legal
│   ├── assets/
│   │   ├── css/                  # tailwind.css (avec @theme tokens), fonts.css
│   │   └── images/               # photos lieu (optimisées), logo SVG
│   └── plugins/                  # gsap.client.ts, lenis.client.ts, motion.ts
├── content/                      # @nuxt/content
│   ├── menu/
│   │   ├── pizzas.yml
│   │   ├── paninis.yml
│   │   ├── bieres.yml
│   │   ├── vins.yml
│   │   ├── cocktails.yml
│   │   ├── boissons-chaudes.yml
│   │   ├── softs.yml
│   │   └── smoothies.yml
│   └── pages/                    # textes Markdown FR/EN/IT
├── i18n/
│   └── locales/
│       ├── fr.json
│       ├── en.json
│       └── it.json
├── public/
│   ├── favicon/                  # favicon multi-tailles, apple-touch, manifest
│   └── og/                       # images Open Graph
├── tests/
│   ├── unit/
│   └── e2e/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy-ftp.yml
├── nuxt.config.ts
├── tailwind.css                  # @theme directive (tokens CSS-first)
├── biome.json
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Identité visuelle & Design System

### 4.1 ADN du lieu (constaté sur photos)
- **Bois noyer foncé** : comptoir, tables, lambris.
- **Laiton / doré** : lignes fines, robinets de bière, encadrements.
- **Guirlandes lumineuses** : ambiance pub feutrée, points lumineux chaleureux.
- **Verdure** : plantes sur le comptoir, accent naturel.
- **Cartes** : noir profond + or + serif élégant ("Augusta" style → Playfair / Cormorant), accents rouges sourds.
- **Lumière chaude** : tons ambrés, éclairage tamisé.

### 4.2 Tokens CSS (Tailwind v4 `@theme`)
```css
@theme {
  /* Couleurs */
  --color-walnut-50:  #f7f1ea;
  --color-walnut-100: #ebdcc8;
  --color-walnut-300: #b58a5e;
  --color-walnut-500: #6e4528;
  --color-walnut-700: #3d2415;
  --color-walnut-900: #1a0e07;
  --color-brass-300: #e6c884;
  --color-brass-500: #c9a45e;     /* doré principal */
  --color-brass-700: #8b6e35;
  --color-cream:     #f4ead8;     /* papier menu */
  --color-burgundy:  #6b1a1a;     /* accent rouge profond */
  --color-leaf:      #4a6b3a;
  --color-ink:       #0c0907;     /* noir profond chaud */

  /* Typographie */
  --font-display: "Cormorant Garamond", "Playfair Display", Georgia, serif;
  --font-body:    "Inter Tight", "Inter", system-ui, sans-serif;
  --font-script:  "Italianno", cursive;          /* hero accent uniquement */

  /* Échelle (modular scale 1.250) */
  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.25rem;
  --text-xl:   1.563rem;
  --text-2xl:  1.953rem;
  --text-3xl:  2.441rem;
  --text-4xl:  3.052rem;
  --text-5xl:  3.815rem;
  --text-6xl:  4.768rem;

  /* Rayons, ombres, espacements */
  --radius-card: 0.75rem;
  --radius-pill: 9999px;
  --shadow-warm: 0 10px 30px -10px rgba(201, 164, 94, 0.25);
  --shadow-deep: 0 30px 60px -20px rgba(12, 9, 7, 0.5);
}
```

### 4.3 Composants UI signatures
- **GoldDivider** : trait fin doré avec ornement central (croisement de feuilles ou losange).
- **StringLights** : SVG animé en CSS — points lumineux clignotants subtils en haut de section (respect `prefers-reduced-motion`).
- **WoodGrain** : texture noyer en `background-image` SVG très subtile (5–8 % opacity).
- **MenuCard** : papier crème, ombre chaude, prix dans pastille laiton.
- **CTAButton** : bordure laiton, hover → fond doré + texte noyer profond.

### 4.4 Animations clés
| Élément | Animation |
|---|---|
| Hero | Photo bar en parallax léger + voile sombre + titre serif qui se révèle (mask reveal) |
| Sections | Fade-up + slight blur out |
| Carte | Items qui apparaissent en stagger sur scroll |
| Bière pression | Animation SVG d'une bière qui se remplit (icône) |
| Transition pages | View Transitions native, fade + slide subtil |
| Lang switch | Cross-fade des textes traduits |

### 4.5 Tonalité éditoriale
- Voix : chaleureuse, complice, fière du local.
- FR : tutoiement modéré, vocabulaire pub français.
- EN : friendly, slightly playful, "Cannes' favourite spot".
- IT : caloroso, conviviale, "il tuo pub a Cannes".

---

## 5. Arborescence et contenu

### 5.1 Pages

| Route | Titre FR | Contenu |
|---|---|---|
| `/` | Accueil | Hero immersif, USP, teaser carte, ambiance, infos pratiques, map teaser |
| `/carte` | La Carte | Onglets : Pizzas, Paninis, Bières, Vins, Cocktails, Smoothies & Frappés, Boissons chaudes, Softs |
| `/histoire` | Notre histoire | L'esprit du lieu, situation à Cannes, équipe |
| `/galerie` | Galerie | Photos lieu (lightbox), grille masonry |
| `/contact` | Nous trouver | Adresse, tel, horaires, carte interactive (Maplibre + tuiles OSM, pas de Google) |
| `/mentions-legales` | Mentions légales | Légal FR |
| `/confidentialite` | Confidentialité | RGPD, cookies (privacy-first → bannière minimale ou aucune si pas de cookie tiers) |

### 5.2 Carte (sourcée des photos)

**Pizzas (à compléter avec prix exacts par le client)**
Margarita, Reine, 4 Fromages, Diavola, Al Pollo, Montagnarde, Orientale, Méridionale, Raffinée.

**Paninis** (6,50 €) — Jambon mozzarella, Merguez chorizo, Poulet curry, Chèvre courgette, Burger, 4 fromages.

**Bières pression** — Falcon Blonde, Affligem Blonde, Pelforth.
**Bières bouteilles** — Heineken, Spitz, Coronita, Desperados, Triple Karmeliet.

**Vins** — Rosé / Blanc / Rouge IGP Gard Domaine Source Marine, Côtes du Rhône.

**Cocktails** — Piña Colada, Exotic, Spritz, Rouge Diesel, Dragon, Tabula.

**Boissons chaudes** — Espresso, Cappuccino, Double espresso, Thé, Déca, Café noisette, Café allongé, Chocolat chaud, etc.

**Softs** — Coca-Cola, Orangina, Schweppes, Perrier, Sprite, Fanta, Diabolo menthe, jus de fruits, etc.

**Smoothies / Frappés / Milkshakes** — Tugada, Red Bowl, Fruits on the Beach, Coco céline, Pink Paradise, Café frappé, Vanilla frappé, Choky frappé, Florida, California, Manhattan, Vanille.

> ⚠️ Les prix exacts et descriptions seront récupérés auprès du client en début de M3 (issue dédiée).

### 5.3 Localisation
- 3 langues : `fr` (défaut), `en`, `it`.
- Toutes les chaînes UI dans `i18n/locales/{lang}.json`.
- Contenu long (histoire, mentions légales) en Markdown localisé dans `content/pages/{slug}.{lang}.md`.
- Items de carte traduits via champ multilingue dans le YAML : `name: { fr: "...", en: "...", it: "..." }`.

---

## 6. Performance & accessibilité

### 6.1 Budgets perf (Lighthouse CI bloquant)
| Métrique | Cible |
|---|---|
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | = 100 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | = 100 |
| LCP | < 2,0 s |
| CLS | < 0,05 |
| INP | < 150 ms |
| TBT | < 200 ms |
| JS initial (gz) | < 100 ko |
| Image hero | < 120 ko AVIF |

### 6.2 Accessibilité
- WCAG 2.2 niveau AA.
- Contraste ≥ 4,5 (texte) / 3,0 (gros texte et UI).
- Navigation 100 % clavier (focus visible doré).
- Skip-to-content.
- `lang` attribute par locale, `dir="ltr"`.
- `prefers-reduced-motion` respecté (désactive Lenis + GSAP non essentiels).
- Audit `axe` en CI sur chaque page.

---

## 7. SEO

- Sitemap multi-locale avec `hreflang` (fr, en, it, x-default → fr).
- robots.txt explicite.
- Canonical par page et par locale.
- Open Graph + Twitter cards par page (image dédiée 1200×630).
- JSON-LD `Restaurant` / `BarOrPub` :
  - `name`, `address`, `geo`, `telephone`, `openingHoursSpecification`, `servesCuisine`, `priceRange`, `image`, `url`, `sameAs` (réseaux sociaux).
- JSON-LD `BreadcrumbList` sur pages internes.
- Slugs locaux : `/fr/carte`, `/en/menu`, `/it/menu`.
- Pré-rendu de toutes les routes par locale.

---

## 8. Sécurité

- Site 100 % statique → surface d'attaque minimale.
- **HTTPS obligatoire** côté hébergement FTP (vérifier que le mutualisé fournit Let's Encrypt).
- Headers via `.htaccess` (FTP Apache typique) :
  - `Content-Security-Policy` strict (`default-src 'self'`, `img-src 'self' data:`, `font-src 'self'`).
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy` (désactive geolocation, microphone, camera, etc.).
- Pas de tracker tiers par défaut → pas de cookie → pas de bannière intrusive.
- Si analytics ajouté plus tard : **Plausible** ou **Umami** auto-hébergé, sans cookie.
- Dépendances scannées par `pnpm audit` + Dependabot.
- Secrets FTP **jamais** commités, uniquement en GitHub Secrets.
- Validation des collections de contenu via **Zod** (build casse si la donnée ne respecte pas le schéma).

---

## 9. Build & déploiement FTP

### 9.1 Build statique
```bash
pnpm install --frozen-lockfile
pnpm generate     # génère .output/public/
```

### 9.2 Sortie
- Dossier produit : `.output/public/` (équivalent `dist/`).
- Tous les HTML pré-rendus par locale.
- Assets hashés pour cache long.
- `_redirects` / `.htaccess` inclus.

### 9.3 Déploiement
**Option A — Manuel** : drag & drop du dossier `.output/public/` sur le FTP via FileZilla.
**Option B — Automatique** : GitHub Action sur tag `v*` qui :
1. Build.
2. Upload SFTP/FTPS via `SamKirkland/FTP-Deploy-Action@v4`.
3. Notification Slack/Discord (optionnel).

### 9.4 Hébergement
- **Mutualisé** classique (OVH, o2switch, Infomaniak…) compatible.
- Pré-requis : Apache ou Nginx, HTTPS Let's Encrypt, FTP/SFTP/FTPS.
- **Pas** de Node, **pas** de PHP, **pas** de base de données.

---

## 10. Roadmap & milestones

> Toutes les milestones et issues sont créées sur GitHub via `gh` API.

### M1 — Foundation (Setup & infra)
Bootstrap Nuxt 4, TS strict, Tailwind v4, Biome, Husky, commitlint, structure de dossiers, CI lint + typecheck + build.

### M2 — Design System
Tokens CSS, fonts self-hostées, composants UI de base (Button, Card, Tabs, Dialog, Lightbox), composants signature (GoldDivider, StringLights, WoodGrain), Storybook ou page `/_components` interne.

### M3 — Pages & contenu statique
Layout global (Header, Footer, LangSwitcher), pages Home / Carte / Histoire / Galerie / Contact / Légal, intégration des photos optimisées, contenu @nuxt/content avec schémas Zod.

### M4 — Internationalisation
@nuxtjs/i18n setup, locales fr/en/it complètes, détection automatique, persistance cookie, switcher accessible, hreflang + sitemap multi-locale.

### M5 — Animations & expérience
GSAP + ScrollTrigger, Lenis smooth scroll, Motion-v sur composants, View Transitions, hero parallax, reveal sections, micro-interactions.

### M6 — SEO, perf, a11y
@nuxtjs/seo, JSON-LD Restaurant/BarOrPub, OG images, Lighthouse CI avec budgets bloquants, audit axe, optimisations finales (images, JS, fonts).

### M7 — QA & sécurité
Suite Vitest, suite Playwright (smoke + a11y + i18n), tests visuels, .htaccess durci (CSP, HSTS), audit dépendances, doc de QA.

### M8 — Build & déploiement FTP
Workflow GitHub Action FTP, doc déploiement, runbook rollback, premier déploiement de pré-production, validation client, mise en prod.

---

## 11. Critères d'acceptation globaux

- ✅ Build `pnpm generate` 100 % statique, déposable tel quel sur FTP.
- ✅ Tous les scores Lighthouse ≥ 95 (Performance, A11y = 100, BP, SEO).
- ✅ 3 langues complètes (fr/en/it), aucune chaîne en dur dans le code.
- ✅ Détection automatique de la langue à la 1re visite, puis persistance.
- ✅ Audit axe sans erreur sur toutes les pages.
- ✅ CSP strict actif, HSTS actif, aucun script tiers.
- ✅ CI verte sur PR (lint, typecheck, tests, build, Lighthouse).
- ✅ Documentation : README de dev + runbook de déploiement FTP.
- ✅ Livraison du repo + accès à un environnement de pré-production.

---

## 12. Livrables

1. Code source dans `FoxGallery/LeMeynadier2026` (branche `main` protégée).
2. Documentation : `README.md` (dev), `DEPLOYMENT.md` (FTP), `CONTENT.md` (édition de la carte).
3. Build de pré-production déployé sur sous-domaine de test.
4. Build de production déployé sur le domaine final.
5. Tag `v1.0.0` au moment de la mise en ligne.
6. Transfert de connaissance : 1 visio de 30 min pour expliquer comment éditer la carte (YAML) et redéployer.
