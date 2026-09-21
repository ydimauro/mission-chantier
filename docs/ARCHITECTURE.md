# Architecture technique

Ce document décrit l’architecture cible. Aucun code n’est écrit à l’ÉTAPE 0 ; la mise en œuvre commence à l’ÉTAPE 1.

> **État réel au terme de l’ÉTAPE 1** (socle technique livré) : Next.js 16 (App Router, Turbopack), React 19, TypeScript strict (avec `noUncheckedIndexedAccess`), Tailwind CSS v4 (configuration par CSS, `@theme`), Vitest. Le dossier `/content` vit à la racine du dépôt (hors de `src/`), avec un alias `@content/*` dédié dans `tsconfig.json`, pour garder la séparation code / contenu strictement visible dans l’arborescence. Détail complet dans `docs/rapports/ETAPE_01.md`.
>
> **État réel au terme de l’ÉTAPE 2** (sauvegarde et progression) : Zod ajouté comme dépendance de production pour valider `.mcjson` (`src/lib/schemas/`) ; `fake-indexeddb` ajouté comme dépendance de développement pour tester le cache IndexedDB sans navigateur (`test/progression-db.test.ts`). L’API File System Access n’étant que partiellement couverte par les types `lib.dom` livrés avec TypeScript à cette date, un complément de types minimal a été ajouté dans `src/types/file-system-access.d.ts`. Détail complet dans `docs/rapports/ETAPE_02.md`.
>
> **État réel au terme de l’ÉTAPE 3** (moteur pédagogique) : dix-huit composants génériques dans `src/components/mission/` (voir § 5). `next.config.ts` déclare désormais `agentRules: false` : Next.js 16 insère par défaut un bloc d’instructions pour agents IA dans `AGENTS.md` au démarrage de `next dev`, ce qui entrait en conflit avec l’usage de ce fichier comme unique source des règles permanentes du projet (`docs/SPEC.md` § 63). Détail complet dans `docs/rapports/ETAPE_03.md`.
>
> **État réel au terme de l’ÉTAPE 4** (évaluations et tests pédagogiques) : moteur d’évaluation dans `src/lib/evaluations/` (note /20, niveaux de maîtrise, graine/variantes) et `src/lib/schemas/` (preuve de compétence, dépôt d’évaluation, `.mctkey`) ; composants génériques dans `src/components/evaluation/`. `@testing-library/react`, `@testing-library/jest-dom` et `jsdom` ajoutés comme dépendances de développement pour tester le rendu réel des composants (Vitest passe en environnement `jsdom`), nécessaires pour les tests pédagogiques automatiques désormais obligatoires (`docs/SPEC.md` § 64). Détail complet dans `docs/rapports/ETAPE_04.md`.
>
> **État réel au terme de l’ÉTAPE 5** (espace professeur) : route `/teacher` (`src/app/teacher/`), jamais liée depuis la navigation élève. Schéma `.mcconfig` ajouté (`src/lib/schemas/class-config.ts`), format `.mctkey` étendu (compétence et type de transfert déclarés par item, corrigés par variante en tableau pour rester alignés avec `pickVariant`/`seedToIndex`). Logique de correction, de synthèse, d’export CSV et d’export ZIP dans `src/lib/teacher/`. `fflate` ajouté comme dépendance de production (génération de ZIP entièrement côté navigateur, sans requête réseau). **Décision d’implémentation** : l’espace de travail professeur n’est jamais persisté (ni IndexedDB, ni `localStorage`) ; l’enseignant réimporte `.mctkey` et `.mcjson` à chaque ouverture de `/teacher`, ce qui évite de garder des corrigés en mémoire durable sur un poste potentiellement partagé (voir `docs/rapports/ETAPE_05.md`).
>
> **État réel au terme de l’ÉTAPE 6** (prologue commun « Givors se transforme ») : premier contenu de mission réel, `src/components/mission/PrologueGivorsSeTransforme.tsx`, paramétré par `content/5e/5e-00.ts` et `content/4e/4e-00.ts` (une seule mise en œuvre pour les deux missions). Registre de missions (`content/missions/registry.ts`) validé automatiquement (`docs/SPEC.md` § 64, tests 1-6, enfin appliqués à du contenu réel). Nouvelles briques partagées, réutilisables par toutes les missions suivantes : `RequireStudentIdentity` (garde d’identification, aussi adoptée par `/progression`), `MissionCompletionFlow` (sauvegarde puis confirmation adaptée au navigateur avant « Mission terminée », AGENTS.md règle 15), `DiagnosticChecklist`. Photo réelle de Givors référencée avec ses métadonnées dans `content/givors/media.ts`, affichée via `next/image` (`images.unoptimized: true`, compatible avec l’export statique). Détail complet dans `docs/rapports/ETAPE_06.md`.
>
> **État réel au terme de l’ÉTAPE 7** (premières missions 5e, 5E-01 à 5E-06) : quatre nouveaux composants génériques dans `src/components/mission/` — `AssociationActivity` et `SequencingActivity` (formatifs, correction immédiate et indices progressifs), `SommativeAssociation` et `SommativeChoiceJustified` (sommatifs, aucune aide ni correction, dépôt `submitAssessment` en attente de correction dans `/teacher`). **Décision d’implémentation** : les interactions « association », « classement » et « séquencement » sont réalisées avec un menu déroulant natif par élément plutôt qu’un glisser-déposer avec repli clavier, pour rester accessible sans code séparé (docs/SPEC.md § 23). Une seule implémentation d’`AssociationActivity` est donc réutilisée par 5E-01 (appariement besoin/objet), 5E-02 (classement en six catégories) et 5E-03 (appariement fonction/engin). `submitAssessment` ajouté à `src/providers/progression-provider.tsx` (et `recordAssessmentSubmission` à `src/lib/progression/model.ts`) pour déposer les évaluations sommatives. `SommativeChoiceJustified`/`SommativeAssociation` acceptent un `onSubmitted` optionnel, pour que la page de mission sache quand débloquer « Mission terminée ». Six missions ajoutées à `content/missions/registry.ts` et `MISSION_SEQUENCE["5e"]`, avec leurs routes dans `src/app/mission/5e-0{1..6}/`. Détail complet dans `docs/rapports/ETAPE_07.md`.

