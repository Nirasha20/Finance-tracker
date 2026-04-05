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

  // src/mocks/handlers.ts — ADD this inside the handlers array

http.get("/api/finance/charts", async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return HttpResponse.json({
    balanceTrend: [
      { date: "2024-01-01", balance: 2000 },
      { date: "2024-02-01", balance: 8500 },
      { date: "2024-03-01", balance: 14000 },
      { date: "2024-04-01", balance: 19500 },
      { date: "2024-05-01", balance: 27000 },
      { date: "2024-06-01", balance: 31000 },
      { date: "2024-07-01", balance: 38000 },
      { date: "2024-08-01", balance: 42331 },
    ],
    spendingBreakdown: [
      { name: "Shopping",      amount: 480.00, color: "#3b82f6" },
      { name: "Food & Dining", amount: 387.98, color: "#ef4444" },
      { name: "Entertainment", amount: 340.98, color: "#10b981" },
      { name: "Transportation",amount: 270.00, color: "#f59e0b" },
      { name: "Utilities",     amount: 190.00, color: "#8b5cf6" },
    ],
  });

  
}),

http.get("/api/finance/insights", async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return HttpResponse.json({
    insights: [
      {
        id: "top-category",
        label: "TOP CATEGORY",
        title: "Shopping",
        value: "$480.00",
        subtitle: "28.8% of total spending",
        icon: "bolt",
        accentColor: "#3b82f6",
        bgColor: "#eff6ff",
        borderColor: "#dbeafe",
      },
      {
        id: "monthly-change",
        label: "MONTHLY CHANGE",
        title: "This Month",
        value: "$1,668.96",
        subtitle: "+12% vs last month",
        subtitleColor: "#16a34a",
        icon: "trend-up",
        accentColor: "#16a34a",
        bgColor: "#f0fdf4",
        borderColor: "#bbf7d0",
      },
      {
        id: "avg-transaction",
        label: "AVERAGE",
        title: "Per Transaction",
        value: "$66.76",
        subtitle: "25 total transactions",
        icon: "bar-chart",
        accentColor: "#7c3aed",
        bgColor: "#faf5ff",
        borderColor: "#e9d5ff",
      },
      {
        id: "trend",
        label: "TREND",
        title: "Spending",
        value: "-8%",
        subtitle: "vs previous month",
        subtitleColor: "#16a34a",
        icon: "trend-down",
        accentColor: "#f59e0b",
        bgColor: "#fffbeb",
        borderColor: "#fde68a",
      },
    ],
  });
  
}),
http.get("/api/finance/transactions", async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));

  return HttpResponse.json({
    transactions: [
      { id: "t1",  date: "2024-08-15", description: "Monthly salary",          category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t2",  date: "2024-07-18", description: "Internet and phone",       category: "Utilities",     amount: -125,    type: "expense" },
      { id: "t3",  date: "2024-07-15", description: "Monthly salary",           category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t4",  date: "2024-06-22", description: "Restaurant meal",          category: "Food & Dining", amount: -95.99,  type: "expense" },
      { id: "t5",  date: "2024-06-15", description: "Monthly salary",           category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t6",  date: "2024-06-05", description: "Streaming subscriptions",  category: "Entertainment", amount: -175,    type: "expense" },
      { id: "t7",  date: "2024-05-20", description: "Electronics",              category: "Shopping",      amount: -280,    type: "expense" },
      { id: "t8",  date: "2024-05-15", description: "Monthly salary",           category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t9",  date: "2024-05-10", description: "Design consultation",      category: "Freelance Work",amount:  2500,   type: "income"  },
      { id: "t10", date: "2024-04-28", description: "Grocery shopping",         category: "Food & Dining", amount: -217,    type: "expense" },
      { id: "t11", date: "2024-04-20", description: "Online course",            category: "Education",     amount: -199,    type: "expense" },
      { id: "t12", date: "2024-04-15", description: "Monthly salary",           category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t13", date: "2024-03-30", description: "Gym membership",           category: "Health",        amount: -65,     type: "expense" },
      { id: "t14", date: "2024-03-15", description: "Monthly salary",           category: "Salary",        amount:  4500,   type: "income"  },
      { id: "t15", date: "2024-03-08", description: "Flight tickets",           category: "Travel",        amount: -540,    type: "expense" },
    ],
  });
}),
];


