/**
 * Déclenche le téléchargement d’un fichier texte côté navigateur, sans
 * dépendance externe. Utilisé pour l’export .mcjson (docs/SAUVEGARDE.md § 4,
 * repli Firefox et export manuel universel).
 */
export function triggerTextDownload(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
