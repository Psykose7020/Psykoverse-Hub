# Psykoverse

Psykoverse est un site communautaire OGame francophone. Le projet contient une application React, une API Express, une base PostgreSQL et des outils de calcul/guide.

## Structure du projet

```text
client/          Interface visible par les visiteurs
client/src/pages Pages principales du site
client/src/components Composants réutilisables
client/src/data  Données statiques des guides et outils
server/          API, authentification admin, statistiques, fichiers statiques
shared/          Types et schémas partagés entre client et serveur
script/          Scripts de build et d'import
attached_assets/ Images, vidéos et fichiers utilisés par le site
dist/            Build généré, à ne pas modifier à la main
```

## Commandes utiles

```bash
npm install
npm run dev
npm run build
npm run start
npm run check
```

- `npm run dev` lance le serveur en développement.
- `npm run build` génère le site et l'API dans `dist/`.
- `npm run start` lance la version de production générée.
- `npm run check` vérifie TypeScript.

## Configuration

Copier `.env.example` vers `.env`, puis remplir les valeurs nécessaires.

Variables principales :

- `DATABASE_URL` : connexion PostgreSQL.
- `SESSION_SECRET` : secret de signature des sessions admin.
- `ADMIN_PASSWORD` : mot de passe du panneau admin.
- `DISCORD_BOT_TOKEN` et `DISCORD_GUILD_ID` : compteur Discord, optionnel.
- `YOUTUBE_API_KEY` et `YOUTUBE_CHANNEL_ID` : compteur YouTube, optionnel.
- `PORT` : port HTTP local.

## Déploiement actuel

Le VPS sert l'application buildée avec PM2 et nginx. Les secrets de production restent dans les fichiers locaux ignorés par Git, pas dans GitHub.

## Notes pour débuter

Pour modifier une page, commence dans `client/src/pages`.
Pour modifier l'en-tête ou le bas de page, regarde `client/src/components/layout`.
Pour modifier une route API, regarde `server/routes.ts`.
Pour modifier la base de données, regarde `shared/schema.ts`.
