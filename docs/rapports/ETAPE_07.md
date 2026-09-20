# BILAN ÉTAPE 7 : premières missions 5e (5E-01 à 5E-06)

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 7) : « Développer 5E-01 à 5E-06. STOP. » Six missions réelles, spécifiées en détail à l’ÉTAPE 0 dans `docs/SEANCES_5E.md`, construites après le prologue commun 5E-00/4E-00 (ÉTAPE 6).

## 1. Décisions de conception

Aucune décision de cette étape n’entrait en tension avec une règle explicite d’`AGENTS.md` ou de `docs/SPEC.md` (contrairement à l’ÉTAPE 6) : les choix suivants ont donc été tranchés sans escalade vers l’utilisateur, puis appliqués de façon cohérente aux six missions.

1. **Interactions « association », « classement », « séquencement » : menu déroulant natif, pas de glisser-déposer.** Un menu `<select>` par élément est nativement utilisable au clavier et à la souris, sans code de repli séparé à écrire ni tester. Ce choix unique a permis de construire un seul composant `AssociationActivity`, réutilisé tel quel par 5E-01 (appariement besoin → objet technique), 5E-02 (classement en six catégories d’action) et 5E-03 (appariement fonction → engin), ainsi que par la partie formative de 5E-05 (classification matière/énergie/information) ; et un seul `SequencingActivity` pour la chaîne d’énergie de 5E-06.
2. **Formatif contre sommatif, strictement séparé au niveau des composants.** `AssociationActivity`/`SequencingActivity` (formatifs) affichent toujours une correction immédiate et des indices progressifs après vérification. `SommativeAssociation`/`SommativeChoiceJustified` (sommatifs) n’affichent jamais ni correction ni indice (`docs/SPEC.md` § 30) : ils déposent la réponse via le nouveau `submitAssessment` du provider de progression et affichent `SommativeSubmittedNotice`, en attente de correction dans `/teacher`.
3. **5E-06 : chaîne d’énergie réduite à six étapes.** `docs/SEANCES_5E.md` détaille une chaîne plus longue ; elle a été ramenée à six étapes (source d’énergie → moteur → pompe → vérin → bras → mouvement) pour limiter la charge cognitive d’un public REP, le vocabulaire non repris (fluide, circuit hydraulique, godet) restant accessible via le texte d’accompagnement de la mission plutôt que comme étape de la remise en ordre.
4. **5E-04 : valeurs de comparaison fictives, annoncées comme telles.** Aucune source chiffrée réelle n’existe pour comparer masse/distance/terrain/coût de plusieurs engins ; `Source` sans `citation` déclenche automatiquement le libellé « Valeur pédagogique fictive » (`docs/SPEC.md` § 52), déjà supporté par le composant depuis l’ÉTAPE 3.

## 2. Travail réalisé

### 2.1 Nouveaux composants génériques (`src/components/mission/`)

- `AssociationActivity` : appariement/classement formatif par menus déroulants, correction immédiate (icônes ✓/⚠, jamais la couleur seule), message de réussite ou message de reprise + indices progressifs (`IndiceProgressif`) en cas d’erreur.
- `SequencingActivity` : remise en ordre formative, même principe d’interaction (menu de position 1..N par étape) et de correction que `AssociationActivity`.
- `SommativeAssociation` : variante sommative d’`AssociationActivity`, aucune correction affichée, dépôt via `submitAssessment`.
- `SommativeChoiceJustified` : tableau de comparaison + choix unique (radio) + justification (texte libre), sommatif, dépôt via `submitAssessment`.
- `src/lib/mission/activity-scoring.ts` : logique de notation pure (`scoreAssociation`, `scoreSequencing`), testée indépendamment des composants React.

`SommativeAssociation` et `SommativeChoiceJustified` acceptent désormais un `onSubmitted` optionnel : la page de mission peut ainsi savoir qu’une évaluation sommative a bien été déposée, au même titre qu’elle sait quand la trace écrite papier a été confirmée, avant d’activer « Mission terminée ».

### 2.2 Progression : dépôt d’évaluation

- `src/lib/progression/model.ts` : `recordAssessmentSubmission` (ajoute ou remplace, pour un même `missionId`/`itemId`, le dépôt dans `assessments`, incrémente `revision`).
- `src/providers/progression-provider.tsx` : `submitAssessment(missionId, itemId, kind, responses)` construit la graine (`createSeed`), l’objet `AssessmentSubmission` (statut `pending`) et l’enregistre via la même logique d’écriture (IndexedDB + dossier lié) que `completeMission`.

### 2.3 Contenu des six missions (`content/5e/`)

| Mission | Activité | Évaluation |
| --- | --- | --- |
| 5E-01 | Association besoin → objet technique (4 items), ancrée sur la photo réelle de Givors | Formative |
| 5E-02 | Classement en six catégories d’action (6 items) | Formative |
| 5E-03 | Association fonction → engin (7 items) | Formative |
| 5E-04 | Comparaison guidée de trois engins + choix justifié | Sommative intermédiaire n° 1 |
| 5E-05 | Classification matière/énergie/information (7 items formatifs, 4 items sommatifs distincts) | Formative puis sommative intermédiaire n° 2 |
| 5E-06 | Remise en ordre de la chaîne d’énergie (6 étapes) + mini-diagnostic de panne (1 item) | Formative |

Chaque fichier suit la même structure : objet `MISSION_5E_0X` (identifiant, objectifs, problématique, consignes), tableaux d’items/choix/étapes, indices progressifs, trace écrite papier (`_TRACE`), texte de bilan (`_BILAN`).

