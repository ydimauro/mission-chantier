/**
 * Service worker de Mission Chantier (docs/SPEC.md § 60, ÉTAPE 16).
 *
 * Stratégie volontairement simple, pensée pour un export statique Next.js
 * (`output: "export"`, fichiers JS/CSS à nom haché immuables) :
 *
 * - `/_next/static/...` (haché, jamais réécrit sous la même URL) : cache
 *   d'abord, jamais de nouvelle requête réseau une fois en cache.
 * - Tout le reste (pages HTML, manifest, icônes) : réseau d'abord, avec
 *   repli sur le cache si la requête réseau échoue (hors ligne).
 *
 * Ce choix évite le piège classique du service worker qui « bloque » une
 * ancienne version : comme chaque page HTML est toujours redemandée en
 * priorité au réseau, l’élève reçoit automatiquement la dernière version
 * dès qu’une connexion est disponible, sans écran « nouvelle version
 * disponible » ni rechargement forcé.
 *
 * Numéro de version à incrémenter manuellement à chaque changement
 * notable du service worker ou de la stratégie de cache : l’ancien cache
 * est alors entièrement supprimé à l’activation, ce qui évite tout mélange
 * entre anciens et nouveaux fichiers hachés.
 */
const CACHE_VERSION = "v1";
const CACHE_NAME = `mission-chantier-${CACHE_VERSION}`;

// Pages du bandeau de navigation principal (docs/rapports/ETAPE_16.md) : mises
// en cache dès l'installation pour qu'une coupure réseau survenant avant même
// la première visite de ces pages n'empêche pas d'y accéder. Les pages de
// mission individuelles (une par mission, nombreuses) restent mises en cache
// à la visite via `networkFirst`, pas précachées ici.
const CORE_ASSETS = [
  "/",
  "/mission",
  "/carnet",
  "/ressources",
  "/progression",
  "/manifest.webmanifest",
  "/favicon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Seules les requêtes GET de même origine sont prises en charge : jamais
  // de mise en cache d’une requête vers un service tiers (AGENTS.md règle 21).
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) return cached;
    throw error;
  }
}
