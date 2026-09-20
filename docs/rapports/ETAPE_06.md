# BILAN ÉTAPE 6 : prologue commun « Givors se transforme »

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 6) : créer le composant partagé puis les versions 5E-00 et 4E-00, sans dupliquer inutilement le code. Première étape de contenu de mission réel (docs/SEANCES_5E.md, docs/SEANCES_4E.md).

## 1. Décision de conception validée avec l’enseignant

La maquette d’interface fournie avant l’ÉTAPE 1 montre une zone de texte à l’écran pour « Écris dans ton cours ». Cela entrait en tension avec `AGENTS.md` (règle 3, « l’application ne remplace jamais le cahier ») et avec la conception du composant `EcrisDansTonCours` (ÉTAPE 3), qui n’expose volontairement aucun champ de saisie persistant.

**Question posée et réponse (2026-09-20)** : aucune zone de texte à l’écran. Le moment « Écris dans ton cours » reste une consigne à écrire sur papier, avec un bouton « J’ai terminé d’écrire », conformément à l’ÉTAPE 3. Ce choix s’applique à toutes les missions suivantes.

La question diagnostique à cases à cocher (« Que se passe-t-il ici ? ») de la maquette, elle, ne posait pas ce problème (rien n’est prétendu remplacer le cahier) : elle a été reprise.

## 2. Travail réalisé

### 2.1 Composant partagé

`src/components/mission/PrologueGivorsSeTransforme.tsx` : une seule mise en œuvre, paramétrée par un objet de contenu (`PrologueContent`), utilisée par 5E-00 et 4E-00. Enchaîne `SituationReelle` (photo réelle + attribution), `Objectif`, `DiagnosticNotice`, `Observe`, `DiagnosticChecklist`, `Problematique`, `Hypothese`, `EcrisDansTonCours`, `MissionCompletionFlow`, `MissionTimer` : tous des composants déjà construits aux ÉTAPES 3 et 4, plus deux nouveaux composants génériques créés cette étape et réutilisables par toute mission future :

- `DiagnosticChecklist` : question diagnostique courte à choix multiples (docs/SPEC.md § 21), stockée dans `responses`, jamais dans `assessments` (rien à corriger).
- `MissionCompletionFlow` : sauvegarde puis confirmation adaptée au navigateur avant d’autoriser « Mission terminée » (AGENTS.md règle 15), avec File System Access si un dossier est lié, sinon le repli déclaratif déjà construit à l’ÉTAPE 2 (« Enregistre ton fichier de progression. » / « J’ai enregistré mon fichier. »).

Une troisième brique partagée, `RequireStudentIdentity` (garde d’identification), a aussi été extraite : `/progression` (ÉTAPE 2) l’utilise désormais elle aussi, au lieu de dupliquer la même logique d’aiguillage (identification, conflit, mauvais fichier).

### 2.2 Contenu des deux missions

- `content/5e/5e-00.ts` : problématique, objectifs, question diagnostique et trace écrite conformes à `docs/SEANCES_5E.md`.
- `content/4e/4e-00.ts` : même structure, scénarisation orientée système technique conformément à `docs/SEANCES_4E.md` (« Quels systèmes techniques permettent de réaliser les transformations que tu observes ? »).
- `content/givors/media.ts` : métadonnées de la photographie réelle (`docs/SPEC.md` § 5), reprises de `docs/QUESTIONS_OUVERTES.md`. Faute d’une seconde photographie disponible, 4E-00 réutilise la même image que 5E-00 (option « idéalement différente » de `docs/SEANCES_4E.md`, non obligatoire) ; la scénarisation et les questions restent distinctes entre les deux niveaux.
- `content/missions/registry.ts` : registre des missions existantes (métadonnées + route + niveau), qui alimentera la navigation « Ma mission » à mesure que de nouvelles missions seront ajoutées.

### 2.3 Intégration à la progression (ÉTAPE 2)

`src/lib/progression/model.ts` : deux nouvelles fonctions pures, `recordMissionResponses` (fusionne les réponses d’une mission dans `responses`, sans incrémenter `revision`) et `markMissionCompleted` (ajoute la mission à `completedMissionIds`, incrémente `revision` : c’est la sauvegarde significative de fin de mission, docs/SPEC.md § 33 et § 38). `ProgressionProvider` expose désormais `recordResponses` et `completeMission`, en réutilisant la même logique d’écriture (IndexedDB + dossier lié) que `saveNow` (ÉTAPE 2), factorisée dans un helper interne plutôt que dupliquée.

### 2.4 Espace « Ma mission »

`/mission` n’est plus un espace d’attente : une fois l’élève identifié, il oriente vers la prochaine mission de son niveau (`src/lib/missions/sequence.ts`, `findNextMission`), ou signale que tout le parcours connu à ce jour est terminé.

## 3. Suivi des tests pédagogiques différés

