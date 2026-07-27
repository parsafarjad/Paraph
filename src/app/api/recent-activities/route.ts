import { NextRequest, NextResponse } from "next/server";

import {
  parseUpstreamJson,
  requestUpstreamGet,
} from "@/shared/lib/server/upstream-get";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RECENT_ACTIVITIES_URL =
  "https://wholesaler-core-v2.paraf.app/api/recent-activities";

const ALLOWED_QUERY_PARAMETERS = [
  "offset",
  "size",
  "type",
] as const;

function createUpstreamUrl(request: NextRequest) {
  const upstreamUrl = new URL(RECENT_ACTIVITIES_URL);

  for (const parameter of ALLOWED_QUERY_PARAMETERS) {
    const value = request.nextUrl.searchParams.get(parameter);

    if (value !== null && value !== "") {
      upstreamUrl.searchParams.set(parameter, value);
    }
  }

  return upstreamUrl.toString();
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 401,
          httpCode: 401,
          message: "Authorization token is missing.",
        },
      },
      { status: 401 },
    );
  }

  try {
    const upstreamResponse = await requestUpstreamGet({
      url: createUpstreamUrl(request),
      authorization,
      timeoutMessage: "Recent activities request timed out.",
    });

    return NextResponse.json(
      parseUpstreamJson(
        upstreamResponse.body,
        upstreamResponse.status,
        "Recent activities service returned an empty response.",
      ),
      {
        status: upstreamResponse.status,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Recent activities upstream request failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 502,
          httpCode: 502,
          message: "سرویس فعالیت‌های اخیر موقتاً در دسترس نیست.",
        },
      },
      { status: 502 },
    );
  }
}
