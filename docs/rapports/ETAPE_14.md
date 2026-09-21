# BILAN ÉTAPE 14 : finale 4e

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 14) : « Créer l’évaluation finale 4e. STOP. »

## 1. Situation de transfert

La mission [4E-FINAL](../../content/4e/4e-final.ts) place l’élève dans la situation fictive de la « halle des Tilleuls ». Elle est explicitement différente de Givors, qui reste une situation réelle, et du Quartier des Ateliers, qui reste une simulation pédagogique habituelle. Toutes les données techniques sont annoncées comme valeurs pédagogiques fictives.

L’évaluation combine quatre actions :

- choisir un engin et justifier ce choix ;
- organiser les contraintes de circulation ;
- conduire un diagnostic hydraulique partiel ;
- formuler une hypothèse, simuler un réglage hydraulique et conclure.

Une synthèse écrite courte dans le cahier est requise avant « Mission terminée ».

## 2. Évaluation finale

Les quatre dépôts utilisent `kind="final"`. Ils sont enregistrés dans le fichier élève, restent en attente de correction dans `/teacher` et n’affichent aucun corrigé exploitable. La finale représente 60 % de la note /20 suivant [docs/EVALUATIONS.md](../EVALUATIONS.md).

`SommativeDiagnostic` accepte maintenant un type d’évaluation optionnel, avec `"summative"` conservé par défaut pour les missions intermédiaires.

Le scénario retenu ne comporte pas de programmation, pour préserver une durée maximale de 45 minutes et une charge cognitive soutenable. La finale fournit des preuves de transfert pour C2, C3, C4, C5, C7 et C8. C6 et C9 disposent déjà de deux contextes d’évaluation en 4e, 4E-06 et 4E-11, et ne sont donc pas déclarées dans cette finale.

## 3. Parcours

`4E-FINAL` est ajoutée au registre et à `MISSION_SEQUENCE["4e"]`. Le parcours 4e contient désormais treize missions : treize pour le parcours complet et douze pour le parcours essentiel, conformément à [docs/PROGRESSION_ANNUELLE.md](../PROGRESSION_ANNUELLE.md).

## 4. Tests

Les tests ciblés vérifient :

- le dépôt de diagnostic avec `kind="final"` ;
- la présence et la validité des métadonnées 4E-FINAL ;
- la place de 4E-FINAL en fin de séquence 4e ;
- la typographie française du nouveau contenu.

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npm run test` | 49 fichiers, 286 tests réussis |
| `npm run test:e2e` | 1 test réussi |
| `npm run build` | export statique réussi, 36 routes dont `/mission/4e-final` |

Vérification Chromium locale : 4E-FINAL affiche les quatre volets, la situation fictive et la trace écrite. Le dépôt du diagnostic n’affiche que l’accusé de réception destiné à la correction professeur, sans jugement immédiat.

---

Fin de l’ÉTAPE 14.

Ne pas commencer l’ÉTAPE 15 avant l’instruction exacte : `CONTINUE ÉTAPE 15`.