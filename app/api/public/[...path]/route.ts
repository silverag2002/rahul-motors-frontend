import { NextRequest, NextResponse } from "next/server";

const UPSTREAM_API_URL =
  process.env.RAHUL_MOTORS_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://rahul-motors.capricontechnology.com/api";

async function proxyRequest(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const search = request.nextUrl.search;
  const target = `${UPSTREAM_API_URL.replace(/\/$/, "")}/public/${path.join("/")}${search}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  const isRead = request.method === "GET" || request.method === "HEAD";

  try {
    const contentType = request.headers.get("content-type");
    const upstream = await fetch(target, {
      method: request.method,
      headers: contentType ? { "Content-Type": contentType } : undefined,
      body: isRead ? undefined : await request.text(),
      signal: controller.signal,
      cache: isRead ? "force-cache" : "no-store",
      ...(isRead ? { next: { revalidate: 300 } } : {}),
    });

    const body = await upstream.arrayBuffer();
    return new NextResponse(body, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": isRead ? "public, max-age=60, stale-while-revalidate=300" : "no-store",
      },
    });
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      { error: { message: timedOut ? "The parts service took too long to respond." : "The parts service is temporarily unavailable." } },
      { status: timedOut ? 504 : 502 }
    );
  } finally {
    clearTimeout(timeout);
  }
}

export const GET = proxyRequest;
export const POST = proxyRequest;
