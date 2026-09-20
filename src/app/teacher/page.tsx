import type { Metadata } from "next";
import { TEACHER_PAGE_TITLE } from "@content/pages/teacher";
import { TeacherPageClient } from "@/components/teacher/TeacherPageClient";

export const metadata: Metadata = { title: TEACHER_PAGE_TITLE };

export default function TeacherPage() {
  return <TeacherPageClient />;
}
