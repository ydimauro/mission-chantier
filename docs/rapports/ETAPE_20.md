# BILAN ÉTAPE 20 : Playwright

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 20) : « Tester au minimum : élève 5e (Givors → cahier → mission → évaluation → sauvegarde → reprise) ; élève 4e (analyse → panne → programmation → protocole) ; professeur (config → import → correction → compétences → ZIP / CSV) ; sauvegarde Edge / Chrome ; sauvegarde Firefox ; conflit cache / fichier ; mauvais fichier ; retour des résultats corrigés ; effacement RGPD. STOP. »

Un seul test E2E existait avant cette étape (`test/e2e/mission-new-student.spec.ts`, ÉTAPE 10). Cinq nouveaux fichiers ont été ajoutés, sans modifier ce test existant, pour couvrir explicitement chacun des neuf points demandés.

## 1. Fichiers ajoutés

| Fichier | Points couverts |
| --- | --- |
| `test/e2e/student-5e-journey.spec.ts` | Givors → cahier → mission → évaluation → sauvegarde → reprise |
| `test/e2e/student-4e-journey.spec.ts` | analyse (4E-00) → panne (4E-05) → programmation (4E-06) → protocole (4E-08) |
| `test/e2e/teacher-workflow.spec.ts` | config → import → correction → compétences → retour des résultats corrigés → CSV / ZIP |
| `test/e2e/backup-and-conflict.spec.ts` | sauvegarde Edge/Chrome, sauvegarde Firefox, conflit cache/fichier, mauvais fichier |
| `test/e2e/rgpd-erase.spec.ts` | effacement RGPD |

## 2. Parcours élève 5e

`student-5e-journey.spec.ts` : accueil (photographie réelle de Givors, bandeau « Situation réelle »), création d'identité, `/mission` → 5E-00, `/carnet` (rappel du cahier papier), dépôt d'une évaluation sommative réelle sur 5E-04 (choix argumenté d'engin), confirmation de la trace écrite, « Mission terminée », sauvegarde explicite sur `/progression`, puis rechargement complet de la page : l'identité et le dépôt déjà effectué sont retrouvés sans reconfiguration (5E-04 affiche directement la notice de dépôt).

## 3. Parcours élève 4e

`student-4e-journey.spec.ts` réutilise la même identité tout au long des quatre missions demandées, sans jamais revenir au hub entre deux missions (aucune séquence n'est imposée une fois l'identité créée) :

- **analyse** (4E-00) : diagnostic sur la même photographie réelle de Givors ;
- **panne** (4E-05) : `SommativeDiagnostic`, deux tests réalisés, cause et solution choisies, dépôt ;
- **programmation** (4E-06) : `SommativeBlockProgram` avec branche SINON, comparateur/seuil/action configurés, programme testé sur les scénarios, dépôt ;
- **protocole** (4E-08) : `SommativeSensorProtocol`, six essais répartis sur trois distances (condition minimale du protocole, `hasRepeatedProtocol`), seuil et limite renseignés, dépôt.

## 4. Parcours professeur

`teacher-workflow.spec.ts` prépare d'abord un dépôt élève réel (5E-04, exporté en `.mcjson` via l'interface), puis reconstruit un `.mctkey` minimal mais conforme au schéma directement en mémoire (`teacher-data/` n'est jamais versionné, aucun fichier réel n'existe dans le dépôt) :

1. création de la configuration de classe (`.mcconfig`) directement dans l'interface ;
2. import du `.mctkey` puis du `.mcjson` exporté ;
3. correction humaine d'un item en attente (le composant affiche toute réponse en attente même sans entrée de corrigé exacte, seul le barème provient du `.mctkey`) ;
4. vérification que « Aucune réponse en attente de correction humaine. » s'affiche ensuite ;
5. **retour des résultats corrigés** : export du fichier élève corrigé, réimport réel dans `/progression`, puis vérification de la note provisoire et de la maîtrise de compétence affichées à l’élève ; le contenu du fichier est également vérifié (`corrected`, score attribué) ;
6. compétences et synthèse de classe : les trois exports (CSV synthèse, CSV Pronote, ZIP des fichiers corrigés) sont déclenchés et leur nom de fichier vérifié.

