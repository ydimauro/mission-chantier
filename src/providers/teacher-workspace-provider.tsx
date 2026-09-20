"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { StudentFile, AssessmentAccommodation } from "@/lib/schemas/student-file";
import { migrateStudentFile } from "@/lib/schemas/migrations";
import type { ClassConfig } from "@/lib/schemas/class-config";
import { parseClassConfigJson } from "@/lib/schemas/class-config";
import { parseTeacherKeyJson, type TeacherKey } from "@/lib/schemas/teacher-key";
import { autoCorrectSubmissions, applyHumanScore } from "@/lib/teacher/correction";
import { applyCorrectedSubmissions } from "@/lib/teacher/apply-corrections";
import { applyAccommodation } from "@/lib/teacher/accommodation";
import type { AssessmentSubmission } from "@/lib/schemas/assessment-submission";

/**
 * État de travail de l’espace professeur (ÉTAPE 5, docs/SPEC.md § 41).
 * Volontairement non persisté (aucune écriture IndexedDB) : à chaque
 * ouverture de `/teacher`, l’enseignant réimporte le `.mctkey` et les
 * `.mcjson` du jour, ce qui évite de garder des corrigés en mémoire
 * durable sur un poste potentiellement partagé.
 */

export type ImportSummary = {
  imported: number;
  errors: { fileName: string; message: string }[];
};

type TeacherWorkspaceContextValue = {
  classConfig: ClassConfig | null;
  teacherKey: TeacherKey | null;
  students: StudentFile[];
  setClassConfig: (config: ClassConfig) => void;
  importClassConfig: (raw: string) => { ok: boolean; message?: string };
  importTeacherKey: (raw: string) => { ok: boolean; message?: string };
  importStudentFiles: (files: readonly { name: string; content: string }[]) => ImportSummary;
  removeStudent: (studentCode: string) => void;
  autoCorrectStudent: (studentCode: string) => void;
  autoCorrectAll: () => void;
  gradeSubmission: (studentCode: string, missionId: string, itemId: string, score: number) => void;
  setAccommodationForStudent: (studentCode: string, accommodation: AssessmentAccommodation) => void;
};

const TeacherWorkspaceContext = createContext<TeacherWorkspaceContextValue | null>(null);

export function TeacherWorkspaceProvider({ children }: { children: ReactNode }) {
  const [classConfig, setClassConfigState] = useState<ClassConfig | null>(null);
  const [teacherKey, setTeacherKey] = useState<TeacherKey | null>(null);
  const [students, setStudents] = useState<StudentFile[]>([]);

  const setClassConfig = useCallback((config: ClassConfig) => {
    setClassConfigState(config);
  }, []);

  const importClassConfig = useCallback((raw: string) => {
    const result = parseClassConfigJson(raw);
    if (!result.ok) {
      return { ok: false, message: result.error.type };
    }
    setClassConfigState(result.config);
    return { ok: true };
  }, []);

  const importTeacherKey = useCallback((raw: string) => {
    const result = parseTeacherKeyJson(raw);
    if (!result.ok) {
      return { ok: false, message: result.error.type };
    }
    setTeacherKey(result.key);
    return { ok: true };
  }, []);

  const importStudentFiles = useCallback(
    (files: readonly { name: string; content: string }[]): ImportSummary => {
      const errors: ImportSummary["errors"] = [];
      const newlyImported: StudentFile[] = [];

      for (const file of files) {
        let data: unknown;
        try {
          data = JSON.parse(file.content);
        } catch {
          errors.push({ fileName: file.name, message: "invalid-json" });
          continue;
        }
        const result = migrateStudentFile(data);
        if (!result.ok) {
          errors.push({ fileName: file.name, message: result.error.type });
          continue;
        }
        newlyImported.push(result.file);
      }

      if (newlyImported.length > 0) {
        setStudents((current) => {
          const byCode = new Map(current.map((student) => [student.studentCode, student]));
          for (const student of newlyImported) {
            byCode.set(student.studentCode, student);
          }
          return Array.from(byCode.values());
        });
      }

      return { imported: newlyImported.length, errors };
    },
    [],
  );

  const removeStudent = useCallback((studentCode: string) => {
    setStudents((current) => current.filter((student) => student.studentCode !== studentCode));
  }, []);

  const correctStudent = useCallback(
    (studentCode: string, correctedSubmissions: readonly AssessmentSubmission[], key: TeacherKey) => {
      setStudents((current) =>
        current.map((student) =>
          student.studentCode === studentCode
            ? applyCorrectedSubmissions(student, correctedSubmissions, key)
            : student,
        ),
      );
    },
    [],
  );

  const autoCorrectStudent = useCallback(
    (studentCode: string) => {
      if (!teacherKey) return;
      const student = students.find((candidate) => candidate.studentCode === studentCode);
      if (!student) return;
      const corrected = autoCorrectSubmissions(student.assessments, teacherKey);
      correctStudent(studentCode, corrected, teacherKey);
    },
    [teacherKey, students, correctStudent],
  );

  const autoCorrectAll = useCallback(() => {
    if (!teacherKey) return;
    for (const student of students) {
      const corrected = autoCorrectSubmissions(student.assessments, teacherKey);
      correctStudent(student.studentCode, corrected, teacherKey);
    }
  }, [teacherKey, students, correctStudent]);

  const gradeSubmission = useCallback(
    (studentCode: string, missionId: string, itemId: string, score: number) => {
      if (!teacherKey) return;
      const student = students.find((candidate) => candidate.studentCode === studentCode);
      if (!student) return;
      const updatedSubmissions = student.assessments.map((submission) =>
        submission.missionId === missionId && submission.itemId === itemId
          ? applyHumanScore(submission, score)
          : submission,
      );
      correctStudent(studentCode, updatedSubmissions, teacherKey);
    },
    [teacherKey, students, correctStudent],
  );

  const setAccommodationForStudent = useCallback(
    (studentCode: string, accommodation: AssessmentAccommodation) => {
      setStudents((current) =>
        current.map((student) =>
          student.studentCode === studentCode ? applyAccommodation(student, accommodation) : student,
        ),
      );
    },
    [],
  );

  const value = useMemo<TeacherWorkspaceContextValue>(
    () => ({
      classConfig,
      teacherKey,
      students,
      setClassConfig,
      importClassConfig,
      importTeacherKey,
      importStudentFiles,
      removeStudent,
      autoCorrectStudent,
      autoCorrectAll,
      gradeSubmission,
      setAccommodationForStudent,
    }),
    [
      classConfig,
      teacherKey,
      students,
      setClassConfig,
      importClassConfig,
      importTeacherKey,
      importStudentFiles,
      removeStudent,
      autoCorrectStudent,
      autoCorrectAll,
      gradeSubmission,
      setAccommodationForStudent,
    ],
  );

  return (
    <TeacherWorkspaceContext.Provider value={value}>{children}</TeacherWorkspaceContext.Provider>
  );
}

export function useTeacherWorkspace(): TeacherWorkspaceContextValue {
  const context = useContext(TeacherWorkspaceContext);
  if (!context) {
    throw new Error("useTeacherWorkspace doit être utilisé dans un TeacherWorkspaceProvider.");
  }
  return context;
}
