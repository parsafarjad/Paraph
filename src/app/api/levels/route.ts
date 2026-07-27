// import { NextRequest, NextResponse } from "next/server";

// const LEVELS_URL =
//   "https://wholesaler-core-v2.paraf.app/api/levels";

// export async function GET(request: NextRequest) {
//   const authorization =
//     request.headers.get("authorization");

//   if (!authorization) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           message: "Authorization token is missing.",
//         },
//       },
//       { status: 401 },
//     );
//   }

//   try {
//     const upstreamResponse = await fetch(LEVELS_URL, {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: authorization,
//       },
//       cache: "no-store",
//     });

//     const responseBody: unknown =
//       await upstreamResponse.json();

//     return NextResponse.json(responseBody, {
//       status: upstreamResponse.status,
//     });
//   } catch {
//     return NextResponse.json(
//       {
//         success: false,
//         error: {
//           message: "Levels service is unavailable.",
//         },
//       },
//       { status: 502 },
//     );
//   }
// }

import https from "node:https";

import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LEVELS_URL = "https://wholesaler-core-v2.paraf.app/api/levels";

interface UpstreamResponse {
  status: number;
  body: string;
}

function requestLevels(authorization: string): Promise<UpstreamResponse> {
  return new Promise((resolve, reject) => {
    const url = new URL(LEVELS_URL);

    const upstreamRequest = https.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || 443,
        path: `${url.pathname}${url.search}`,
        method: "GET",

        // Do not forward browser headers.
        headers: {
          accept: "application/json",
          authorization,
        },
      },
      (upstreamResponse) => {
        const chunks: Buffer[] = [];

        upstreamResponse.on("data", (chunk: Buffer) => {
          chunks.push(chunk);
        });

        upstreamResponse.on("end", () => {
          resolve({
            status: upstreamResponse.statusCode ?? 502,
            body: Buffer.concat(chunks).toString("utf8"),
          });
        });
      },
    );

    upstreamRequest.setTimeout(20_000, () => {
      upstreamRequest.destroy(new Error("Levels request timed out."));
    });

    upstreamRequest.on("error", reject);

    // GET request without a body.
    upstreamRequest.end();
  });
}

function parseResponseBody(body: string, status: number): unknown {
  if (!body.trim()) {
    return {
      success: false,
      error: {
        code: status,
        httpCode: status,
        message: "Levels service returned an empty response.",
      },
    };
  }

  try {
    return JSON.parse(body) as unknown;
  } catch {
    return {
      success: false,
      error: {
        code: status,
        httpCode: status,
        message: body,
      },
    };
  }
}

export async function GET(request: Request) {
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
      {
        status: 401,
      },
    );
  }

  try {
    const upstreamResponse = await requestLevels(authorization);

    return NextResponse.json(
      parseResponseBody(upstreamResponse.body, upstreamResponse.status),
      {
        status: upstreamResponse.status,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Levels upstream request failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: {
          code: 502,
          httpCode: 502,
          message: "سرویس سطح‌ها موقتاً در دسترس نیست.",
        },
      },
      {
        status: 502,
      },
    );
  }
}
