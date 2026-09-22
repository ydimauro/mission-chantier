# BILAN ÉTAPE 22 : reprise des missions et ressources

Date : 2026-09-22

## Réalisations

- L’accueil ne répète plus l’observation ni la trace écrite de la première mission. Il dirige vers les missions et les ressources.
- « Ma mission » devient un menu de toutes les missions du niveau. Chaque carte indique « À commencer », « En cours » ou « Terminée » et permet d’ouvrir ou reprendre la mission demandée.
- Une courte découverte des engins est proposée avant la première mission, dans un nouvel onglet afin de conserver la mission ouverte.
- La fin de mission indique que la progression est sauvegardée et propose un retour vers le menu des missions.
- Les réponses enregistrées par les activités sont désormais sauvegardées automatiquement dans IndexedDB, avec une révision nouvelle à chaque enregistrement. La reprise d’une mission peut utiliser les réponses et dépôts déjà sauvegardés pour terminer le parcours.
- `/ressources` contient un menu, des sous-catégories, une recherche et les engins, matériaux, composants, équipements et mots du glossaire employés dans les missions. Les descriptions sont pédagogiques et ne présentent aucune donnée technique chiffrée comme réelle.
- Le lien de navigation « Ressources » et les liens de découverte ouvrent un nouvel onglet avec `noopener noreferrer`.

## Limites connues

La sauvegarde locale reste liée au navigateur et au poste. Un fichier `.mcjson` exporté demeure nécessaire pour passer sur un autre poste ou se protéger d’un effacement des données du navigateur.

## Vérifications

- `npm.cmd run lint` : réussi.
- `npm.cmd run typecheck` : réussi.
- `npm.cmd test` : réussi, 55 fichiers et 306 tests.
- `npm.cmd run build` : réussi, 36 routes statiques.
- `npm.cmd run test:e2e` : réussi, 8 scénarios Playwright.

Fin de l’ÉTAPE 22. STOP.
