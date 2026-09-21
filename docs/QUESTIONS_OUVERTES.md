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
  date: "2026-09",
  author: "Yann Di Mauro",
  source: "Photographie personnelle",
  alt: "Vue en hauteur d’un chantier de démolition avec pelles mécaniques, gravats et bâtiments environnants",
  rightsChecked: true
}
```

**Mise à jour (ÉTAPE 6, 2026-09-20)** : cette photographie est désormais intégrée dans 5E-00 et 4E-00 (`content/givors/media.ts`), avec attribution visible (« Source : Photographie personnelle, 2026-09 ») sous le bandeau « Situation réelle ». Faute d’une seconde photo, 4E-00 réutilise la même image que 5E-00 (`docs/SEANCES_4E.md` l’envisageait comme une option « idéalement » différente, pas une obligation) ; les scénarisations et questions diagnostiques restent différentes entre les deux niveaux.

**Reste à confirmer avec l’enseignant** :

- la date précise de la prise de vue (mois indiqué provisoirement : septembre 2026) ;
- une relecture rapide de la photo pour écarter toute plaque d’immatriculation lisible ou personne identifiable (`docs/SPEC.md` § 5) ; à l’examen, aucune personne n’est visible sur cette photographie, les véhicules visibles sont éloignés et petits dans le cadre ;
- des photographies complémentaires pour 5E-01, 5E-02 et 5E-07, qui restent en attente d’une source réelle (ÉTAPE 7 et suivantes).

**Réponse de l’enseignant** :
