import type { ReqLike, ResLike } from "./_types";

export function sendJson(res: ResLike, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(data));
}

export function getMethod(req: ReqLike): string {
  return (req.method ?? "GET").toUpperCase();
}

export function getQueryParam(req: ReqLike, name: string): string | undefined {
  const raw = req.query?.[name];
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) return raw[0];
  return undefined;
}

export function parseJsonBody<T>(req: ReqLike): T | undefined {
  const body = req.body;
  if (body == null) return undefined;

  if (typeof body === "string") {
    try {
      return JSON.parse(body) as T;
    } catch {
      return undefined;
    }
  }

  // Vercel typically provides req.body as an already-parsed object.
  return body as T;
}

export function methodNotAllowed(res: ResLike, allowed: string[]) {
  res.setHeader("Allow", allowed.join(", "));
  sendJson(res, 405, { error: "Method Not Allowed" });
}
