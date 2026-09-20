# BILAN ÉTAPE 4 : évaluations et tests pédagogiques

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 4) : diagnostic, formatif côté élève, collecte sommative, preuves, niveaux de maîtrise, calcul des pondérations, variantes, seed, format `.mctkey`, tests pédagogiques automatiques. Conformément à `docs/SPEC.md` § 64, ces tests deviennent **obligatoires à chaque étape à partir de maintenant**.

Aucun contenu de mission réel n’existe encore (réservé à l’ÉTAPE 6 et suivantes) : cette étape livre le moteur d’évaluation et sa validation, prêts à s’appliquer au contenu réel dès qu’il existera.

## 1. Travail réalisé

### 1.1 Données de référence

- `content/competencies.ts` : catalogue C1 à C9 (identifiants et intitulés), utilisé par les preuves et les niveaux de maîtrise.
- `content/evaluations.ts` : messages fixes exigés mot pour mot par le cahier des charges (notice diagnostique, notice de dépôt sommatif, « Non passée », « Note provisoire », libellés des cinq niveaux de maîtrise).

### 1.2 Schémas (`src/lib/schemas/`)

- `proof.ts` : preuve de compétence conforme à l’exemple de `docs/EVALUATIONS.md` § 5 (`competency`, `mission`, `assessmentType`, `context`, `score`, `date`, `seed`, et un champ `transfer` ajouté explicitement pour porter la notion de « situation de transfert » sans dépendre d’un registre de missions qui n’existe pas encore).
- `assessment-submission.ts` : dépôt d’une évaluation par l’élève (diagnostic, formatif, sommatif, final), avec un statut `pending` / `corrected` : cette même structure porte le résultat corrigé une fois réinjecté par le professeur (docs/SPEC.md § 24.1).
- `teacher-key.ts` : format du fichier `.mctkey` (corrigés par variante, barème par item, seuils de maîtrise personnalisables). Jamais importé par une route élève (vérifié automatiquement, voir § 1.5).
- `student-file.ts` (ÉTAPE 2) mis à jour : les champs `assessments` et `proofs`, jusqu’ici génériques (`z.unknown()`), utilisent désormais ces schémas réels. `responses` reste générique : son contenu précis dépend du type de mission (ÉTAPE 6 et suivantes).

### 1.3 Moteur d’évaluation (`src/lib/evaluations/`)

- `grade.ts` : calcul de la note /20. Politique documentée dans `docs/EVALUATIONS.md` § 6 (absence exclue de la moyenne, note provisoire tant que la finale ou une intermédiaire manque, arrondi au demi-point à l’affichage seulement).
- `mastery.ts` : niveaux de maîtrise conformes à l’algorithme de `docs/COMPETENCES.md` § 5 (une seule preuve plafonnée à « fragile », exigence d’une preuve de transfert pour « Très bonne maîtrise », plafonnement à « fragile » en cas de preuve divergente). Seuils numériques en paramètre, jamais codés en dur (valeurs par défaut documentées, seuils réels à venir du `.mctkey` à l’ÉTAPE 5).
- `seed.ts` : graine déterministe (code élève + mission + item) et sélection reproductible d’une variante parmi plusieurs, sans dépendance externe (hachage FNV-1a maison).

### 1.4 Composants génériques (`src/components/evaluation/`)

- `DiagnosticNotice`, `SommativeSubmittedNotice` : messages obligatoires exacts.
- `MasteryBadge` : niveau de maîtrise avec icône ET texte, jamais la seule couleur (docs/SPEC.md § 28, § 43).
- `GradeDisplay` : note /20 arrondie au demi-point, avec mention « Note provisoire » ou « Note non calculable pour le moment ».

### 1.5 Sécurité et sourçage

- `src/lib/pedagogy/sourcing.ts` (`isProperlySourced`) : réutilisé par `Source` (ÉTAPE 3) et par les tests pédagogiques.
- `src/lib/pedagogy/validate-mission.ts` : validateur générique de métadonnées de mission (problématique, activité, trace écrite pour les missions obligatoires, évaluation ou justification, durée ≤ 45 min), prêt à s’appliquer au registre de missions de l’ÉTAPE 6.
- `test/static-safety.test.ts` : vérifie qu’aucun fichier de `src/` ou `content/` n’importe `teacher-data/` ni le schéma `.mctkey`, et qu’aucune URL externe imprévue n’apparaît dans le code (avec l’exception documentée des espaces de noms XML `xmlns="http://www.w3.org/..."`, qui ne sont pas des requêtes réseau).

## 2. Suivi des 28 tests pédagogiques (docs/SPEC.md § 64)

