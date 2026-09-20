# BILAN ÉTAPE 1 : socle technique

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 1) : Next.js, TypeScript strict, Tailwind, layout, navigation, thèmes, favicon, copyright, `/privacy`, accessibilité de base, mode vidéoprojecteur, mode performance, sécurité de base. Aucune simulation, aucun contenu de mission (5E-00, 4E-00, etc. restent réservés à l’ÉTAPE 6 et suivantes).

## 1. Travail réalisé

### 1.1 Socle Next.js

- Next.js 16.3.5 (App Router, Turbopack), React 19.2.8, TypeScript strict (`tsconfig.json` : `strict`, `noUncheckedIndexedAccess`, `forceConsistentCasingInFileNames`).
- Tailwind CSS v4, configuration par CSS (`@theme inline` dans `src/app/globals.css`), sans fichier `tailwind.config.js` (non nécessaire en v4 avec l’App Router).
- `next.config.ts` : `output: "export"` (build entièrement statique), `images.unoptimized: true` (pas d’API d’optimisation d’image côté serveur, cohérent avec l’absence de backend).
- Aucune dépendance réseau à l’exécution : pas de `next/font/google`, police système uniquement (voir § 1.4).
- Séparation code / contenu : `/content` à la racine du dépôt (hors de `src/`), avec alias TypeScript `@content/*` dédié, distinct de `@/*` (qui pointe vers `src/`).

### 1.2 Layout et navigation

- `src/app/layout.tsx` : `<html lang="fr">`, méta-données (titre, description, icônes, manifeste), structure `SkipLink` → `Header` → `main#contenu-principal` → `Footer`.
- `Header` : logo, nom et accroche de l’application, navigation principale (Accueil, Ma mission, Mon carnet, Ressources, Ma progression), sélecteur de niveau 5e / 4e, indicateur de rôle générique « Élève » (aucune identité réelle affichée).
- `Footer` : barre d’accessibilité, copyright, lien vers `/privacy`.
- Cinq pages créées : `/` (accueil neutre, sans contenu de mission), `/mission`, `/carnet`, `/ressources`, `/progression` (états d’attente explicites, non trompeurs), `/privacy`.

### 1.3 Thèmes et personnalisation d’affichage

Préférences gérées par `PreferencesProvider` (`src/providers/preferences-provider.tsx`), logique pure testable dans `src/lib/preferences.ts` :

- **Thème clair / sombre** : jetons de couleur définis une fois, puis redéfinis sous `@media (prefers-color-scheme: dark)` (garde `:not([data-theme="light"])`) et sous `[data-theme="dark"]` explicite. Le premier rendu (serveur et client) correspond toujours au système, sans script de démarrage bloquant (qui aurait affaibli la CSP, voir § 1.6).
- **Police adaptée** (accessibilité dyslexie) : espacement des lettres/mots et interligne augmentés, police système alternative si disponible. Décision et limite documentées dans `docs/QUESTIONS_OUVERTES.md` (aucune police sous licence n’a été embarquée à ce stade).
- **Taille du texte** : trois paliers 100 % / 125 % / 150 % (`docs/SPEC.md` § 43), cumulables avec le zoom natif du navigateur.
- **Mode vidéoprojecteur** : contrastes et tailles renforcés.
- **Mode performance** : désactive transitions, animations et ombres ; combiné à la prise en compte systématique de `prefers-reduced-motion`.

Toutes ces préférences sont des réglages d’affichage non personnels, stockés uniquement dans `localStorage` sous un espace de nommage unique (`mission-chantier:`), jamais transmis sur le réseau (`src/lib/storage.ts`).

### 1.4 Identité visuelle

- Marque géométrique originale (grue stylisée au-dessus d’un petit bâtiment, pour évoquer à la fois le chantier et la ville, `docs/SPEC.md` § 55), en SVG pur, sans dépendance externe : `src/components/ui/AppMark.tsx` (usage dans l’interface) et fichiers statiques `public/favicon.svg`, `public/icons/icon-{16,32,180,512}.svg`.
- `public/manifest.webmanifest` référence ces icônes (16, 32, 180, 512 px).
- Police système uniquement (`ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`), aucune requête vers Google Fonts ni aucun autre CDN de police.

### 1.5 Copyright

- `content/config.ts` centralise `APP_NAME`, `APP_TAGLINE`, `APP_AUTHOR`, `APP_YEAR`, `COPYRIGHT_TEXT` (calculé, jamais recopié en dur) et `COPYRIGHT_NOTICE`. Vérifié par `test/config.test.ts` (texte exact « © 2026 - Mission Chantier - Yann Di Mauro »).

### 1.6 Sécurité de base

- `vercel.json` : `Content-Security-Policy` stricte (`default-src 'self'`, aucun `'unsafe-inline'` ni pour les scripts ni pour les styles : aucun style ni script en ligne n’est utilisé dans le code), `Permissions-Policy` désactivant caméra, microphone, géolocalisation et capteurs inutiles, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.
- Cette CSP stricte a directement guidé un choix d’implémentation : pas de script de démarrage en ligne pour le thème (§ 1.3), afin de ne pas avoir à assouplir `script-src`.

