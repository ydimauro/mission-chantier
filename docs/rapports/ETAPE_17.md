# BILAN ÉTAPE 17 : RGPD et sécurité

Périmètre : `docs/SPEC.md` § 39, § 61, § 62, § 64 et § 65 (ÉTAPE 17) : audit des requêtes, permissions, stockages, journaux, dépendances et données.

## 1. Résultat global

L’application respecte son principe de confidentialité : aucune donnée élève n’est envoyée vers Internet. L’export reste entièrement statique, sans backend, base distante, compte élève, analytics, publicité, télémétrie ou service tiers d’exécution.

Deux renforcements ont été appliqués :

- en-têtes de confidentialité et d’isolation supplémentaires dans `vercel.json` ;
- tests automatiques couvrant l’effacement RGPD complet et l’absence d’API réseau ou de permissions sensibles interdites.

## 2. Requêtes réseau

L’analyse de `src/`, `content/`, `public/sw.js` et de l’export `out/` ne trouve aucun appel applicatif à une API distante, aucun `XMLHttpRequest`, WebSocket, EventSource, `sendBeacon`, SDK d’analytics ou service cloud.

Les seuls appels `fetch` sont dans le service worker. Ils sont limités aux requêtes `GET` dont l’origine correspond strictement à `self.location.origin`. Les requêtes tierces sont ignorées et ne sont jamais mises en cache.

Les URL absolues présentes dans les bundles compilés correspondent à des messages d’erreur internes React/Next, des mentions de licence, des valeurs de test de bibliothèques et des espaces de noms XML. Elles ne constituent pas des dépendances d’exécution ni des requêtes déclenchées par Mission Chantier.

## 3. Permissions

Aucun usage de webcam, microphone, géolocalisation, notifications, capteurs de mouvement, Bluetooth, USB ou port série n’est présent dans le code applicatif.

`Permissions-Policy` interdit explicitement caméra, microphone, géolocalisation, paiement, USB, MIDI, magnétomètre, gyroscope et accéléromètre. L’accès au système de fichiers est limité à `showDirectoryPicker`, déclenché volontairement par l’utilisateur pour enregistrer sa progression ; il ne donne accès qu’au dossier choisi.

## 4. Stockage et effacement

Données locales identifiées :

- `localStorage` : préférences d’affichage, niveau et code élève actif, sous le préfixe `mission-chantier:` ;
- IndexedDB : fichiers de progression et poignées de dossiers choisies ;
- Cache Storage : ressources statiques du service worker, sans donnée élève ;
- fichiers `.mcjson` et `.bak` : écrits uniquement à la demande dans un dossier choisi ou téléchargés volontairement.

`eraseAllLocalData()` efface toutes les clés `localStorage` appartenant à Mission Chantier, toutes les progressions IndexedDB et toutes les poignées de dossiers. Il conserve les données appartenant à d’autres applications et ne prétend pas supprimer les fichiers déjà exportés. Un nouveau test automatique vérifie ces quatre propriétés.

## 5. Journaux

Aucun journal distant ni outil de télémétrie n’est configuré. Les quatre `console.error` présents signalent uniquement des erreurs techniques locales de chargement, de création de progression ou d’enregistrement du service worker. Aucun contenu de réponse, code élève ou fichier de progression n’est écrit explicitement dans les journaux.

## 6. Données et fichiers réservés

L’application utilise un code élève pseudonymisé. Aucun nom, prénom, email, diagnostic médical ou motif d’aménagement n’est prévu par les schémas.

Contrôle de l’export `out/` : aucun fichier `.mctkey`, `.mcjson`, `.mcconfig`, `.pem`, `.key`, `.env` ni dossier `teacher-data`. Git ne suit que `teacher-data/README.md` dans l’espace réservé enseignant ; `.env*`, les clés, les sources locales Givors et les données enseignant sont ignorés.

## 7. Dépendances

Dépendances directes de production : `fflate`, `next`, `react`, `react-dom` et `zod`. Elles sont verrouillées dans `package-lock.json`. Aucun SDK de suivi, d’authentification, de base distante ou de publicité n’est installé.

`npm audit --omit=dev` n’a pas été exécuté : l’approbation automatique a refusé la transmission de la liste des dépendances au registre npm. L’arbre local installé a été inspecté hors réseau ; ce contrôle ne remplace pas une base publique d’avis de sécurité à jour.

## 8. En-têtes de sécurité Vercel

En-têtes conservés ou renforcés :

- `X-Content-Type-Options: nosniff` ;
- `X-Frame-Options: DENY` et `frame-ancestors 'none'` ;
- `Referrer-Policy: no-referrer` ;
- `Cross-Origin-Opener-Policy: same-origin` ;
- `Cross-Origin-Resource-Policy: same-origin` ;
- `X-Permitted-Cross-Domain-Policies: none` ;
- CSP limitée à l’origine locale, avec objets interdits et connexions limitées à `self`.

Limite documentée : `script-src 'unsafe-inline'` reste requis par l’hydratation de l’export statique Next.js et `style-src 'unsafe-inline'` par le positionnement généré avec `next/image`. Les retirer casse l’application ou sa mise en page, comme vérifié à l’ÉTAPE 16. Les autres directives réduisent l’exposition : aucune origine distante n’est autorisée, les objets et l’encadrement sont interdits.

## 9. Tests et build

| Vérification | Résultat |
| --- | --- |
| `npm run typecheck` | réussi |
| `npm run lint` | réussi |
| `npm test` | 51 fichiers, 291 tests réussis |
| Tests RGPD/sécurité ciblés | 9 tests réussis |
| `npm run build` | réussi, 36 routes statiques |
| Export sensible | aucun artefact sensible trouvé |
| Services interdits dans `out/` | aucun trouvé |

## 10. Conclusion

Aucun écart RGPD bloquant ni transmission de donnée élève n’a été détecté. Les protections supplémentaires et les tests de non-régression sont en place. La consultation d’une base de vulnérabilités à jour reste le seul contrôle non effectué, faute d’autorisation de transmettre les métadonnées de dépendances au registre npm.

---

Fin de l’ÉTAPE 17.

Ne pas commencer l’ÉTAPE 18 avant l’instruction exacte : `CONTINUE ÉTAPE 18`.