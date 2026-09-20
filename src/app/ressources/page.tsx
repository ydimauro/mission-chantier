import type { Metadata } from "next";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { RESSOURCES_PLACEHOLDER } from "@content/pages/placeholders";

export const metadata: Metadata = { title: RESSOURCES_PLACEHOLDER.title };

export default function RessourcesPage() {
  return (
    <PlaceholderSection
      title={RESSOURCES_PLACEHOLDER.title}
      body={RESSOURCES_PLACEHOLDER.body}
    />
  );
}
