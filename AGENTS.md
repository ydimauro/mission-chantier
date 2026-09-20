# AGENTS.md - Règles permanentes Mission Chantier

Lire et appliquer ce fichier avant toute action.

1. Travailler sur une seule étape à la fois. Ne jamais commencer l’étape suivante sans l’instruction explicite `CONTINUE ÉTAPE N`.
2. Une mission pédagogique obligatoire doit être réalisable en 45 minutes maximum par l’élève le plus lent. Cible : 40 à 43 minutes pour un élève fragile.
3. L’application ne remplace jamais le cahier papier. Chaque mission obligatoire comporte une trace écrite explicite.
4. Aucune donnée élève n’est transmise sur Internet. Elle reste sur le poste, sur le réseau de l’établissement ou dans les fichiers enregistrés volontairement.
5. Les faits concernant Givors proviennent uniquement de `docs/sources/givors/`. Ne jamais inventer une donnée réelle manquante.
6. « Givors » = situation réelle. « Quartier des Ateliers » = simulation pédagogique fictive. La distinction doit toujours être visible.
7. Le ton concernant le projet urbain de Givors reste descriptif et neutre. Attribuer les objectifs institutionnels à leur source : « Selon la Ville de Givors… ».
8. Les contenus pédagogiques sont séparés du code applicatif.
9. Une compétence réellement évaluée doit reposer sur plusieurs preuves, dans plusieurs contextes lorsque cela est pertinent.
10. Le formatif peut être corrigé immédiatement côté élève. Les sommatives intermédiaires et finales sont corrigées dans `/teacher` à l’aide d’un fichier enseignant `.mctkey` séparé.
11. Aucun corrigé sommative exploitable ne doit être intégré au build élève.
12. Les fichiers élèves `.mcjson`, les fichiers classe `.mcconfig` et les corrigés enseignant `.mctkey` ont des rôles distincts.
13. Les aménagements individuels ne doivent jamais apparaître dans un fichier collectif `.mcconfig` et ne doivent contenir aucun motif médical.
14. Toute progression utilise `schemaVersion`, `revision` et `updatedAt`. Ne jamais écraser silencieusement un fichier ou un cache plus récent. Ne jamais fusionner automatiquement deux versions divergentes.
15. Sauvegarder avant d’autoriser « Mission terminée ». Adapter la confirmation selon le navigateur.
16. Priorité à la compréhension d’un élève fragile de REP : une consigne = une action principale, charge cognitive réduite, aides progressives.
17. Toutes les fonctionnalités pédagogiques essentielles fonctionnent sans son.
18. Accessibilité minimale : clavier, focus visible, contrastes suffisants, zoom 125 % et 150 %, écran 1366 × 768, mode vidéoprojecteur, réduction des animations.
19. Utiliser des apostrophes courbes ’, des guillemets français « … » et aucun tiret cadratin dans les textes français destinés aux élèves ou au professeur.
20. Toute donnée technique présentée comme réaliste doit être sourcée. Sinon indiquer « Valeur pédagogique fictive ».
21. Ne pas utiliser de service tiers à l’exécution : pas de Supabase, Firebase, analytics, trackers, publicité, CDN obligatoire, API externe, Google Fonts ou authentification cloud.
22. Ne jamais utiliser une technologie 3D uniquement pour l’effet visuel. Préférer 2D ou 2,5D si cela suffit pédagogiquement.
23. Chaque étape se termine par les tests pertinents, la mise à jour documentaire, un rapport `docs/rapports/ETAPE_XX.md`, puis STOP.
24. Toute décision importante non résolue doit être documentée dans `docs/QUESTIONS_OUVERTES.md` avec problème, options, recommandation et conséquences.
25. `docs/SPEC.md` est la référence contractuelle détaillée. En cas de doute, le lire avant de décider.
