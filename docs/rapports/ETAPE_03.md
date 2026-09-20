# BILAN ÉTAPE 3 : moteur pédagogique

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 3) : dix-huit composants génériques du moteur pédagogique. Aucune simulation complexe, aucun contenu de mission : ces composants restent vides de tout texte de mission, réservé à l’ÉTAPE 6 et suivantes.

## 1. Travail réalisé

### 1.1 Les dix-huit composants (`src/components/mission/`)

| Composant | Rôle |
| --- | --- |
| `SituationReelle` | bandeau obligatoire « Situation réelle » (docs/SPEC.md § 6.1) |
| `SimulationPedagogique` | bandeau obligatoire « Simulation pédagogique », note optionnelle de valeurs simplifiées (§ 6.2) |
| `Problematique` | question centrale de la mission, mise en avant visuellement |
| `Objectif` | liste des objectifs (singulier/pluriel automatique) |
| `Observe` | invite à observer avant d’agir |
| `Hypothese` | invite à formuler une hypothèse, avec rappel explicite qu’elle s’écrit sur le cahier (§ 12) |
| `Consigne` | une seule instruction à la fois (docs/PEDAGOGIE.md § 7.1) |
| `Manipule` | cadre de la zone d’interaction, de test ou de simulation |
| `Mesure` | cadre d’affichage d’une mesure ou d’un relevé |
| `Compare` | cadre de comparaison |
| `EcrisDansTonCours` | rappel de ce qu’il faut écrire sur le cahier papier, avec bouton optionnel « J’ai terminé d’écrire » qui ne valide jamais seul une compétence (§ 12) |
| `ARetenir` | encadré de synthèse |
| `IndiceProgressif` | aides à trois niveaux, révélées une à une (docs/PEDAGOGIE.md § 7.3) |
| `Feedback` | retour formatif à deux tons (succès / à corriger), jamais un simple « Faux » (§ 7.4) |
| `LimitesDuModele` | rappel des limites d’une simulation (docs/SPEC.md § 51) |
| `Source` | citation d’une source réelle, ou mention « Valeur pédagogique fictive » (§ 52) |
| `BilanMission` | encadré de bilan de fin de mission |
| `MissionTimer` | temps écoulé affiché en minutes seulement, volontairement discret et non anxiogène (§ 8) |

Neuf d’entre eux (`Observe`, `Hypothese`, `Consigne`, `Manipule`, `Mesure`, `Compare`, `ARetenir`, `LimitesDuModele`, `BilanMission`) partagent un même bloc interne `PhaseBlock` pour une présentation visuelle cohérente, sans dupliquer neuf fois le même balisage.

### 1.2 Jetons de couleur complémentaires

Ajout de `--real-contrast` et `--sim-contrast` dans `src/app/globals.css` : les bandeaux `SituationReelle` / `SimulationPedagogique` utilisent un fond coloré (`--real` / `--sim`) dont la teinte change entre mode clair et mode sombre ; sans texte de contraste dédié, le texte blanc du mode clair devenait illisible sur les teintes pastel du mode sombre. Corrigé et vérifié visuellement dans les deux modes.

### 1.3 Logique pure testable

- `src/lib/mission/indice.ts` : progression des indices (`nextIndiceLevel`, `isIndiceExhausted`), plafonnée au nombre d’indices fournis.
- `src/lib/mission/timer.ts` : `formatElapsedMinutes`, affichage en minutes entières (jamais de secondes, pour rester discret).

### 1.4 Icônes

Quinze nouvelles icônes SVG géométriques ajoutées à `src/components/ui/icons.tsx` (œil, ampoule, drapeau, curseurs, graphique de comparaison, crayon, étoile, triangle d’alerte, livre, cercle de validation, horloge, épingle de lieu, ballon, cible, point d’interrogation), sans dépendance externe, cohérentes avec les icônes déjà créées à l’ÉTAPE 1.

## 2. Correction d’un effet de bord Next.js

En testant l’application avec `npm run dev`, Next.js 16 a de nouveau inséré son bloc `<!-- BEGIN:nextjs-agent-rules -->` dans `AGENTS.md` (déjà observé et annulé lors de l’ÉTAPE 2). Cette fois, la cause a été identifiée et corrigée à la racine : `next.config.ts` déclare désormais `agentRules: false`, ce qui empêche `next dev` de modifier `AGENTS.md` ou `CLAUDE.md`. Vérifié par un redémarrage complet du serveur de développement : plus aucune modification de ces fichiers.

## 3. Documentation mise à jour

- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 3 », § 5 marquée comme livrée avec détail des jetons de couleur et du bloc partagé `PhaseBlock`.
- `docs/rapports/ETAPE_03.md` : ce document.

## 4. Tests pertinents

51 tests automatiques (Vitest), tous verts, dont 8 nouveaux pour cette étape :

- `test/mission-engine.test.ts` : progression et plafonnement des indices, formatage non anxiogène du temps écoulé (jamais de durée négative, jamais de compte à rebours).
- `test/typography.test.ts` : étendu aux libellés de `content/engine.ts`.

## 5. Vérification manuelle dans un navigateur réel

Une page de démonstration temporaire (`src/app/engine-preview/`, non conservée) a assemblé les dix-huit composants avec du texte d’exemple, pilotée dans un Chromium réel :

- rendu correct en mode clair, en mode sombre et en mode vidéoprojecteur (captures comparées) ;
- un bogue réel détecté et corrigé pendant cette vérification : `EcrisDansTonCours` et `Feedback` recevaient une fonction en callback (`onDone`, `onRetry`) depuis un composant serveur, ce que React interdit (« Event handlers cannot be passed to Client Component props »). La page de démonstration a été corrigée (`"use client"`) ; ce n’est pas un défaut des composants eux-mêmes, qui restent conçus pour recevoir leurs callbacks d’un composant client appelant, ce que seront toutes les pages de mission à partir de l’ÉTAPE 6 ;
- aucune erreur de console restante après correction ;
- page de démonstration supprimée avant le commit : elle ne fait pas partie du livrable de cette étape (aucune mission ni page publique n’a encore besoin de ces composants).

## 6. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 51/51 tests, 10 fichiers |
| Build | `npm run build` | ✅ export statique généré, 7 pages (la page de démonstration a été retirée avant le build final) |

## 7. Risques et points de vigilance

1. **Composants non consommés à ce stade** : normal et attendu (docs/SPEC.md § 65 réserve le contenu de mission à l’ÉTAPE 6). Une vérification visuelle complète sera refaite en contexte réel dès la première mission développée.
2. **`IndiceProgressif` et `Feedback`** sont des composants client (`"use client"`) : toute page de mission qui les utilisera devra elle-même être, ou contenir, un composant client, comme démontré par le bogue corrigé au § 5.
3. **Icône de `Hypothese` / `IndiceProgressif`** (ampoule) : à taille réduite, sa silhouette se rapproche visuellement de l’épingle de lieu. Cohérence conceptuelle correcte (idée/aide) mais point de détail graphique à surveiller si une confusion apparaît en usage réel.

---

Fin de l’ÉTAPE 3.

Ne pas commencer l’ÉTAPE 4 avant l’instruction exacte : `CONTINUE ÉTAPE 4`.
