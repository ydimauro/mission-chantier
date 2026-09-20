# BILAN ÉTAPE 0 : Analyse et ingénierie pédagogique

Aucun développement applicatif n’a été réalisé pendant cette étape, conformément à `ETAPE_0.md`.

## 1. Documents créés

- `docs/ANALYSE_SPEC.md`
- `docs/PEDAGOGIE.md`
- `docs/COMPETENCES.md`
- `docs/EVALUATIONS.md`
- `docs/SEANCES_5E.md`
- `docs/SEANCES_4E.md`
- `docs/TRACES_ECRITES.md`
- `docs/FICHES_PROFESSEUR.md`
- `docs/RGPD.md`
- `docs/ARCHITECTURE.md`
- `docs/SAUVEGARDE.md`
- `docs/PROGRESSION_ANNUELLE.md`
- `docs/QUESTIONS_OUVERTES.md` (mis à jour : hébergement Vercel décidé)
- `docs/rapports/ETAPE_00.md` (ce document)

## 2. Sources Givors disponibles

Aucune. `docs/sources/givors/` ne contient à ce jour que son `README.md`. Aucun PDF, capture de page institutionnelle, document de la Ville de Givors ou de la Métropole de Lyon, photographie ou plan n’a encore été déposé. Aucun fait réel n’a été inventé pour combler ce manque (règle 5 de `AGENTS.md`). Détail dans `docs/ANALYSE_SPEC.md` § 4.

## 3. Informations manquantes

- sources Givors exploitables (§ 2 ci-dessus) ;
- paramètres de progression annuelle : `weeklyHours5e`, `effectiveWeeks5e`, `weeklyHours4e`, `effectiveWeeks4e` (voir `docs/QUESTIONS_OUVERTES.md` et `docs/PROGRESSION_ANNUELLE.md` § 3).

L’hébergement, seule autre question ouverte au lancement de l’étape, a été tranché par l’enseignant : Vercel.

## 4. Parcours complet 5e

14 séances (5E-00 à 5E-12, puis 5E-FINAL), 10 h 30 de temps pédagogique effectif. Détail mission par mission dans `docs/SEANCES_5E.md`.

## 5. Parcours essentiel 5e

12 séances (exclusion de 5E-02 et 5E-07, statut RECOMMANDÉE), 9 h 00. Cohérence vérifiée : boucle réflexive conservée, sommatives et finale conservées, preuves multiples disponibles pour les compétences évaluées (`docs/COMPETENCES.md` § 4, `docs/PROGRESSION_ANNUELLE.md` § 2.3).

## 6. Parcours complet 4e

13 séances (4E-00 à 4E-11, puis 4E-FINAL), 9 h 45. Détail mission par mission dans `docs/SEANCES_4E.md`.

## 7. Parcours essentiel 4e

12 séances (exclusion de 4E-07, statut RECOMMANDÉE), 9 h 00. Même vérification de cohérence que pour le 5e.

## 8. Nombre de séances et heures (récapitulatif)

| | Séances | Heures |
| --- | ---: | ---: |
| 5e complet | 14 | 10 h 30 |
| 5e essentiel | 12 | 9 h 00 |
| 4e complet | 13 | 9 h 45 |
| 4e essentiel | 12 | 9 h 00 |
| **Total complet (5e + 4e)** | **27** | **20 h 15** |
| **Total essentiel (5e + 4e)** | **24** | **18 h 00** |

## 9. Part dans la progression annuelle

Non calculable en l’état (paramètres non fournis, voir § 3). Formule et emplacement du calcul futur documentés dans `docs/PROGRESSION_ANNUELLE.md` § 3.

## 10. Matrice compétences

Neuf compétences C1 à C9 définies, statut par mission (INTRODUITE / PRINCIPALEMENT TRAVAILLÉE / APPROFONDIE / ÉVALUÉE / NON PRIORITAIRE) et matrices missions × compétences pour les deux niveaux dans `docs/COMPETENCES.md`. Aucune répartition artificiellement égale recherchée, conformément au cahier des charges. Vérification explicite des preuves multiples pour les compétences évaluées du parcours essentiel (`docs/COMPETENCES.md` § 4) : toutes les compétences évaluées disposent d’au moins deux contextes distincts, à l’exception documentée de C9 en 5e (un seul contexte formel, consolidation prévue en 4e avec trois contextes).

