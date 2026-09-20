import type { Metadata } from "next";
import { Mission5E03Client } from "@/app/mission/5e-03/Mission5E03Client";

export const metadata: Metadata = { title: "5E-03 · Quel engin pour quelle tâche ?" };

export default function Mission5E03Page() {
  return <Mission5E03Client />;
}
