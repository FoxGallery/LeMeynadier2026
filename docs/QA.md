# QA — Le Meynadier

Runbook de qualité pour le site lemeynadier.fr. Cible : préparer une release sans
régression visible et pouvoir rollback rapidement si besoin.

## 1. Avant chaque commit

```bash
pnpm lint            # Biome — formatage + erreurs statiques
pnpm typecheck       # vue-tsc — types Vue + TS
pnpm test            # Vitest — unitaires (≥ 19 tests)
pnpm generate        # build statique → .output/public/
```

Le commit est bloqué automatiquement par Husky + commitlint si :
- le format Conventional Commits n'est pas respecté (`feat:`, `fix:`, `chore:` …)
- des fichiers stagés contiennent des erreurs Biome non corrigeables.

## 2. Avant chaque PR

| Vérif                        | Commande                              | Critère              |
|------------------------------|---------------------------------------|----------------------|
| Lint                         | `pnpm lint`                           | 0 erreur, 0 warning  |
| Types                        | `pnpm typecheck`                      | exit 0               |
| Tests unit                   | `pnpm test`                           | 100 % pass           |
| Build SSG                    | `pnpm generate`                       | 0 erreur prerender   |
| Link-checker                 | (intégré au build via @nuxtjs/seo)    | 0 erreur, 0 warning  |
| E2E desktop                  | `pnpm test:e2e --project=chromium`    | 100 % pass           |
| A11y axe (toutes pages)      | inclus dans la suite E2E              | 0 violation WCAG AA  |
| Visuel (snapshots)           | `pnpm test:e2e tests/e2e/visual.spec.ts` | aucun diff > 2 % |
| Lighthouse CI                | déclenché en CI                       | perf ≥ 0.85, a11y ≥ 0.95, SEO ≥ 0.95 |

## 3. Smoke test manuel — release

À faire sur le site preview avant de pousser en prod, sur Chrome + Safari (mac)
et Chrome Android (mobile). Durée ≈ 10 min.

### 3.1 Navigation FR
- [ ] / → hero visible (image + titre), monogramme doré, CTA cliquables.
- [ ] /carte → onglets de catégories qui changent au clic, prix lisibles, photos
      chargées en AVIF/WebP (DevTools > Network).
- [ ] /histoire → 3 sections magazine avec photos, citation centrée.
- [ ] /galerie → grille 8 photos, lightbox au clic (← →, ESC), filtres opérants.
- [ ] /contact → 3 cartes infos, carte MapLibre centrée sur le point exact,
      bouton "Itinéraire" ouvre l'app de cartes du téléphone (mobile).
- [ ] Pas d'erreur console (F12 > Console).

### 3.2 i18n EN + IT
- [ ] /en + /it : switcher de langue change la locale ET le slug
      (ex /carte → /en/menu, /histoire → /it/storia).
- [ ] `<html lang>` correspond (en-GB / it-IT).
- [ ] hreflang dans `<head>` présent pour chaque locale + x-default.
- [ ] Footer : address en français inchangée (rue), libellés traduits.
- [ ] Aucune clé i18n brute affichée (ex `nav.menu` au lieu de "La carte").

### 3.3 Responsive
- [ ] Largeurs 360, 768, 1024, 1440, 1920 — pas de scroll horizontal.
- [ ] Mobile : menu hamburger ouvre l'overlay plein écran, fermeture OK.
- [ ] Mobile : navbar pill se cache en scroll-down sur /carte et /galerie.

### 3.4 SEO & social
- [ ] `view-source:` chaque page → `<title>`, `<meta description>`, `<link rel=canonical>`,
      hreflang FR/EN/IT/x-default, JSON-LD BarOrPub sur / et /contact.
- [ ] OG image : `https://lemeynadier.fr/_og/...png` retourne un PNG 1200×630
      avec wordmark + titre de la page courante.
- [ ] sitemap_index.xml présent + 3 sitemaps locale.
- [ ] robots.txt autorise tout sauf /dev-*.

### 3.5 Sécurité
- [ ] Test [securityheaders.com](https://securityheaders.com) → note ≥ A.
- [ ] Test [observatory.mozilla.org](https://observatory.mozilla.org) → note ≥ B.
- [ ] HTTP→HTTPS redirige bien.
- [ ] CSP n'invalide pas les fonts Google (réseau OK).

## 4. Procédure de release

1. PR ouverte → CI verte (tous les jobs).
2. Merge sur `main` → workflow `Build statique` génère l'artefact `dist`.
3. Smoke test ci-dessus sur le preview Vercel/Cloudflare (ou local après
   `pnpm generate && pnpm preview`).
4. Téléverser `.output/public/` via FTP en mode passif vers la racine
   du domaine `lemeynadier.fr`. Les assets sont versionnés (hash dans le
   nom) → l'upload peut écraser sans casser les sessions en cours.
5. Tester en prod la home + /carte + /contact (hard reload : Cmd+Shift+R).
6. Vérifier `/sitemap_index.xml` et soumettre dans Google Search Console
   si version majeure (nouvelles pages).

## 5. Rollback

Le déploiement est statique → il suffit de reupload la version précédente.

```bash
# 1. Sur la machine, checkout du commit précédent
git checkout <sha-de-release-N-1>
pnpm install --frozen-lockfile
pnpm generate

# 2. Upload .output/public/ via FTP en écrasant.
# 3. Hard reload + test home + carte + contact.
```

Conserver localement les 3 dernières releases (`.output/public-vN.zip`)
pour pouvoir rollback sans recompiler.

## 6. Incidents et alertes

| Symptôme                              | Vérification                         | Fix                          |
|---------------------------------------|--------------------------------------|------------------------------|
| 500 / page blanche                    | Console navigateur, logs FTP         | Rollback (§5)                |
| Images cassées                        | Vérifier `/_ipx/` accessible         | Reupload `.output/public/_ipx/` |
| OG image cassée                       | URL `/_og/...png` retourne 404       | Rebuild + reupload `_og/`    |
| Lighthouse Perf < 0.85                | Trace Performance + Lighthouse CI    | Investiguer LCP, lazy-load   |
| Score a11y régresse                   | `pnpm test:e2e tests/e2e/a11y.spec.ts` | Cf violations axe         |
| Lien cassé vers une page              | Build → Link Checker Summary         | Corriger le lien source      |
