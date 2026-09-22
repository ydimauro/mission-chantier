# Questions ouvertes

Ce fichier recense les décisions qui attendent l’accord de l’enseignant. Pour chaque question : problème, options, recommandation, conséquences. La réponse de l’enseignant est écrite sous la question et prime ensuite sur `docs/SPEC.md`.

## Paramètres de progression annuelle

**Problème** : la part de Mission Chantier dans l’année ne peut pas être calculée sans l’horaire et le nombre de semaines.

**À renseigner** :

- `weeklyHours5e` :
- `effectiveWeeks5e` :
- `weeklyHours4e` :
- `effectiveWeeks4e` :

## Hébergement

**Problème** : la configuration de sécurité (CSP, Permissions-Policy) diffère selon l’hébergeur.

**Options** : Apache / InfinityFree (`.htaccess`) ou Vercel.

**Réponse de l’enseignant** : Vercel (2026-09-20).

**Conséquences** :

- la configuration de sécurité (CSP, `Permissions-Policy`) sera écrite pour Vercel (`vercel.json` et en-têtes de réponse), aucun `.htaccess` ne sera produit ;
- l’application reste statique (`output: "export"` lorsque compatible) : Vercel sert des fichiers statiques, aucune fonction serverless ni route API n’est utilisée, conformément à « pas de backend » et à l’absence de transmission de données élève sur Internet ;
- aucune base de données ni service Vercel additionnel (KV, Postgres, Analytics) n’est utilisé.

## Police pour le mode « Police adaptée » (accessibilité dyslexie)

**Problème** : `docs/SPEC.md` § 62 interdit toute police distante (Google Fonts ou autre CDN). Aucun fichier de police sous licence libre (par exemple OpenDyslexic ou Atkinson Hyperlegible) n’a été fourni ni validé pour être embarqué localement dans le projet.

**Solution retenue à l’ÉTAPE 1** : le mode « Police adaptée » applique une police système alternative si elle est présente sur le poste (`OpenDyslexic`, sinon `Comic Sans MS`, sinon `Century Gothic`, sinon la police système par défaut), combinée à un espacement des lettres, des mots et une hauteur de ligne augmentés. Cette dernière partie (espacement et interligne) fonctionne indépendamment de la police réellement disponible.

**Options pour la suite** : rester sur cette solution sans dépendance ; ou embarquer localement une police accessible sous licence libre clairement compatible (OFL ou équivalent), fournie explicitement par l’enseignant ou validée avec lui avant intégration.

**Réponse de l’enseignant** :

## Première source réelle Givors reçue

**Problème** : `docs/ANALYSE_SPEC.md` § 4 signalait qu’aucune source Givors n’était disponible, bloquant tout fait réel précis pour 5E-00, 5E-01, 5E-02, 5E-07 et 4E-00.

**Mise à jour (2026-09-20)** : une première photographie réelle a été déposée par l’enseignant dans `public/givors/mission_chantier_givors.png`, confirmée par lui comme une photographie authentique du chantier de Givors (et non une image générée par IA). Trois autres fichiers présents au même moment dans ce dossier (une capture de la maquette d’interface et deux essais générés par IA) ont été déplacés vers `docs/references/` pour ne jamais être confondus avec une source réelle (voir `docs/references/README.md`).

**Mise à jour (2026-09-21, ÉTAPE 16)** : le PNG d’origine (2,8 Mo, non compressé) dégradait fortement le LCP sur réseau lent (audit Lighthouse, docs/rapports/ETAPE_16.md). Il a été recompressé en JPEG qualité 82 (`public/givors/mission_chantier_givors.jpg`, 333 Ko, dimensions inchangées, contenu visuellement identique) puis le PNG source a été supprimé. `content/givors/media.ts` référence désormais ce fichier `.jpg`.

**Métadonnées provisoires** (à confirmer précisément à l’ÉTAPE 6, sur le modèle de `docs/SPEC.md` § 5) :

```ts
{
  file: "mission_chantier_givors.jpg",
  title: "Travaux dans le centre-ville de Givors",
  date: "2026-09-20",
  author: "Yann Di Mauro",
  source: "Photographie personnelle",
  alt: "Vue en hauteur d’un chantier de démolition avec pelles mécaniques, gravats et bâtiments environnants",
  rightsChecked: true
}
```

**Mise à jour (ÉTAPE 6, 2026-09-20)** : cette photographie est désormais intégrée dans 5E-00 et 4E-00 (`content/givors/media.ts`), avec attribution visible (« Source : Photographie personnelle, 2026-09-20 ») sous le bandeau « Situation réelle ». Faute d’une seconde photo, 4E-00 réutilise la même image que 5E-00 (`docs/SEANCES_4E.md` l’envisageait comme une option « idéalement » différente, pas une obligation) ; les scénarisations et questions diagnostiques restent différentes entre les deux niveaux.

