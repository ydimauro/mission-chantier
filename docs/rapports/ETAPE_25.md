# BILAN ÉTAPE 25 : observations de l’accueil reprises dans la mission

Date : 2026-09-22

## Réalisation

Le bloc « Que se passe-t-il ici ? » est de nouveau présent sur la page d’accueil. L’élève peut cocher une ou plusieurs observations à partir de la photographie réelle de Givors.

Les choix sont transmis à la première mission seulement après l’identification de l’élève. Ils restent dans l’URL entre l’accueil et l’écran d’identité : aucun choix n’est donc écrit dans la progression locale d’un autre élève sur un poste partagé. Après l’identification, ils sont enregistrés dans la première mission du niveau, puis retirés de l’URL.

Dans 5E-00, les mêmes choix sont déjà cochés dans le diagnostic et l’élève peut les modifier. Dans 4E-00, le rappel affiche aussi ses choix initiaux, tandis que le diagnostic propre au niveau 4e reste inchangé.

## Vérifications

- tests unitaires ajoutés pour la transmission et la reprise des choix ;
- test Playwright enrichi : accueil, identification, transfert, reprise dans 5E-00 ;
- `npm.cmd run lint` : réussi ;
- `npm.cmd run typecheck` : réussi ;
- `npm.cmd test` : réussi, 57 fichiers et 310 tests ;
- `npm.cmd run build` : réussi, 36 routes statiques ;
- scénario Playwright du parcours accueil → 5E-00 : réussi.

Fin de l’ÉTAPE 25. STOP.
