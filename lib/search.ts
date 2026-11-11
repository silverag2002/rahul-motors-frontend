import type { Part } from "./types";

// Search runs on the full parts list (in the browser, or on the server for the
// first render). Every word typed must match somewhere: part type, car model,
// maker or part number. Common shop spellings are folded together first.

const FOLD: [RegExp, string][] = [
  [/\bbreak\b/g, "brake"],
  [/\bsenser\b/g, "sensor"],
  [/\bigniation\b/g, "ignition"],
  [/\bthotel\b/g, "throttle"],
  [/\bribben\b/g, "ribbon"],
  [/\bcondensor\b/g, "condenser"],
  [/\bpully\b/g, "pulley"],
  [/\bvacum\b/g, "vacuum"],
  [/\bsieries\b/g, "series"],
  [/\bassy\b/g, "assembly"],
  [/\bdsl\b/g, "diesel"],
  [/\bhead ?light\b/g, "headlight"],
  [/\bpw\b/g, "power window"],
  [/\bmaruthi\b/g, "maruti"],
  [/\bhundai\b/g, "hyundai"],
  [/\bvw\b/g, "volkswagen"],
];

/** Lower-case, punctuation-free, with known misspellings folded. "I-10" and "i10" both become "i10". */
export function normalise(text: string): string {
  let s = ` ${text.toLowerCase()} `
    .replace(/[“”"']/g, " ")
    .replace(/\b([a-z])[-. ]+(\d)/g, "$1$2")
    .replace(/[^a-z0-9/+]+/g, " ");
  for (const [from, to] of FOLD) s = s.replace(from, to);
  return s.replace(/\s+/g, " ").trim();
}

export function tokens(query: string): string[] {
  return normalise(query)
    .split(" ")
    .filter((t) => t.length > 1 || /\d/.test(t));
}

/** Higher is better; 0 means no match. */
export function score(part: Part, terms: string[]): number {
  if (!terms.length) return 1;
  let total = 0;
  const name = ` ${normalise(part.name)} `;
  for (const term of terms) {
    if (!part.words.includes(term)) {
      // A bare number can also be the part's id on its label.
      if (/^\d+$/.test(term) && String(part.id) === term) {
        total += 50;
        continue;
      }
      return 0;
    }
    total += 1;
    if (name.includes(` ${term} `)) total += 4;
    else if (name.includes(` ${term}`)) total += 2;
    if (part.words.startsWith(term)) total += 1;
  }
  return total;
}

export function searchParts(parts: Part[], query: string): Part[] {
  const terms = tokens(query);
  if (!terms.length) return parts;
  return parts
    .map((part) => ({ part, s: score(part, terms) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.part);
}

export interface Filters {
  q?: string;
  type?: string;
  maker?: string;
  photo?: boolean;
}

export function filterParts(parts: Part[], f: Filters): Part[] {
  let list = parts;
  if (f.type) list = list.filter((p) => p.typeSlug === f.type);
  if (f.maker) list = list.filter((p) => p.makerSlug === f.maker);
  if (f.photo) list = list.filter((p) => p.photo);
  if (f.q) list = searchParts(list, f.q);
  else list = [...list].sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
  return list;
}
