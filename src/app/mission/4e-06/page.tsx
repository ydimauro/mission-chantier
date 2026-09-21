import type { Metadata } from "next";
import { Mission4E06Client } from "@/app/mission/4e-06/Mission4E06Client";

export const metadata: Metadata = { title: "4E-06 · Programmer la sécurité" };

export default function Mission4E06Page() {
  return <Mission4E06Client />;
}