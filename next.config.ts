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
};

export default nextConfig;
