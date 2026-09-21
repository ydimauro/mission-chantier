# BILAN ÉTAPE 11 : première partie 4e (4E-01 à 4E-05)

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 11) : « Développer 4E-01 à 4E-05. STOP. »

## 1. Missions livrées

| Mission | Activité | Évaluation | Trace écrite |
| --- | --- | --- | --- |
| 4E-01 | Associer six sous-systèmes de la pelle à leur rôle | Formative avec indices | Schéma légendé et phrase sur l’évolution des commandes |
| 4E-02 | Construire la chaîne d’énergie | Sommative intermédiaire n° 1 | Fonctions et composants dans l’ordre |
| 4E-03 | Faire varier pression et débit d’un modèle hydraulique | Formative avec question d’observation | Chaîne hydraulique et comparaison de deux essais |
| 4E-04 | Construire une chaîne d’information de sécurité | Formative avec indices | Chaîne et condition du programme |
| 4E-05 | Diagnostiquer une panne par des tests | Sommative intermédiaire n° 2 | Tableau symptôme / hypothèses / tests / cause / solution |

Les cinq missions sont des simulations du « Quartier des Ateliers ». Elles ne présentent aucune donnée comme un fait réel sur Givors.

## 2. Choix de conception

- Les associations utilisent des menus déroulants natifs, accessibles au clavier, plutôt qu’un glisser-déposer. Ce choix prolonge le moteur pédagogique commun de l’ÉTAPE 7.
- La simulation hydraulique calcule une vitesse qualitative à partir de la pression et du débit. Les valeurs sont explicitement pédagogiques fictives et la mission affiche ses limites : sol, fluide, pertes, usure, météo et comportement réel sont simplifiés.
- Les missions 4E-02 et 4E-05 déposent seulement la démarche et les réponses. Elles ne révèlent aucune correction : la correction reste réservée à `/teacher` avec un fichier `.mctkey` enseignant séparé.
- Chaque mission requiert une confirmation de trace écrite papier avant « Mission terminée ».

## 3. Implémentation

- Ajout de `content/4e/4e-01.ts` à `content/4e/4e-05.ts`, sans contenu pédagogique dans les composants React.
- Ajout de `src/lib/simulation/hydraulic.ts` et de `HydraulicSimulation`.
- Ajout de `SommativeDiagnostic`, avec obligation de réaliser au moins deux tests avant le dépôt.
- Ajout des routes `/mission/4e-01` à `/mission/4e-05`, du registre et de la séquence 4e.
- Les libellés du moteur de diagnostic sont centralisés dans `content/engine.ts`.

## 4. Tests et vérification manuelle

Tests ajoutés ou mis à jour :

- moteur hydraulique pur ;
- interaction de la simulation hydraulique ;
- diagnostic sommative : deux tests, cause et solution requis, puis dépôt sans retour de correction ;
- séquence 4e et typographie des cinq modules de contenu.

Vérification dans Chromium local :

- 4E-03 affiche les curseurs pression/débit, une mesure qualitative après lancement et les limites du modèle ;
- 4E-05 affiche les résultats de deux tests choisis puis, après dépôt, uniquement la notice « Évaluation enregistrée. Ton résultat sera disponible après correction. » ; aucune indication de réponse correcte ou incorrecte n’est affichée.

## 5. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | aucun problème |
| TypeScript | `npm run typecheck` | aucune erreur |
| Tests unitaires et composants | `npm run test` | 265/265 tests, 46 fichiers |
| Test E2E existant | `npm run test:e2e` | 1/1 test réussi |
| Build | `npm run build` | export statique généré, 29 routes dont 4E-01 à 4E-05 |

## 6. Contrôle pédagogique

- Une consigne correspond à une action principale et les aides sont progressives dans les activités formatives.
- Chaque mission travaille un contenu technique identifiable : sous-systèmes, chaîne d’énergie, hydraulique, information ou diagnostic.
- La trace écrite est explicite et indépendante de l’écran.
- Toutes les durées déclarées ont un maximum absolu inférieur ou égal à 45 minutes.
- La distinction « Simulation pédagogique » est visible dans les cinq missions.
- Les sommatives disposent de plusieurs éléments de preuve : chaîne complète pour 4E-02 ; choix de tests, cause et solution pour 4E-05.

---

Fin de l’ÉTAPE 11.

Ne pas commencer l’ÉTAPE 12 avant l’instruction exacte : `CONTINUE ÉTAPE 12`.