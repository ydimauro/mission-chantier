# BILAN ÉTAPE 16 : performance et hors ligne

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 16) : « performance et hors ligne — Tester machine modeste, GPU intégré, réseau coupé, cache, reprise, mise à jour, Edge, Chrome, Firefox. STOP. », avec le budget cible du § 59 et les exigences du § 60.

Toutes les mesures ci-dessous ont été effectuées sur l’export statique réel (`npm run build`, dossier `out/`), servi par un petit serveur HTTP local appliquant exactement les en-têtes `vercel.json`, jamais sur `next dev` — [[feedback_test_csp_with_real_headers]] : un bogue de CSP découvert cette étape (§ 3) ne se serait jamais montré en développement local.

## 1. Mode performance

Déjà livré à l’ÉTAPE 1 (`src/app/globals.css`, sélecteur `html[data-performance="true"]`) : réduit ombres, animations, transitions et effets. Vérifié toujours actif, aucune modification nécessaire.

## 2. Service worker et hors ligne (§ 60)

Nouveaux fichiers : [public/sw.js](../../public/sw.js), [src/components/layout/ServiceWorkerRegistration.tsx](../../src/components/layout/ServiceWorkerRegistration.tsx), enregistrement câblé dans [src/providers/app-providers.tsx](../../src/providers/app-providers.tsx).

Stratégie retenue :

- `/_next/static/...` (fichiers hachés, jamais réécrits sous la même URL) : cache d’abord.
- Tout le reste (pages, manifest, icônes) : réseau d’abord, repli sur le cache si le réseau échoue.
- Enregistrement uniquement en production (`NODE_ENV === "production"`), pour ne jamais interférer avec le rechargement à chaud de `next dev`.
- `CACHE_VERSION` versionné manuellement ; l’ancien cache est entièrement supprimé à l’activation.

Ce choix (réseau d’abord pour le HTML) évite délibérément le piège classique du service worker qui verrouille une ancienne version : l’élève reçoit toujours la dernière version dès qu’une connexion est disponible, sans écran de mise à jour forcée.

**Précaching initial** : au départ, seules `/`, le manifest et l’icône étaient précachées à l’installation. Un test avec Playwright a montré qu’une coupure réseau survenant juste après le tout premier chargement (avant toute navigation) empêchait l’accès à `/mission`, `/carnet`, `/ressources` et `/progression`. Corrigé en précachant ces quatre pages du bandeau de navigation principal dès l’installation (les pages de mission individuelles, trop nombreuses, restent mises en cache à la visite).

### Scénarios vérifiés (Playwright, Chromium, export statique + CSP réelle)

| Scénario | Résultat |
| --- | --- |
| Premier chargement en ligne : enregistrement et activation du service worker | Conforme |
| Rechargement en ligne : le service worker prend le contrôle de la page (`clients.claim()`) | Conforme |
| Coupure réseau puis rechargement de `/` | Conforme, contenu affiché |
| Coupure réseau puis navigation vers `/mission` jamais visitée auparavant | Conforme après ajout du précaching (§ 2) |
| Retour en ligne puis rechargement (reprise) | Conforme |
| Bascule de version (`CACHE_VERSION` v1 → v2, simulant un nouveau déploiement) : ancien cache supprimé, nouveau cache peuplé, aucun blocage sur l’ancienne version | Conforme (vérifié avec deux exports successifs servis l’un après l’autre sur le même port) |

Aucune dépendance réseau n’est nécessaire à l’exécution une fois le premier chargement (et son mode performance) effectué.

## 3. Bogue CSP découvert : image d’accueil mal positionnée en production

En testant l’export statique avec les en-têtes CSP réels de `vercel.json`, une violation `style-src-attr` est apparue à chaque chargement de l’accueil. Investigation :

