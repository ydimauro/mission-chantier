import type { Metadata } from "next";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { MISSION_PLACEHOLDER } from "@content/pages/placeholders";

export const metadata: Metadata = { title: MISSION_PLACEHOLDER.title };

export default function MissionPage() {
  return (
    <PlaceholderSection title={MISSION_PLACEHOLDER.title} body={MISSION_PLACEHOLDER.body} />
  );
}
