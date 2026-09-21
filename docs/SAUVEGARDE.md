# Sauvegarde et progression

## 1. Principe général

La progression doit survivre entre les séances, entre plusieurs postes si nécessaire, et aux mises à jour raisonnables de l’application. Elle ne dépend jamais uniquement de `localStorage`. Le fichier élève `.mcjson` constitue le support portable principal ; IndexedDB sert de cache local et de sauvegarde de travail.

> **Décision d’implémentation (ÉTAPE 2)** : un poste de salle informatique est partagé par plusieurs élèves au fil de la journée. Le cache IndexedDB est donc indexé par `studentCode` (et non par un emplacement unique) : chaque élève retrouve sa propre progression sur ce poste sans jamais écraser celle d’un autre élève qui aurait utilisé la même machine. Seul un pointeur non sensible (le code élève actif) est conservé dans `localStorage` pour reconnaître automatiquement l’élève tant qu’il ne clique pas sur « Changer d’élève ». Ce choix rend aussi le mécanisme de conflit cache / fichier (§ 7) directement utile : il ne se déclenche qu’entre deux versions d’un même code élève, jamais entre deux élèves différents. Détail technique dans `src/lib/db/progression-db.ts`.

## 2. Révision et horodatage

Chaque fichier élève contient :

```ts
{
  schemaVersion: 1,
  revision: 27,
  updatedAt: "2026-09-20T14:42:18.000Z",
  studentCode: "4E2-017"
}
```

Chaque sauvegarde significative augmente `revision`. `updatedAt` est une information secondaire utile, mais la logique principale de comparaison repose sur `revision`, jamais sur l’horodatage seul (horloges de postes non fiables en environnement scolaire).

## 3. Sauvegarde sous Edge / Chrome (File System Access API)

Lorsque l’API est disponible :

- l’élève choisit un dossier ;
- autosave réel dans ce dossier ;
- fichier principal `mission-chantier-<studentCode>.mcjson` ;
- copie de sécurité `.bak` mise à jour avant d’écraser le fichier principal, lorsque cela est techniquement raisonnable ;
- confirmation réelle de l’écriture affichée à l’élève.

Dossier conseillé :

```text
Documents/
└── Mission-Chantier/
    ├── mission-chantier-4E2-017.mcjson
    └── mission-chantier-4E2-017.mcjson.bak
```

## 4. Sauvegarde sous Firefox (ou navigateur sans File System Access)

Pendant la mission : autosave uniquement dans IndexedDB, aucun téléchargement à chaque étape (pour ne pas multiplier les fichiers dans le dossier de téléchargement de l’élève).

En fin de mission : proposer un seul export, afficher « Enregistre ton fichier de progression. », puis demander « J’ai enregistré mon fichier. ». Cette confirmation est déclarative : l’application ne prétend jamais avoir vérifié l’écriture réelle sur disque dans ce cas. Le nom du fichier peut être modifié par le navigateur au moment du téléchargement ; l’application vérifie donc toujours `studentCode` dans le contenu, jamais le nom du fichier (voir § 6).

## 5. Fin de mission

### Mission formative

activité terminée → trace écrite confirmée → formative corrigée → sauvegarde → mission terminée.

### Mission sommative

activité terminée → trace écrite confirmée → évaluation remise → réponses sauvegardées → fichier enregistré ou export confirmé selon le navigateur → mission terminée.

Dans tous les cas, la sauvegarde est confirmée avant d’autoriser l’affichage « Mission terminée », avec une confirmation adaptée au navigateur utilisé (File System Access ou export déclaratif). Aucune correction sommative n’est jamais attendue côté élève à ce stade.

## 6. Identité du fichier

L’application ne se fie jamais au nom du fichier. Elle lit toujours `studentCode` dans le contenu du fichier importé. Si la session utilise `4E2-017` et que le fichier importé contient `4E2-018`, le message affiché est : « Ce fichier correspond à un autre identifiant. » Aucune fusion automatique n’est jamais effectuée dans ce cas ; l’élève doit choisir explicitement quoi faire (annuler l’import, ou confirmer sciemment un changement d’identifiant avec l’enseignant).

## 7. Conflit cache / fichier

À l’ouverture ou à l’import, la `revision` du cache local et celle du fichier importé sont comparées.

| Situation | Message affiché | Choix proposés |
| --- | --- | --- |
| Fichier plus récent | « Une progression plus récente a été trouvée dans ce fichier. » | Utiliser le fichier / Conserver la progression de ce poste |
| Cache plus récent | « Une progression plus récente existe sur cet ordinateur. » | Reprendre la progression de cet ordinateur / Utiliser le fichier importé |
| Même révision, contenu différent | « Deux versions différentes de la même progression ont été détectées. Demande au professeur avant de continuer. » | aucune fusion automatique, blocage jusqu’à arbitrage humain |

Aucune fusion automatique de deux versions divergentes n’est jamais effectuée. Aucun écrasement silencieux d’un fichier ou d’un cache plus récent n’est jamais effectué.

## 8. Retour des résultats corrigés vers les élèves

Mécanisme principal : le fichier élève corrigé, réimporté par l’élève.

```text
fichiers élèves
↓
chargement .mctkey (dans /teacher)
↓
correction automatique + humaine
↓
calcul notes et compétences
↓
mise à jour .mcjson
↓
revision + 1
↓
export groupé
```

L’export par lot produit un ZIP contenant les `.mcjson` corrigés, entièrement dans le navigateur grâce à `fflate` et sans backend (implémenté à l’ÉTAPE 5). L’élève réimporte ensuite son fichier corrigé et retrouve, dans « Ma progression » : résultats des sommatives, note provisoire ou finale, niveaux de maîtrise, compétences, bilan, éléments à retravailler. Le bilan imprimé ou PDF reste complémentaire, jamais le mécanisme principal de retour du résultat.

## 9. Aménagements et incrément de révision

Toute modification apportée par l’enseignant à un `.mcjson` (application d’un aménagement, réinjection d’une correction) augmente `revision`, garantissant que le poste élève détecte correctement qu’une version plus récente existe lors de la prochaine ouverture (voir § 7).

## 10. Suppression des données

Le bouton « Effacer mes données locales » (voir `docs/RGPD.md` § 9) supprime le cache IndexedDB du poste après confirmation explicite ; il n’efface pas un fichier `.mcjson` déjà exporté sur un support externe.
