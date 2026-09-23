# BILAN ÉTAPE 34 : Mon cours et traces écrites

Date : 2026-09-23

## Réalisation

Le menu « Mon carnet » devient « Mon cours ». La route historique `/carnet` est conservée afin que les liens existants continuent de fonctionner.

La page affiche les missions du niveau de l’élève, la trace écrite attendue pour chacune, un lien pour rouvrir la mission et son état : « À écrire » ou « Écriture confirmée ». Cette confirmation est enregistrée dans le fichier de progression de l’élève avec ses autres réponses.

L’application ne peut pas conserver les phrases ni les schémas manuscrits : ils restent dans le cours sur papier. La page l’indique explicitement et sert de repère pour savoir quoi écrire après une mission.

Toutes les formulations qui désignaient le cahier de l’élève ont été remplacées par « cours ». Le terme « cahier des charges » est conservé, car il désigne un document technique distinct.

## Vérifications

- `npm.cmd run lint` : réussi ;
- `npm.cmd run typecheck` : réussi ;
- `npm.cmd run test` : réussi, 170 tests ;
- `npm.cmd run build` : réussi, 36 routes statiques.
- `npm.cmd run test:e2e` : réussi, 8 parcours Chromium, dont la consultation de « Mon cours ».

Fin de l’ÉTAPE 34. STOP.
