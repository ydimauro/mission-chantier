# BILAN ÉTAPE 23 : choix du dossier `.mcjson`

Date : 2026-09-22

## Réalisation

Le choix du dossier de sauvegarde est maintenant proposé dès l’ouverture de « Ma mission » et reste accessible dans « Ma progression ».

Sous Chrome ou Edge, l’élève clique sur « Choisir où enregistrer mon fichier .mcjson », puis choisit le dossier de son choix. L’application y met à jour automatiquement le fichier de progression et sa copie `.bak`.

Sous Firefox ou dans un navigateur ne proposant pas cette fonction, l’interface explique la limite du navigateur et propose l’export du fichier `.mcjson`. Le choix précis de l’emplacement est alors assuré par la fenêtre de téléchargement du navigateur lorsqu’elle est activée.

## Vérifications

- tests unitaires ciblés ajoutés pour les deux parcours de sauvegarde ;
- `npm.cmd run lint` : réussi ;
- `npm.cmd run typecheck` : réussi ;
- `npm.cmd test` : réussi, 56 fichiers et 308 tests ;
- `npm.cmd run build` : réussi, 36 routes statiques ;
- `npm.cmd run test:e2e` : réussi, 8 scénarios Playwright.

Fin de l’ÉTAPE 23. STOP.