| N° | Test | État |
| --- | --- | --- |
| 1-6 | problématique, durée, trace écrite (obligatoire), activité, évaluation ou justification, ≤ 45 min | ✅ validateur généré et testé sur des missions synthétiques ; s’appliquera au registre réel de missions à l’ÉTAPE 6 |
| 7-8 | fait Givors sourcé, donnée technique sourcée | ⏳ règle de sourçage prête et testée (`isProperlySourced`) ; nécessite le contenu réel (ÉTAPE 6) pour un test de bout en bout |
| 9-10 | diagnostique = 0 %, formatif = 0 % direct | ✅ `computeGrade` n’accepte structurellement que des résultats de sommatives ; testé |
| 11 | coefficients = 100 % | ✅ testé |
| 12 | absence ≠ zéro | ✅ testé |
| 13 | note correcte | ✅ testé (plusieurs scénarios) |
| 14 | preuves cohérentes | ✅ testé (détection de divergence) |
| 15 | plusieurs preuves, compétences évaluées du parcours essentiel | ⏳ vérifié manuellement dans `docs/COMPETENCES.md` § 4 à l’ÉTAPE 0 ; test automatique à écrire à l’ÉTAPE 6 sur le registre réel |
| 16-18 | import/export sans perte, migrations valides, mauvais fichier détecté | ✅ déjà couvert à l’ÉTAPE 2 |
| 19 | aucun champ médical | ✅ testé pour `.mcjson` (`accommodation` limité à standard/reduced/split) ; volet `.mcconfig` différé à l’ÉTAPE 5 (fichier pas encore créé) |
| 20-22 | typographie française | ✅ couvert depuis l’ÉTAPE 1, étendu au contenu de cette étape |
| 23 | aucune dépendance réseau externe imprévue | ✅ testé |
| 24 | aucun aménagement individuel dans `.mcconfig` | ⏳ différé à l’ÉTAPE 5 (le fichier `.mcconfig` n’existe pas encore) |
| 25 | aucun corrigé sommatif exposé dans le build élève | ✅ testé |
| 26 | conflit cache / fichier | ✅ déjà couvert à l’ÉTAPE 2 |
| 27 | révision incrémentée lors des modifications enseignant | ✅ mécanisme sous-jacent couvert à l’ÉTAPE 2 ; flux enseignant réel à tester à l’ÉTAPE 5 |
| 28 | réel et simulation explicitement distingués | ✅ testé (rendu réel des composants, textes distincts) |

21 des 28 tests sont couverts par des vérifications automatiques dès maintenant ; 4 sont des infrastructures prêtes mais nécessitent le contenu réel des missions ou de `/teacher` pour un test de bout en bout (7, 8, 15, 24) ; 3 étaient déjà couverts avant cette étape et le restent (16-18, 26 comptés ensemble).

## 3. Documentation mise à jour

- `docs/EVALUATIONS.md` § 6 : politique précise de calcul de la note /20.
- `docs/COMPETENCES.md` § 5 : seuils par défaut, définition numérique de la « divergence ».
- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 4 ».
- `teacher-data/README.md` : référence au schéma `.mctkey`.
- `docs/rapports/ETAPE_04.md` : ce document.

## 4. Tests

111 tests automatiques (Vitest), tous verts, dont 60 nouveaux pour cette étape. Vitest passe désormais en environnement `jsdom` (`@testing-library/react`, `@testing-library/jest-dom`) pour permettre des tests de rendu réel des composants, nécessaires notamment au test n° 28.

## 5. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 111/111 tests, 18 fichiers |
| Build | `npm run build` | ✅ export statique généré, 7 pages |

## 6. Risques et points de vigilance

1. **Quatre tests différés** (n° 7, 8, 15, 24) : leur infrastructure existe mais un test de bout en bout réclame soit le contenu réel des missions (ÉTAPE 6), soit le fichier `.mcconfig` (ÉTAPE 5). À ne pas oublier de les activer à ce moment-là.
2. **Seuils de maîtrise par défaut** : les valeurs 0,40 / 0,65 / 0,80 utilisées hors `.mctkey` sont une estimation raisonnable pour l’aperçu élève, pas un barème pédagogique validé par l’enseignant. Le `.mctkey` réel (ÉTAPE 5) doit les définir explicitement pour toute correction officielle.
3. **`transfer` sur les preuves** : ce champ est posé par le code qui crée la preuve (pas déduit automatiquement d’un registre de missions). À l’ÉTAPE 6, bien positionner `transfer: true` uniquement pour les missions finales et intégratives.

---

Fin de l’ÉTAPE 4.

Ne pas commencer l’ÉTAPE 5 avant l’instruction exacte : `CONTINUE ÉTAPE 5`.
