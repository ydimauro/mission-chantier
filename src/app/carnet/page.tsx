import type { Metadata } from "next";
import { PlaceholderSection } from "@/components/ui/PlaceholderSection";
import { CARNET_PLACEHOLDER } from "@content/pages/placeholders";

export const metadata: Metadata = { title: CARNET_PLACEHOLDER.title };

export default function CarnetPage() {
  return (
    <PlaceholderSection title={CARNET_PLACEHOLDER.title} body={CARNET_PLACEHOLDER.body} />
  );
}
