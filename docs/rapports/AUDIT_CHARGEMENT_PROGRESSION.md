# AUDIT ET CORRECTION : page /mission vide (déclenché avant la suite de l’ÉTAPE 10)

Périmètre : audit demandé par l’utilisateur le 2026-09-21, suspendant l’ÉTAPE 10 pour vérifier et corriger tout ce qui devait être réellement fonctionnel à la fin des ÉTAPES 1 à 9. Signalement initial : `/mission` affichait l’en-tête, le pied de page, et une grande zone centrale vide.

## 1. Travail de l’ÉTAPE 10 : non touché

Vérifié avant toute action (`git show --stat 4bb5b6a`) : les fichiers de l’ÉTAPE 10 (5E-FINAL, registre, quatre composants sommatifs, quatre missions déjà corrigées, `src/lib/progression/model.ts`) n’ont pas été modifiés par cet audit. Le commit de cet audit est distinct du commit `4bb5b6a` (ÉTAPE 10) et ne le touche pas.

## 2. Cause exacte de la page /mission vide

Reproduite avec un navigateur neuf (identité fraîche) : **non reproductible**, `/mission` fonctionnait normalement. Reproduite avec l’export statique réel (`out/`, serveur statique local) : **non reproductible** non plus.

Reproduite en simulant une lecture IndexedDB en échec (navigation privée restrictive, quota dépassé, donnée corrompue) pour un élève déjà identifié sur le poste (code stocké en `localStorage`) : **reproduite à l’identique** du signalement.

**Cause racine** : l’effet de chargement initial dans `src/providers/progression-provider.tsx` (construit à l’ÉTAPE 2) n’avait **aucun `try/catch`** autour de la lecture IndexedDB (`getStudentFile`, `getDirectoryHandle`). Si cette lecture échoue, l’exception devient une promesse rejetée jamais rattrapée : `setLoadedState` n’est jamais appelé, `loadedState` reste `null` pour toujours, et `snapshot.status` reste `"loading"` indéfiniment. `RequireStudentIdentity` (ÉTAPE 6) retourne alors `null` pour ce statut, sans aucun message ni action possible : zone centrale vide, en-tête et pied de page (rendus par la mise en page racine, hors de cette garde) toujours visibles. Aucune erreur console visible sans ouvrir les outils de développement (promesse rejetée non gérée, pas une exception affichée directement).

## 3. Correction apportée

- `src/providers/progression-provider.tsx` : l’effet de chargement est maintenant protégé par un `try/catch`. En cas d’échec, un nouvel état `snapshot.status: "error"` est exposé, avec une nouvelle action `retryLoad()` (relance le chargement, ex. après avoir quitté la navigation privée ou libéré de l’espace de stockage).
- `src/components/progression/RequireStudentIdentity.tsx` : gère désormais explicitement `"loading"` (message « Chargement de ta progression… », `role="status"`, plus jamais un simple `return null`) et `"error"` (nouveau composant `LoadErrorNotice`, `role="alert"`, boutons « Réessayer » et « Recharger la page »).
- `src/components/progression/LoadErrorNotice.tsx` (nouveau) : suit le même patron que `WrongFileNotice`/`ConflictDialog` déjà existants.
- `content/pages/progression.ts` : nouveaux libellés `LOADING_LABEL`, `LOAD_ERROR_MESSAGES`.

Cette correction s’applique à **toutes** les pages protégées par `RequireStudentIdentity` (toutes les missions 5e, `/progression`), pas seulement `/mission` : la même cause aurait produit le même symptôme partout.

### Autres `return null` du code : audit et verdict

- `MissionHub.tsx` et `ProgressionPageClient.tsx` (`if (snapshot.status !== "ready") return null;`) : code mort inoffensif, ces composants ne sont jamais rendus par `RequireStudentIdentity` avant que `snapshot.status` ne soit `"ready"`. Laissés tels quels (garde défensive raisonnable), non modifiés.
- `ClassSynthesisPanel.tsx`, `StudentDetail.tsx` (`/teacher`) : masquent seulement une section optionnelle au sein d’une page `/teacher` toujours par ailleurs peuplée (titre, panneaux de configuration, import, liste des élèves toujours visibles). Ce n’est pas la même catégorie de défaut ; non modifié.

## 4. Enrichissement de /mission (audit § 3)

En reproduisant le parcours normal, `/mission` fonctionnait mais n’affichait que l’identifiant de la mission suivante et un bouton, sans objectif, statut ni progression, contrairement au minimum attendu précisé dans l’audit. `docs/SPEC.md` ne spécifie pas cette page en détail (aucune occurrence de « Ma mission » ou « /mission » dans le cahier des charges) ; il ne s’agissait donc pas d’un défaut par rapport à une exigence déjà écrite, mais l’audit en a fait une exigence explicite. Corrigé avec les données déjà disponibles dans le registre et le fichier élève (aucune nouvelle donnée requise) :

