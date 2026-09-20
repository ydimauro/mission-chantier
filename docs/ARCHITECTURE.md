# Architecture technique

Ce document décrit l’architecture cible. Aucun code n’est écrit à l’ÉTAPE 0 ; la mise en œuvre commence à l’ÉTAPE 1.

> **État réel au terme de l’ÉTAPE 1** (socle technique livré) : Next.js 16 (App Router, Turbopack), React 19, TypeScript strict (avec `noUncheckedIndexedAccess`), Tailwind CSS v4 (configuration par CSS, `@theme`), Vitest. Le dossier `/content` vit à la racine du dépôt (hors de `src/`), avec un alias `@content/*` dédié dans `tsconfig.json`, pour garder la séparation code / contenu strictement visible dans l’arborescence. Détail complet dans `docs/rapports/ETAPE_01.md`.
>
> **État réel au terme de l’ÉTAPE 2** (sauvegarde et progression) : Zod ajouté comme dépendance de production pour valider `.mcjson` (`src/lib/schemas/`) ; `fake-indexeddb` ajouté comme dépendance de développement pour tester le cache IndexedDB sans navigateur (`test/progression-db.test.ts`). L’API File System Access n’étant que partiellement couverte par les types `lib.dom` livrés avec TypeScript à cette date, un complément de types minimal a été ajouté dans `src/types/file-system-access.d.ts`. Détail complet dans `docs/rapports/ETAPE_02.md`.

## 1. Technologies retenues

- Next.js
- React
- TypeScript strict
- Tailwind CSS
- Zod (ou équivalent léger) pour la validation des fichiers `.mcjson` / `.mcconfig` / `.mctkey`
- Vitest pour les tests unitaires et les tests pédagogiques automatiques
- Playwright pour les tests de bout en bout (ÉTAPE 20)

Application statique, sans backend.

## 2. Hébergement : Vercel (décision validée le 2026-09-20)

- Build statique Next.js, `output: "export"` utilisé lorsque compatible avec les fonctionnalités retenues (voir § 3 pour les cas particuliers).
- Aucune fonction serverless, aucune route API Vercel utilisée à l’exécution : la correction et le calcul des notes restent entièrement côté client, dans `/teacher`, exécutés dans le navigateur de l’enseignant.
- Aucune base de données ni service additionnel Vercel (KV, Postgres, Analytics, Edge Config) n’est utilisé.
- Sécurité configurée via `vercel.json` (en-têtes `Content-Security-Policy`, `Permissions-Policy`, et en-têtes de sécurité standard). Aucun `.htaccess` n’est produit (cette cible ayant été écartée, voir `docs/QUESTIONS_OUVERTES.md`).
- Le service worker (voir `docs/SPEC.md` § 60) doit rester compatible avec un déploiement Vercel statique (fichiers versionnés par nom de cache, pas de dépendance à une fonctionnalité serveur dynamique).

## 3. Points de vigilance techniques propres à Vercel

- Vérifier lors de l’ÉTAPE 1 la compatibilité de `output: "export"` avec les fonctionnalités prévues (File System Access API, IndexedDB, service worker, génération de ZIP côté client) : toutes ces fonctionnalités sont des API navigateur exécutées côté client et sont compatibles avec un export statique.
- Si une fonctionnalité s’avère incompatible avec `output: "export"` (à confirmer au fil du développement), documenter la limite dans `docs/QUESTIONS_OUVERTES.md` avant de l’adopter, plutôt que d’introduire silencieusement une fonction serveur qui contredirait « pas de backend ».

## 4. Architecture des contenus

Séparation stricte entre code applicatif et contenus pédagogiques :

```text
/content
  /5e
  /4e
  /assessments
  /givors
  /simulation
  /sources
  /data
  competencies.ts
  glossary.ts
  notebook.ts
  config.ts
```

Chaque mission possède des métadonnées structurées reprenant les champs définis dans `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md` (identifiant, statut, problématique, ancrage, objectifs, connaissances, compétences, thème, durées, etc.), validées par un schéma (Zod) dès l’ÉTAPE 4.

Aucun contenu pédagogique important n’est écrit directement dans les composants React.

## 5. Composants génériques du moteur pédagogique (ÉTAPE 3)

- `SituationReelle`
- `SimulationPedagogique`
- `Problematique`
- `Objectif`
- `Observe`
- `Hypothese`
- `Consigne`
- `Manipule`
- `Mesure`
- `Compare`
- `EcrisDansTonCours`
- `ARetenir`
- `IndiceProgressif`
- `Feedback`
- `LimitesDuModele`
- `Source`
- `BilanMission`
- `MissionTimer`

`SituationReelle` et `SimulationPedagogique` portent visuellement la distinction obligatoire entre réel et simulation (bandeaux « Situation réelle » / « Simulation pédagogique »).

## 6. Sécurité web

- Désactivation des permissions inutiles (caméra, microphone, géolocalisation, notifications, capteurs inutiles).
- `Permissions-Policy` et CSP stricte, définies dans `vercel.json`.
- Aucun script tiers, aucune police distante (pas de Google Fonts), polices embarquées localement.

## 7. Aucune dépendance externe à l’exécution

Interdits : Google Fonts, CDN obligatoire, scripts distants, API externe indispensable, analytics, trackers, services vocaux distants. Tout ce qui est nécessaire au fonctionnement pédagogique est embarqué localement dans le build.

## 8. Performance

Budget cible :

- JS initial compressé : idéalement < 500 Ko ;
- premier chargement hors médias lourds : idéalement < 3 Mo ;
- aucune requête tierce ;
- fonctionnement acceptable sur GPU intégré ;
- simulation stable autour de 30 FPS minimum ;
- Lighthouse Performance cible ≥ 90 sur machine correcte.

Un « Mode performance » réduit ombres, animations, effets et détails graphiques pour les postes les plus modestes du collège.

## 9. Hors ligne

Après un premier chargement complet, l’application reste utilisable si le réseau tombe. Mise en place d’un service worker versionné, avec une stratégie de cache explicite et une gestion propre des mises à jour (voir § 3 pour la compatibilité avec Vercel). Aucune dépendance réseau n’est indispensable à l’exécution.

## 10. Simulation pédagogique

Priorité 2D ou 2,5D. Three.js / React Three Fiber uniquement si la 3D apporte une réelle valeur pédagogique identifiée (aucun cas identifié à ce stade, voir `docs/ANALYSE_SPEC.md` § 5). Aucune recherche de photoréalisme. Le premier moteur de simulation simple est développé à l’ÉTAPE 8.

## 11. Identité visuelle et favicon

Favicon original évoquant godet, pelle stylisée, casque ou lettres MC, aux formats SVG, 16 px, 32 px, 180 px, 512 px. Identité visuelle chantier, urbaine, industrielle, technique, moderne, lisible, adaptée à des collégiens sans être enfantine ; le cas réel de Givors doit aussi évoquer la ville et l’espace public, pas seulement un univers « jaune chantier ». Développé à l’ÉTAPE 1.

## 12. Copyright et nom de l’application

Mention exacte à afficher : « © 2026 - Mission Chantier - Yann Di Mauro ». Le nom de l’application provient d’une constante centrale (`content/config.ts`) afin d’être modifiable facilement.
