import type { NextConfig } from "next";

/**
 * Application statique, sans backend (docs/ARCHITECTURE.md).
 * Hébergement Vercel décidé le 2026-09-20 (docs/QUESTIONS_OUVERTES.md) :
 * build statique servi tel quel, aucune fonction serverless.
 */
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // AGENTS.md est ici le fichier de règles pédagogiques du projet
  // (AGENTS.md racine, docs/SPEC.md § 63), pas une note d’outillage
  // Next.js : on empêche `next dev` d’y insérer son bloc automatique.
  agentRules: false,
};

export default nextConfig;
