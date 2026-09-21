# BILAN ÉTAPE 18 : audit des sources

Périmètre : `docs/SPEC.md` § 3 à § 6, § 52, § 64 et § 65 (ÉTAPE 18) : audit des faits sur Givors, données techniques, photographies, droits, dates, contradictions et valeurs pédagogiques fictives.

## 1. Résultat global

Aucun fait institutionnel précis sur Givors n’est présenté sans source. L’application ne mentionne ni adresse de chantier, surface, coût, calendrier, nombre de logements ni objectif municipal non documenté. Son ancrage réel repose actuellement sur une seule photographie personnelle déclarée comme prise à Givors.

L’audit a corrigé cinq incohérences :

- le registre de 5E-00 et 4E-00 annonçait plusieurs photographies alors qu’une seule est affichée ;
- la situation de transfert 5e ne rendait pas explicitement visible que Rocheval est fictive ;
- `docs/references/README.md` citait encore l’ancien fichier PNG supprimé à l’ÉTAPE 16 ;
- `docs/ANALYSE_SPEC.md` et `docs/QUESTIONS_OUVERTES.md` présentaient encore 5E-01 comme en attente alors que cette mission réutilise désormais la photographie réelle ;
- les seuils et distances pédagogiques de 5E-09, 5E-10 et 4E-11 n’affichaient pas l’avertissement indiquant que leurs valeurs sont simplifiées.

## 2. Sources Givors disponibles

`docs/sources/givors/` ne contient toujours aucun document institutionnel exploitable, uniquement son README de règles. Aucun fait attribué à la Ville de Givors ou à la Métropole de Lyon ne peut donc être ajouté à ce stade.

Média réel distribué :

| Champ | Valeur auditée |
| --- | --- |
| Fichier | `public/givors/mission_chantier_givors.jpg` |
| Dimensions | 1844 × 853 px |
| Format | JPEG sRGB |
| Auteur déclaré | Yann Di Mauro |
| Source déclarée | Photographie personnelle |
| Date confirmée | dimanche 20 septembre 2026 (`2026-09-20`) |
| Droits | `rightsChecked: true` |
| SHA-256 | `6F89B7D31D15C56BF90BB03B590B41703065456CBB7B08A19357157CC8ED2605` |

Le fichier ne contient aucun bloc EXIF, XMP, IPTC ou profil ICC : aucune géolocalisation, identité d’appareil ou autre métadonnée personnelle n’est distribuée.

La photographie est enregistrée dans un registre TypeScript central et citée visiblement comme « Photographie personnelle, 2026-09 » dans 5E-00, 4E-00 et 5E-01.

## 3. Dates, droits et vie privée visuelle

La date exacte a été confirmée par l’enseignant : dimanche 20 septembre 2026. La métadonnée centrale utilise désormais la date ISO `2026-09-20`.

La photographie est déclarée personnelle, attribuée à Yann Di Mauro et marquée comme vérifiée pour la distribution. La confirmation humaine finale concernant une éventuelle plaque lisible ou personne identifiable reste inscrite dans `docs/QUESTIONS_OUVERTES.md`. L’examen déjà consigné indique qu’aucune personne n’est visible et que les véhicules sont éloignés, mais ce point n’est pas fermé sans validation de l’enseignant.

Les pictogrammes et images de conception rangés dans `docs/references/` ne sont jamais utilisés comme sources réelles sur Givors. Leur README rappelle cette séparation et référence désormais correctement le JPEG réel.

## 4. Réel, simulation et situations fictives

Les écrans réels 5E-00 et 4E-00 utilisent le composant `SituationReelle`, le bandeau « Situation réelle », la photographie enregistrée et sa citation. 5E-01 réaffiche la même photographie avec la même attribution.

Les autres missions se déroulent dans le « Quartier des Ateliers » sous le bandeau « Simulation pédagogique ». Les situations finales utilisent des lieux fictifs :

- « école de Rocheval » en 5e, désormais précédée à l’écran de « Situation fictive : » ;
- « halle des Tilleuls » en 4e, déjà annoncée comme situation fictive.