> **État réel au terme de l’ÉTAPE 8** (premier moteur de simulation) : `src/lib/simulation/evacuation.ts` fournit un calcul pur et déterministe pour une évacuation de gravats : volume, trajets, distance, temps et consommation pédagogique. `src/components/mission/EvacuationSimulation.tsx` fournit l’interface 2D réutilisable, avec plan simplifié, paramètres numériques accessibles au clavier, bouton de lancement et mesures annoncées dynamiquement. Les valeurs sont des paramètres pédagogiques fictifs ; aucune mission n’est encore branchée sur ce composant, conformément au découpage de l’ÉTAPE 9. Détail complet dans `docs/rapports/ETAPE_08.md`.
>
> **État réel au terme de l’ÉTAPE 9** (fin du parcours 5e, 5E-07 à 5E-12) : `EvacuationSimulation` (ÉTAPE 8) enfin branché sur une mission réelle (5E-08). Trois nouveaux composants génériques : `ComparisonTable` (tableau de comparaison, extrait de `SommativeChoiceJustified` pour être réutilisé par 5E-11), `SommativeSimulationReport` (sommatif générique « hypothèse → simulation (en `children`) → conclusion », indépendant du moteur de simulation utilisé) et `SommativeBlockProgram` (programmation « pseudo-blocs » simplifiée par menus déroulants : condition + action, testée sur plusieurs scénarios sans jamais afficher de jugement correct/incorrect). **Décision d’implémentation** : `SommativeBlockProgram` est une interface provisoire ; le véritable environnement de programmation par blocs est prévu à l’ÉTAPE 12 (docs/SPEC.md § 65), et cette mission sera revue à ce moment-là. Nouvelle logique pure `src/lib/mission/block-program.ts` (évaluation qualitative d’une condition, sans aucun texte) et `src/lib/format-number.ts` (formatage décimal français partagé, extrait d’`EvacuationSimulation`). Six missions ajoutées à `content/missions/registry.ts` et `MISSION_SEQUENCE["5e"]`, avec leurs routes dans `src/app/mission/5e-0{7..9}/` et `5e-1{0..2}/` ; le parcours 5e essentiel/recommandé (5E-00 à 5E-12) est maintenant entièrement construit, seule la finale 5e (ÉTAPE 10) reste à faire. Détail complet dans `docs/rapports/ETAPE_09.md`.
>
> **État réel au terme de l’ÉTAPE 10** (finale 5e, 5E-FINAL) : situation fictive « école de Rocheval » (transfert, différente de Givors et du Quartier des Ateliers), combinant `SommativeChoiceJustified`, `SommativeAssociation` et `SommativeSimulationReport` avec `kind="final"` (nouveau paramètre optionnel sur les quatre composants sommatifs, défaut `"summative"`). Le moteur de note /20 (pondération finale 60 %, `src/lib/evaluations/grade.ts`) et la synthèse enseignant (`src/lib/teacher/synthesis.ts`) géraient déjà le type `"final"` depuis les ÉTAPES 4-5 : aucun changement d’engine nécessaire. **Deux bogues réels trouvés et corrigés pendant la vérification à plusieurs profils d’élèves** (exigée par docs/SPEC.md § 65) : (1) les quatre composants sommatifs ne masquaient leur formulaire déjà rempli qu’au moyen d’un état React local, remis à zéro à chaque remontage (rechargement de page) — un élève pouvait alors déposer une seconde fois par-dessus un dépôt déjà corrigé ; corrigé avec `findAssessmentSubmission` (`src/lib/progression/model.ts`), qui vérifie le fichier persistant à chaque rendu ; (2) les indicateurs « déjà fait » des pages de mission (`submitted`, `traceDone`, etc.) étaient eux-mêmes calculés une seule fois via un initialiseur paresseux de `useState`, exécuté avant que le fichier élève ne soit chargé (`snapshot.status` encore `"loading"`) : la valeur `false` restait figée pour toujours, rendant « Mission terminée » définitivement inatteignable après un rechargement. Corrigé en recalculant ces indicateurs à chaque rendu (`findAssessmentSubmission`/`isTraceEcriteConfirmee`, nouvelle fonction, combinés en `||` avec un état « soumis pendant cette session »), appliqué à 5E-FINAL et aux quatre missions sommatives déjà livrées (5E-04, 5E-05, 5E-08, 5E-10). Détail complet dans `docs/rapports/ETAPE_10.md`.
>
> **Audit de production après l’ÉTAPE 10** : une CSP trop restrictive dans `vercel.json` bloquait les scripts inline générés par l’export statique de Next.js. React ne pouvait alors pas hydrater les composants client sur Vercel, laissant `/mission` affiché dans son état serveur initial « Chargement de ta progression… ». `script-src` autorise désormais `'unsafe-inline'`, nécessaire à cet export statique, tandis que les restrictions sur les sources externes, les objets et l’intégration en cadre sont conservées. Un test statique vérifie cette exigence. Détail dans `docs/rapports/AUDIT_CHARGEMENT_PROGRESSION.md`.
>
> **État réel au terme de l’ÉTAPE 11** (première partie 4e, 4E-01 à 4E-05) : cinq contenus structurés dans `content/4e/`, cinq routes dédiées et leurs clients dans `src/app/mission/4e-0{1..5}/`, enregistrés dans `MISSION_SEQUENCE["4e"]`. Le nouveau moteur pur `src/lib/simulation/hydraulic.ts` et `HydraulicSimulation` proposent une variation qualitative de pression et débit, explicitement marquée comme pédagogique fictive et accompagnée des limites du modèle. `SommativeDiagnostic` propose des tests observables, puis un dépôt sommative sans correction visible : les réponses sont destinées à `/teacher`. Les menus déroulants natifs restent le choix commun pour les associations et diagnostics, afin de préserver l’usage au clavier. Détail complet dans `docs/rapports/ETAPE_11.md`.
>
> **État réel au terme de l’ÉTAPE 12** (programmation, 4E-06) : `SommativeBlockProgram` est devenu l’environnement partagé de pseudo-blocs, utilisé par 5E-10 et 4E-06. Il présente un bloc événement, une condition « SI », une action « ALORS » et une branche « SINON » optionnelle ; les menus dans les blocs restent accessibles au clavier. Le programme doit être testé avant dépôt, les résultats décrivent seulement le comportement sur les scénarios, et le corrigé demeure hors du build élève. 4E-06 ajoute la programmation d’une sécurité avec alternative sur quatre scénarios et une trace écrite papier. Détail complet dans `docs/rapports/ETAPE_12.md`.
>
> **État réel au terme de l’ÉTAPE 13** (protocole et fin 4e, 4E-07 à 4E-11) : `src/lib/simulation/sensor-test.ts` fournit un moteur pur d’observations de capteur, reproductibles essai par essai. `SommativeSensorProtocol` oblige à réaliser des mesures répétées à trois distances, à proposer un seuil et à expliciter une limite avant le dépôt sommative, sans fournir de jugement de correction. Les nouvelles missions réutilisent les associations, le tableau de comparaison, la simulation hydraulique, les pseudo-blocs et le diagnostic existants. Les cinq routes sont ajoutées à `MISSION_SEQUENCE["4e"]`, qui couvre désormais 4E-00 à 4E-11. Détail complet dans `docs/rapports/ETAPE_13.md`.
>
> **État réel au terme de l’ÉTAPE 14** (finale 4e) : `4E-FINAL` est une évaluation de transfert dans la situation fictive inédite de la halle des Tilleuls, distincte de Givors et du Quartier des Ateliers. Elle réutilise les composants sommatifs de choix justifié, association, diagnostic et rapport de simulation hydraulique, tous avec `kind="final"`, afin de déposer les preuves de la finale sans correction dans le build élève. `SommativeDiagnostic` accepte désormais ce type d’évaluation, avec conservation du comportement intermédiaire par défaut. Le scénario ne comprend pas de programmation : la matrice de compétences documente donc C2, C3, C4, C5, C7 et C8 comme preuves de transfert, sans déclarer C6/C9. Détail complet dans `docs/rapports/ETAPE_14.md`.
>
> **État réel au terme de l’ÉTAPE 15** (accessibilité et REP) : l’accueil est devenu une entrée visuelle sobre, ancrée dans la photographie réelle autorisée de Givors. Il distingue explicitement « Situation réelle », propose trois repères à charge cognitive limitée et un unique appel à l’action vers la mission. L’image de couverture est chargée de façon explicite au-dessus de la ligne de flottaison. Les contrôles manuels confirment le lien d’évitement clavier et l’absence de débordement horizontal à 1366 × 768, y compris avec le texte à 150 % et le mode vidéoprojecteur, sur l’accueil, le prologue 5e, le protocole 4E-08 et la finale 4e. Détail complet dans `docs/rapports/ETAPE_15.md`.
>
> **État réel au terme de l’ÉTAPE 16** (performance et hors ligne) : un service worker versionné (`public/sw.js`) met en cache les fichiers `/_next/static/` (cache d’abord) et le reste (réseau d’abord, repli sur le cache), avec précaching des pages du bandeau de navigation principal ; vérifié hors ligne, en reprise et lors d’un changement de version sans blocage sur une ancienne version. Un audit sous CSP réelle a révélé que `style-src` sans `'unsafe-inline'` empêchait `next/image` (prop `fill`) de positionner correctement l’image d’accueil en production ; corrigé dans `vercel.json`, comme le correctif `script-src` de l’ÉTAPE 10. L’image d’accueil, un PNG non compressé de 2,8 Mo, a été recompressée en JPEG (333 Ko). Score Lighthouse Performance : 97 sur profil desktop, 75 à 79 sur profil mobile/réseau limité (JS initial au-dessus de la cible idéale du § 59, documenté sans être traité). Détail complet dans `docs/rapports/ETAPE_16.md`.

