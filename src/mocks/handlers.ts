// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";
import type { FinanceSummaryResponse } from "../types";

const mockFinanceData: FinanceSummaryResponse = {
  lastUpdated: new Date().toISOString(),
  stats: [
    {
      id: "balance",
      title: "Total Balance",
      amount: 42331.04,
      currency: "$",
      changePercent: 5,
      trend: "up",
      variant: "primary",
    },
    {
      id: "income",
      title: "Total Income",
      amount: 44000.0,
      currency: "$",
      changePercent: 12,
      trend: "up",
      variant: "default",
    },
    {
      id: "expenses",
      title: "Total Expenses",
      amount: 1668.96,
      currency: "$",
      changePercent: 8,
      trend: "down",
      variant: "default",
    },
  ],
};

export const handlers = [
    http.get("/api/finance/summary", async () => {
    // Simulate network delay (500ms) so you can see loading state
    await new Promise((resolve) => setTimeout(resolve, 800));

    return HttpResponse.json(mockFinanceData);
  }),

  // PATCH /api/finance/role  →  simulates updating the user role
  http.patch("/api/finance/role", async ({ request }) => {
    const body = await request.json() as { role: string };
    return HttpResponse.json({ success: true, role: body.role });
  }),
];