Aucune rue réelle de Givors n’est attribuée au Quartier des Ateliers.

## 5. Données techniques et valeurs fictives

Les masses, capacités, distances, seuils de capteur, mesures hydrauliques, coûts et comparaisons d’engins employés pour les activités ne sont pas présentés comme des caractéristiques constructeur ou des mesures du chantier réel. Ils apparaissent dans des cadres « Simulation pédagogique » et, lorsqu’ils prennent une valeur chiffrée réaliste, avec l’avertissement « Les valeurs ont été simplifiées pour permettre l’activité » ou la mention « Valeur pédagogique fictive ».

Corrections ajoutées à 5E-09, 5E-10 et 4E-11 : les simulations de seuils et distances affichent désormais l’avertissement de valeurs simplifiées. Les tableaux comparatifs 5E-11 et 4E-09 affichaient déjà « Valeur pédagogique fictive » via le composant `Source` sans citation.

Les missions finales 5e et 4e encadrent déjà leurs masses, volumes, distances et mesures par `SimulationPedagogique valeursSimplifiees` et, pour la 4e, par une limite explicite du modèle.

## 6. Contradictions documentaires corrigées

- `content/missions/registry.ts` correspond désormais au support réellement affiché : une photographie en 5E-00 et une photographie en 4E-00.
- `docs/references/README.md` pointe vers `.jpg`, plus vers le PNG supprimé.
- `docs/ANALYSE_SPEC.md` et `docs/QUESTIONS_OUVERTES.md` indiquent que 5E-01 réutilise la photographie ; 5E-02 et 5E-07 restent des activités fictives sans fait supplémentaire sur Givors.
- Le statut réel/fictif de Rocheval est maintenant visible par l’élève et ne dépend plus d’un commentaire de code.

## 7. Tests de non-régression

Nouveau fichier `test/source-audit.test.ts` :

1. chaque média Givors possède un fichier local, une attribution, une date structurée, un texte alternatif et des droits vérifiés ;
2. aucun fichier de `public/givors/` n’échappe au registre central ;
3. le registre des missions décrit le nombre réel de photographies affichées ;
4. Rocheval est explicitement annoncée comme fictive ;
5. la documentation ne référence plus l’ancien PNG ;
6. les simulations à seuils et distances non sourcés affichent l’avertissement de valeurs simplifiées.

## 8. Pipeline qualité

| Vérification | Résultat |
| --- | --- |
| Tests ciblés sources/réel/fictif/typographie | 76 tests réussis avant le contrôle global |
| `npm run typecheck` | réussi |
| `npm run lint` | réussi |
| `npm test` | 52 fichiers, **297 tests réussis** |
| `npm run build` | réussi, 36 routes statiques |

## 9. Photographies retouchées fournies après l’audit

L’enseignant a confirmé que les huit images sont des photographies personnelles prises à Givors, dont l’IA a seulement renforcé l’ensoleillement. La déclaration C2PA `trainedAlgorithmicMedia` signale donc une retouche générative, pas une scène fictive. Deux vues complémentaires ont été retenues : une vue lisible depuis la rue pour le parcours 5e et une vue en hauteur centrée sur l’engin pour le parcours 4e. Elles ont été converties en WebP, maintenues sous 1 Mo et leur citation visible précise « luminosité retouchée par IA ».

## 10. Points encore ouverts

- confirmer humainement une dernière fois l’absence de plaque lisible ou personne identifiable ;
- fournir des documents institutionnels locaux si des faits précis sur le projet urbain de Givors doivent être ajoutés ultérieurement ;
- fournir éventuellement d’autres photographies autorisées pour enrichir l’ancrage réel, sans que cela bloque les activités fictives actuelles.

Aucune donnée extérieure n’a été recherchée ni intégrée : conformément aux règles du dépôt, toute nouvelle source externe devra être fournie ou validée par l’enseignant.

---

Fin de l’ÉTAPE 18.

Ne pas commencer l’ÉTAPE 19 avant l’instruction exacte : `CONTINUE ÉTAPE 19`.