# BILAN ÉTAPE 2 : sauvegarde et progression

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 2) : code élève, `.mcjson`, `schemaVersion`, `revision`, `updatedAt`, IndexedDB, File System Access si disponible, repli Firefox, `.bak`, import, export, migrations, détection de mauvais fichier, conflits cache / fichier, suppression. Aucune mission, aucune évaluation : ces domaines restent réservés aux ÉTAPES 4 et 6 et suivantes.

## 1. Travail réalisé

### 1.1 Schéma du fichier élève `.mcjson`

- `src/lib/schemas/student-file.ts` : schéma Zod complet reprenant les champs de `docs/SPEC.md` § 24.1 (`schemaVersion`, `revision`, `updatedAt`, `studentCode`, `classe`, `niveau`, `currentMissionId`, `completedMissionIds`, `responses`, `assessments`, `proofs`, `accommodation`). Les structures `responses` / `assessments` / `proofs` restent génériques tant que le contenu des missions n’existe pas (ÉTAPE 6 et suivantes), sans qu’un futur remplissage ne nécessite de changer la forme du fichier.
- `CURRENT_SCHEMA_VERSION = 1`.

### 1.2 Migrations

- `src/lib/schemas/migrations.ts` : `migrateStudentFile` / `parseStudentFileJson`. Un fichier dont `schemaVersion` dépasse la version supportée est explicitement refusé (`unsupported-version`), jamais deviné. Un JSON invalide ou un contenu qui ne respecte pas le schéma renvoie une erreur typée et détaillée, jamais un plantage silencieux. Le registre de migrations est prêt à recevoir une étape `v1 -> v2` le jour où le schéma évoluera, sans changer la forme de la fonction publique.

### 1.3 Modèle de progression (logique pure, testable)

`src/lib/progression/model.ts` :

- `createInitialStudentFile` (révision 0) ;
- `touchStudentFile` (incrémente `revision`, actualise `updatedAt` à chaque sauvegarde significative, `docs/SPEC.md` § 33) ;
- `isWrongFile` (détection de mauvais fichier, § 35) ;
- `resolveConflict` (comparaison cache / fichier, § 34, avec comparaison de contenu insensible à l’ordre des clés pour éviter un faux positif de divergence) ;
- `buildStudentFileName`.

### 1.4 Cache local (IndexedDB)

`src/lib/db/progression-db.ts` : magasin **indexé par `studentCode`**, et non par un emplacement unique. Décision motivée et documentée dans `docs/SAUVEGARDE.md` § 1 : un poste de salle informatique est partagé par plusieurs élèves dans la journée ; chacun doit retrouver sa progression sans jamais écraser celle d’un autre élève ayant utilisé la même machine. Un second magasin conserve, par code élève, le lien vers un dossier de sauvegarde choisi via File System Access.

### 1.5 File System Access (Edge / Chrome) et repli Firefox

- `src/lib/fs/file-system-access.ts` : détection de disponibilité, sélection de dossier, gestion des permissions, écriture du fichier principal avec **copie `.bak`** du contenu précédent avant écrasement (`docs/SPEC.md` § 36), lecture du fichier principal depuis le dossier choisi.
- `src/lib/download.ts` : téléchargement universel (repli Firefox et export manuel disponible dans tous les navigateurs, `docs/SPEC.md` § 37).
- Un complément de types (`src/types/file-system-access.d.ts`) a été nécessaire : l’API File System Access n’est que partiellement couverte par les types `lib.dom` livrés avec la version de TypeScript utilisée.

### 1.6 Import, export, conflits, mauvais fichier

`src/providers/progression-provider.tsx` orchestre :

- **identification** : création ou reprise d’un code élève (avec classe et niveau) ;
- **sauvegarde manuelle** (« Enregistrer ma progression ») : incrémente la révision, écrit dans IndexedDB, et dans le dossier choisi si File System Access est actif ;
- **export** : télécharge le `.mcjson` courant, à tout moment, quel que soit le navigateur ;
- **import** : lit un `.mcjson`, le valide, puis :
  - fichier appartenant à un autre code que la session en cours → bandeau « Ce fichier correspond à un autre identifiant. » (`docs/SPEC.md` § 35), avec un choix explicite (annuler, ou confirmer qu’il ne s’agit pas d’une erreur pour changer d’élève) ;
  - aucun cache pour ce code → adoption directe (premier import) ;
  - même révision et même contenu → « à jour », aucune action ;
  - révisions différentes ou même révision avec contenu différent → bandeau de conflit conforme aux trois cas de `docs/SPEC.md` § 34 (fichier plus récent, cache plus récent, divergence), **aucune fusion automatique, aucun écrasement silencieux** ;
- **changement d’élève** : réinitialise la session active sans supprimer la progression déjà enregistrée sur ce poste, pour le retrouver plus tard.

### 1.7 Suppression (RGPD)

`src/lib/privacy.ts` (`eraseAllLocalData`) combine désormais l’effacement des préférences (`localStorage`, ÉTAPE 1) et du cache de progression (IndexedDB, tous élèves confondus). Le bouton « Effacer mes données locales » de `/privacy` (créé à l’ÉTAPE 1) appelle cette fonction unique ; aucune modification n’a été nécessaire dans sa conception d’origine, conformément à ce qui avait été anticipé dans `docs/rapports/ETAPE_01.md`.

