import type { Metadata } from "next";
import { Mission5E01Client } from "@/app/mission/5e-01/Mission5E01Client";

export const metadata: Metadata = { title: "5E-01 · Pourquoi des objets techniques ?" };

export default function Mission5E01Page() {
  return <Mission5E01Client />;
}
