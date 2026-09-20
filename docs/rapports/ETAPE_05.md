# BILAN ÉTAPE 5 : espace professeur

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 5) : `/teacher`, `.mcconfig`, import `.mctkey`, import `.mcjson` (multiple), correction automatique, correction humaine, application d’un aménagement, incrément de révision, synthèse classe, export CSV, vue Pronote, export groupé des `.mcjson` corrigés, ZIP.

## 1. Travail réalisé

### 1.1 Schéma `.mcconfig` (docs/SPEC.md § 24.2)

`src/lib/schemas/class-config.ts` : classe, niveau, durée standard (≤ 45 min), missions activées, politique de correction. **Aucun champ d’aménagement individuel ni médical n’existe dans ce schéma** (pas seulement « non rempli » : structurellement absent), ce qui rend le test pédagogique n° 24 (docs/SPEC.md § 64) vérifiable automatiquement pour la première fois.

### 1.2 Extension du format `.mctkey`

Chaque entrée du corrigé (`src/lib/schemas/teacher-key.ts`) déclare désormais explicitement la **compétence évaluée** et si elle constitue une **situation de transfert** (docs/SPEC.md § 15, docs/COMPETENCES.md § 5), en plus du barème et du type de correction. Les corrigés par variante sont un tableau plutôt qu’un dictionnaire, pour être retrouvés avec la même fonction `pickVariant` (ÉTAPE 4) que celle qui présentera une variante à l’élève : les deux côtés retrouvent toujours la même variante à partir de la même graine, sans ambiguïté d’ordre.

### 1.3 Moteur de correction (`src/lib/teacher/`)

- `correction.ts` : correction automatique par comparaison structurelle à la variante attendue ; correction humaine avec score borné à 0-1 ; score d’une mission sommative pondéré par les points de chaque item.
- `proofs.ts` : dérive une preuve de compétence par item corrigé, fusionnée avec les preuves existantes du fichier élève (remplace plutôt que duplique pour un même contexte).
- `apply-corrections.ts` : réinjecte les dépôts corrigés et les preuves dans le `.mcjson`, **augmente `revision`** uniquement quand quelque chose a réellement changé (docs/SPEC.md § 26, § 33).
- `accommodation.ts` : applique un aménagement individuel (`standard` / `reduced` / `split`), augmente `revision`.
- `synthesis.ts` : note /20 et niveaux de maîtrise par élève et par classe, en identifiant les missions intermédiaires et la mission finale à partir du `kind` déclaré dans le `.mctkey` (aucun registre de missions n’existe encore, ÉTAPE 6).
- `csv.ts` : synthèse classe (Code, Classe, C1-C9, Note /20, **Provisoire**) et vue Pronote (Code, Note /20, Provisoire) : la mention « Provisoire » est affichée dans une colonne séparée pour ne jamais laisser croire qu’une note incomplète est définitive.
- `export-bundle.ts` : export groupé en ZIP (`fflate`, entièrement côté navigateur).

### 1.4 Interface `/teacher` (`src/components/teacher/`, `src/app/teacher/`)

Route non reliée à la navigation élève. Sections : configuration de classe (création, export, import), import du `.mctkey`, import multiple de fichiers élèves, liste des élèves importés (nombre d’items en attente, note), détail d’un élève (correction automatique, correction humaine item par item, aménagement individuel, export du fichier corrigé, bilan imprimable via l’impression native du navigateur), synthèse de classe avec les trois exports.

**Décision d’implémentation** : l’espace de travail professeur n’est jamais persisté (aucune écriture IndexedDB ni `localStorage`). L’enseignant réimporte le `.mctkey` et les `.mcjson` à chaque ouverture de `/teacher`. Documenté dans `docs/ARCHITECTURE.md` et `docs/EVALUATIONS.md` § 10.

## 2. Suivi des tests pédagogiques différés à l’ÉTAPE 4

| N° | Test | État après l’ÉTAPE 5 |
| --- | --- | --- |
| 24 | Aucun aménagement individuel dans `.mcconfig` | ✅ résolu : le schéma ne définit tout simplement pas ce champ, testé |
| 27 | Révision incrémentée lors des modifications enseignant | ✅ résolu : testé pour la correction et l’aménagement individuel |
| 7, 8, 15 | Sourçage Givors, données techniques, preuves multiples du parcours essentiel | toujours différés : nécessitent le contenu réel des missions (ÉTAPE 6) |

Le test n° 25 (« aucun corrigé exposé dans le build élève ») a été précisé : la vérification porte désormais sur les **routes élèves** (`src/app`, hors `src/app/teacher`), puisque `/teacher` a légitimement besoin d’importer le schéma `.mctkey` et le module de correction. Aucune route élève n’y accède.

## 3. Documentation mise à jour

- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 5 ».
- `docs/EVALUATIONS.md` § 10 : détail du mécanisme de correction et décision de non-persistance.
- `docs/RGPD.md` § 6 : précision sur l’absence structurelle de champ d’aménagement dans `.mcconfig`.
- `docs/rapports/ETAPE_05.md` : ce document.

## 4. Tests

157 tests automatiques (Vitest), tous verts, dont 46 nouveaux pour cette étape (schémas `.mcconfig`/`.mctkey` étendu, correction automatique et humaine, dérivation et fusion des preuves, réinjection avec incrément de révision, synthèse classe, CSV, export ZIP, aménagement individuel, sécurité statique mise à jour).

## 5. Vérification manuelle dans un navigateur réel

Parcours complet piloté dans un Chromium réel : création d’une configuration de classe, import d’un `.mctkey` de test (un item auto, un item humain, un item final), import d’un fichier élève avec deux dépôts en attente, correction automatique (item auto corrigé, item humain resté en attente), correction humaine du second item, vérification de la révision (3 initiale → 5 après les deux corrections), application d’un aménagement individuel, export CSV de la synthèse (colonnes et valeurs vérifiées), export ZIP (taille non nulle). Aucune erreur de console sur l’ensemble du parcours.

## 6. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 157/157 tests, 27 fichiers |
| Build | `npm run build` | ✅ export statique généré, 8 pages (`/teacher` incluse) |

## 7. Risques et points de vigilance

1. **Identification des missions intermédiaires/finale par `.mctkey`** : fonctionne tant que chaque mission n’a qu’un seul `kind` cohérent entre ses items. À revalider une fois le vrai registre de missions créé (ÉTAPE 6).
2. **Absence de mécanisme explicite « marquer absent »** : une mission sans aucun dépôt est traitée comme « non passée » (exclue de la moyenne). Suffisant pour cette étape, mais une action professeur dédiée pourrait être utile plus tard si le besoin se confirme à l’usage.
3. **Non-persistance du poste professeur** : choix assumé pour limiter la durée de vie des corrigés sur un poste partagé ; implique que l’enseignant doit réimporter ses fichiers à chaque session (compromis documenté, pas un oubli).

---

Fin de l’ÉTAPE 5.

Ne pas commencer l’ÉTAPE 6 avant l’instruction exacte : `CONTINUE ÉTAPE 6`.