- `next/image` avec la prop `fill` (utilisée par l’image héros de l’accueil) injecte un attribut `style="position:absolute;height:100%;width:100%;..."` directement dans le HTML.
- `style-src 'self'` (sans `'unsafe-inline'`) bloque cet attribut sous CSP réelle. Confirmé avec l’évènement `securitypolicyviolation` (`violatedDirective: "style-src-attr"`) et avec `getComputedStyle` : `position` retombe à `static` au lieu de `absolute`.
- Conséquence visuelle réelle, capturée par capture d’écran : l’image n’est plus positionnée en arrière-plan, le texte de superposition (« Situation réelle », titre, description, bouton « Commencer ma mission ») est repoussé sous l’image dans un bloc gris séparé au lieu d’être superposé dessus. Le bouton d’appel à l’action sort du cadre visible.

C’est un bogue de production **actuellement actif sur le déploiement réel** (`style-src` sans `'unsafe-inline'` était déjà le cas avant cette étape), jamais visible en `next dev` ni détecté par les audits précédents car aucun n’avait servi l’export avec les en-têtes CSP exacts en ciblant spécifiquement l’accueil après le correctif de l’ÉTAPE 10.

**Correctif** : `style-src 'self'` → `style-src 'self' 'unsafe-inline'` dans [vercel.json](../../vercel.json), même principe que le correctif `script-src` de l’ÉTAPE 10. Seul un composant de tout `src/` utilise un style inline (`src/app/page.tsx`, la prop `fill`) : le périmètre du changement est net. Revérifié par comparaison de capture d’écran avant/après : positionnement, dimensions et absence de violation console conformes.

Un test a été ajouté à [test/static-safety.test.ts](../../test/static-safety.test.ts) pour empêcher une régression silencieuse de cette directive.

## 4. Image d’accueil : optimisation

L’image `public/givors/mission_chantier_givors.png` (photographie réelle, 1844 × 853, 2,8 Mo, PNG non compressé) était servie telle quelle : `next.config.ts` déclare `images: { unoptimized: true }`, requis par l’export statique, donc aucune optimisation automatique de Next.js ne s’applique.

Recompressée en JPEG qualité 82 avec `sharp` (déjà présent en dépendance) : **333 Ko, soit 8,6 fois plus légère**, dimensions et contenu visuel inchangés. Fichier renommé `mission_chantier_givors.jpg`, référence mise à jour dans `content/givors/media.ts`, ancien PNG supprimé, `docs/ANALYSE_SPEC.md` et `docs/QUESTIONS_OUVERTES.md` mis à jour en conséquence.

## 5. Mesures Lighthouse

Effectuées avec Lighthouse 13.5.0 (`npx lighthouse`) contre l’export statique servi avec les en-têtes CSP réels corrigés (§ 3), sur le Chromium mis en cache par Playwright.

| Profil | Score Performance | LCP | TBT | CLS |
| --- | --- | --- | --- | --- |
| Desktop | **97 / 100** | 1,2 s | 0 ms | 0 |
| Mobile, CPU/réseau simulés (préréglage par défaut) | 78 / 100 | 6,1 s | 20 ms | 0 |
| Mobile, throttling réel (`--throttling-method=devtools`) | 75 / 100 | 7,3 s | 80 ms | 0 |

Sur machine correcte (profil desktop), la cible « Lighthouse Performance ≥ 90 » du § 59 est atteinte (97). Sur réseau lent/machine modeste simulés, le score reste sous 90 : décomposition ci-dessous.

### Poids de la page d’accueil (après optimisation de l’image)

| Ressource | Poids transféré |
| --- | --- |
| Total | 1,34 Mo |
| dont image héros | 333 Ko |
| dont JS | 874 Ko |
| Premier chargement hors médias lourds (total − image) | 1,04 Mo |
| Requêtes tierces | 0 |

