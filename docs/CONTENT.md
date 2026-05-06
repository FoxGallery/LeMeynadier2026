# CONTENT — Guide d'édition de contenu

Comment mettre à jour la carte, les pages éditoriales, les photos, les
horaires et les coordonnées du site `lemeynadier.fr` **sans toucher au
code applicatif**.

Cible : éditeur de contenu (gérant, restaurateur, agence partenaire) avec
un éditeur de texte (VS Code recommandé) et Git de base. Pour une opération
ponctuelle, le client peut aussi ouvrir une issue avec les changements et
on les applique côté agence.

---

## 1. La carte (menu)

Une catégorie = un fichier YAML dans [`content/menu/`](../content/menu/).

```
content/menu/
├── pizzas.yml             ← Pizzas signatures
├── paninis.yml            ← Paninis & sandwichs
├── bieres.yml             ← Bières pression et bouteilles
├── vins.yml               ← Vins au verre / à la bouteille
├── cocktails.yml          ← Cocktails maison
├── smoothies.yml          ← Smoothies, frappés, milkshakes
├── boissons-chaudes.yml   ← Cafés, thés, infusions
└── softs.yml              ← Sodas, jus, eaux
```

### 1.1 Anatomie d'un fichier YAML

```yaml
category: pizzas         # identifiant kebab-case (NE PAS modifier après publication)
order: 1                 # position dans la barre d'onglets (1 = premier)
label:
  fr: Pizzas
  en: Pizzas
  it: Pizze
description:             # sous-titre optionnel sous le titre de catégorie
  fr: Pâte fine signature, cuisson au four à pierre.
  en: Signature thin crust, stone-oven baked.
  it: Pasta fine signature, cottura in forno a pietra.

items:
  - slug: margherita     # kebab-case stable, sert d'ancre URL (#margherita)
    order: 1             # ordre dans la liste (1 = premier de la catégorie)
    name:
      fr: Margherita
      en: Margherita
      it: Margherita
    description:
      fr: Tomate San Marzano, mozzarella fior di latte, basilic frais, huile d'olive.
      en: San Marzano tomato, fior di latte mozzarella, fresh basil, olive oil.
      it: Pomodoro San Marzano, mozzarella fior di latte, basilico fresco, olio d'oliva.
    price: 12            # nombre en EUR (sans symbole). `null` = à confirmer
    tags: [classique, vegetarien]   # étiquettes libres affichées en pastilles
    image: /images/items/margherita.jpg   # optionnel (auto-résolu sinon)
    available: true      # mettre à false pour masquer (rupture, saisonnier)
```

### 1.2 Ajouter un nouvel item

1. Ouvrir le YAML de la bonne catégorie.
2. Copier-coller le bloc d'un item existant à l'endroit voulu.
3. Adapter `slug` (unique, kebab-case), `order` (incrémenter les suivants
   si nécessaire), `name`, `description`, `price`.
4. Si pas de traduction EN/IT immédiatement → laisser uniquement `fr:` ;
   le site retombe automatiquement sur le français.
5. Photo (optionnel) :
   - Déposer le JPG dans `public/images/items/` (largeur 1200 px idéale).
   - Renseigner `image: /images/items/<slug>.jpg`.
   - Sans `image` explicite, le site cherche `/images/items/<slug>.jpg`,
     puis `/images/menu/<slug>.jpg`, puis fallback générique.

### 1.3 Modifier un prix

```diff
  - slug: margherita
    name: { fr: Margherita, en: Margherita, it: Margherita }
-   price: 12
+   price: 13
```

C'est tout. Au prochain `pnpm generate` (ou push staging), le prix est
mis à jour partout (carte FR/EN/IT + Schema.org `Menu`).

### 1.4 Masquer un item temporairement

```yaml
  - slug: pizza-truffe
    available: false        # ← masque sans supprimer l'historique YAML
```

Préféré à la suppression : conserve les commentaires, l'ordre, les photos
si l'item revient en saison.

### 1.5 Réordonner les onglets

Modifier les valeurs `order:` en tête de fichier.
- `pizzas.yml: order: 1` → premier onglet
- `paninis.yml: order: 2` → deuxième onglet
- etc.

> ⚠️ Ne pas changer `category:` (c'est la clé URL `#pizzas` partagée
> ailleurs sur le site et indexée par Google). Si vraiment nécessaire,
> ajouter un `RewriteRule` dans `.htaccess` pour préserver les vieux
> liens.

---

## 2. Pages éditoriales (Markdown)

Trois pages MD dans [`content/pages/`](../content/pages/) :
- `histoire.md` — page /histoire (textes des sections magazine, citation, stats)
- `mentions-legales.md`
- `confidentialite.md`

