# Le Meynadier 2026

Site vitrine de la brasserie **Le Meynadier** à Cannes.

> 📄 Cahier des charges complet : [`CAHIER-DES-CHARGES.md`](./CAHIER-DES-CHARGES.md)

## Stack

- **Nuxt 4** (SSG) · **Vue 3.5** · **TypeScript strict**
- **Tailwind CSS v4** (Oxide) · **Reka UI / shadcn-vue**
- **@nuxtjs/i18n v9** (fr / en / it)
- **GSAP** + **Lenis** + **Motion-v**
- **Biome** · **Vitest** · **Playwright** · **Lighthouse CI**
- Build 100 % statique → déployable par FTP sur mutualisé classique.

## Statut

🚧 En cours de mise en place — voir les [milestones GitHub](https://github.com/FoxGallery/LeMeynadier2026/milestones).

## Scripts (à venir)

```bash
pnpm install
pnpm dev          # dev server
pnpm generate     # build statique → .output/public/
pnpm test         # Vitest
pnpm test:e2e     # Playwright
pnpm lint         # Biome
```
