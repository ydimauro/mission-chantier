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
