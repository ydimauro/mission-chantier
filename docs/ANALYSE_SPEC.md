# Analyse du cahier des charges

Document produit à l’ÉTAPE 0. Aucune ligne de code applicatif n’a été écrite à ce stade.

## 1. Lecture effectuée

- `AGENTS.md` (règles permanentes)
- `docs/SPEC.md` (cahier des charges maître, 67 sections)
- `ETAPE_0.md` (mandat de cette étape)
- `docs/sources/givors/README.md` (aucune source exploitable présente pour l’instant, voir § 4)
- `teacher-data/README.md`
- `docs/QUESTIONS_OUVERTES.md`

## 2. Finalité et posture pédagogique

L’application n’est ni un jeu de conduite d’engins ni un cours numérique classique. Le fil rouge est toujours :

OBSERVER → SE QUESTIONNER → HYPOTHÈSE → MANIPULER → MESURER → COMPARER → COMPRENDRE → ÉCRIRE → S’ENTRAÎNER → ÊTRE ÉVALUÉ → RÉINVESTIR

Deux conséquences fortes pour la conception :

1. chaque activité doit déboucher sur une notion de technologie identifiable (objet, système, fonction, énergie, information, capteur, programme, critère de choix, protocole, diagnostic, conception) ;
2. le cahier papier reste l’outil de référence de la trace écrite, l’application ne le remplace jamais.

## 3. Deux univers à ne jamais confondre

| | Givors | Quartier des Ateliers |
| --- | --- | --- |
| Nature | situation réelle | simulation pédagogique fictive |
| Source des faits | `docs/sources/givors/` uniquement | inventée librement pour l’activité |
| Bandeau obligatoire | « Situation réelle » | « Simulation pédagogique » |
| Ton | descriptif, neutre, attribué (« Selon la Ville de Givors… ») | libre, mais valeurs simplifiées annoncées |

Cette distinction doit être un composant d’interface récurrent (voir `docs/ARCHITECTURE.md`, composant `SituationReelle` / `SimulationPedagogique`), pas une simple mention textuelle isolée.

## 4. Contrainte bloquante identifiée : sources Givors absentes

`docs/sources/givors/` ne contient que son `README.md` : aucun PDF, capture, plan ou photographie n’a encore été déposé par l’enseignant.

Conséquence directe pour les missions à ancrage réel (5E-00, 5E-01, 5E-02, 5E-07, 4E-00) : les documents de séances produits à cette étape (`docs/SEANCES_5E.md`, `docs/SEANCES_4E.md`) décrivent la structure pédagogique et le type de support attendu (« photographie de la zone de chantier », « extrait d’un document de la Ville de Givors »), mais ne peuvent pas citer de fait réel précis (adresse, surface, date de livraison, nombre de logements, etc.) tant qu’aucune source n’est fournie. Ce point est inscrit dans `docs/QUESTIONS_OUVERTES.md`.

Aucune donnée réelle n’a été inventée pour combler ce manque, conformément à la règle 5 de `AGENTS.md`.

> **Mise à jour (2026-09-20)** : une première photographie réelle est désormais disponible (`public/givors/mission_chantier_givors.jpg`) et intégrée dans 5E-00 et 4E-00 à l’ÉTAPE 6. La même photographie est également réutilisée en 5E-01. Les activités 5E-02 et 5E-07 se déroulent dans la simulation fictive du Quartier des Ateliers et n’affichent actuellement aucun fait réel supplémentaire sur Givors. Détail et métadonnées dans `docs/QUESTIONS_OUVERTES.md`.

## 5. Contraintes non négociables retenues pour la suite du projet

