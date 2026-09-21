import type { Metadata } from "next";
import { Mission4E08Client } from "@/app/mission/4e-08/Mission4E08Client";
export const metadata: Metadata = { title: "4E-08 · Protocole de test" };
export default function Mission4E08Page() { return <Mission4E08Client />; }