import type { Metadata } from "next";
import { PROGRESSION_PAGE_TITLE } from "@content/pages/progression";
import { ProgressionPageClient } from "@/components/progression/ProgressionPageClient";

export const metadata: Metadata = { title: PROGRESSION_PAGE_TITLE };

export default function ProgressionPage() {
  return <ProgressionPageClient />;
}
