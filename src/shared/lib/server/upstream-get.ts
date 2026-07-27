import https from "node:https";

export interface UpstreamResponse {
  status: number;
  body: string;
}

interface RequestUpstreamGetOptions {
  url: string;
  authorization: string;
  timeoutMessage: string;
}

export function requestUpstreamGet({
  url,
  authorization,
  timeoutMessage,
}: RequestUpstreamGetOptions): Promise<UpstreamResponse> {
  return new Promise((resolve, reject) => {
    const target = new URL(url);

    const upstreamRequest = https.request(
      {
        protocol: target.protocol,
        hostname: target.hostname,
        port: target.port || 443,
        path: `${target.pathname}${target.search}`,
        method: "GET",
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
      upstreamRequest.destroy(new Error(timeoutMessage));
    });

    upstreamRequest.on("error", reject);
    upstreamRequest.end();
  });
}

export function parseUpstreamJson(
  body: string,
  status: number,
  emptyResponseMessage: string,
): unknown {
  if (!body.trim()) {
    return {
      success: false,
      error: {
        code: status,
        httpCode: status,
        message: emptyResponseMessage,
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
