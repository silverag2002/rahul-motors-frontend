import { NextResponse } from "next/server";
import { getCatalog } from "@/lib/catalog";
import { encodeCatalog } from "@/lib/compact";
import { partTypeOf } from "@/lib/names";

// The parts list for search in the browser: every part, cleaned up and packed small.
export const revalidate = 300;

export async function GET() {
  try {
    const catalog = await getCatalog();
    const body = encodeCatalog(catalog, (name) => partTypeOf(name).also);
    return NextResponse.json(body, {
      headers: { "Cache-Control": "public, max-age=120, s-maxage=300, stale-while-revalidate=600" },
    });
  } catch {
    return NextResponse.json({ error: { message: "The parts list could not be loaded right now." } }, { status: 503 });
  }
}
