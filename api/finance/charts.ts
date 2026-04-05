import type { ReqLike, ResLike } from "./_types";
import { getMethod, methodNotAllowed, sendJson } from "./_utils";
import { getCharts } from "./_data";

export default function handler(req: ReqLike, res: ResLike) {
  const method = getMethod(req);
  if (method !== "GET") return methodNotAllowed(res, ["GET"]);

  return sendJson(res, 200, getCharts());
}
