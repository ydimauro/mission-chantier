# BILAN ÉTAPE 26 : photographies libres de droit dans les ressources

Date : 2026-09-22

## Réalisation

Chaque fiche Ressources affiche désormais une photographie locale d’illustration. Les 35 fiches sont couvertes par 25 photographies Wikimedia Commons sous CC0, CC BY ou CC BY-SA, certaines étant réemployées lorsqu’elles illustrent la même famille de composants ou une notion du glossaire.

Les photographies sont explicitement indiquées comme hors Givors. L’auteur ou l’autrice et la licence restent visibles sous chaque image. Le détail complet des sources est conservé dans `docs/SOURCES_RESSOURCES.md`.

Les fichiers sont distribués localement en WebP. Leur taille totale est vérifiée avant intégration afin de ne créer aucune dépendance réseau à l’exécution.

## Vérifications

- tests des ressources mis à jour pour la photographie et son texte alternatif ;
- `npm.cmd run lint` : réussi ;
- `npm.cmd run typecheck` : réussi ;
- `npm.cmd test` : réussi, 57 fichiers et 310 tests ;
- `npm.cmd run build` : réussi, 36 routes statiques.

Fin de l’ÉTAPE 26. STOP.
