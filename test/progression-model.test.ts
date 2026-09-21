import { describe, expect, it } from "vitest";
import {
  buildStudentFileName,
  createInitialStudentFile,
  findAssessmentSubmission,
  isTraceEcriteConfirmee,
  isWrongFile,
  markMissionCompleted,
  recordAssessmentSubmission,
  recordMissionResponses,
  resolveConflict,
  touchStudentFile,
} from "@/lib/progression/model";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";

describe("modèle de progression", () => {
  it("crée un fichier initial à la révision 0", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    expect(file.revision).toBe(0);
    expect(file.completedMissionIds).toEqual([]);
    expect(file.accommodation).toBe("standard");
  });

  it("incrémente la révision à chaque sauvegarde significative (docs/SPEC.md § 33)", () => {
    const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
    const saved = touchStudentFile(file);
    expect(saved.revision).toBe(1);
    expect(() => new Date(saved.updatedAt).toISOString()).not.toThrow();
  });

  it("détecte un fichier appartenant à un autre code élève (docs/SPEC.md § 35)", () => {
    expect(isWrongFile("4E2-017", "4E2-018")).toBe(true);
    expect(isWrongFile("4E2-017", "4E2-017")).toBe(false);
  });

  it("construit le nom de fichier attendu, y compris la copie .bak", () => {
    expect(buildStudentFileName("4E2-017")).toBe("mission-chantier-4E2-017.mcjson");
    expect(buildStudentFileName("4E2-017", ".bak")).toBe("mission-chantier-4E2-017.mcjson.bak");
  });

  describe("réponses de mission (docs/SPEC.md § 24.1)", () => {
    it("enregistre les réponses d'une mission", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const updated = recordMissionResponses(file, "5E-00", { diagnostic: ["on-demolit"] });
      expect(updated.responses["5E-00"]).toEqual({ diagnostic: ["on-demolit"] });
    });

    it("fusionne avec les réponses déjà présentes pour la même mission", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const step1 = recordMissionResponses(file, "5E-00", { diagnostic: ["on-demolit"] });
      const step2 = recordMissionResponses(step1, "5E-00", { hypotheseEcrite: true });
      expect(step2.responses["5E-00"]).toEqual({ diagnostic: ["on-demolit"], hypotheseEcrite: true });
    });

    it("ne touche pas les réponses d'une autre mission", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const step1 = recordMissionResponses(file, "5E-00", { a: 1 });
      const step2 = recordMissionResponses(step1, "5E-01", { b: 2 });
      expect(step2.responses).toEqual({ "5E-00": { a: 1 }, "5E-01": { b: 2 } });
    });
  });

  describe("dépôt d'évaluation (docs/SPEC.md § 23, § 38)", () => {
    function submission(overrides: Partial<AssessmentSubmission> = {}): AssessmentSubmission {
      return {
        missionId: "5E-04",
        itemId: "choix-engin",
        kind: "summative",
        responses: { choiceId: "pelle" },
        submittedAt: "2026-09-20T10:00:00.000Z",
        status: "pending",
        ...overrides,
      };
    }

    it("ajoute un nouveau dépôt et augmente la révision", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const updated = recordAssessmentSubmission(file, submission());
      expect(updated.assessments).toEqual([submission()]);
      expect(updated.revision).toBe(file.revision + 1);
    });

    it("remplace un dépôt existant pour le même item plutôt que de le dupliquer", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const first = recordAssessmentSubmission(file, submission({ responses: { choiceId: "pelle" } }));
      const second = recordAssessmentSubmission(
        first,
        submission({ responses: { choiceId: "grue" } }),
      );
      expect(second.assessments).toHaveLength(1);
      expect(second.assessments[0]?.responses).toEqual({ choiceId: "grue" });
    });

    it("retrouve un dépôt existant quel que soit son statut, pour éviter un second dépôt après un remontage", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      expect(findAssessmentSubmission(file, "5E-04", "choix-engin")).toBeNull();

      const withPending = recordAssessmentSubmission(file, submission({ status: "pending" }));
      expect(findAssessmentSubmission(withPending, "5E-04", "choix-engin")).not.toBeNull();

      const withCorrected = recordAssessmentSubmission(file, submission({ status: "corrected", score: 0.8 }));
      expect(findAssessmentSubmission(withCorrected, "5E-04", "choix-engin")?.status).toBe("corrected");

      expect(findAssessmentSubmission(withPending, "5E-04", "autre-item")).toBeNull();
    });
  });

  describe("confirmation de la trace écrite (AGENTS.md règle 3)", () => {
    it("détecte l'absence de confirmation pour une mission jamais visitée", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      expect(isTraceEcriteConfirmee(file, "5E-04")).toBe(false);
    });

    it("détecte la confirmation une fois enregistrée, pour survivre à un remontage", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const updated = recordMissionResponses(file, "5E-04", { traceEcriteConfirmee: true });
      expect(isTraceEcriteConfirmee(updated, "5E-04")).toBe(true);
      expect(isTraceEcriteConfirmee(updated, "5E-05")).toBe(false);
    });
  });

  describe("fin de mission (docs/SPEC.md § 33, § 38)", () => {
    it("ajoute la mission aux missions terminées et augmente la révision", () => {
      const file = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });
      const updated = markMissionCompleted(file, "5E-00");
      expect(updated.completedMissionIds).toEqual(["5E-00"]);
      expect(updated.revision).toBe(file.revision + 1);
      expect(updated.currentMissionId).toBeNull();
    });

    it("ne duplique pas une mission déjà marquée terminée", () => {
      const file = { ...createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" }), completedMissionIds: ["5E-00"] };
      const updated = markMissionCompleted(file, "5E-00");
      expect(updated.completedMissionIds).toEqual(["5E-00"]);
    });
  });

  describe("résolution des conflits cache / fichier (docs/SPEC.md § 34)", () => {
    const base = createInitialStudentFile({ studentCode: "4E2-017", classe: "4E2", niveau: "4e" });

    it("absence de cache : le fichier importé est simplement adopté", () => {
      expect(resolveConflict(null, base)).toEqual({ type: "no-cache", incoming: base });
    });

    it("cache et fichier identiques : à jour, aucune action", () => {
      const identical = { ...base };
      expect(resolveConflict(base, identical)).toEqual({ type: "up-to-date", incoming: identical });
    });

    it("fichier plus récent que le cache", () => {
      const cache = base;
      const incoming = touchStudentFile(base);
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "file-newer",
        cache,
        incoming,
      });
    });

    it("cache plus récent que le fichier", () => {
      const cache = touchStudentFile(base);
      const incoming = base;
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "cache-newer",
        cache,
        incoming,
      });
    });

    it("même révision mais contenu différent : divergence, aucune fusion automatique", () => {
      const cache = { ...base, completedMissionIds: ["5E-00"] };
      const incoming = { ...base, completedMissionIds: ["5E-01"] };
      expect(resolveConflict(cache, incoming)).toEqual({
        type: "conflict",
        kind: "diverged",
        cache,
        incoming,
      });
    });

    it("même révision, même contenu dans un ordre de clés différent : reste à jour", () => {
      const incoming = JSON.parse(
        JSON.stringify(base, Object.keys(base).sort()),
      ) as typeof base;
      expect(resolveConflict(base, incoming).type).toBe("up-to-date");
    });
  });
});