## 5. Sauvegarde Edge/Chrome, Firefox, conflit, mauvais fichier

`backup-and-conflict.spec.ts` :

- **Edge/Chrome** : sur Chromium (moteur partagé avec Edge), `window.showDirectoryPicker` existe : le bouton « Choisir mon dossier de sauvegarde » est bien proposé. Le clic réel sur ce bouton ouvrirait un sélecteur de dossier natif non automatisable ; il n'est donc pas déclenché, seule sa présence est vérifiée.
- **Firefox** : Firefox n'a pas pu être testé nativement dans cet environnement d'exécution ([[feedback_test_csp_with_real_headers]] et docs/rapports/ETAPE_16.md § 7, échec de compositeur graphique déjà rencontré). L'absence de `window.showDirectoryPicker` est simulée sur Chromium via `page.addInitScript` avant le premier chargement, ce qui force réellement l'application dans son chemin de repli (celui réellement emprunté par Firefox, pas une simple supposition) : notice de repli affichée, bouton « Choisir mon dossier » absent, confirmation manuelle de sauvegarde fonctionnelle.
- **Conflit cache/fichier** : une élève sauvegarde deux fois de suite (deux révisions), exporte la première version puis réimporte ce fichier devenu périmé : conflit « cache plus récent » détecté, résolu en conservant le poste. Le fichier exporté est ensuite modifié (révision augmentée artificiellement dans le test) pour simuler un fichier plus récent que le cache : conflit « fichier plus récent » détecté, résolu en adoptant le fichier.
- **Mauvais fichier** : le même fichier exporté, avec seulement son `studentCode` modifié, déclenche la notice dédiée ; l'import est annulé sans perturber l'identité active.

## 6. Effacement RGPD

`rgpd-erase.spec.ts` : une identité est créée, puis effacée depuis `/privacy` après confirmation explicite. La page se recharge automatiquement (~1,2 s) et une nouvelle visite de `/progression` redemande une identité : le code élève n'apparaît plus nulle part dans la page.

## 7. Limites et points de vigilance

- **Firefox réel** non testé automatiquement dans cette session (limitation d'environnement documentée, pas de l'application) ; le chemin de repli est vérifié par simulation ciblée sur Chromium plutôt qu'ignoré.
- Le bouton « Choisir mon dossier de sauvegarde » n'est jamais cliqué automatiquement : ouvrir un vrai sélecteur de dossier natif bloquerait un test headless. Sa présence conditionnelle est vérifiée, pas le contenu du dossier réellement écrit sur disque.
- Le corrigé `.mctkey` utilisé est minimal et construit pour ce test (schéma valide, une seule entrée) : il ne couvre pas la correction automatique multi-variantes, déjà testée unitairement (`test/teacher-correction.test.ts`).
- L’audit a révélé que `/progression` acceptait les fichiers corrigés sans présenter leurs résultats. `ProgressionDashboard` affiche désormais la note provisoire ou finale et les compétences évaluées après réimport. Le calcul par mission est centralisé dans `src/lib/evaluations/student-summary.ts` et couvert par trois tests unitaires.

## 8. Pipeline qualité

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npx vitest run` | 54 fichiers, 305 tests réussis |
| `npx playwright test` | **8 tests réussis** (1 existant + 7 nouveaux répartis sur 5 fichiers) |
| `npm run build` | réussi, 36 routes statiques |

---

Fin de l’ÉTAPE 20.

Ne pas commencer l’ÉTAPE 21 avant l’instruction exacte : `CONTINUE ÉTAPE 21`.