Édition standard Markdown (titres, paragraphes, listes). Les sections
narratives de `/histoire` (kicker, taglines) sont en revanche dans les
fichiers i18n (cf §3) car elles sont multilingues à grain fin.

---

## 3. Textes de l'interface (i18n)

Tous les libellés affichés à l'écran (boutons, titres, sous-titres, liens
de nav, footer, etc.) sont dans [`i18n/locales/`](../i18n/locales/) :

```
i18n/locales/
├── fr.json         ← langue par défaut
├── en.json
└── it.json
```

### 3.1 Anatomie

```json
{
  "common": {
    "viewMenu": "Voir la carte",
    "directions": "Itinéraire"
  },
  "home": {
    "hero": {
      "kicker": "Bienvenue chez",
      "title": "Le Meynadier",
      "tagline1": "Brasserie · Pizzeria · Pub",
      "tagline2": "au cœur du vieux Cannes."
    }
  }
}
```

Convention : namespace par section (`home`, `menu`, `history`, `gallery`,
`contact`, `footer`, `seo`), et clé en camelCase.

### 3.2 Ajouter une traduction

Si une clé existe en FR mais pas en EN/IT, ouvrir `en.json` / `it.json`
et ajouter au même chemin :

```diff
// fr.json
{
  "home": { "hero": { "kicker": "Bienvenue chez" } }
}

// en.json
{
- "home": { "hero": {} }
+ "home": { "hero": { "kicker": "Welcome to" } }
}
```

Une clé manquante affiche le code de la clé brute (ex `home.hero.kicker`)
en prod — c'est volontaire pour repérer les oublis. La QA visuelle des
3 locales (cf [QA.md](./QA.md) §3.2) couvre ce cas.

### 3.3 Vérifier la cohérence

```bash
pnpm dev
# Naviguer / → /en → /it
# Tout texte non-traduit apparaît en français (fallback) ; tout texte
# affiché en clé brute (`nav.menu` au lieu de "La carte") = clé manquante.
```

---

## 4. Coordonnées (adresse, téléphone, horaires)

Source unique : [`app/composables/useVenue.ts`](../app/composables/useVenue.ts).

```ts
return {
  name: 'Le Meynadier',
  address: {
    street: '1 rue Meynadier (angle 5 rue du Maréchal Joffre)',
    locality: 'Cannes',
    postalCode: '06400',
    region: "Provence-Alpes-Côte d'Azur",
    country: 'France',
    countryCode: 'FR',
  },
  geo: { lat: 43.5529148, lng: 7.0159906 },
  telephone: '04 93 30 23 12',
  telephoneHref: 'tel:+33493302312',
  hours: [
    { days: ['Mo','Tu','We','Th','Fr','Sa','Su'], open: '08:00', close: '00:30' },
  ],
  hoursLabel: 'Tous les jours · 8h – 00h30',
  amenities: ['terrace'],
  locatedIn: "Résidence d'Azur",
}
```

Toute modification se propage automatiquement à :
- Footer (toutes les pages)
- /contact (cards adresse/horaires/téléphone, carte MapLibre, JSON-LD)
- /home — section Practical (mini-map + horaires)
- JSON-LD `BarOrPub` (Schema.org pour Google)
- Hreflang du sitemap

### 4.1 Changer un horaire

Pour fermer le mardi par exemple :

```ts
hours: [
  { days: ['Mo','We','Th','Fr','Sa','Su'], open: '08:00', close: '00:30' },
],
hoursLabel: 'Tous les jours sauf mardi · 8h – 00h30',
```

> Penser à mettre à jour `hoursLabel` aussi (c'est la version humaine
> affichée dans le footer ; `hours` est le tableau machine pour le
> JSON-LD et la carte de contact).

### 4.2 Changer l'adresse / la géolocalisation

