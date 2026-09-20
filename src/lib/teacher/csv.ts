import { COMPETENCY_IDS } from "@content/competencies";
import { MASTERY_LEVEL_LABELS } from "@content/evaluations";
import { roundToHalfPoint } from "@/lib/evaluations/grade";
import type { StudentSynthesisRow } from "@/lib/teacher/synthesis";

/**
 * Export CSV de la synthèse classe et vue facilitant la saisie Pronote
 * (docs/SPEC.md § 41). Aucune connexion directe à Pronote : un fichier ou un
 * tableau à l’écran que l’enseignant peut recopier ou importer manuellement.
 */

// Délimiteur « ; » (pas de virgule) : la virgule reste le séparateur
// décimal français dans les cellules de note (ex. « 14,5 »).
function escapeCsvField(value: string): string {
  if (/["\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function formatNoteCell(note: number | null): string {
  return note === null ? "" : roundToHalfPoint(note).toString().replace(".", ",");
}

// Colonne séparée plutôt que mélangée à la note : la cellule de note reste
// un nombre exploitable tel quel, sans perdre la mention « Note provisoire »
// (docs/SPEC.md § 27) que l’enseignant doit connaître avant de la reporter.
function formatProvisionalCell(row: StudentSynthesisRow): string {
  if (row.grade.noteOn20 === null) return "";
  return row.grade.provisional ? "Oui" : "Non";
}

export function buildClassSynthesisCsv(rows: readonly StudentSynthesisRow[]): string {
  const header = ["Code", "Classe", ...COMPETENCY_IDS, "Note /20", "Provisoire"];
  const lines = [header.join(";")];

  for (const row of rows) {
    const cells = [
      row.studentCode,
      row.classe,
      ...COMPETENCY_IDS.map((competency) => MASTERY_LEVEL_LABELS[row.mastery[competency]]),
      formatNoteCell(row.grade.noteOn20),
      formatProvisionalCell(row),
    ];
    lines.push(cells.map(escapeCsvField).join(";"));
  }

  return lines.join("\n");
}

export function buildPronoteCsv(rows: readonly StudentSynthesisRow[]): string {
  const header = ["Code", "Note /20", "Provisoire"];
  const lines = [header.join(";")];

  for (const row of rows) {
    lines.push(
      [row.studentCode, formatNoteCell(row.grade.noteOn20), formatProvisionalCell(row)]
        .map(escapeCsvField)
        .join(";"),
    );
  }

  return lines.join("\n");
}
