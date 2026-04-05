import type { ReqLike, ResLike } from "./_types";
import { getMethod, methodNotAllowed, parseJsonBody, sendJson } from "./_utils";

type Body = { role?: string };

export default function handler(req: ReqLike, res: ResLike) {
  const method = getMethod(req);
  if (method !== "PATCH") return methodNotAllowed(res, ["PATCH"]);

  const body = parseJsonBody<Body>(req);
  const role = body?.role;
  if (!role) return sendJson(res, 400, { error: "Missing role" });

  return sendJson(res, 200, { success: true, role });
}