**Date confirmée par l’enseignant (2026-09-21)** : photographie prise le dimanche 20 septembre 2026.

**Reste à confirmer avec l’enseignant** :

- une relecture rapide de la photo pour écarter toute plaque d’immatriculation lisible ou personne identifiable (`docs/SPEC.md` § 5) ; à l’examen, aucune personne n’est visible sur cette photographie, les véhicules visibles sont éloignés et petits dans le cadre ;
- des photographies complémentaires si l’enseignant souhaite enrichir l’ancrage réel au-delà de 5E-00, 4E-00 et 5E-01 ; les activités actuelles de 5E-02 et 5E-07 relèvent du Quartier des Ateliers fictif et n’emploient aucun fait réel supplémentaire sur Givors.

**Réponse de l’enseignant** :

## Parcours élève, accueil et ressources : proposition après l’étape 21

**Problème** : l’enseignant signale un manque de repères entre les séances et à la fin des missions. Lecture du code : `/mission` propose seulement la première mission non terminée ; le bilan final ne comporte aucun lien de navigation ; l’accueil répète le diagnostic du prologue et propose une saisie temporaire non sauvegardée sous « Écris dans ton cours » ; `/ressources` est une page d’attente.

**Options** : conserver le parcours séquentiel avec des indications supplémentaires ; ou créer un menu des missions avec reprise, consultation des missions terminées et choix de la mission indiquée par le professeur. Pour la découverte des engins : fiches locales illustrées ou recherche documentaire externe encadrée.

**Recommandation** : préparer une étape 22 dédiée au parcours et aux ressources. Transformer l’accueil en point d’entrée (première visite, reprise du fichier, menu des missions), conserver le diagnostic et la trace papier dans le prologue, ajouter une fin de mission explicite après sauvegarde et un retour au menu. Prévoir un glossaire et des fiches illustrées sourcées sur les engins, accessibles sans Internet. Introduire une découverte courte après les représentations initiales et avant la première activité nécessitant le vocabulaire. La recherche externe resterait une activité facultative pilotée par le professeur, sans transmission de données élèves.

**Conséquences** : vérifier la restauration effective des réponses à la réouverture, préserver les évaluations et leurs règles de correction, préciser les missions accessibles au choix, intégrer la découverte au budget de 40 à 43 minutes plutôt que l’ajouter à une séance déjà complète. Distinguer les illustrations génériques des photographies réelles de Givors. Aucun changement applicatif réalisé à ce stade.

**Décision attendue** : périmètre proposé pour `CONTINUE ÉTAPE 22`, conformément à la règle 1 de `AGENTS.md`.

### Précision : reprise sans sauvegarde sur un poste partagé

**Problème confirmé dans le code** : `recordResponses` conserve les réponses en mémoire uniquement. Leur persistance intervient notamment lors de `saveNow`, `completeMission` ou `submitAssessment`. Fermer la page ou changer d’élève peut donc perdre les réponses depuis la dernière sauvegarde. Les progressions persistées sont distinctes par code élève, mais dépendent du navigateur et de son profil. L’effacement proposé sur `/privacy` efface actuellement toutes les progressions locales du profil, malgré son libellé individuel.

**Options** : conserver la sauvegarde explicite avec rappels ; ou ajouter une sauvegarde locale automatique des réponses et une restauration vérifiée des activités, tout en conservant le fichier `.mcjson` pour la portabilité et la protection contre l’effacement du navigateur.

**Recommandation** : inclure dans l’étape proposée la sauvegarde locale automatique, un indicateur de réussite ou d’échec, la vérification du code actif lors de la reprise et la correction du périmètre de l’effacement individuel.

**Conséquences** : respecter `revision` et `updatedAt`, empêcher les écritures concurrentes obsolètes, tester le passage entre deux élèves et la fermeture puis réouverture. Aucun mécanisme local ne garantit la récupération après effacement des données du navigateur sans fichier de sauvegarde indépendant. Aucune modification applicative réalisée.

**Mise à jour (ÉTAPE 22, 2026-09-22)** : la sauvegarde automatique des réponses, le menu des missions et la page Ressources ont été réalisés. Les réponses sont écrites dans IndexedDB avec une nouvelle révision et une file d’écriture pour conserver leur ordre. Le fichier `.mcjson` reste nécessaire hors du même poste et navigateur.

**Mise à jour (ÉTAPE 24, 2026-09-22)** : des illustrations vectorielles pédagogiques locales ont été ajoutées à chaque fiche Ressources. Elles ne remplacent pas les photographies réelles de Givors et ne sont jamais étiquetées comme telles.
