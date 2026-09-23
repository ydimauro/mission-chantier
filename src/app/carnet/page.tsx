import type { Metadata } from "next";
import { CoursePageClient } from "@/components/course/CoursePageClient";

export const metadata: Metadata = { title: "Mon cours" };

export default function CoursePage() {
  return <CoursePageClient />;
}