1. Mettre à jour `address.street`.
2. Mettre à jour `geo.lat` et `geo.lng` — utiliser
   [Nominatim OSM](https://nominatim.openstreetmap.org/) pour obtenir
   les coordonnées exactes. Vérifier ensuite sur la page /contact que
   le marker pointe sur la bonne entrée.

---

## 5. Photos

Toutes les photos sont dans `public/images/` :

```
public/images/
├── hero/         ← grandes images plein écran (homepage, carte hero, contact hero)
├── ambiance/     ← mosaïque ambiance section /home et /histoire
├── signature/    ← cartes "Notre signature" en home (3 piliers)
├── menu/         ← photos de plats utilisées en hero de carte
├── items/        ← photos individuelles des items du menu (par slug)
├── gallery/      ← grille de la page /galerie
└── og/           ← (réservé, OG images générées dynamiquement dans .output/)
```

### 5.1 Spécifications recommandées

| Usage          | Format    | Largeur source | Ratio        | Poids cible |
|----------------|-----------|----------------|--------------|-------------|
| Hero           | JPG       | ≥ 2400 px      | 4:3 ou 16:9  | < 600 Ko    |
| Item de carte  | JPG       | ≥ 1200 px      | 5:4          | < 200 Ko    |
| Galerie        | JPG       | ≥ 1600 px      | varié        | < 400 Ko    |
| Ambiance       | JPG       | ≥ 1600 px      | varié        | < 400 Ko    |

@nuxt/image se charge ensuite de générer les variantes AVIF/WebP
responsive automatiquement (320w → 3840w). Pas besoin de pré-compresser.

### 5.2 Remplacer une photo

Le plus simple : conserver le même nom de fichier.

```bash
# Remplacer la photo du hero principal
cp ~/Téléchargements/nouvelle-photo.jpg public/images/hero/hero-1.jpg

# Vérifier en local
pnpm dev
# Ouvrir http://localhost:3000

# Commit
git add public/images/hero/hero-1.jpg
git commit -m "chore(content): nouvelle photo hero principale"
```

Au build suivant, toutes les variantes IPX (`_ipx/...hero-1.jpg`) sont
re-générées automatiquement. Aucun code à modifier.

### 5.3 Ajouter une photo à un item de menu

1. Déposer dans `public/images/items/` avec le même slug que dans le YAML :
   `public/images/items/<slug>.jpg`.
2. Le composant `MenuCard.vue` détecte automatiquement la photo. Aucun
   changement de YAML requis (sauf pour forcer un autre chemin via
   `image:` dans le YAML).

---

## 6. Workflow d'édition (côté client / agence)

### 6.1 Modification simple (prix, libellé, photo)

```bash
# 1. Synchroniser le repo
git checkout main
git pull origin main

# 2. Créer une branche feature
git checkout -b content/maj-prix-pizzas-2026-06

# 3. Éditer les fichiers (YAML, JSON, JPG)

# 4. Tester en local
pnpm dev   # http://localhost:3000

# 5. Lint + tests
pnpm lint && pnpm typecheck && pnpm test

# 6. Commit + push
git add content/menu/pizzas.yml
git commit -m "chore(content): maj prix pizzas (saison été 2026)"
git push origin content/maj-prix-pizzas-2026-06

# 7. Ouvrir une PR sur GitHub, merger une fois validée → déploiement
#    automatique en pré-prod sur staging, puis tag pour la prod.
```

### 6.2 Édition rapide via GitHub UI (non-technique)

Pour des micro-modifications (un prix, un libellé) le client peut éditer
directement le fichier sur github.com :
- Onglet **Code** → naviguer vers `content/menu/pizzas.yml`
- Bouton crayon ✏️ "Edit this file"
- Modifier, scroller en bas, **Commit changes** → ouvrir une PR
- L'agence vérifie + merge

### 6.3 Conventions de commit

Préfixes acceptés (lint commitlint enforced) :
- `feat(content):` nouvelle section ou nouvelle catégorie
- `chore(content):` mise à jour de prix, libellé, traduction
- `fix(content):` correction de typo, prix erroné
- `chore(photo):` ajout/remplacement de photo

---

## 7. Ce qu'il NE FAUT PAS modifier

Sans validation préalable de l'agence :

- ❌ `nuxt.config.ts` (configuration framework, modules, SEO)
- ❌ `app/components/**` (composants Vue, design system)
- ❌ `app/composables/**` sauf `useVenue.ts`
- ❌ `app/assets/css/tailwind.css` (tokens design)
- ❌ `package.json` / `pnpm-lock.yaml` (dépendances)
- ❌ `.github/workflows/**` (CI/CD)
- ❌ `public/.htaccess` (sécurité serveur)

Toute modification de ces fichiers passe par une PR avec revue technique.

---

## 8. Aide

| Question                                | Où chercher                          |
|-----------------------------------------|--------------------------------------|
| Comment ajouter une page ?              | `app/pages/` + i18n + nav-links      |
| Comment changer une couleur du site ?   | `app/assets/css/tailwind.css` (tokens `@theme`) |
| Comment changer la police ?             | `nuxt.config.ts` → `fonts.families`  |
| Comment ajouter une langue ?            | Cf README §i18n                      |
| Le site est cassé après mon édition !   | Contacter l'agence ou rollback (cf [DEPLOYMENT.md](./DEPLOYMENT.md) §3) |

Toute autre question → ouvrir une issue GitHub avec le label `type:content`.
