import type { ReqLike, ResLike, Transaction } from "../_types";
import {
  getMethod,
  methodNotAllowed,
  parseJsonBody,
  sendJson,
} from "../_utils";
import { createTransaction, listTransactions } from "../_data";

type CreateBody = { transaction?: Transaction };

export default function handler(req: ReqLike, res: ResLike) {
  const method = getMethod(req);

  if (method === "GET") {
    return sendJson(res, 200, { transactions: listTransactions() });
  }

  if (method === "POST") {
    const body = parseJsonBody<CreateBody>(req);
    const tx = body?.transaction;
    if (!tx) return sendJson(res, 400, { error: "Missing transaction" });

    createTransaction(tx);
    return sendJson(res, 200, { success: true as const, transaction: tx });
  }

  return methodNotAllowed(res, ["GET", "POST"]);
}