### 1.8 Interface

- `/progression` (`src/components/progression/`) : formulaire d’identification, tableau de bord (code, classe, niveau, révision, dernière sauvegarde, actions), bandeaux de conflit et de mauvais fichier.
- Le badge générique de l’en-tête (`UserBadge`, ÉTAPE 1) affiche désormais le code élève une fois l’identité connue, au lieu du seul mot générique « Élève ».

## 2. Documentation mise à jour

- `docs/SAUVEGARDE.md` : décision d’implémentation sur l’indexation du cache par code élève.
- `docs/ARCHITECTURE.md` : encart « État réel au terme de l’ÉTAPE 2 » (Zod, `fake-indexeddb`, complément de types File System Access).
- `docs/rapports/ETAPE_02.md` : ce document.

## 3. Tests pertinents

43 tests automatiques (Vitest), tous verts, dont 20 nouveaux pour cette étape :

- `test/student-file-schema.test.ts` : validation Zod du fichier élève (schéma, code vide, niveau inconnu, révision négative).
- `test/migrations.test.ts` : JSON invalide, schéma non respecté, version future refusée, recomposition correcte.
- `test/progression-model.test.ts` : création à la révision 0, incrément de révision, détection de mauvais fichier, nommage de fichier, et les cinq cas de résolution de conflit (absence de cache, à jour, fichier plus récent, cache plus récent, divergence).
- `test/progression-db.test.ts` (avec `fake-indexeddb`) : lecture, écriture, séparation des progressions de deux élèves sur un même poste, suppression ciblée, effacement complet.
- `test/typography.test.ts` : étendu au nouveau contenu de `/progression`.

## 4. Vérification manuelle dans un navigateur réel

Conformément à la consigne de test des fonctionnalités d’interface, l’application a été lancée (`npm run dev`) et pilotée dans un Chromium réel (résolution 1366 × 768, conforme à `docs/SPEC.md` § 43) :

- formulaire d’identification correctement affiché et fonctionnel ;
- tableau de bord affichant code, classe, niveau, révision, date, et le bouton « Choisir mon dossier de sauvegarde » (File System Access détecté) ;
- badge d’en-tête mis à jour avec le code élève ;
- navigation vers une autre page puis retour sur `/progression` : identité et progression conservées (pas de re-saisie) ;
- bouton « Enregistrer ma progression » : révision passée de 0 à 1, message de confirmation affiché ;
- export : fichier `.mcjson` téléchargé, contenu vérifié conforme au schéma ;
- « Changer d’élève » : retour au formulaire d’identification ; ressaisie du même code élève : révision 1 correctement retrouvée (progression bien conservée sur ce poste, `docs/SPEC.md` § 32) ;
- import d’un fichier appartenant à un autre code élève : bandeau « Ce fichier correspond à un autre identifiant. » correctement affiché avec le code du fichier et celui de la session ;
- aucune erreur dans la console du navigateur sur l’ensemble du parcours.

## 5. Qualité

| Vérification | Commande | Résultat |
| --- | --- | --- |
| Lint | `npm run lint` | ✅ aucun problème |
| TypeScript | `npm run typecheck` | ✅ aucune erreur |
| Tests | `npm run test` | ✅ 43/43 tests, 9 fichiers |
| Build | `npm run build` | ✅ export statique généré, 7 pages |

## 6. Risques et points de vigilance

1. **Persistance des permissions File System Access** : certains navigateurs peuvent redemander l’autorisation d’accès au dossier après un certain temps ou un redémarrage ; l’application le gère (`ensureReadWritePermission` redemande si nécessaire) mais ce comportement dépend du navigateur et n’a pas pu être testé sur la durée dans le cadre de cette étape.
2. **`fake-indexeddb`** : dépendance de développement uniquement, absente du build élève déployé (vérifiable par le budget de taille de bundle, `docs/SPEC.md` § 59).
3. **Comparaison de divergence** : `resolveConflict` compare le contenu par égalité structurelle stricte (hors ordre des clés) ; toute évolution future des champs `responses` / `assessments` (ÉTAPE 4 et suivantes) devra rester sérialisable de façon stable pour que cette comparaison continue de fonctionner correctement.
4. **Export/ZIP groupé côté `/teacher`** (mentionné comme risque en ÉTAPE 0) : reste à traiter à l’ÉTAPE 5, sans changement à ce stade.

## 7. Conformité aux six questions de contrôle (docs/PEDAGOGIE.md § 13)

- Un élève fragile peut-il comprendre seul ce qu’il doit faire ? → une consigne à la fois (« Qui es-tu ? » puis un tableau de bord clair), messages courts pour chaque situation (conflit, mauvais fichier).
- Le professeur peut-il expliquer pourquoi une compétence est considérée comme maîtrisée ? → sans objet à ce stade (aucune compétence ni évaluation encore implémentée).
- L’élève sait-il immédiatement s’il travaille sur un fait réel ou une simulation ? → sans objet (aucun contenu de mission).

Les questions restantes s’appliquent à partir des missions elles-mêmes (ÉTAPE 6 et suivantes).

---

Fin de l’ÉTAPE 2.

Ne pas commencer l’ÉTAPE 3 avant l’instruction exacte : `CONTINUE ÉTAPE 3`.