- Durée : aucune mission obligatoire ne dépasse 45 minutes pour l’élève le plus lent ; avertissement interne si l’estimation lente dépasse 43 minutes.
- RGPD : aucune donnée élève transmise sur Internet ; identifiant pseudonymisé (`4E2-017`) ; pas de Supabase, Firebase, analytics, authentification cloud.
- Trois fichiers strictement séparés : `.mcjson` (élève), `.mcconfig` (classe, sans donnée individuelle sensible), `.mctkey` (corrigé enseignant, jamais versionné, jamais dans le build).
- Correction sommative déportée dans `/teacher`, jamais embarquée côté élève.
- Aménagements individuels limités à `standard | reduced | split`, jamais de motif médical, jamais dans `.mcconfig`.
- Typographie française stricte : apostrophes courbes ’, guillemets « … », aucun tiret cadratin, dans tout contenu élève ou professeur.
- Accessibilité dès l’architecture : clavier, focus visible, contrastes, zoom 125/150 %, 1366 × 768, mode vidéoprojecteur, réduction des animations, aucune information uniquement par couleur.
- Aucune dépendance réseau obligatoire à l’exécution (pas de Google Fonts, pas de CDN obligatoire, pas d’API externe indispensable).
- 2D / 2,5D par défaut pour la simulation ; 3D seulement si elle apporte une valeur pédagogique réelle (cas non identifié à ce stade).

## 6. Décision d’hébergement (validée le 2026-09-20)

L’enseignant a choisi **Vercel**. Décision et conséquences détaillées dans `docs/QUESTIONS_OUVERTES.md` et dans `docs/ARCHITECTURE.md`. En synthèse :

- build statique Next.js (`output: "export"` lorsque compatible avec les fonctionnalités retenues) ;
- aucune fonction serverless, aucune route API Vercel utilisée à l’exécution ;
- sécurité (CSP, `Permissions-Policy`) configurée via les en-têtes Vercel (`vercel.json`), pas de `.htaccess`.

## 7. Paramètre non fourni : progression annuelle

`weeklyHours5e`, `effectiveWeeks5e`, `weeklyHours4e`, `effectiveWeeks4e` ne sont pas renseignés. Conformément à la section 18 du cahier des charges, `docs/PROGRESSION_ANNUELLE.md` affiche donc uniquement le nombre de séances et d’heures des parcours, sans calcul de part annuelle, et la question reste ouverte.

## 8. Risques identifiés à ce stade

1. **Sources Givors manquantes** : bloque toute rédaction de fait réel précis avant dépôt de documents par l’enseignant (voir § 4).
2. **Charge de la mission 5E-12 / 4E-11 (intégratives)** : nombreuses compétences mobilisées simultanément ; durée calée au maximum acceptable (voir `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md`), à surveiller lors des tests utilisateurs (ÉTAPE 10 et 14).
3. **Double usage de C8** (simulation en 5E-08/5E-12, protocole de test réel en 4E-08) : à ne pas fusionner par erreur lors du développement, ce sont deux preuves de nature différente.
4. **Fichier `.mctkey`** : doit rester totalement hors du dépôt Git versionné dès l’ÉTAPE 2 ; à vérifier par un test automatique dès l’ÉTAPE 4 (voir tests n° 25 de `docs/SPEC.md` § 64).
5. **Export/ZIP des fichiers élèves corrigés** : faisabilité technique dans un contexte 100 % client (pas de backend) à confirmer techniquement à l’ÉTAPE 5 (bibliothèque de génération ZIP côté navigateur).

## 9. Décisions prises à cette étape

- Hébergement Vercel, build statique, pas de backend (voir § 6).
- Les treize documents demandés par `ETAPE_0.md` sont produits avec le niveau de détail nécessaire à la planification (identifiants, statuts, compétences, durées, évaluations) ; le détail minute par minute des fiches professeur est donné comme trame exploitable dès l’ÉTAPE 0, à affiner lors du développement effectif de chaque mission (ÉTAPES 6 à 14), sans que cela ne constitue du code applicatif.

## 10. Documents produits à l’ÉTAPE 0

- `docs/ANALYSE_SPEC.md` (ce document)
- `docs/PEDAGOGIE.md`
- `docs/COMPETENCES.md`
- `docs/EVALUATIONS.md`
- `docs/SEANCES_5E.md`
- `docs/SEANCES_4E.md`
- `docs/TRACES_ECRITES.md`
- `docs/FICHES_PROFESSEUR.md`
- `docs/RGPD.md`
- `docs/ARCHITECTURE.md`
- `docs/SAUVEGARDE.md`
- `docs/PROGRESSION_ANNUELLE.md`
- `docs/QUESTIONS_OUVERTES.md` (mis à jour)
- `docs/rapports/ETAPE_00.md` (bilan de l’étape)
