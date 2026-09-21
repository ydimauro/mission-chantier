# BILAN ÉTAPE 10 : finale 5e (5E-FINAL)

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 10) : « Créer la finale 5e et tester plusieurs profils d’élèves. »

## 1. Conception de 5E-FINAL

`docs/SEANCES_5E.md` (« 5E-FINAL : Nouveau chantier ») demande une situation nouvelle, différente de Givors et du Quartier des Ateliers, combinant choix d’engin justifié, lecture de contraintes, simulation courte notée et justification, évaluation finale sommative et certificative pesant 60 % de la note /20 (docs/EVALUATIONS.md § 4.2).

Situation retenue : l’école de Rocheval (ville fictive, jamais mentionnée ailleurs dans l’application) agrandit sa cour de récréation. Trois dépôts sommatifs de type `"final"` :

1. **Choix d’engin** (`SommativeChoiceJustified`) : comparaison de trois engins fictifs (mini-pelle, pelle hydraulique, brouette motorisée) selon quatre critères, choix justifié.
2. **Lecture de contraintes** (`SommativeAssociation`) : trois situations à associer à la bonne zone (accès engins, passage des personnes, zone interdite), transfert direct de 5E-07.
3. **Simulation notée** (`SommativeSimulationReport` + `EvacuationSimulation`, réutilisé tel quel depuis l’ÉTAPE 8) : hypothèse, simulation, conclusion.

Une trace écrite papier courte (`EcrisDansTonCours`, conforme à AGENTS.md règle 3 et à la décision de l’ÉTAPE 6) complète la mission, indépendante des trois dépôts numériques.

### Réutilisation de l’engine existant, sans modification

Le moteur de note (`computeGrade`, pondération finale 60 %) et la synthèse enseignant (`computeStudentGrade`, `computeMissionScore`) géraient déjà le type `"final"` et la correction pondérée par item depuis les ÉTAPES 4 et 5 — vérifié sur des fixtures synthétiques dès `test/teacher-synthesis.test.ts` (ÉTAPE 5, avec `4E-FINAL`). Le seul changement nécessaire a été d’ajouter un paramètre optionnel `kind?: AssessmentKind` (défaut `"summative"`) aux quatre composants sommatifs (`SommativeChoiceJustified`, `SommativeAssociation`, `SommativeSimulationReport`, `SommativeBlockProgram`), pour qu’une mission puisse choisir `"final"`.

## 2. Deux bogues réels trouvés en testant plusieurs profils d’élèves

Conformément à l’instruction de l’ÉTAPE 10, la mission a été pilotée dans un Chromium réel selon deux profils : un élève rapide (parcours direct, aucune erreur) et un élève lent/fragile (hésitations, plusieurs essais de simulation, fermeture et réouverture de l’onglet en cours de mission). Le second profil a révélé deux défauts réels, absents du profil rapide.

### 2.1 Un dépôt sommatif pouvait être remis une seconde fois après un rechargement

Les quatre composants sommatifs ne masquaient leur formulaire (« Évaluation enregistrée ») qu’au moyen d’un état React local (`submitted`), remis à `false` à chaque remontage du composant — notamment un rechargement de page. Un élève qui recharge après avoir déposé une réponse revoyait donc le formulaire vierge, et un second dépôt aurait silencieusement remplacé le premier (`recordAssessmentSubmission` remplace toujours le dépôt existant pour le même item, y compris un dépôt déjà corrigé par l’enseignant).

**Correction** : nouvelle fonction pure `findAssessmentSubmission` (`src/lib/progression/model.ts`), consultée à chaque rendu (pas dans un état React figé) via `snapshot.file` du fournisseur de progression. Les quatre composants affichent désormais la notice « déjà remis » dès qu’un dépôt existe pour cet item, quel que soit son statut (`pending` ou `corrected`).

### 2.2 « Mission terminée » restait définitivement inaccessible après un rechargement

Une fois le premier bogue corrigé, un second est apparu : même quand un composant affichait correctement « déjà remis », la page de mission elle-même ne le savait pas. Les indicateurs `submitted`/`traceDone` de chaque page (5E-04, 5E-05, 5E-08, 5E-10, 5E-FINAL) étaient initialisés via `useState(() => ...)` — un initialiseur paresseux, qui ne s’exécute qu’une seule fois, au tout premier rendu du composant. Or ce premier rendu a lieu **avant** que le fichier élève ne soit chargé depuis IndexedDB (`snapshot.status` vaut encore `"loading"`, pas `"ready"`) : la valeur retournée est donc toujours `false`, et elle reste figée pour toujours, même une fois le fichier chargé et le composant réaffiché avec les bonnes données. Conséquence concrète : un élève qui recharge la page en cours de mission sommative ne peut plus jamais atteindre « Mission terminée », même en refaisant tout correctement.

**Correction** : ces indicateurs sont désormais recalculés à **chaque rendu** (pas mémorisés dans un état initialisé une fois), combinant un état local « soumis pendant cette session » avec une vérification fraîche du fichier persistant (`findAssessmentSubmission`, et une nouvelle fonction `isTraceEcriteConfirmee` pour la confirmation de trace écrite). Appliqué à 5E-FINAL et, la même faille étant présente depuis l’ÉTAPE 7, aux quatre missions sommatives déjà livrées : 5E-04, 5E-05, 5E-08, 5E-10.

