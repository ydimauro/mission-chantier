# RGPD et confidentialité

## 1. Principe de référence

« Aucune donnée élève n’est transmise sur Internet. Elle reste sur le poste, sur le réseau de l’établissement ou dans les fichiers enregistrés volontairement. »

Ce principe s’applique quel que soit l’hébergeur (Vercel sert uniquement les fichiers statiques de l’application ; aucune donnée élève ne transite par Vercel ni par aucun service tiers).

## 2. Interdictions strictes

- Supabase, Firebase, toute base de données distante ;
- Google Analytics ou tout autre outil d’analytics tiers ;
- trackers, publicité, cookies marketing ;
- authentification cloud, compte élève, email élève ;
- synchronisation distante, télémétrie personnelle, fingerprinting ;
- webcam, microphone, géolocalisation.

## 3. Identifiant élève

Identifiant pseudonymisé de la forme `4E2-017` (classe + numéro). La correspondance avec l’identité réelle de l’élève reste entièrement hors application (registre papier ou fichier tenu par l’enseignant en dehors du système). L’application ne connaît jamais le nom, prénom ou toute autre donnée d’identification directe de l’élève.

## 4. Données réellement stockées

Dans `.mcjson` (fichier élève, portable) :

- `schemaVersion`, `revision`, `updatedAt` ;
- `studentCode` (identifiant pseudonymisé) ;
- classe, niveau ;
- mission courante, missions terminées ;
- réponses, choix, valeurs de simulation, programme produit ;
- résultats corrigés une fois réinjectés par l’enseignant ;
- preuves de compétences ;
- paramètres individuels non sensibles (`assessmentAccommodation: standard | reduced | split`, usage éventuel de la lecture à voix haute, usage éventuel de la fiche de cours aménagée sans motif enregistré) ;
- indicateurs pédagogiques non sensibles (usage des indices formatifs).

Ce qui n’est **jamais** stocké : diagnostic médical, PAP, PPS, information de santé, justification médicale, motif d’usage d’un aménagement ou d’une fiche aménagée, nom ou prénom réel.

Emplacement technique : IndexedDB comme cache local de travail, fichier `.mcjson` comme support portable principal (voir `docs/SAUVEGARDE.md`).

## 5. Page `/privacy`

Une page `/privacy` accessible depuis l’application, rédigée dans un langage compréhensible par un collégien, explique :

- quelles données sont stockées (liste simplifiée de la § 4) ;
- où elles sont stockées (ce poste, éventuellement le réseau de l’établissement, ou un fichier que l’élève enregistre lui-même) ;
- comment les exporter (le fichier `.mcjson`) ;
- comment les supprimer (bouton « Effacer mes données locales », avec confirmation explicite avant suppression définitive) ;
- l’absence totale de transmission sur Internet.

Exemple de formulation de référence à reprendre sur cette page : « Aucune donnée élève n’est transmise sur Internet. Elle reste sur le poste, sur le réseau de l’établissement ou dans les fichiers enregistrés volontairement. »

## 6. `.mcconfig` (fichier classe)

Contient uniquement des paramètres collectifs (classe, niveau, durée standard, missions activées, politique de correction, autres réglages communs non sensibles). Ne contient jamais de liste d’élèves aménagés, de donnée médicale, ni d’information individuelle sensible : le schéma (`src/lib/schemas/class-config.ts`, ÉTAPE 5) ne définit tout simplement aucun champ de ce type. Un test automatique dédié vérifie cette règle (`docs/SPEC.md` § 64, test n° 24).

## 7. `.mctkey` (fichier enseignant)

Contient corrigés, barèmes, règles de correction, correspondance des variantes, éléments nécessaires au calcul automatique. N’est jamais transmis aux élèves, jamais intégré au build public, jamais versionné dans Git (voir `.gitignore` à maintenir dès l’ÉTAPE 2), reste dans `teacher-data/` ou un emplacement local réservé à l’enseignant. Un test automatique dédié est prévu dès l’ÉTAPE 4 pour vérifier qu’aucun corrigé sommatif complet n’est exposé dans le build élève (`docs/SPEC.md` § 64, test n° 25).

## 8. Aménagements individuels et confidentialité

Champ unique autorisé : `assessmentAccommodation: "standard" | "reduced" | "split"`. Aucun motif médical n’est jamais saisi ni conservé. Ce champ ne figure jamais dans `.mcconfig` (fichier collectif) ; il vit uniquement dans le `.mcjson` de l’élève concerné ou est appliqué temporairement sur le poste avant l’évaluation.

## 9. Effacement des données

Bouton « Effacer mes données locales » disponible depuis l’application (page `/privacy` ou espace « Ma progression »), avec une confirmation explicite avant suppression définitive du cache IndexedDB local. L’effacement du cache local n’efface pas un fichier `.mcjson` déjà exporté par l’élève sur un support externe (clé USB, dossier personnel) : ce fichier reste sous la responsabilité de l’élève et de sa famille.

## 10. Sécurité web complémentaire

- désactivation des permissions inutiles (caméra, microphone, géolocalisation, notifications, capteurs inutiles) ;
- `Permissions-Policy` et CSP stricte configurées pour Vercel (voir `docs/ARCHITECTURE.md` § 6) ;
- aucune dépendance réseau obligatoire à l’exécution (voir `docs/ARCHITECTURE.md` § 7).