## 1. Technologies retenues

- Next.js
- React
- TypeScript strict
- Tailwind CSS
- Zod (ou équivalent léger) pour la validation des fichiers `.mcjson` / `.mcconfig` / `.mctkey`
- Vitest pour les tests unitaires et les tests pédagogiques automatiques
- Playwright pour les tests de bout en bout (ÉTAPE 20)

Application statique, sans backend.

## 2. Hébergement : Vercel (décision validée le 2026-09-20)

- Build statique Next.js, `output: "export"` utilisé lorsque compatible avec les fonctionnalités retenues (voir § 3 pour les cas particuliers).
- Aucune fonction serverless, aucune route API Vercel utilisée à l’exécution : la correction et le calcul des notes restent entièrement côté client, dans `/teacher`, exécutés dans le navigateur de l’enseignant.
- Aucune base de données ni service additionnel Vercel (KV, Postgres, Analytics, Edge Config) n’est utilisé.
- Sécurité configurée via `vercel.json` (en-têtes `Content-Security-Policy`, `Permissions-Policy`, et en-têtes de sécurité standard). Aucun `.htaccess` n’est produit (cette cible ayant été écartée, voir `docs/QUESTIONS_OUVERTES.md`).
- Le service worker (voir `docs/SPEC.md` § 60) doit rester compatible avec un déploiement Vercel statique (fichiers versionnés par nom de cache, pas de dépendance à une fonctionnalité serveur dynamique).