Les deux corrections ont été revérifiées dans un Chromium réel, avec un rechargement de page réel entre les étapes de la mission (pas seulement une navigation interne) : « Mission terminée » s’active correctement après reprise.

## 3. Limite assumée, non corrigée dans cette étape

Les activités **formatives** (`AssociationActivity`) n’ont, elles, aucun état « déjà réussi » persisté (seules les réponses brutes sont enregistrées via `recordResponses`, pas un indicateur de complétion) : un élève qui recharge en cours d’activité formative doit la refaire. C’est sans conséquence grave (rien n’est noté, pas de perte de données évaluées), mais reste une limite ergonomique. Non corrigée ici pour ne pas élargir le périmètre de cette étape ; à traiter lors de l’audit écran par écran de l’ÉTAPE 15 (accessibilité et REP), qui est le bon moment pour une revue systématique de la reprise après interruption sur l’ensemble des missions.

## 4. Suivi des tests pédagogiques différés

Les tests 1 à 6 de `docs/SPEC.md` § 64 s’appliquent désormais aux quinze missions réelles du registre, 5E-FINAL incluse (`test/mission-registry.test.ts`, générique). Le test 7 (au moins une preuve par compétence essentielle) reste différé jusqu’à la fin du parcours 4e.

## 5. Documentation mise à jour

- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 10 ».
- `docs/rapports/ETAPE_10.md` : ce document.

## 6. Tests

238 tests automatiques (Vitest), tous verts, dont 15 nouveaux pour cette étape : `kind="final"` sur les trois composants sommatifs concernés (3), comportement « déjà remis » après remontage pour les quatre composants sommatifs (4), `findAssessmentSubmission` et `isTraceEcriteConfirmee` (4), typographie du nouveau module de contenu (1 fichier scanné), mise à jour de `test/mission-sequence.test.ts` (parcours 5E-00 à 5E-FINAL) et de `test/mission-registry.test.ts` (validation automatique étendue à 5E-FINAL).

## 7. Vérification manuelle dans un navigateur réel, à plusieurs profils d’élèves

Parcours pilotés dans un Chromium réel (`npm run dev`) :

- **Profil rapide** : identification, choix d’engin, lecture de contraintes, simulation et conclusion, trace écrite, « Mission terminée » activé du premier coup, aucune erreur console.
- **Profil lent/fragile** : choix d’engin avec hésitation (plusieurs sélections avant validation), fermeture puis réouverture de l’onglet après le premier dépôt, reprise de la mission (dépôt déjà remis correctement affiché, formulaire non réaffiché), lecture de contraintes avec hésitation, plusieurs lancers de simulation avant de conclure, trace écrite, « Mission terminée » activé — après correction des deux bogues du § 2 ; avant correction, ce profil restait bloqué.
- **Cas isolé (rechargement simple)** : reproduit indépendamment de toute autre variable (sans hésitation ni fermeture d’onglet), pour confirmer précisément l’origine des deux bogues avant de les corriger.
- **Spot-check sur une mission déjà livrée** (5E-08) : même scénario de rechargement, confirme que la correction s’applique correctement en dehors de 5E-FINAL.

Aucune erreur de console dans aucun scénario, avant ou après correction (les bogues eux-mêmes ne levaient aucune exception, ce qui explique qu’ils n’aient été détectés que par un test de reprise explicite, pas par la seule absence d’erreurs).

## 8. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` (`vitest run`) | ✅ 238/238 tests, 40 fichiers |
| Build | `npm run build` | ✅ export statique généré, 24 pages (`/mission/5e-final` incluse) |

`AGENTS.md` et `CLAUDE.md` vérifiés non modifiés (`git status --porcelain`).

## 9. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → une consigne par étape, comme les autres missions ; la reprise après interruption fonctionne désormais correctement, point critique pour un élève REP susceptible de fermer l’onglet ou de changer de séance.
- Est-il réellement en train d’apprendre de la technologie ? → transfert explicite des compétences C1, C2, C3, C4, C7, C8 sur une situation entièrement nouvelle, conforme à docs/COMPETENCES.md § 5.
- Que doit-il écrire dans son cours ? → phrase de synthèse courte sur le cahier papier, indépendante des dépôts numériques notés.
- L’élève le plus lent peut-il terminer en 45 minutes ? → durées retenues 28/35/43/45, cohérentes avec `docs/SEANCES_5E.md` et vérifiées automatiquement.
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → aucune donnée réelle utilisée (situation fictive de transfert), bandeau « Simulation pédagogique » sur chaque activité.

## 10. Risques et points de vigilance

1. **Reprise après interruption pour les activités formatives** : non couverte (§ 3), à traiter à l’ÉTAPE 15.
2. **`kind="final"` non ajouté à `SommativeBlockProgram`** : inutilisé par 5E-FINAL (la mission ne comporte pas de programmation), donc non ajouté pour ne pas étendre l’API sans usage réel ; à ajouter le jour où une mission finale en aura besoin (5E ou 4E).
3. **Le barème précis de 5E-FINAL** (points par item dans `.mctkey`, seuils de maîtrise) reste à définir par l’enseignant au moment de la correction réelle dans `/teacher` — aucune valeur n’est codée en dur côté application, conformément à la séparation contenu/correction déjà établie (AGENTS.md règles 10 et 11).

---

Fin de l’ÉTAPE 10.

Ne pas commencer l’ÉTAPE 11 avant l’instruction exacte : `CONTINUE ÉTAPE 11`.