- **Aucune requête tierce** : conforme au § 59.
- **Premier chargement hors médias lourds : 1,04 Mo**, conforme à la cible « idéalement < 3 Mo ».
- **JS initial compressé : 874 Ko**, au-dessus de la cible « idéalement < 500 Ko » (le § 59 qualifie explicitement cette valeur d’« idéale », pas d’un seuil bloquant). Décomposition : environ 384 Ko sont React 19 + React DOM (coût de base du framework, présent sur toute page), le reste inclut `zod` (validation des schémas de progression/évaluation) et le code applicatif partagé. Réduire ce chiffre demanderait un découpage plus fin du bundle partagé (imports différés par route) : un changement d’architecture qui dépasse le périmètre de cette étape de tests et n’a pas été entrepris. **Point de vigilance pour une étape ultérieure si demandé explicitement.**

### Score mobile/réseau limité sous 90 : cause

La cause dominante n’est pas l’image (déjà optimisée) mais la **contention de bande passante** : sur un réseau lent simulé, l’image (333 Ko) et les neuf fichiers JS (874 Ko) se disputent une bande passante réduite, retardant l’affichage complet. Le budget JS au-dessus de la cible idéale (§ 5) est donc le facteur le plus directement actionnable si ce score doit être amélioré. Ceci reste cohérent avec le texte du § 65 pour cette étape, qui demande de **tester** machine modeste et réseau coupé, pas d’atteindre un score chiffré sur ce profil spécifique.

## 6. Simulations et 30 FPS

Aucune simulation de l’application n’utilise `requestAnimationFrame` ni de rendu canvas/WebGL en boucle continue (vérifié par recherche dans `src/`) : les simulations (hydraulique, capteurs, programmation par blocs) sont des interfaces DOM pilotées par l’état React, mises à jour de façon discrète à chaque interaction (clic, changement de curseur), pas par une boucle d’animation. La notion de FPS ne s’applique donc pas littéralement. L’indicateur pertinent est la réactivité aux interactions, mesurée par le Total Blocking Time des audits Lighthouse (0 ms en desktop, 20 à 80 ms en conditions dégradées) : largement dans la marge d’une interface perçue comme fluide.

## 7. Multi-navigateurs

- **Chromium (proxy Chrome/Edge, même moteur)** : testé en profondeur — chargement, navigation, service worker, hors ligne, reprise, mise à jour de cache, CSP réelle. Conforme sur tous les scénarios listés en § 2.
- **Edge** : non testé avec le binaire Microsoft Edge lui-même (non disponible dans cet environnement) ; le moteur Chromium sous-jacent étant identique, les résultats ci-dessus s’y appliquent avec une confiance élevée mais non vérifiée à l’identique.
- **Firefox** : tentative avec le Firefox mis en cache par Playwright, en mode headless. Échec systématique au lancement (`RenderCompositorSWGL failed mapping default framebuffer`), reproductible avec plusieurs configurations de rendu logiciel forcé : limitation de l’environnement d’exécution sandboxé de cette session (absence d’accélération graphique exploitable), pas un défaut de l’application. **Non vérifié dans cette session** ; à tester manuellement sur un poste réel si une confirmation Firefox est nécessaire.

## 8. Pipeline qualité

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npx vitest run` | 50 fichiers, **288 tests réussis** (nouveau test CSP style-src) |
| `npm run test:e2e` | 1 test réussi |
| `npm run build` | export statique réussi, 36 routes, `out/sw.js` présent |

## 9. Points de vigilance pour la suite

- JS initial compressé (874 Ko) au-dessus de la cible idéale de 500 Ko : décomposé et documenté en § 5, non traité pour rester dans le périmètre « tester » de cette étape.
- Firefox non vérifié par automatisation dans cet environnement (§ 7) : vérification manuelle recommandée si nécessaire.
- Les requêtes de préchargement RSC de Next.js (`__next.<route>.__PAGE__.txt?_rsc=...`) renvoient un 404 sur le serveur de test local ad hoc utilisé pour cette étape ; non confirmé si ce comportement se reproduit sur le déploiement Vercel réel (qui sert l’export différemment). Sans effet observé sur le fonctionnement de l’application : la navigation reste conforme dans tous les scénarios testés.

---

Fin de l’ÉTAPE 16.

Ne pas commencer l’ÉTAPE 17 avant l’instruction exacte : `CONTINUE ÉTAPE 17`.