## 3. Points de vigilance techniques propres à Vercel

- Vérifier lors de l’ÉTAPE 1 la compatibilité de `output: "export"` avec les fonctionnalités prévues (File System Access API, IndexedDB, service worker, génération de ZIP côté client) : toutes ces fonctionnalités sont des API navigateur exécutées côté client et sont compatibles avec un export statique.
- Si une fonctionnalité s’avère incompatible avec `output: "export"` (à confirmer au fil du développement), documenter la limite dans `docs/QUESTIONS_OUVERTES.md` avant de l’adopter, plutôt que d’introduire silencieusement une fonction serveur qui contredirait « pas de backend ».

## 4. Architecture des contenus

Séparation stricte entre code applicatif et contenus pédagogiques :

```text
/content
  /5e
  /4e
  /assessments
  /givors
  /simulation
  /sources
  /data
  competencies.ts
  glossary.ts
  notebook.ts
  config.ts
```

Chaque mission possède des métadonnées structurées reprenant les champs définis dans `docs/SEANCES_5E.md` / `docs/SEANCES_4E.md` (identifiant, statut, problématique, ancrage, objectifs, connaissances, compétences, thème, durées, etc.), validées par un schéma (Zod) dès l’ÉTAPE 4.

Aucun contenu pédagogique important n’est écrit directement dans les composants React.

