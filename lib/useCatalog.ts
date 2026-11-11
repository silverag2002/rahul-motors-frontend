"use client";

import { useEffect, useState } from "react";
import { decodeCatalog, type CompactCatalog } from "./compact";
import type { Catalog } from "./types";

// One shared download of the parts list per visit; kept for two minutes so
// moving between pages doesn't fetch it again.
let cached: { at: number; data: Promise<Catalog> } | null = null;

export function loadCatalog(): Promise<Catalog> {
  if (cached && Date.now() - cached.at < 120_000) return cached.data;
  const data = fetch("/api/catalog")
    .then((r) => {
      if (!r.ok) throw new Error("The parts list could not be loaded right now.");
      return r.json() as Promise<CompactCatalog>;
    })
    .then(decodeCatalog);
  cached = { at: Date.now(), data };
  data.catch(() => {
    cached = null;
  });
  return data;
}

export function useCatalog(enabled = true) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    loadCatalog()
      .then((c) => alive && setCatalog(c))
      .catch((e: Error) => alive && setError(e.message));
    return () => {
      alive = false;
    };
  }, [enabled, nonce]);
  return {
    catalog,
    error,
    retry: () => {
      setError(null);
      setNonce((n) => n + 1);
    },
  };
}
