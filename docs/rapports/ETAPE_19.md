# Rapport G.12 : ÉTAPE 19, audit pédagogique global

Date : 2026-09-21

Périmètre : progression, charge cognitive, durées, compétences, évaluations, redondances, lacunes, parcours essentiel et parcours complet.

## 1. Résultat global

Les deux parcours sont cohérents et entièrement navigables : 14 missions en 5e et 13 missions en 4e. Le parcours essentiel conserve 12 missions dans chaque niveau. Les trois missions retirées du parcours essentiel (5E-02, 5E-07 et 4E-07) sont formatives et ne portent aucune évaluation sommative indispensable.

Aucune mission ne dépasse 45 minutes au maximum absolu. Les finales restent limitées à six compétences de transfert afin de ne pas cumuler une épreuve de programmation avec le choix, le diagnostic, la simulation et la justification.

## 2. Progression et redondances

La progression suit une spirale lisible : observation réelle, besoins et usages, fonctions et flux, simulation, programmation ou diagnostic, conception, mission intégrative, puis transfert final. Les répétitions repérées ont une fonction pédagogique distincte :

- la chaîne d’énergie est introduite en 5e puis approfondie et évaluée en 4e ;
- la programmation passe d’une condition simple en 5e à une condition avec alternative en 4e ;
- la simulation sert d’abord à observer, puis à mesurer, valider et optimiser ;
- les missions 5E-12 et 4E-11 ferment la boucle réflexive ouverte par 5E-00 et 4E-00 avant les finales.

Aucune répétition pure, sans augmentation de complexité ou changement de contexte, n’a été relevée.

## 3. Charge et durée

| Niveau | Parcours complet | Parcours essentiel | Durée scolaire complète | Durée scolaire essentielle |
| --- | ---: | ---: | ---: | ---: |
| 5e | 14 séances | 12 séances | 10 h 30 | 9 h 00 |
| 4e | 13 séances | 12 séances | 9 h 45 | 9 h 00 |

Chaque mission possède quatre estimations ordonnées : rapide, moyenne, lente et maximum absolu. Le maximum est toujours inférieur ou égal à 45 minutes. Les activités les plus chargées, 5E-12 et 4E-11, sont fractionnables par l’aménagement professeur prévu et restent structurées en étapes courtes.

## 4. Compétences

Les compétences C1 à C9 sont introduites puis réinvesties avec une montée en complexité. Le parcours essentiel conserve plusieurs contextes pour chaque compétence effectivement évaluée, sauf C9 en 5e : cette limite est volontaire et documentée, car la programmation reste introductive à ce niveau et est consolidée en 4e.

La finale 5e évalue C1, C2, C3, C4, C7 et C8. C5 reste seulement introduite ; C6 et C9 sont évaluées dans 5E-10 sans être répétées dans la finale. La finale 4e évalue C2, C3, C4, C5, C7 et C8. C6 et C9 disposent déjà de preuves en 4E-06 et 4E-11.

## 5. Évaluations

La séparation des quatre familles est respectée : diagnostics sans note, formatifs avec nouvel essai, sommatives intermédiaires corrigées dans l’espace professeur et finales de transfert. Toutes les sommatives et les deux finales appartiennent au parcours essentiel. La pondération reste de 40 % pour les intermédiaires et 60 % pour la finale.

Le moteur de maîtrise ignore les preuves formatives pour attribuer un niveau officiel, exige plusieurs preuves pour une maîtrise satisfaisante et une preuve de transfert pour la très bonne maîtrise.

## 6. Parcours essentiel

Le retrait des trois missions recommandées ne crée aucun trou :

- 5E-02 approfondit le classement des transformations, déjà repris dans les missions suivantes ;
- 5E-07 approfondit l’organisation et les contraintes, reprises en 5E-12 ;
- 4E-07 approfondit les flux et contraintes, repris en 4E-10 et 4E-11.

Les diagnostics, les quatre sommatives 5e, les cinq sommatives 4e, les missions intégratives et les finales restent présents.

## 7. Corrections apportées

- correction de la description de C9 en 5e : elle est évaluée en 5E-10 et non seulement introduite ;
- suppression de la mention conditionnelle devenue obsolète pour C6 et C9 dans 4E-FINAL ;
- actualisation de la documentation du moteur de maîtrise déjà implémenté ;
- actualisation de l’export ZIP professeur, implémenté depuis l’ÉTAPE 5 ;
- ajout d’un test de non-régression couvrant effectifs, statuts, durées, évaluations et structure minimale des missions.

## 8. Six questions de contrôle

1. Les consignes sont découpées et les missions offrent des aides formatives.
2. Chaque activité mobilise une notion ou une démarche de technologie explicite.
3. Chaque mission définit une trace écrite courte dans le cahier.
4. Les preuves sommatives sont rattachées à des compétences et corrigées avec la clé professeur.
5. Toutes les durées maximales restent dans une séance de 45 minutes.
6. Les situations réelles et les simulations sont distinguées par un bandeau textuel.

## 9. Limites documentées

- La part exacte dans l’année scolaire reste non calculable tant que les heures hebdomadaires et semaines effectives ne sont pas renseignées par l’enseignant.
- C9 ne possède qu’un contexte d’évaluation en 5e ; sa consolidation est organisée en 4e.
- Les estimations de durée sont des valeurs de conception. Une observation en classe réelle pourra conduire à ajuster les missions les plus denses sans modifier leur objectif.

## 10. Validation

| Contrôle | Résultat |
| --- | --- |
| Tests | 53 fichiers, 302 tests réussis |
| TypeScript | réussi |
| ESLint | réussi |
| Build statique | réussi, 36 routes |

L’ÉTAPE 19 est validée. Ne pas commencer l’ÉTAPE 20 avant l’instruction exacte : `CONTINUE ÉTAPE 20`.