- `MissionHub.tsx` affiche désormais : « Parcours 5e/4e », l’identifiant et la problématique de la mission suivante, son objectif (`activite` du registre), son statut (Essentielle/Recommandée/Approfondissement), la progression (« Missions terminées : X sur Y. ») et un bouton dont le libellé distingue « Commencer la mission » (jamais entamée) de « Poursuivre la mission » (réponses ou dépôts déjà enregistrés pour cette mission).
- `content/pages/mission-hub.ts` : nouveaux libellés correspondants.

## 5. Vérification systématique (audit § 4, § 12)

Balayage automatisé (Playwright, identité fraîche créée) de vingt routes : `/`, `/mission` (avant et après identité), `/progression`, `/teacher`, `/carnet`, `/ressources`, et les quatorze missions 5e (`5E-00` à `5E-12`, `5E-FINAL`). Vérifié pour chacune : contenu réel présent (pas de zone principale vide), aucune erreur de console, aucune erreur de page.

**Résultat : 20/20 routes correctes, aucune erreur.**

5E-00 vérifiée en détail par capture d’écran : bandeau « Situation réelle » avec la photo réelle de Givors, objectifs, notice diagnostique, question d’observation, question diagnostique à cases à cocher, problématique, hypothèse, « Écris dans ton cours » avec bouton « J’ai terminé d’écrire », bouton « Mission terminée ». Tout est affiché et raccordé.

## 6. Moteur de simulation, évaluations, « Ma progression », /teacher

Déjà vérifiés en détail lors des ÉTAPES 8, 9 et 10 (voir `docs/rapports/ETAPE_08.md`, `ETAPE_09.md`, `ETAPE_10.md`) : le moteur de simulation (`EvacuationSimulation`) est utilisé et interactif dans 5E-08, 5E-12 et 5E-FINAL ; les évaluations diagnostiques (5E-00), formatives (avec correction immédiate) et sommatives intermédiaires (5E-04, 5E-05, 5E-08, 5E-10, sans correction visible côté élève) sauvegardent correctement leurs réponses. Reconfirmé fonctionnel par le balayage du § 5 (aucune régression).

## 7. Tests

- `npm run lint` : ✅ aucun problème.
- `npm run typecheck` : ✅ aucune erreur.
- `npm run test` (`vitest run`) : ✅ **247/247 tests**, 43 fichiers (9 nouveaux tests : `test/require-student-identity.test.tsx` reproduit le défaut au niveau du composant, `test/progression-provider-load-error.test.tsx` reproduit le défaut de bout en bout avec le vrai `ProgressionProvider` et une lecture IndexedDB simulée en échec, `test/mission-hub.test.tsx` verrouille le nouveau contenu de `/mission`).
- `npm run build` : ✅ export statique généré, 24 pages.

Aucun test Playwright automatisé n’a été ajouté au dépôt : conformément à `docs/ARCHITECTURE.md` § 1, les tests de bout en bout en navigateur réel sont prévus à l’ÉTAPE 20 (pas encore atteinte). La reproduction et la vérification manuelles de cet audit ont été faites avec des scripts Playwright ponctuels (hors dépôt), comme à chaque étape précédente ; la couverture automatique permanente du défaut réside dans les tests Vitest ci-dessus, qui font échouer la suite si le même bogue réapparaît.

## 8. Parcours manuel pour retester 5E-00 à 5E-12 et 5E-FINAL

1. `npm run dev`, ouvrir `/`.
2. Cliquer « Découvrir ma mission ».
3. Créer une identité (code élève, classe, niveau 5e).
4. `/mission` affiche « Parcours 5e », la mission suivante avec son objectif, son statut, la progression, et un bouton.
5. Cliquer le bouton : ouvre la mission (`/mission/5e-00` au départ).
6. Terminer la mission (« Mission terminée ») pour revenir sur `/mission` et voir la mission suivante proposée automatiquement.
7. Répéter jusqu’à `5E-FINAL` ; ou naviguer directement vers n’importe quelle route `/mission/5e-0{0..9}`, `/mission/5e-1{0,1,2}`, `/mission/5e-final`.

## 9. État du travail de l’ÉTAPE 10

Inchangé par cet audit. 5E-FINAL et les corrections des quatre missions sommatives (5E-04, 5E-05, 5E-08, 5E-10) restent tels que committés dans `4bb5b6a`, entièrement fonctionnels (reconfirmé par le balayage du § 5).

---

Fin de l’audit.

Ne pas reprendre l’ÉTAPE 10 avant l’instruction exacte : `REPRENDRE ÉTAPE 10`.
