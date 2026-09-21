# BILAN ÉTAPE 15 : accessibilité et REP

Périmètre : `docs/SPEC.md` § 65 (ÉTAPE 15) : « Audit écran par écran : consignes, autonomie, charge cognitive, clavier, contraste, zoom, 1366 × 768, vidéoprojecteur, faible lecteur, faible attention. STOP. »

## 1. Correctif d’accueil

L’accueil précédent était un écran centré de type placeholder. Il ne donnait pas le repère visuel demandé pour entrer dans le parcours et faisait peu apparaître la distinction entre le réel et les simulations.

Il présente désormais :

- la photographie réelle autorisée du chantier de Givors, avec son texte alternatif ;
- le repère textuel et iconographique « Situation réelle » ;
- un titre et une consigne d’entrée courts ;
- un seul appel à l’action « Commencer ma mission » ;
- trois repères ordonnés, « Observer », « Comprendre » et « Écrire », pour réduire la charge cognitive.

L’image d’accueil utilise `loading="eager"`, car elle est au-dessus de la ligne de flottaison. Aucun média externe ni nouvelle donnée sur Givors n’est introduit.

## 2. Audit écran par écran

| Écran | Consigne et autonomie | Contrôles vérifiés | Résultat |
| --- | --- | --- | --- |
| Accueil | Une entrée vers la mission et trois repères courts | Clavier, 1366 × 768, 150 %, vidéoprojecteur | Conforme, aucun débordement horizontal |
| 5E-00 | Observation réelle, diagnostic court, trace écrite | 150 %, repli | Conforme, contenu principal visible |
| 4E-08 | Essais unitaires, protocole et seuil | 150 %, repli | Conforme, contenu principal visible |
| 4E-FINAL | Quatre volets séparés, trace écrite | 150 %, repli | Conforme, contenu principal visible |

Les activités formatives restent corrigées immédiatement avec aides progressives. Les sommatives restent sans aide ni correction côté élève. Les contrôles natifs, menus déroulants, boutons et zones de saisie sont utilisables au clavier.

## 3. Accessibilité vérifiée

- Le premier tabulation atteint le lien « Aller au contenu principal », visible au focus.
- Le focus visible est globalement défini par `:focus-visible`.
- Les modes texte 125 % et 150 %, la police adaptée, le mode vidéoprojecteur et la réduction des animations restent disponibles depuis le pied de page.
- À 1366 × 768, à 150 % et en mode vidéoprojecteur, l’accueil ne déborde pas horizontalement et son appel à l’action reste visible.
- Les écrans 5E-00, 4E-08 et 4E-FINAL ne débordent pas horizontalement à la même échelle.
- La distinction « Situation réelle » et « Simulation pédagogique » reste textuelle, iconographique et colorée, jamais seulement colorée.

## 4. REP et charge cognitive

- Une consigne principale est présentée à la fois dans les missions.
- Les prérequis sont rendus visibles par des boutons désactivés ou des messages explicites.
- La trace écrite est toujours séparée de l’écran et explicitement demandée.
- Les missions à plusieurs volets conservent des sections successives clairement titrées.
- Le fonctionnement essentiel ne dépend ni du son ni d’une animation.

## 5. Tests

Le test [home-page.test.tsx](../../test/home-page.test.tsx) vérifie le titre, le repère de situation réelle, le lien de démarrage et le texte alternatif de l’image.

| Vérification | Résultat |
| --- | --- |
| `npm run lint` | réussi |
| `npm run typecheck` | réussi |
| `npm run test` | 49 fichiers, 287 tests réussis |
| `npm run test:e2e` | 1 test réussi |
| `npm run build` | export statique réussi, 36 routes |

Playwright signale l’avertissement connu de Next.js sur `scroll-behavior: smooth` pendant les transitions de test. Il ne signale aucune erreur applicative et n’empêche pas l’E2E de réussir.

---

Fin de l’ÉTAPE 15.

Ne pas commencer l’ÉTAPE 16 avant l’instruction exacte : `CONTINUE ÉTAPE 16`.