# BILAN ÉTAPE 9 : fin du parcours 5e (5E-07 à 5E-12)

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 9) : « Développer 5E-07 à 5E-12. » Six missions réelles, spécifiées en détail à l’ÉTAPE 0 dans `docs/SEANCES_5E.md`, qui complètent le parcours 5e essentiel/recommandé après les ÉTAPES 6, 7 et 8.

## 1. Décision de conception : programmation « pseudo-blocs » provisoire (5E-10)

`docs/SEANCES_5E.md` renvoie explicitement à l’« environnement de programmation interne (voir ÉTAPE 12) » pour 5E-10, et `docs/SPEC.md` § 65 prévoit à l’ÉTAPE 12 : « Créer l’environnement de programmation par blocs ou pseudo-blocs. » Or 5E-10 (sommative intermédiaire n° 4, « Programmer une sécurité simple ») doit exister dès cette étape.

**Décision (non escaladée, aucun conflit avec une règle explicite d’AGENTS.md)** : `SommativeBlockProgram` construit un programme « condition + action » par menus déroulants (comparateur, seuil, action), dans la continuité du choix déjà fait à l’ÉTAPE 7 (menus déroulants plutôt que glisser-déposer, docs/SPEC.md § 23). Le programme est testé sur plusieurs scénarios ; seul le comportement littéral est affiché (« action déclenchée » ou non), jamais un jugement correct/incorrect, conformément au caractère sommatif (docs/SPEC.md § 30). Ce composant est explicitement documenté comme provisoire dans son propre code et sera revu quand le véritable environnement de programmation par blocs sera construit à l’ÉTAPE 12.

## 2. Travail réalisé

### 2.1 Nouveaux composants génériques (`src/components/mission/`)

- `ComparisonTable` : tableau de comparaison, extrait de `SommativeChoiceJustified` (ÉTAPE 7) pour être réutilisé tel quel par 5E-11 sans dupliquer le rendu du tableau. `SommativeChoiceJustified` a été mis à jour pour l’utiliser (aucun changement de comportement, type `ComparisonOption` toujours ré-exporté au même endroit).
- `SommativeSimulationReport` : sommatif générique « hypothèse → simulation → conclusion », indépendant du moteur de simulation utilisé (reçoit l’interface de simulation en `children` et les dernières mesures obtenues en prop). Utilisé par 5E-08 avec `EvacuationSimulation` (ÉTAPE 8), enfin branché sur une mission réelle.
- `SommativeBlockProgram` : programmation « pseudo-blocs » sommative décrite au § 1 ci-dessus.

### 2.2 Nouvelle logique pure

- `src/lib/mission/block-program.ts` : `evaluateCondition(distance, comparateur, seuil)`, ne porte aucun texte (AGENTS.md règle 8).
- `src/lib/format-number.ts` : `formatFrenchNumber`, extrait d’`EvacuationSimulation` (ÉTAPE 8) pour être réutilisé par `SommativeBlockProgram` ; corrige au passage un défaut trouvé pendant la vérification manuelle (une distance de test comme 2,5 m s’affichait « 2.5 m », point anglais au lieu de la virgule française, AGENTS.md règle 19).

### 2.3 Contenu des six missions (`content/5e/`)

| Mission | Activité | Évaluation |
| --- | --- | --- |
| 5E-07 | Organisation d’une zone de chantier (association, 5 zones) | Formative |
| 5E-08 | Hypothèse, simulation d’évacuation (réutilise l’ÉTAPE 8), conclusion | Sommative intermédiaire n° 3 |
| 5E-09 | Lecture d’un programme capteur, observation qualitative, prédiction | Formative |
| 5E-10 | Programme de sécurité « pseudo-blocs », testé sur trois scénarios | Sommative intermédiaire n° 4 |
| 5E-11 | Tableau comparatif (thermique/hybride/électrique) + questions de synthèse | Formative |
| 5E-12 | Mission intégrative : choix d’engins, circulation, simulation, synthèse, boucle réflexive sur le cahier de 5E-00 | Formative (mobilisation transversale, non sommative) |

Toutes les valeurs du tableau comparatif de 5E-11 sont pédagogiques fictives (`ComparisonTable` sans `sourceCitation` côté `Source`, docs/SPEC.md § 52).

### 2.4 Pages de mission (`src/app/mission/5e-0{7,8,9}/`, `5e-1{0,1,2}/`)

Même canevas qu’aux ÉTAPES 6 et 7. Particularités :

- 5E-08 : l’état des dernières mesures de simulation (`EvacuationMeasures | null`) est géré par la page, qui le transmet à `SommativeSimulationReport` ; « Mission terminée » exige la remise sommative **et** la trace écrite papier.
- 5E-09 : petit widget d’observation local (menu de seuil + bouton, non générique car propre à cette mission), qui réutilise `evaluateCondition` de la logique pure.
- 5E-12 : combine deux `AssociationActivity` (engins, circulation), un `EvacuationSimulation` non gardé (exploration libre, formatif), et deux `EcrisDansTonCours` (synthèse structurée, boucle réflexive sur le cahier de 5E-00) ; les quatre doivent être complétés pour débloquer « Mission terminée ».

### 2.5 Registre et parcours

`content/missions/registry.ts` : six nouvelles entrées (durées reprises telles que spécifiées dans `docs/SEANCES_5E.md`, toutes en statut `essentielle` sauf 5E-07 en `recommandee`) ; `MISSION_SEQUENCE["5e"]` et `MISSION_REGISTRY` mis à jour dans l’ordre. Le parcours 5e essentiel/recommandé (5E-00 à 5E-12) est désormais entièrement construit ; seule la finale 5e (5E-FINAL, ÉTAPE 10) reste à faire.