## 11. Matrice évaluations

Quatre familles (diagnostique, formative, sommative intermédiaire, finale), pondération 0 % / 0 % direct / 40 % / 60 %, neuf sommatives intermédiaires réparties sur les deux niveaux (quatre en 5e, cinq en 4e) plus deux finales. Détail complet dans `docs/EVALUATIONS.md`.

## 12. Système de preuves

Structure de preuve type (compétence, mission, type d’évaluation, contexte, score, date, seed) définie dans `docs/EVALUATIONS.md` § 5. Algorithme des cinq niveaux de maîtrise (Non évaluée à Très bonne maîtrise) documenté et explicable dans `docs/COMPETENCES.md` § 5, fondé sur la pluralité et la cohérence des preuves plutôt que sur un score unique.

## 13. Architecture de correction

Correction sommative intégralement déportée dans `/teacher`, jamais embarquée côté élève. Trois fichiers strictement séparés (`.mcjson` élève, `.mcconfig` classe, `.mctkey` enseignant, jamais versionné). Workflow complet (import, correction automatique et humaine, calcul des notes et compétences, réinjection, export groupé) documenté dans `docs/EVALUATIONS.md` et `docs/SAUVEGARDE.md` § 8.

## 14. Architecture de sauvegarde

`.mcjson` comme support portable principal, IndexedDB comme cache local, `schemaVersion` / `revision` / `updatedAt` sur chaque fichier. Sauvegarde différenciée Edge/Chrome (File System Access, `.bak`) et Firefox (export unique en fin de mission). Gestion stricte des conflits cache / fichier (aucune fusion automatique, aucun écrasement silencieux) et de l’identité du fichier (lecture de `studentCode`, jamais du nom de fichier). Détail complet dans `docs/SAUVEGARDE.md`.

## 15. Risques détectés

1. Sources Givors manquantes, bloquant toute rédaction de fait réel précis avant dépôt par l’enseignant.
2. Charge des missions intégratives 5E-12 et 4E-11, calées au maximum acceptable (43 min en durée lente), à surveiller lors des tests utilisateurs (ÉTAPES 10 et 14).
3. Double usage de C8 (simulation en 5e, protocole de test réel en 4e) : deux preuves de nature différente, à ne pas fusionner par erreur lors du développement.
4. Confidentialité du `.mctkey` : à vérifier par un test automatique dès l’ÉTAPE 4 pour garantir qu’il ne quitte jamais le dépôt et n’apparaît jamais dans le build élève.
5. Faisabilité technique de l’export groupé en ZIP côté navigateur (sans backend) : à confirmer à l’ÉTAPE 5.

Détail dans `docs/ANALYSE_SPEC.md` § 8.

## 16. Décisions recommandées

- Hébergement Vercel validé par l’enseignant : build statique, aucune fonction serverless, sécurité via `vercel.json` (voir `docs/ARCHITECTURE.md` § 2 et § 6).
- Ne pas commencer l’ÉTAPE 1 avant que l’enseignant ait pu, s’il le souhaite, déposer au moins une première source Givors dans `docs/sources/givors/` (non bloquant pour l’ÉTAPE 1, qui ne développe aucune mission à ancrage réel, mais utile avant les ÉTAPES 6 et 11 qui développent 5E-00 et 4E-00).
- Renseigner dès que possible les quatre paramètres de progression annuelle pour permettre le calcul de la part annuelle.

## 17. Questions ouvertes

Voir `docs/QUESTIONS_OUVERTES.md`, à jour :

- paramètres de progression annuelle (`weeklyHours5e`, `effectiveWeeks5e`, `weeklyHours4e`, `effectiveWeeks4e`) : toujours en attente ;
- hébergement : **résolu**, Vercel.

---

Fin de l’ÉTAPE 0.

Ne pas commencer l’ÉTAPE 1 avant l’instruction exacte : `CONTINUE ÉTAPE 1`.
