import type { Metadata } from "next";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { PROGRESSION_PLACEHOLDER } from "@content/pages/placeholders";

export const metadata: Metadata = { title: PROGRESSION_PLACEHOLDER.title };

export default function ProgressionPage() {
  return (
    <PlaceholderSection
      title={PROGRESSION_PLACEHOLDER.title}
      body={PROGRESSION_PLACEHOLDER.body}
    />
  );
}