### 2.4 Pages de mission (`src/app/mission/5e-0{1..6}/`)

Chaque route suit le canevas établi à l’ÉTAPE 6 (page serveur avec `metadata`, composant client `RequireStudentIdentity` + composants du moteur pédagogique). `MissionCompletionFlow` n’active « Mission terminée » qu’une fois **toutes** les conditions de la mission remplies (activité formative réussie et/ou évaluation sommative déposée, **et** trace écrite confirmée), jamais sur la seule confirmation papier.

### 2.5 Registre et parcours

`content/missions/registry.ts` : six nouvelles entrées (`MISSION_5E_01` à `MISSION_5E_06`, durées reprises telles que spécifiées dans `docs/SEANCES_5E.md`, 5E-02 en statut `recommandee`, les cinq autres en `essentielle`) ; `MISSION_SEQUENCE["5e"]` et `MISSION_REGISTRY` mis à jour dans l’ordre.

## 3. Suivi des tests pédagogiques différés

Les tests 1 à 6 de `docs/SPEC.md` § 64 s’appliquent désormais aux huit missions réelles du registre (`test/mission-registry.test.ts`, générique, aucune modification nécessaire). Le test 7 (au moins une preuve par compétence essentielle sur l’ensemble du parcours) reste différé : le parcours 5e n’est pas encore complet (5E-07 et suivantes restent à construire).

## 4. Documentation mise à jour

- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 7 ».
- `docs/rapports/ETAPE_07.md` : ce document.

## 5. Tests

203 tests automatiques (Vitest), tous verts, dont 28 nouveaux pour cette étape : notation pure des activités (5), interaction `AssociationActivity` (4), interaction `SequencingActivity` (2), composants sommatifs (3), dépôt d’évaluation dans le modèle de progression (2), typographie des six nouveaux modules de contenu (6 nouveaux fichiers scannés), et mise à jour de `test/mission-sequence.test.ts` pour refléter le nouveau parcours 5e (6 tests inchangés + assertions étendues).

## 6. Vérification manuelle dans un navigateur réel

Parcours pilotés dans un Chromium réel (`npm run dev`) :

- `/mission/5e-01` : identification, photo réelle affichée, quatre menus déroulants répondus correctement, message « Bravo, toutes tes réponses sont correctes. » affiché, trace écrite confirmée, « Mission terminée » activé ;
- `/mission/5e-04` : tableau de comparaison à trois engins et quatre critères affiché, mention « Valeur pédagogique fictive » visible, choix radio + justification remplis, remise acceptée, notice « Évaluation enregistrée. Ton résultat sera disponible après correction. » affichée à la place du formulaire (aucune correction ni indice visible) ;
- aucune erreur console sur les deux pages.

Captures d’écran prises à chaque étape clé (formulaire d’identification, activité répondue, activité corrigée, formulaire sommatif avant/après remise).

## 7. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` (`vitest run`) | ✅ 203/203 tests, 34 fichiers |
| Build | `npm run build` | ✅ export statique généré, 17 pages (`/mission/5e-01` à `/mission/5e-06` incluses) |

`AGENTS.md` et `CLAUDE.md` vérifiés non modifiés (`git status --porcelain`).

## 8. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → une consigne à la fois, une seule action par écran d’activité, boutons désactivés tant que la condition préalable n’est pas remplie.
- Est-il réellement en train d’apprendre de la technologie ? → chaque activité cible une compétence C1 à C4 précise de `docs/SEANCES_5E.md`, avec correction ou dépôt cohérent avec le statut formatif/sommatif.
- Que doit-il écrire dans son cours ? → une trace écrite papier explicite par mission, jamais numérisée, conforme à la décision actée à l’ÉTAPE 6.
- L’élève le plus lent peut-il terminer en 45 minutes ? → durées lentes déclarées entre 33 et 35 minutes, maximum absolu ≤ 45 minutes pour les six missions (vérifié automatiquement par `validateMissionMetadata`).
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → bandeau « Situation réelle » pour la photo de 5E-01, bandeau « Simulation pédagogique » pour toutes les activités du Quartier des Ateliers, aucune ambiguïté.

## 9. Risques et points de vigilance

1. **Indices progressifs et retries illimités côté formatif** : un élève peut valider une activité formative uniquement par élimination successive, sans réflexion réelle. Accepté pour l’instant (cohérent avec `docs/SPEC.md` § 30, correction immédiate encouragée en formatif) ; à surveiller si la synthèse de classe (`/teacher`) montre un usage massif des indices sur ces missions.
2. **`onSubmitted` optionnel ajouté a posteriori aux deux composants sommatifs** : rétrocompatible (les tests existants ne le passaient pas et continuent de fonctionner), mais toute mission sommative future doit penser à le brancher pour que « Mission terminée » se débloque correctement.
3. **5E-06 : chaîne d’énergie simplifiée à six étapes** : écart assumé par rapport au détail complet de `docs/SEANCES_5E.md`, documenté dans le code (commentaire sur `MISSION_5E_06`) ; à réévaluer si un enseignant demande la chaîne complète.
4. **Aucune nouvelle photographie réelle de Givors** : 5E-02 à 5E-06 restent entièrement dans le Quartier des Ateliers (simulation), faute de sources supplémentaires (`docs/QUESTIONS_OUVERTES.md`, inchangé depuis l’ÉTAPE 6).

---

Fin de l’ÉTAPE 7.

Ne pas commencer l’ÉTAPE 8 avant l’instruction exacte : `CONTINUE ÉTAPE 8`.