### 1.7 Page `/privacy`

- Contenu rédigé pour un collégien (`content/pages/privacy.ts`), conforme à `docs/RGPD.md` § 5 : quelles données, où, comment les récupérer, comment les supprimer, absence de transmission Internet.
- Bouton « Effacer mes données locales » fonctionnel (`src/components/privacy/EraseDataButton.tsx`) avec confirmation explicite avant suppression, effaçant toutes les clés `localStorage` de l’application (préférences d’affichage à ce stade ; le mécanisme est générique et couvrira automatiquement le cache de progression ajouté à l’ÉTAPE 2, sans modification de cette fonction).

### 1.8 Accessibilité de base

- Lien d’évitement clavier (`SkipLink`), landmarks sémantiques (`header`, `nav`, `main`, `footer`), focus clavier toujours visible (`:focus-visible`), aucune information portée uniquement par la couleur (les boutons de bascule utilisent texte + `aria-pressed`, jamais la couleur seule).
- Résolution de référence 1366 × 768 : mise en page en conteneur fluide avec repli (`flex-wrap`) du bandeau de navigation.

## 2. Documentation mise à jour

- `docs/QUESTIONS_OUVERTES.md` : nouvelle question ouverte sur la police du mode « Police adaptée » (aucune police sous licence embarquée à ce stade).
- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 1 » ajouté en tête de document.
- `docs/rapports/ETAPE_01.md` : ce document.

## 3. Tests pertinents

17 tests automatiques (Vitest), tous verts :

- `test/config.test.ts` : nom de l’application et texte de copyright exacts.
- `test/navigation.test.ts` : cinq espaces de navigation attendus, aucun lien dupliqué.
- `test/preferences.test.ts` : valeurs par défaut des préférences, cycle 100 % → 125 % → 150 % → 100 %.
- `test/typography-lib.test.ts` : le détecteur de typographie française reconnaît correctement les cas valides et invalides.
- `test/typography.test.ts` : tous les contenus de `/content` (config, navigation, `/privacy`, textes d’attente) sont exempts d’apostrophe droite, de guillemet droit et de tiret cadratin.

Aucun test de simulation ou d’évaluation à ce stade : ces domaines n’existent pas encore (prévus ÉTAPE 3 et ÉTAPE 4).

## 4. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 17/17 tests, 5 fichiers |
| Build | `npm run build` | ✅ export statique généré (`out/`), 7 pages statiques |

Vérifications complémentaires effectuées manuellement :

- build statique servi localement (`serve out`) : toutes les routes (`/`, `/mission`, `/carnet`, `/ressources`, `/progression`, `/privacy`) et tous les fichiers `_next/static` répondent en 200 ;
- poids total des scripts et styles compressés (gzip) : environ 182 Ko, sous le budget cible de 500 Ko (`docs/SPEC.md` § 59) ;
- `npm audit` : 0 vulnérabilité côté dépendances de production ; une vulnérabilité modérée signalée sur `vitest`/`@vitest/mocker` (dépendance de développement uniquement, absente du build élève déployé), correction disponible mais non appliquée pour ne pas introduire une montée de version majeure non demandée ; à revisiter à l’ÉTAPE 21 (audit final).

## 5. Risques et points de vigilance identifiés

1. **Police d’accessibilité** : le mode « Police adaptée » repose sur l’espacement et une police système alternative, pas sur une police dédiée embarquée (aucun fichier de police sous licence fourni). Voir `docs/QUESTIONS_OUVERTES.md`.
2. **CSP sans `'unsafe-inline'`** : choix volontairement strict ; toute future fonctionnalité (ÉTAPES 2 à 20) devra continuer à éviter les styles et scripts en ligne pour ne pas avoir à assouplir cette politique.
3. **Vulnérabilité modérée de développement** (`@vitest/mocker`) : sans impact sur le build élève, à traiter lors d’une montée de version volontaire de Vitest.
4. **Contenu d’accueil volontairement neutre** : la page `/` ne contient aucune donnée réelle sur Givors (cohérent avec l’absence de source exploitable, `docs/ANALYSE_SPEC.md` § 4) ; elle sera remplacée par le contenu réel de 5E-00 / 4E-00 à l’ÉTAPE 6, pas complétée superficiellement avant.

## 6. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

Applicables uniquement pour ce qui existe à ce stade (aucune mission) :

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → navigation à cinq entrées explicites, aucune ambiguïté, pages d’attente honnêtes plutôt que vides.
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → pas encore applicable (aucun contenu de mission encore développé) ; les jetons de couleur `--real` / `--sim` sont prêts pour les composants `SituationReelle` / `SimulationPedagogique` de l’ÉTAPE 3.

Les autres questions (compétence maîtrisée, trace écrite, durée de 45 minutes) ne s’appliquent qu’à partir des missions elles-mêmes (ÉTAPE 6 et suivantes).

---

Fin de l’ÉTAPE 1.

Ne pas commencer l’ÉTAPE 2 avant l’instruction exacte : `CONTINUE ÉTAPE 2`.