Les tests 1 à 6 de `docs/SPEC.md` § 64 (problématique, durée, trace écrite, activité, évaluation ou justification, ≤ 45 min) s’appliquent désormais à du **contenu réel** (`test/mission-registry.test.ts`), et non plus seulement à des fixtures synthétiques (`test/pedagogy-validators.test.ts`, ÉTAPE 4). Les tests 7, 8 et 15 restent différés : ils portent sur des missions qui n’existent pas encore (5E-01, 5E-02, 5E-07) ou sur la vérification de plusieurs preuves par compétence sur l’ensemble du parcours essentiel.

## 4. Documentation mise à jour

- `docs/ANALYSE_SPEC.md` § 4 et `docs/QUESTIONS_OUVERTES.md` : la photographie de Givors est désormais intégrée dans l’application (5E-00 et 4E-00).
- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 6 ».
- `docs/rapports/ETAPE_06.md` : ce document.

## 5. Tests

175 tests automatiques (Vitest), tous verts, dont 20 nouveaux pour cette étape (registre de missions sur contenu réel, réponses et fin de mission dans le modèle de progression, prochaine mission par niveau, interaction du composant `DiagnosticChecklist`).

## 6. Vérification manuelle dans un navigateur réel

Parcours complet piloté dans un Chromium réel pour 5E-00 et 4E-00 :

- accès à `/mission/5e-00` sans identité : redirection vers le formulaire d’identification (réutilisation de `RequireStudentIdentity`) ;
- après identification : photo réelle affichée sous le bandeau « Situation réelle », attribution visible, objectifs, notice diagnostique, question diagnostique à cases à cocher fonctionnelle, problématique, hypothèse, consigne d’écriture ;
- bouton « Mission terminée » désactivé tant que « J’ai terminé d’écrire » n’a pas été cliqué, activé ensuite ;
- fin de mission : confirmation adaptée au navigateur (repli déclaratif observé, aucun dossier lié dans ce test), puis bandeau de bilan avec message de confirmation ;
- fichier exporté vérifié : `completedMissionIds` contient `5E-00`, `responses["5E-00"]` contient les choix diagnostiques et la confirmation d’écriture, `revision` incrémentée une seule fois ;
- retour sur `/mission` : message « tu as terminé toutes les missions disponibles pour le moment » (cohérent, une seule mission 5e existe à ce jour) ;
- 4E-00 vérifié de la même façon (problématique et question diagnostique orientées système technique, aucune erreur).

**Un bogue réel détecté et corrigé pendant cette vérification** : `DiagnosticChecklist` appelait la fonction `onChange` (qui met à jour `ProgressionProvider`, un autre composant) depuis l’intérieur du callback de mise à jour de son propre état (`setSelected((current) => { ...; onChange(next); return next; })`), ce qui déclenchait l’avertissement React « Cannot update a component while rendering a different component ». Corrigé en calculant la nouvelle sélection avant d’appeler séparément `setSelected` puis `onChange`, dans le gestionnaire d’évènement. Un test d’interaction (`test/diagnostic-checklist.test.tsx`) couvre désormais ce cas.

## 7. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 175/175 tests, 30 fichiers |
| Build | `npm run build` | ✅ export statique généré, 11 pages (`/mission/5e-00`, `/mission/4e-00` incluses) |

## 8. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → une consigne à la fois, options diagnostiques courtes, bouton de fin de mission explicitement lié à une action préalable.
- Est-il réellement en train d’apprendre de la technologie ? → l’activité reste volontairement légère pour 5E-00/4E-00 (diagnostique, sensibilisation C1/C2 et C1/C4), conforme à `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`.
- Que doit-il écrire dans son cours ? → titre et réponse personnelle explicites, jamais numérisés.
- L’élève le plus lent peut-il terminer en 45 minutes ? → durée maximale déclarée 40 minutes, cohérente avec le registre validé automatiquement.
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → bandeau « Situation réelle » avec photo authentique et attribution, aucune ambiguïté.

## 9. Risques et points de vigilance

1. **Une seule photo pour deux missions** : acceptable pour l’instant (option non obligatoire selon `docs/SEANCES_4E.md`), mais 5E-01, 5E-02 et 5E-07 restent bloquées faute de sources réelles supplémentaires (`docs/QUESTIONS_OUVERTES.md`).
2. **`MISSION_SEQUENCE` à un seul élément par niveau** : suffisant pour l’instant ; à enrichir mission par mission à partir de l’ÉTAPE 7, sans changement de structure attendu.
3. **`next/image` avec `images.unoptimized: true`** : sert l’image telle quelle (pas de redimensionnement serveur, cohérent avec l’export statique et l’absence de backend), poids de l’image à surveiller au fil de l’ajout d’autres photographies (docs/SPEC.md § 59).

---

Fin de l’ÉTAPE 6.

Ne pas commencer l’ÉTAPE 7 avant l’instruction exacte : `CONTINUE ÉTAPE 7`.