## 3. Suivi des tests pédagogiques différés

Les tests 1 à 6 de `docs/SPEC.md` § 64 s’appliquent désormais aux quatorze missions réelles du registre (`test/mission-registry.test.ts`, générique, aucune modification nécessaire). Le test 7 (au moins une preuve par compétence essentielle sur l’ensemble du parcours) reste différé jusqu’à la finale 5e.

## 4. Documentation mise à jour

- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 9 ».
- `docs/rapports/ETAPE_09.md` : ce document.

## 5. Tests

226 tests automatiques (Vitest), tous verts, dont 22 nouveaux pour cette étape : `evaluateCondition` (1), `formatFrenchNumber` (2), `SommativeSimulationReport` (2), `SommativeBlockProgram` (2), typographie des six nouveaux modules de contenu (6 fichiers scannés), et mise à jour de `test/mission-sequence.test.ts` pour refléter le parcours complet 5E-00 à 5E-12.

## 6. Vérification manuelle dans un navigateur réel

Parcours pilotés dans un Chromium réel (`npm run dev`), les six missions :

- 5E-07 : cinq zones correctement associées, « Bravo » affiché ;
- 5E-08 : hypothèse saisie, simulation à deux engins lancée (32 min, cohérent avec l’ÉTAPE 8), conclusion saisie, remise acceptée, « Évaluation enregistrée » affiché, aucune correction visible ;
- 5E-09 : observation qualitative correcte (seuil 2 m, distance 2,5 m → « ne s’arrête pas »), prédiction correcte, « Bravo » affiché ;
- 5E-10 : programme construit (distance < 2 m → arrêter), test affichant le comportement littéral sur les trois scénarios (« Scénario 2 (distance mesurée : 2,5 m) : aucune action déclenchée. », virgule française confirmée après correction), remise acceptée ;
- 5E-11 : tableau comparatif affiché, quatre questions de lecture correctement répondues, « Bravo » affiché ;
- 5E-12 : six menus déroulants (engins et circulation) présents et fonctionnels, première étape vérifiée avec succès.

Aucune erreur de console sur aucune des six missions, avant et après la correction du formatage décimal.

## 7. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` (`vitest run`) | ✅ 226/226 tests, 40 fichiers |
| Build | `npm run build` | ✅ export statique généré, 23 pages (`/mission/5e-07` à `/mission/5e-12` incluses) |

`AGENTS.md` et `CLAUDE.md` vérifiés non modifiés (`git status --porcelain`).

## 8. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → une consigne à la fois, boutons désactivés tant que la condition préalable n’est pas remplie, y compris dans la mission intégrative 5E-12 (quatre étapes séparées plutôt qu’un seul bloc).
- Est-il réellement en train d’apprendre de la technologie ? → chaque activité cible une compétence C2 à C9 précise de `docs/SEANCES_5E.md` ; 5E-12 mobilise explicitement les acquis de 5E-03, 5E-07 et 5E-08.
- Que doit-il écrire dans son cours ? → trace écrite papier explicite par mission ; 5E-12 ajoute une boucle réflexive non notée sur le cahier de 5E-00, jamais numérisée.
- L’élève le plus lent peut-il terminer en 45 minutes ? → durées lentes déclarées entre 29 et 38 minutes, maximum absolu ≤ 45 minutes pour les six missions (vérifié automatiquement par `validateMissionMetadata`).
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → bandeau « Simulation pédagogique » pour toutes les activités du Quartier des Ateliers, aucune mission de cette étape ne s’appuie sur une donnée réelle non sourcée.

## 9. Risques et points de vigilance

1. **5E-10 : interface pseudo-blocs provisoire.** Documentée comme telle dans le code et ce rapport ; sa refonte est prévue à l’ÉTAPE 12 (véritable environnement de programmation par blocs). Le contenu (`content/5e/5e-10.ts`) est conçu pour rester compatible avec cette refonte (condition + action + scénarios de test), mais l’interface elle-même changera.
2. **`SommativeSimulationReport` générique mais typé sur `Record<string, number> | null`.** Convient à `EvacuationSimulation` (ÉTAPE 8) et à toute future simulation numérique similaire ; à réévaluer si une future mission a besoin d’un type de mesures plus riche (texte, énumérations).
3. **Défaut de formatage décimal trouvé et corrigé pendant cette étape** (« 2.5 m » au lieu de « 2,5 m ») : `formatFrenchNumber` est désormais partagé, mais tout nouveau texte affichant un nombre décimal doit explicitement l’utiliser plutôt que `String(nombre)`, sans garde automatique pour l’instant (aucun test statique ne peut détecter cet oubli).
4. **Barrel `src/components/mission/index.ts` toujours partiellement à jour** (dette déjà signalée à l’ÉTAPE 8) : les nouveaux composants de cette étape n’y ont pas été ajoutés, comme ceux de l’ÉTAPE 7 ; ce fichier n’est importé nulle part dans le code actuel (vérifié), donc sans impact fonctionnel, mais à assainir un jour (le supprimer ou le compléter entièrement).

---

Fin de l’ÉTAPE 9.

Ne pas commencer l’ÉTAPE 10 avant l’instruction exacte : `CONTINUE ÉTAPE 10`.
