# Données réservées à l’enseignant

Ce dossier est destiné aux éléments qui ne doivent jamais être intégrés au build élève ni versionnés dans un dépôt public, notamment :

- fichiers de correction `.mctkey` ;
- barèmes détaillés réservés à l’enseignant ;
- éventuelles données locales de correction de classe.

Le contenu de ce dossier doit être ignoré par Git, sauf ce README.

Le format d’un fichier `.mctkey` est défini dans `src/lib/schemas/teacher-key.ts` (ÉTAPE 4). Ce schéma n’est jamais importé par une page ou un composant élève (vérifié automatiquement par `test/static-safety.test.ts`).
