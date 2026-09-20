# ÉTAPE 0 - Analyse et ingénierie pédagogique

## Règle

Aucun développement applicatif pendant cette étape.

Ne créer aucun écran fonctionnel, aucune simulation codée et aucun moteur d’évaluation exécutable.

## À lire avant toute action

1. `AGENTS.md`
2. `docs/SPEC.md`
3. les documents présents dans `docs/sources/givors/`

Les faits concernant Givors doivent provenir uniquement de `docs/sources/givors/`.
Si le dossier ne contient aucune source exploitable, le signaler et ne rien inventer.

## Documents à produire

Créer ou compléter :

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
- `docs/QUESTIONS_OUVERTES.md`

## Pour chaque mission

Définir :

- identifiant ;
- titre ;
- statut : ESSENTIELLE, RECOMMANDÉE ou APPROFONDISSEMENT ;
- problématique ;
- ancrage réel Givors ou simulation Quartier des Ateliers ;
- objectifs ;
- connaissances ;
- compétences ;
- thème T1, T2 ou T3 ;
- activité ;
- manipulation, protocole ou simulation ;
- trace écrite ;
- fiche de cours aménagée ;
- évaluation ;
- type d’évaluation ;
- barème éventuel ;
- preuves de compétences ;
- aides ;
- remédiation ;
- approfondissement ;
- durée élève rapide ;
- durée élève moyen ;
- durée élève lent ;
- maximum absolu ;
- critères de réussite ;
- sources nécessaires.

## Matrices obligatoires

Produire :

- missions / compétences ;
- missions / connaissances ;
- compétences / preuves ;
- évaluations / note ;
- compétences / évaluation finale ;
- durées des séances ;
- parcours complet / parcours essentiel ;
- total séances et heures par niveau ;
- vérification des preuves multiples dans le parcours essentiel.

## Progression annuelle

Calculer la part de Mission Chantier dans l’année uniquement si les quatre paramètres suivants ont été fournis :

- `weeklyHours5e`
- `effectiveWeeks5e`
- `weeklyHours4e`
- `effectiveWeeks4e`

Sinon indiquer :

« Part de la progression annuelle : non calculable avec les données actuellement disponibles. »

et inscrire la question dans `docs/QUESTIONS_OUVERTES.md`.

## Points à auditer explicitement

- 45 minutes maximum par mission ;
- adaptation REP ;
- construction du cours papier ;
- équilibre diagnostique / formatif / sommatif / final ;
- plusieurs preuves pour les compétences évaluées ;
- C8 travaillé par simulation ET par protocole de test ;
- programmation adaptée en 5e et en 4e ;
- distinction Givors réel / Quartier des Ateliers ;
- neutralité du ton ;
- droit à l’image ;
- architecture `.mcjson` / `.mcconfig` / `.mctkey` ;
- correction sommative dans `/teacher` ;
- retour des résultats vers les élèves par lot ;
- sauvegarde Edge / Chrome / Firefox ;
- gestion `revision` et conflits cache / fichier ;
- confidentialité des aménagements ;
- parcours complet et parcours essentiel.

## Fin de l’étape

Produire un `BILAN ÉTAPE 0` contenant :

1. documents créés ;
2. sources Givors disponibles ;
3. informations manquantes ;
4. parcours complet 5e ;
5. parcours essentiel 5e ;
6. parcours complet 4e ;
7. parcours essentiel 4e ;
8. nombre de séances et heures ;
9. part annuelle si calculable ;
10. matrice compétences ;
11. matrice évaluations ;
12. système de preuves ;
13. architecture de correction ;
14. architecture de sauvegarde ;
15. risques détectés ;
16. décisions recommandées ;
17. questions ouvertes.

Puis STOP.

Ne pas commencer l’étape 1 avant l’instruction exacte :

`CONTINUE ÉTAPE 1`
