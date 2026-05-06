# DEPLOYMENT — Le Meynadier

Procédure de déploiement du site `lemeynadier.fr` sur l'hébergement
FTP mutualisé. Cible : Apache 2.4 + mod_rewrite/mod_headers/mod_deflate.

---

## TL;DR

```
push sur staging      → /preview/   (pré-prod, hreflang dédié si besoin)
push d'un tag v*      → racine      (production)
workflow_dispatch     → choix manuel staging | production
```

Le workflow GitHub Action `Deploy FTP` (`.github/workflows/deploy-ftp.yml`)
build le site (`pnpm generate`) puis synchronise `.output/public/` via
FTPS. La synchro est **incrémentale** (hash de state) — seuls les fichiers
modifiés sont téléversés.

---

## 1. Prérequis (one-time setup)

### 1.1 Côté hébergeur

| Élément              | Valeur attendue                                          |
|----------------------|----------------------------------------------------------|
| Protocole            | **FTPS explicite** (FTP over TLS) ou SFTP                |
| Port                 | 21 (FTPS) ou 22 (SFTP — workflow à adapter)              |
| Mode                 | **Passif** (NAT mutualisé)                               |
| Chemin racine prod   | typiquement `/www/` ou `/htdocs/` ou `/`                 |
| Chemin staging       | sous-dossier `/www/preview/` ou domaine secondaire       |
| Quota               | ≥ 500 Mo (le site fait ~30 Mo, marge pour `_ipx/` IPX)   |

S'assurer que les modules Apache suivants sont activés (cf `.htaccess`) :
`mod_rewrite`, `mod_headers`, `mod_deflate`, `mod_expires`. Si un module
manque, le bloc `<IfModule>` correspondant est ignoré silencieusement —
pas de crash, juste pas de bénéfice.

### 1.2 Secrets GitHub

Settings → Secrets and variables → **Actions** → New repository secret :

