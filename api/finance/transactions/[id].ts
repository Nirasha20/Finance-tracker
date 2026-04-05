import type { ReqLike, ResLike, Transaction } from "../_types";
import {
  getMethod,
  getQueryParam,
  methodNotAllowed,
  parseJsonBody,
  sendJson,
} from "../_utils";
import { deleteTransaction, updateTransaction } from "../_data";

type PatchBody = { transaction?: Transaction };

export default function handler(req: ReqLike, res: ResLike) {
  const method = getMethod(req);
  const id = getQueryParam(req, "id");
  if (!id) return sendJson(res, 400, { error: "Missing id" });

  if (method === "PATCH") {
    const body = parseJsonBody<PatchBody>(req);
    const tx = body?.transaction;
    if (!tx) return sendJson(res, 400, { error: "Missing transaction" });

    const ok = updateTransaction(id, tx);
    if (!ok) return sendJson(res, 404, { error: "Not found" });

    return sendJson(res, 200, { success: true as const, transaction: tx });
  }

  if (method === "DELETE") {
    const ok = deleteTransaction(id);
    if (!ok) return sendJson(res, 404, { error: "Not found" });

    return sendJson(res, 200, { success: true as const, id });
  }

  return methodNotAllowed(res, ["PATCH", "DELETE"]);
}
