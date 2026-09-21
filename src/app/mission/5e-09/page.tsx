import type { Metadata } from "next";
import { Mission5E09Client } from "@/app/mission/5e-09/Mission5E09Client";

export const metadata: Metadata = { title: "5E-09 · L’engin peut-il détecter un obstacle ?" };

export default function Mission5E09Page() {
  return <Mission5E09Client />;
}