## 5. Composants génériques du moteur pédagogique (ÉTAPE 3, livré)

- `SituationReelle`
- `SimulationPedagogique`
- `Problematique`
- `Objectif`
- `Observe`
- `Hypothese`
- `Consigne`
- `Manipule`
- `Mesure`
- `Compare`
- `EcrisDansTonCours`
- `ARetenir`
- `IndiceProgressif`
- `Feedback`
- `LimitesDuModele`
- `Source`
- `BilanMission`
- `MissionTimer`
- `EvacuationSimulation` (premier moteur de simulation 2D, ÉTAPE 8)

`SituationReelle` et `SimulationPedagogique` portent visuellement la distinction obligatoire entre réel et simulation (bandeaux « Situation réelle » / « Simulation pédagogique »), avec des jetons de couleur dédiés (`--real` / `--sim`) et leur propre couleur de texte de contraste (`--real-contrast` / `--sim-contrast`) pour rester lisibles en mode clair comme en mode sombre. Neuf de ces composants (`Observe`, `Hypothese`, `Consigne`, `Manipule`, `Mesure`, `Compare`, `ARetenir`, `LimitesDuModele`, `BilanMission`) partagent un même bloc interne (`PhaseBlock`) pour une présentation cohérente. Aucun de ces composants ne contient de texte de mission : tout le contenu réel arrive en `children` ou en props à partir de l’ÉTAPE 6. Emplacement : `src/components/mission/` (import groupé via `src/components/mission/index.ts`).

## 6. Sécurité web

- Désactivation des permissions inutiles (caméra, microphone, géolocalisation, notifications, capteurs inutiles).
- `Permissions-Policy` et CSP stricte, définies dans `vercel.json`.
- Aucun script tiers, aucune police distante (pas de Google Fonts), polices embarquées localement.

## 7. Aucune dépendance externe à l’exécution

Interdits : Google Fonts, CDN obligatoire, scripts distants, API externe indispensable, analytics, trackers, services vocaux distants. Tout ce qui est nécessaire au fonctionnement pédagogique est embarqué localement dans le build.

## 8. Performance

Budget cible :

- JS initial compressé : idéalement < 500 Ko ;
- premier chargement hors médias lourds : idéalement < 3 Mo ;
- aucune requête tierce ;
- fonctionnement acceptable sur GPU intégré ;
- simulation stable autour de 30 FPS minimum ;
- Lighthouse Performance cible ≥ 90 sur machine correcte.

Un « Mode performance » réduit ombres, animations, effets et détails graphiques pour les postes les plus modestes du collège.

## 9. Hors ligne

Après un premier chargement complet, l’application reste utilisable si le réseau tombe. Mise en place d’un service worker versionné, avec une stratégie de cache explicite et une gestion propre des mises à jour (voir § 3 pour la compatibilité avec Vercel). Aucune dépendance réseau n’est indispensable à l’exécution.

## 10. Simulation pédagogique

Priorité 2D ou 2,5D. Three.js / React Three Fiber uniquement si la 3D apporte une réelle valeur pédagogique identifiée (aucun cas identifié à ce stade, voir `docs/ANALYSE_SPEC.md` § 5). Aucune recherche de photoréalisme. Le premier moteur de simulation simple est développé à l’ÉTAPE 8.

## 11. Identité visuelle et favicon

Favicon original évoquant godet, pelle stylisée, casque ou lettres MC, aux formats SVG, 16 px, 32 px, 180 px, 512 px. Identité visuelle chantier, urbaine, industrielle, technique, moderne, lisible, adaptée à des collégiens sans être enfantine ; le cas réel de Givors doit aussi évoquer la ville et l’espace public, pas seulement un univers « jaune chantier ». Développé à l’ÉTAPE 1.

## 12. Copyright et nom de l’application

Mention exacte à afficher : « © 2026 - Mission Chantier - Yann Di Mauro ». Le nom de l’application provient d’une constante centrale (`content/config.ts`) afin d’être modifiable facilement.
