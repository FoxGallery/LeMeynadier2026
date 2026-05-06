<div align="center">

<br>

```
  ─────────────  ◆  ─────────────

      L E   M E Y N A D I E R
            — 2 0 2 6 —

  Brasserie · Pizzeria · Pub — Cannes

  ─────────────  ◆  ─────────────
```

<br>

**Site vitrine de la brasserie Le Meynadier à Cannes.**
*Pizzas signatures, bières pression, cocktails — au cœur du vieux Cannes.*

<br>

[Cahier des charges](./CAHIER-DES-CHARGES.md) ·
[Milestones](https://github.com/FoxGallery/LeMeynadier2026/milestones) ·
[Issues](https://github.com/FoxGallery/LeMeynadier2026/issues)

<br>

</div>

---

## Sommaire

1. [Le projet](#le-projet)
2. [Stack technique](#stack-technique)
3. [Identité visuelle](#identité-visuelle)
4. [Architecture](#architecture)
5. [Démarrer](#démarrer)
6. [Scripts npm](#scripts-npm)
7. [Tests & qualité](#tests--qualité)
8. [Internationalisation](#internationalisation)
9. [Build & déploiement](#build--déploiement)
10. [Roadmap & statut](#roadmap--statut)
11. [Conventions & contribution](#conventions--contribution)

---

## Le projet

**Le Meynadier** est une brasserie / pub située rue Meynadier, au cœur de Cannes. L'établissement
propose une carte de **pizzas signatures**, **paninis**, **bières pression et bouteilles**, **vins**,
**cocktails** et **boissons chaudes**.

Le site web a trois objectifs :

- **Vitrine** — présenter le lieu, l'ambiance, la carte et les coordonnées.
- **Image de marque** — transmettre l'ADN du Meynadier : chaleureux, qualitatif, méditerranéen.
- **Conversion locale** — capter les passants et touristes (Cannes → forte audience anglophone et italophone).

Le site est **100 % statique**, ultra-rapide, hébergeable sur n'importe quel mutualisé classique
(OVH, o2switch, Infomaniak…) via simple dépôt FTP.

> 📄 Pour le détail des choix, contraintes et critères d'acceptation, voir
> **[`CAHIER-DES-CHARGES.md`](./CAHIER-DES-CHARGES.md)**.

---

## Stack technique

> La stack la plus moderne disponible en 2026, sélectionnée pour la performance, la sécurité,
> la pérennité, et la contrainte forte d'un build statique livrable par FTP.

### Cœur applicatif

| Brique | Choix | Pourquoi |
|---|---|---|
| Framework | **Nuxt 4** (SSG via `nuxi generate`) | Génération statique pure, file-based routing, écosystème Vue mature |
| UI runtime | **Vue 3.5** | Réactivité fine, perf, écosystème |
| Routing | **vue-router 5** | Auto-routes typées (volar plugin), API stable |
| Langage | **TypeScript 5.9** strict | Sécurité de typage, refactoring sûr |
| Package manager | **pnpm 10.20** | Rapide, store dédupliqué, lockfile déterministe |
| Runtime | **Node 22 LTS** | Support officiel, performance V8 |

### Style & UI

| Brique | Choix | Pourquoi |
|---|---|---|
| CSS | **Tailwind CSS v4** *(moteur Oxide, Rust)* | La stack CSS la plus rapide, config CSS-first via `@theme` |
| Composants headless | **Reka UI** *(port Vue de Radix)* | Accessibilité ARIA native, focus trap, WCAG 2.2 AA |
| Variantes typées | **class-variance-authority** | Composants déclaratifs et type-safe |
| Icônes | **Lucide** *(`lucide-vue-next`)* | Léger, tree-shaken, cohérence visuelle |
| Polices | **`@nuxt/fonts`** *(self-hosting auto)* | Aucune requête tierce, RGPD-friendly |

### Animation & interactions *(M5)*

| Brique | Choix |
|---|---|
| Animations composants | **Motion-v** *(port Framer Motion)* |
| Animations cinématiques | **GSAP** + **ScrollTrigger** |
| Smooth scroll | **Lenis** |
| Transitions de page | **View Transitions API** *(natif Nuxt 4)* |

### Internationalisation *(M4)*

| Brique | Choix |
|---|---|
| i18n | **`@nuxtjs/i18n` v9** |
| Locales | `fr` *(défaut)* · `en` · `it` |
| Routing | Préfixé : `/fr/*` · `/en/*` · `/it/*` |
| Détection | Auto via `navigator.language`, persistance cookie 1 an |
| Formats | Devise EUR, dates locales via `Intl` |

### Qualité, tests & DX

| Brique | Choix |
|---|---|
| Linter / formatter | **Biome 2.4** *(remplace ESLint + Prettier)* |
| Tests unitaires | **Vitest** + `@nuxt/test-utils` + `@vue/test-utils` + happy-dom |
| Tests E2E | **Playwright** *(Chromium + Firefox + WebKit)* |
| Tests a11y | **axe-core** intégré dans Playwright |
| Hooks Git | **Husky** + **lint-staged** |
| Convention de commit | **Conventional Commits** + commitlint |
| Validation runtime | **Zod** *(M3 — schémas de contenu)* |
| Perf monitoring CI | **Lighthouse CI** *(M6)* |

---

## Identité visuelle

Le design system est inspiré directement du lieu : bois noyer massif, accents laiton/doré,
guirlandes lumineuses, papier crème des cartes, ambiance pub feutrée.

### Palette

| Token | Hex | Usage |
|---|---|---|
| `walnut-50` → `walnut-950` | `#f7f1ea` → `#0d0703` | Bois noyer, fond et hiérarchie sombre (11 nuances) |
| `brass-100` → `brass-900` | `#f6e7c2` → `#4d3a16` | Doré / laiton, accents et CTA (5 nuances) |
| `cream` | `#f4ead8` | Papier des cartes physiques |
| `burgundy` | `#6b1a1a` | Accent rouge profond |
| `leaf` | `#4a6b3a` | Verdure (plantes du comptoir) |
| `ink` | `#0c0907` | Noir profond chaud |

### Typographie

| Famille | Police | Rôle |
|---|---|---|
| `font-display` | **Cormorant Garamond** | Titres, hero, élégance serif type "Augusta" |
| `font-body` | **Inter Tight** | Texte courant, lisibilité moderne |
| `font-script` | **Italianno** | Accent script (uniquement hero, brief) |

> Toutes les fonts sont **self-hostées** via `@nuxt/fonts`. Aucune requête vers `googleapis.com`
> ou `gstatic.com`. Fallbacks générés avec `size-adjust` / `ascent-override` pour CLS = 0
> au swap.

### Composants signature

| Composant | Description |
|---|---|
| `<GoldDivider>` | Trait fin doré avec ornement central *(diamond / leaf / dot)*, 3 tailles |
| `<StringLights>` | SVG guirlande lumineuse animée *(scintillement aléatoire, respect `prefers-reduced-motion`)* |
| `<WoodGrain>` | Pattern grain de bois inline en data-URI *(opacité tunable, 5–8 % par défaut)* |
| `<MenuCard>` | Item de menu papier crème + pastille prix laiton, prix locale-aware via `Intl` |
| `<UiButton>` | 4 variantes *(primary / outline / ghost / link)* × 3 tailles, polymorphic |

### Catalogue visuel

Deux pages internes (dev-only, `noindex`, **exclues du build prod**) montrent l'intégralité du DS :

- `/dev-tokens` — couleurs, typographie, échelles, ombres, rayons
- `/dev-components` — boutons, cards, tabs, dialogs, sheets, tooltips, badges, séparateurs,
  effets signature, MenuCard

```bash
pnpm dev
# Ouvrir http://localhost:3000/dev-tokens
# Ouvrir http://localhost:3000/dev-components
```

---

## Architecture

```
LeMeynadier2026/
├── app/                          ← Nuxt 4 app directory
│   ├── components/
│   │   ├── effects/              ← GoldDivider, StringLights, WoodGrain
│   │   ├── home/                 ← (M3) Hero, Signature, Ambiance...
│   │   ├── layout/               ← (M3) Header, Footer, LangSwitcher
│   │   ├── menu/                 ← MenuCard
│   │   └── ui/                   ← UiButton, UiCard, UiTabs, UiDialog,
│   │                               UiSheet, UiTooltip, UiSeparator, UiBadge
│   ├── composables/              ← (M5) useScrollReveal, useReducedMotion...
│   ├── layouts/                  ← default, minimal
│   ├── pages/                    ← index + dev-tokens + dev-components
│   ├── plugins/                  ← (M5) gsap.client, lenis.client...
│   ├── utils/                    ← cn() — clsx + tailwind-merge
│   ├── assets/css/               ← tailwind.css avec @theme tokens
│   └── app.vue                   ← entrée racine
├── content/                      ← (M3) @nuxt/content collections
│   ├── menu/                     ← pizzas, paninis, bières, vins...
│   └── pages/                    ← histoire, mentions légales (FR/EN/IT)
├── i18n/locales/                 ← (M4) fr.json, en.json, it.json
├── public/                       ← favicons, OG images
├── tests/
│   ├── unit/                     ← Vitest (UiButton, MenuCard, smoke)
│   └── e2e/                      ← Playwright (home, a11y axe)
├── .github/workflows/ci.yml      ← Lint, typecheck, test, build, e2e
├── .husky/                       ← pre-commit (lint-staged), commit-msg
├── nuxt.config.ts                ← Config Nuxt + Vite + fonts
├── tailwind.css                  ← @theme directive (tokens CSS-first)
├── biome.json                    ← Lint + format
├── commitlint.config.mjs         ← Conventional commits
├── tsconfig.json                 ← TS strict (noUncheckedIndexedAccess, ...)
├── playwright.config.ts          ← E2E sur 3 navigateurs
├── vitest.config.ts              ← Unit tests + coverage v8
└── CAHIER-DES-CHARGES.md         ← Spec technique complète
```

---

## Démarrer

### Pré-requis

- **Node 22 LTS** *(voir `.nvmrc`)*
- **pnpm 10.20+** *(activé via `corepack enable`)*

```bash
git clone https://github.com/FoxGallery/LeMeynadier2026.git
cd LeMeynadier2026
corepack enable
pnpm install
pnpm dev
```

Le serveur dev tourne sur **http://localhost:3000**.

### Variables d'environnement

Pour l'instant, aucune variable n'est requise *(site 100 % statique)*. Les futures variables
*(URL de prod, intégrations)* seront documentées au fur et à mesure dans `.env.example`.

---

## Scripts npm

| Commande | Description |
|---|---|
| `pnpm dev` | Dev server avec HMR |
| `pnpm build` | Build SSR *(non utilisé en prod, on utilise `generate`)* |
| `pnpm generate` | **Build statique** → `.output/public/` *(à déposer en FTP)* |
| `pnpm preview` | Servir le build pour test local |
| `pnpm typecheck` | Vérification TypeScript via `vue-tsc` |
| `pnpm lint` | Biome — lint + format check |
| `pnpm lint:fix` | Biome — auto-fix |
| `pnpm format` | Biome — formatage seul |
| `pnpm test` | Vitest — tests unitaires |
| `pnpm test:watch` | Vitest en mode watch |
| `pnpm test:coverage` | Vitest avec couverture v8 |
| `pnpm test:e2e` | Playwright — tests E2E |
| `pnpm test:e2e:ui` | Playwright UI mode interactif |

---

## Tests & qualité

### Tests unitaires *(Vitest)*

Couverture des composants critiques avec `@vue/test-utils` + happy-dom.

```bash
pnpm test
```

État actuel : **18 tests verts** sur 3 fichiers *(smoke, UiButton, MenuCard)*.

### Tests E2E *(Playwright)*

3 navigateurs *(Chromium, Firefox, WebKit)* avec audit accessibilité **axe-core** intégré.

```bash
pnpm test:e2e                  # headless
pnpm test:e2e:ui               # UI interactive
```

Helper `expectAxeClean(page)` qui vérifie WCAG 2 AA + 2.1 AA + 2.2 AA.

### Linting & formatting *(Biome)*

Une seule outil, ultra-rapide *(remplace ESLint + Prettier)*.

```bash
pnpm lint                      # check sans modification
pnpm lint:fix                  # auto-fix
```

Règles strictes :

- `quoteStyle: single`, `semicolons: asNeeded`, `trailingCommas: all`, `lineWidth: 100`
- `useImportType: error`, `noUnusedImports: error`, `noExplicitAny: warn`
- Override `.vue` : tolère `useConst` off et `noUnusedImports` off *(Nuxt auto-imports)*

### Hooks Git

| Hook | Action |
|---|---|
| `pre-commit` | `lint-staged` → Biome auto-fix sur fichiers staged |
| `commit-msg` | `commitlint` — refuse les commits hors **Conventional Commits** |

### CI *(GitHub Actions)*

Sur chaque PR et push sur `main` :

1. **Quality** — `pnpm lint` + `pnpm typecheck`
2. **Test** — `pnpm test:coverage` + upload artefact
3. **Build** — `pnpm generate` + upload artefact `dist/`
4. **E2E** — Playwright 3 navigateurs *(dépend du build)*, cache des binaires

Concurrency group : annule automatiquement les runs obsolètes.

---

## Internationalisation

> Mise en place complète planifiée en **M4**.

3 langues : **français** *(défaut)*, **anglais**, **italien**.

| Aspect | Implémentation |
|---|---|
| Routing | Préfixé : `/fr/*` · `/en/*` · `/it/*` *(slugs localisés)* |
| Détection | `navigator.language` à la 1re visite, cookie `meynadier-lang` 1 an |
| UI texts | `i18n/locales/{lang}.json` namespaced *(common, nav, home, menu, contact)* |
| Contenu long | Markdown localisé *(`content/pages/{slug}.{lang}.md`)* |
| Items menu | Champ multilingue YAML : `name: { fr, en, it }` |
| SEO | Sitemap unifié + balises `hreflang` *(fr, en, it, x-default = fr)* |
| Format | `Intl.NumberFormat` / `Intl.DateTimeFormat` selon locale active |

---

## Build & déploiement

### Build statique

```bash
pnpm install --frozen-lockfile
pnpm generate
```

**Sortie** : `.output/public/` *(équivalent `dist/`)*. Symlink `dist/` créé automatiquement
par Nuxt.

Le dossier contient :

- HTML pré-rendus *(par locale, à venir)*
- Assets JS/CSS hashés *(cache long)*
- Polices `.woff2` *(self-hostées dans `_fonts/`)*
- Favicons et OG images

### Déploiement FTP

> Workflow GitHub Action automatique planifié en **M8**.

#### Manuel

1. `pnpm generate`
2. Drag & drop de `.output/public/*` sur le FTP via FileZilla / Cyberduck

#### Automatique *(M8)*

Push d'un tag `vX.Y.Z` → workflow `deploy-ftp.yml` qui build et upload via
`SamKirkland/FTP-Deploy-Action@v4`. Secrets stockés en **Repository secrets** chiffrés.

### Hébergement

Compatible avec n'importe quel mutualisé Apache / Nginx avec HTTPS *(Let's Encrypt typiquement)*
et FTP / SFTP / FTPS. **Pas** de Node, **pas** de PHP, **pas** de base de données.

Headers de sécurité durcis via `.htaccess` *(M7)* : CSP strict, HSTS, X-Frame-Options,
Permissions-Policy, etc. Cible **A+ sur securityheaders.com**.

---

## Roadmap & statut

> Suivi complet : [milestones GitHub](https://github.com/FoxGallery/LeMeynadier2026/milestones)

| Milestone | Statut | Issues | Description |
|---|---|---|---|
| **M1 — Foundation** | ✅ Terminée | 8/8 | Bootstrap Nuxt 4 + TS strict + Tailwind v4 + Biome + tests + CI |
| **M2 — Design System** | ✅ Terminée | 9/9 | Tokens, fonts self-hostées, composants UI Reka, signatures, catalogue DS |
| **M3 — Pages & contenu** | À faire | 0/10 | Layout global, Home, Carte, Histoire, Galerie, Contact, légal, @nuxt/content |
| **M4 — Internationalisation** | À faire | 0/6 | i18n FR/EN/IT, détection auto, slugs localisés, hreflang |
| **M5 — Animations & UX** | À faire | 0/6 | GSAP, Lenis, View Transitions, hero parallax, reveal stagger |
| **M6 — SEO, perf, a11y** | À faire | 0/7 | @nuxtjs/seo, JSON-LD Restaurant, OG images, Lighthouse CI, axe |
| **M7 — QA & sécurité** | À faire | 0/5 | Suite E2E complète, .htaccess durci, CSP, audit deps |
| **M8 — Build & déploiement** | À faire | 0/6 | Workflow FTP, doc déploiement, runbook rollback, mise en prod |

---

## Conventions & contribution

### Branches

- `main` — branche de production *(historique linéaire)*
- `feature/{issue-num}-{slug}` — nouvelles fonctionnalités
- `fix/{issue-num}-{slug}` — corrections
- `chore/{slug}` — tooling, doc, config

### Convention de commit *(Conventional Commits)*

```
<type>: <description courte impérative>

<body optionnel>

<footer optionnel : Closes #N>
```

**Types autorisés** : `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`,
`revert`, `style`, `test`.

**Exemples** :

```
feat: composant UiButton (4 variantes, 3 tailles, états complets)
fix: corrige le contraste insuffisant du focus ring sur fond clair
docs: ajoute la procédure de déploiement FTP manuel
```

> ⚠️ Les commits non conformes sont **rejetés par le hook `commit-msg`** *(commitlint)*.

### Pull requests

1. Créer une branche depuis `main`
2. Coder + tests + commit *(les hooks Git valident la qualité)*
3. Ouvrir une PR sur `main`
4. Attendre la CI verte *(quality, test, build, e2e)*
5. Merge en **squash + linear history**

### Édition de la carte et du contenu

Voir [`docs/CONTENT.md`](./docs/CONTENT.md) — guide complet d'édition pour
la carte (YAML par catégorie), les pages éditoriales, les libellés i18n,
les coordonnées (`useVenue.ts`), les photos, et les conventions de commit.

### Déploiement & rollback

Voir [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — workflow GitHub Action
FTPS (push staging / tag prod), secrets à configurer, rollback rapide
via re-deploy de tag, vérifications post-mise-en-prod.

### QA & checklist de release

Voir [`docs/QA.md`](./docs/QA.md) — runbook smoke test FR/EN/IT, tests
Lighthouse, axe a11y, link-checker, procédure incident.

---

<div align="center">

```
   ─────────────  ◆  ─────────────
```

**Le Meynadier — Cannes**
*Brasserie · Pizzeria · Pub*

[Cahier des charges](./CAHIER-DES-CHARGES.md) ·
[Milestones](https://github.com/FoxGallery/LeMeynadier2026/milestones) ·
[Deployment](./docs/DEPLOYMENT.md) ·
[Content](./docs/CONTENT.md) ·
[QA](./docs/QA.md)

</div>
