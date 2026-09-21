# BILAN ÉTAPE 8 : premier moteur de simulation

Périmètre : `docs/SPEC.md` § 65, « Créer une simulation simple, mesurable, compréhensible. Priorité 2D / 2,5D. »

## 1. Hypothèse de conception

Le premier moteur devait être indépendant des missions afin d’être réutilisable par 5E-08 puis 5E-12. Une simulation d’évacuation de gravats a été retenue : elle permet de faire varier le nombre d’engins et de mesurer des effets compréhensibles sans introduire de modèle physique inutilement complexe.

## 2. Travail réalisé

- `src/lib/simulation/evacuation.ts` : moteur pur et déterministe.
- `src/components/mission/EvacuationSimulation.tsx` : interface 2D accessible au clavier.
- `src/components/mission/index.ts` : export public du composant.
- `content/engine.ts` : `EVACUATION_SIMULATION_LABELS` (libellés de champs, de zones, du bouton, des mesures et des messages d’erreur).

Le scénario expose neuf paramètres : volume, capacité, nombre d’engins, distance, temps de chargement, temps de déchargement, temps de manœuvre, temps de trajet et consommation pédagogique. Le résultat expose cinq mesures : volume, nombre de trajets, distance totale, temps total et consommation pédagogique.

Le temps est calculé par cycles parallèles selon le nombre d’engins. La distance totale compte l’aller-retour pour chaque trajet. Cette règle est volontairement simple et devra être rappelée dans la mission avec les limites du modèle.

**Correction apportée après relecture (AGENTS.md règle 8, « contenus pédagogiques séparés du code applicatif »)** : la première version écrivait les libellés de champs, de zones, du bouton, des mesures et les messages d’erreur directement en dur dans `EvacuationSimulation.tsx` et `evacuation.ts`, contrairement à tous les autres composants génériques depuis l’ÉTAPE 3, qui sourcent leurs textes depuis `@content/engine`. Corrigé : `evacuation.ts` ne porte plus aucun texte, seulement une erreur typée `InvalidScenarioFieldError` identifiant le champ en défaut (`field: keyof EvacuationScenario`) ; `EvacuationSimulation.tsx` construit le message affiché à partir de `EVACUATION_SIMULATION_LABELS` (via `formatMessage`, comme `AssociationActivity`). Conséquence pratique : ces textes sont désormais couverts par `test/typography.test.ts` (qui ne scanne que `/content/*.ts`), ce qui n’était pas le cas avant.

## 3. Accessibilité et pédagogie

- plan 2D lisible sans animation ni son ;
- paramètres sous forme de champs numériques natifs ;
- libellés explicites et navigation clavier native ;
- résultats dans une zone `aria-live` ;
- erreurs annoncées avec un message textuel ;
- aucune mesure ne dépend uniquement de la couleur ;
- valeurs explicitement pédagogiques, sans prétention de réalisme.

Le composant ne remplace pas la trace écrite : la mission qui l’utilisera demandera toujours l’hypothèse, les résultats et la conclusion dans le cahier.

## 4. Tests

- moteur : 3 tests, tous verts (le test de refus de paramètre invalide vérifie désormais le champ identifié par `InvalidScenarioFieldError`, plus aucun texte français attendu depuis le moteur) ;
- interface : 1 test d’interaction, vert ;
- lint : aucun problème ;
- typecheck : aucune erreur ;
- suite complète : 207/207 tests verts, build statique généré sans erreur.

## 5. Vérification manuelle dans un navigateur réel

Comme à l’ÉTAPE 3, une page de démonstration temporaire (`src/app/engine-preview/`, non conservée) a intégré `EvacuationSimulation` dans un `SimulationPedagogique`, pilotée dans un Chromium réel :

- plan 2D, neuf champs numériques et bouton « Lancer la simulation » affichés correctement ;
- modification du nombre d’engins puis lancement : mesures correctes affichées (« 32 min » pour 2 engins, cohérent avec le moteur) ;
- volume mis à 0 puis relance : message d’erreur « Le volume doit être un nombre positif. » affiché, identique avant et après la correction de la séparation contenu/code ;
- navigation clavier (Tab) fonctionnelle dès le premier champ ;
- aucune erreur de console, avant et après correction ;
- page de démonstration supprimée avant la clôture de l’étape : elle ne fait pas partie du livrable (aucune mission ne branche encore ce composant, voir § 6).

## 6. Limites et suite

Le moteur ne simule pas encore les collisions, les obstacles, les capteurs ni la programmation. Ces comportements ne sont pas nécessaires pour l’étape 8 et seront traités dans les missions et étapes prévues par le cahier des charges. Les missions 5E-07 à 5E-12 ne sont pas développées ici : elles relèvent de l’ÉTAPE 9.

Fin de l’ÉTAPE 8.

Ne pas commencer l’ÉTAPE 9 avant l’instruction exacte : `CONTINUE ÉTAPE 9`.