import type { Metadata } from "next";
import { ResourcesClient } from "@/components/resources/ResourcesClient";

export const metadata: Metadata = { title: "Ressources" };

export default function RessourcesPage() {
  return <ResourcesClient />;
}
