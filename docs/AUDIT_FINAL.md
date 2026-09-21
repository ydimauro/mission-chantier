# Audit final — Mission Chantier

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 21, dernière étape du projet) : exécuter `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, `npm run build`, puis produire ce document. STOP.

Date de l'audit : 2026-09-21. Dernier commit audité : `acc1979` (branche `main`, synchronisée avec `origin/main`).

## 1. Résultat du pipeline

| Commande | Résultat |
| --- | --- |
| `npm run lint` | réussi, aucun avertissement |
| `npm run typecheck` | réussi |
| `npm test` (Vitest) | **53 fichiers, 302 tests réussis** |
| `npm run test:e2e` (Playwright) | **8 tests réussis** (1 fichier depuis l'ÉTAPE 10, 5 fichiers ajoutés à l'ÉTAPE 20) |
| `npm run build` | réussi, export statique, **36 routes** |

Les cinq commandes exigées par `docs/SPEC.md` § 65 sont vertes.

## 2. Vérification sur le déploiement réel

Le projet a déjà été touché deux fois par des bogues invisibles en développement local mais actifs sur le déploiement Vercel réel (ÉTAPE 10 : `script-src` sans `'unsafe-inline'` bloquant l'hydratation ; ÉTAPE 16 : `style-src` sans `'unsafe-inline'` cassant le positionnement de l'image d'accueil). L'audit final vérifie donc directement `https://mission-chantier.vercel.app/`, pas seulement le build local :

- capture d'écran complète de l'accueil : image correctement positionnée en arrière-plan, texte superposé lisible, bandeau « Situation réelle », question diagnostique « Que se passe-t-il ici ? », bloc « Écris dans ton cours », bouton « Commencer ma mission », aucune erreur console, aucune violation CSP ;
- `/privacy`, `/teacher`, `/mission`, `/ressources` répondent tous `200`, sans erreur console.

Aucune anomalie constatée sur le déploiement réel à la date de cet audit.

## 3. Bilan du parcours pédagogique

| Niveau | Missions | Parcours essentiel | Sommatives intermédiaires | Finale |
| --- | --- | --- | --- | --- |
| 5e | 14 (5E-00 à 5E-FINAL) | 12 | 4 (5E-04, 5E-05, 5E-08, 5E-10) | 5E-FINAL (60 % de la note /20) |
| 4e | 13 (4E-00 à 4E-FINAL) | 12 | 5 (4E-02, 4E-05, 4E-06, 4E-08, 4E-11) | 4E-FINAL (60 % de la note /20) |

Détail de la progression, de la charge cognitive et des compétences C1 à C9 : `docs/rapports/ETAPE_19.md` (audit pédagogique global, non refait ici pour éviter la redite).

## 4. Conformité aux 25 règles d'`AGENTS.md`

