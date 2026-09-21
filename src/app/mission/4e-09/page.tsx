import type { Metadata } from "next";
import { Mission4E09Client } from "@/app/mission/4e-09/Mission4E09Client";
export const metadata: Metadata = { title: "4E-09 · Performance et environnement" };
export default function Mission4E09Page() { return <Mission4E09Client />; }