| Nom                  | Description                                             | Exemple                       |
|----------------------|---------------------------------------------------------|-------------------------------|
| `FTP_HOST`           | Hôte FTP                                                | `ftp.lemeynadier.fr`          |
| `FTP_USER`           | Identifiant FTP                                         | `lemeynadier`                 |
| `FTP_PASSWORD`       | Mot de passe FTP                                        | (généré par l'hébergeur)      |
| `FTP_PROD_PATH`      | Chemin distant racine de prod                           | `/www/`                       |
| `FTP_STAGING_PATH`   | Chemin distant pré-prod                                 | `/www/preview/`               |

> ⚠️ Ne jamais commit ces valeurs. Si un secret fuite, le révoquer
> immédiatement côté hébergeur et regénérer.

### 1.3 Environments GitHub (recommandé, optionnel)

Settings → Environments → créer `production` + `staging` :
- `production` → cocher **Required reviewers** (toi) pour exiger une
  approbation manuelle avant tout push prod.
- `staging` → pas de protection, déploiement libre.

Le workflow référence `environment: ${{ ... }}` qui pointe vers ces
environnements et hérite de leurs règles.

---

## 2. Déploiements

### 2.1 Pré-production (staging)

```bash
git checkout staging
git merge main         # ou cherry-pick des commits à tester
git push origin staging
```

Le workflow se déclenche automatiquement. ~3-4 min plus tard le site
est disponible à `https://lemeynadier.fr/preview/` (selon
`FTP_STAGING_PATH`).

**Cas d'usage staging** :
- Vérifier un changement de carte/prix avec le client avant prod
- Tester une refonte de section
- QA finale avant tag de release

### 2.2 Production

```bash
# Sur main, après merge de la PR finale
git checkout main
git pull origin main

# Bump de version + tag
git tag -a v1.0.0 -m "Release v1.0.0 — go-live brasserie"
git push origin v1.0.0
```

Le workflow se déclenche sur le tag (pas sur le commit), build, puis
déploie en racine. Si l'environnement `production` a un required
reviewer configuré, il faudra approuver dans l'onglet **Actions**.

Convention SemVer : `vMAJOR.MINOR.PATCH`
- `MAJOR` → refonte complète, navigation cassée
- `MINOR` → nouvelle page, nouvelle section
- `PATCH` → correction de bug, retouche de prix, photo remplacée

### 2.3 Déploiement manuel (workflow_dispatch)

Onglet **Actions** → `Deploy FTP` → bouton **Run workflow** →
choisir `staging` ou `production` → **Run workflow**.

À utiliser pour :
- Re-déployer la même version (pas de nouveau commit) après un
  upload manuel cassé
- Re-publier un tag plus ancien (rollback)
- Tester le pipeline

---

## 3. Rollback

Le déploiement est statique → revenir en arrière = redéployer une
version précédente.

### 3.1 Rollback rapide via tag

```bash
# Liste des tags publiés
git tag --sort=-creatordate | head -5
# v1.2.0  ← release actuelle (cassée)
# v1.1.0  ← stable précédente
# v1.0.0

# Re-déclencher le workflow sur le tag stable précédent
gh workflow run deploy-ftp.yml --ref v1.1.0 -f environment=production
```

Le workflow re-build à partir de `v1.1.0` et écrase la prod.
Délai : ~3-4 min jusqu'à la prod restaurée.

### 3.2 Rollback FTP manuel (si CI cassé)

En cas d'échec total du CI ou de besoin urgent (< 2 min) :

```bash
# 1. Sur la machine locale, checkout du tag stable
git checkout v1.1.0
pnpm install --frozen-lockfile
pnpm generate

# 2. Téléverser .output/public/ via un client FTP (FileZilla, lftp)
#    en FTPS passif vers le chemin racine.
#    Mode "écrasement" pour les fichiers modifiés.
lftp -u $FTP_USER,$FTP_PASSWORD ftps://ftp.lemeynadier.fr -e "
  set ftp:ssl-allow yes;
  set ssl:verify-certificate no;
  mirror -R --only-newer --parallel=4 .output/public/ /www/;
  bye
"
```

### 3.3 Rollback de tag (annuler un tag déjà poussé)

```bash
# Local
git tag -d v1.2.0
# Remote
git push origin :refs/tags/v1.2.0
```

À utiliser **uniquement** si le tag n'a pas encore atteint la prod.
Sinon préférer le rollback via re-deploy d'un tag antérieur (§3.1).

---

## 4. Post-déploiement — Vérifications

À faire systématiquement après chaque mise en prod (5 min) :

```bash
# Smoke HTTP
curl -sIL https://lemeynadier.fr/ | head -20
# 200, content-type text/html, strict-transport-security présent.

# Vérifier sitemap, robots, og-image
curl -sIL https://lemeynadier.fr/sitemap_index.xml | head -5
curl -sIL https://lemeynadier.fr/robots.txt | head -5
curl -sIL https://lemeynadier.fr/_og/Meynadier.png 2>/dev/null
```

Manuel (cf [docs/QA.md](./QA.md) §3) :
- [ ] Hard reload (Cmd+Shift+R) → pages clés FR/EN/IT.
- [ ] Carte → tous les prix lisibles, photos chargent en AVIF/WebP.
- [ ] /contact → carte MapLibre s'affiche, tel + itinéraire OK sur mobile.
- [ ] [securityheaders.com](https://securityheaders.com/?q=lemeynadier.fr) → note ≥ A.
- [ ] [pagespeed.web.dev](https://pagespeed.web.dev/) → perf ≥ 0.85 mobile.

Si une vérification échoue → §3 rollback.

---

## 5. DNS, SSL, sous-domaines

| Élément              | Configuration recommandée                                     |
|----------------------|--------------------------------------------------------------|
| `A` apex             | IP serveur hébergeur                                         |
| `AAAA` apex          | IPv6 (si dispo)                                              |
| `CNAME www`          | → `lemeynadier.fr`                                           |
| Redirect             | `www.lemeynadier.fr` → `lemeynadier.fr` (apex canonique)     |
| SSL                  | Let's Encrypt auto-renouvelé (vérifier la date d'expiration) |
| HSTS preload         | À activer après 6 mois de stabilité (cf `.htaccess`)         |

> Le HSTS dans `.htaccess` est à `max-age=31536000` (1 an, includeSubDomains).
> **Ne pas activer `preload`** tant qu'un certificat wildcard n'est pas
> en place : un sous-domaine sans HTTPS deviendrait inaccessible.

---

## 6. Limitations connues

- **IPX images** : le dossier `_ipx/` contient ~120 variantes AVIF/WebP
  (~3 Mo). Si l'hébergeur a une limite stricte de fichiers/inode, surveiller.
- **OG images** : générées en mode `zeroRuntime` au build (PNG statiques
  dans `_og/`). Pas de génération côté serveur → pas besoin de Node sur
  l'hébergeur.
- **MapLibre tiles** : les tuiles CartoDB Positron sont chargées à la
  demande depuis le CDN public. Pas d'API key requise mais sujet à
  rate-limit en cas de pic exceptionnel.
- **Pas de SSR** : 100 % statique → pas de formulaire de contact, pas de
  réservation en ligne. Pour ajouter ces features, voir CAHIER-DES-CHARGES
  v2 (M9+).

---

## 7. Aide en cas de problème

| Symptôme                              | Action                              |
|---------------------------------------|-------------------------------------|
| Workflow échoue : `Login failed`      | Vérifier `FTP_USER` / `FTP_PASSWORD` |
| Workflow échoue : `EHOSTUNREACH`      | Hôte FTP / port bloqué — contacter l'hébergeur |
| Site charge mais 500 Internal Error   | `.htaccess` rejeté — voir logs hébergeur, désactiver bloc fautif |
| Images cassées (404)                  | `_ipx/` non synchronisé — relancer le déploiement |
| Lien cassé en pré-prod                | Rebuild local : `pnpm generate` puis vérifier link-checker |
| HSTS bloque le site                   | Vider l'historique HSTS du navigateur (chrome://net-internals/#hsts) |