| Règle | Vérification |
| --- | --- |
| 1. Une étape à la fois | Respectée tout au long du projet ; chaque étape s'est arrêtée sur STOP en attendant `CONTINUE ÉTAPE N`. |
| 2. 45 minutes maximum | Chaque mission déclare quatre estimations (rapide/moyenne/lente/maximum absolu) ; aucune ne dépasse 45 minutes (`docs/rapports/ETAPE_19.md` § 3). |
| 3. Le cahier papier n'est jamais remplacé | Aucune zone de texte de trace écrite à l'écran ; `EcrisDansTonCours` ne fait que rappeler et confirmer, jamais saisir le contenu du cahier. |
| 4. Aucune donnée élève transmise sur Internet | Confirmé par `test/static-safety.test.ts` (aucune API réseau interdite, aucune URL externe) et par l'architecture (export statique, aucun backend). |
| 5. Faits Givors uniquement sourcés | Une seule source réelle (photographies personnelles vérifiées), aucun fait institutionnel inventé (`docs/rapports/ETAPE_18.md`). |
| 6. Givors ≠ Quartier des Ateliers | Bandeaux « Situation réelle » / « Simulation pédagogique » systématiques, vérifiés à l'ÉTAPE 18. |
| 7. Ton neutre sur le projet urbain | Aucun fait institutionnel affirmé sans attribution (aucune source institutionnelle disponible à ce jour). |
| 8. Contenu séparé du code | `/content` à la racine, hors de `src/`, alias `@content/*` dédié. |
| 9. Preuves multiples par compétence | Vérifié à l'ÉTAPE 19 (une seule exception documentée et justifiée : C9 en 5e). |
| 10-12. Formatif/sommatif, `.mcjson`/`.mcconfig`/`.mctkey` | Rôles strictement séparés ; `test/static-safety.test.ts` vérifie qu'aucun import de `teacher-data/` ou de `.mctkey` n'existe côté élève. |
| 13. Aménagements sans motif médical | `AssessmentAccommodation` limité à `standard \| reduced \| split`, jamais dans `.mcconfig`. |
| 14. Pas d'écrasement silencieux | `resolveConflict` (cache-newer/file-newer/diverged) ; testé unitairement et en E2E (`backup-and-conflict.spec.ts`). |
| 15. Sauvegarde avant « Mission terminée » | `MissionCompletionFlow`, adapté au navigateur (dossier lié, repli export manuel) ; testé en E2E. |
| 16-18. Accessibilité et charge cognitive | Mode performance, police adaptée, zoom, mode vidéoprojecteur, contrastes ; audité à l'ÉTAPE 15. |
| 19. Typographie française | `test/typography.test.ts` (39 tests) scanne tout `/content/*.ts`. |
| 20. Données fictives annoncées | « Valeur pédagogique fictive » / avertissement de valeurs simplifiées, vérifié à l'ÉTAPE 18. |
| 21. Aucun service tiers à l'exécution | `test/static-safety.test.ts` interdit les API de transmission (XMLHttpRequest, WebSocket, sendBeacon, etc.) et toute URL externe. |
| 22. Pas de 3D superflue | Aucune dépendance 3D dans le projet ; simulations en DOM/2D. |
| 23. Rapport à chaque étape | 21 rapports `docs/rapports/ETAPE_00.md` à `ETAPE_20.md`, tous présents. |
| 24. Décisions non résolues documentées | `docs/QUESTIONS_OUVERTES.md` (voir § 6 ci-dessous pour l'état actuel). |
| 25. `docs/SPEC.md` fait référence | Appliqué à chaque étape, y compris pour cet audit. |

## 5. RGPD et sécurité

- Aucune donnée élève transmise sur Internet ; progression en IndexedDB (`mission-chantier-progression`) et fichier `.mcjson` exporté volontairement.
- Effacement RGPD disponible sur `/privacy`, testé en E2E (`rgpd-erase.spec.ts`) : efface `localStorage` (préfixe `mission-chantier:`) et les deux magasins IndexedDB.
- CSP stricte sur `vercel.json` : `default-src 'self'`, `object-src 'none'`, `frame-ancestors 'none'`, aucune source externe ; `'unsafe-inline'` limité à `script-src` (hydratation Next.js) et `style-src` (positionnement `next/image`), les deux nécessités techniques documentées et testées (`test/static-safety.test.ts`).
- En-têtes de confidentialité supplémentaires (ÉTAPE 17) : `Referrer-Policy: no-referrer`, `Cross-Origin-Opener-Policy`, `Cross-Origin-Resource-Policy`, `Permissions-Policy` désactivant caméra/micro/géolocalisation.
- `.mctkey` jamais versionné (`teacher-data/` hors dépôt Git), jamais importé côté élève (vérifié automatiquement).

## 6. Historique des bogues réels trouvés et corrigés

Pour mémoire, condensé des incidents significatifs rencontrés pendant le développement (détail dans les rapports d'étape cités) :

- **ÉTAPE 10** : dépôt sommative écrasable après rechargement (état React local plutôt que fichier persistant) ; « Mission terminée » définitivement inatteignable après rechargement en cours de mission (initialiseur `useState` paresseux exécuté avant le chargement asynchrone). Corrigés par un recalcul systématique à chaque rendu.
- **Audit post-ÉTAPE 10 (deux épisodes)** : absence de `try/catch` autour du chargement IndexedDB (page blanche) ; `script-src` sans `'unsafe-inline'` bloquant l'hydratation **uniquement en production Vercel**, invisible en `next dev`.
- **ÉTAPE 16** : image d'accueil non compressée (2,8 Mo) dégradant le LCP ; `style-src` sans `'unsafe-inline'` cassant le positionnement de l'image d'accueil **uniquement en production Vercel**, également invisible en `next dev`.

Deux de ces quatre bogues significatifs n'étaient reproductibles que sous les en-têtes de sécurité réels du déploiement, jamais en développement local : chaque correctif a depuis été accompagné d'un test automatique (`test/static-safety.test.ts`) empêchant une régression silencieuse de la CSP.

## 7. Questions encore ouvertes pour l'enseignant

Consignées dans `docs/QUESTIONS_OUVERTES.md`, sans réponse à ce jour :

- paramètres de progression annuelle (`weeklyHours5e`, `effectiveWeeks5e`, `weeklyHours4e`, `effectiveWeeks4e`) : la part exacte de Mission Chantier dans l'année scolaire ne peut pas être calculée tant que ces valeurs ne sont pas fournies ;
- police d'accessibilité dyslexie : solution de repli système actuellement en place (`OpenDyslexic` si présente sur le poste, sinon polices système), aucune police embarquée sous licence libre n'a été fournie ni validée.

Ces deux points n'empêchent pas l'usage de l'application ; ils restent des améliorations possibles, pas des blocages.

## 8. Limites connues et documentées

- JS initial compressé de l'accueil (~874 Ko) au-dessus de la cible idéale de 500 Ko du § 59 ; documenté et décomposé dans `docs/rapports/ETAPE_16.md`, non traité car le § 59 la qualifie explicitement d'« idéale », pas d'un seuil bloquant.
- Firefox non testé par automatisation dans cet environnement d'exécution (échec de compositeur graphique headless, `docs/rapports/ETAPE_16.md` § 7) ; le comportement de repli attendu de Firefox est néanmoins vérifié en forçant la même condition (absence de l'API File System Access) sur Chromium.
- Aucune source institutionnelle officielle sur le projet urbain de Givors n'a été fournie à ce jour : l'ancrage réel repose sur des photographies personnelles vérifiées, pas sur des documents municipaux.

## 9. Conclusion

Les cinq commandes du pipeline (`lint`, `typecheck`, `test`, `test:e2e`, `build`) réussissent. Le déploiement réel a été revérifié directement, sans erreur constatée. Les 25 règles d'`AGENTS.md` ont été confrontées à l'état actuel du dépôt sans écart trouvé. Les points encore ouverts sont documentés et n'empêchent pas l'usage pédagogique de l'application.

---

Fin de l'ÉTAPE 21 — audit final. Fin du parcours d'étapes défini par `docs/SPEC.md` § 65 (ÉTAPE 0 à ÉTAPE 21).

STOP.
