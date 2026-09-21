# BILAN ÉTAPE 13 : protocole et fin 4e

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 13) : « Développer 4E-07 à 4E-11. Accorder une attention particulière au vrai protocole de test de 4E-08. STOP. »

## 1. Protocole de test 4E-08

Le moteur pur [sensor-test.ts](../../src/lib/simulation/sensor-test.ts) produit une observation déterministe à chaque essai. L’interface [SommativeSensorProtocol.tsx](../../src/components/mission/SommativeSensorProtocol.tsx) n’affiche aucun résultat global : l’élève choisit une distance puis réalise chaque essai séparément. Le tableau se remplit donc observation par observation.

La remise reste verrouillée tant que l’élève n’a pas testé au moins trois distances, répété chaque distance deux fois, proposé un seuil et écrit une limite. Elle enregistre la démarche structurée dans le fichier élève, sans révélateur de bonne réponse. Les valeurs de portée sont explicitement pédagogiques fictives.

## 2. Missions réalisées

| Mission | Réalisation | Évaluation | Durée maximale |
| --- | --- | --- | --- |
| 4E-07 | Organisation des flux et zones de conflit | Formative | 41 min |
| 4E-08 | Protocole répété de test du capteur | Sommative n° 4 | 45 min |
| 4E-09 | Comparaison multicritère et compromis | Formative | 45 min |
| 4E-10 | Conception guidée avec quatre contraintes et simulation hydraulique | Formative | 45 min |
| 4E-11 | Programmation, diagnostic, optimisation et synthèse | Sommative intégrative n° 5 | 45 min |

Chaque mission comporte une trace écrite explicite dans le cahier. Les situations sont toutes présentées comme simulation du Quartier des Ateliers ; aucune donnée réelle sur Givors n’est ajoutée.

## 3. Contrôles pédagogiques

- Les consignes suivent une action principale à la fois.
- Les éléments formatifs conservent correction immédiate et indices progressifs.
- Les éléments sommatifs restent sans aide ni correction exploitable dans le build élève.
- La mission 4E-08 collecte plusieurs preuves de C8 : répétition, tableau, seuil et limite.
- Les simulations restent accessibles au clavier grâce aux contrôles natifs.
- Chaque durée lente est inférieure ou égale à 45 minutes.

## 4. Tests et vérification manuelle

Les tests couvrent le moteur d’essais, la répétition des distances, le verrouillage de la remise, le dépôt sans correction, la séquence 4e et la typographie des nouveaux contenus.

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npm run test` | 49 fichiers, 283 tests réussis |
| `npm run test:e2e` | 1 test réussi |
| `npm run build` | export statique réussi, 35 routes dont 4E-07 à 4E-11 |

Vérification Chromium locale : 4E-08 a affiché six lignes d’essais individuelles pour trois distances répétées, puis uniquement l’accusé de réception sommative. 4E-11 a affiché les volets programmation, diagnostic et simulation sans erreur visible.

---

Fin de l’ÉTAPE 13.

Ne pas commencer l’ÉTAPE 14 avant l’instruction exacte : `CONTINUE ÉTAPE 14`.