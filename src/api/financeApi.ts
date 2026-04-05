// src/api/financeApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FinanceSummaryResponse, ChartsResponse, TransactionsResponse, Transaction } from "../types";
import type { InsightsResponse } from "../components/InsightCards/icons";

export const financeApi = createApi({
  reducerPath: "financeApi",     // key in Redux store
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Finance", "Transactions"],
  endpoints: (builder) => ({

    // Query: GET /api/finance/summary
    getFinanceSummary: builder.query<FinanceSummaryResponse, void>({
      query: () => "/finance/summary",
      providesTags: ["Finance"],
    }),

// Mutation: PATCH /api/finance/role
updateUserRole: builder.mutation<{ success: boolean; role: string }, string>({
  query: (role) => ({
    url: "/finance/role",
    method: "PATCH",
    body: { role },
  }),
  invalidatesTags: ["Finance"],
}),

// Query: GET /api/finance/charts
getFinanceCharts: builder.query<ChartsResponse, void>({
  query: () => "/finance/charts",
  providesTags: ["Finance"],
}),
getInsights: builder.query<InsightsResponse, void>({
  query: () => "/finance/insights",
  providesTags: ["Finance"],
}),
getTransactions: builder.query<TransactionsResponse, void>({
  query: () => "/finance/transactions",
  providesTags: ["Transactions"],
}),

createTransaction: builder.mutation<{ success: true; transaction: Transaction }, Transaction>({
  query: (transaction) => ({
    url: "/finance/transactions",
    method: "POST",
    body: { transaction },
  }),
  invalidatesTags: ["Transactions"],
}),

updateTransaction: builder.mutation<{ success: true; transaction: Transaction }, Transaction>({
  query: (transaction) => ({
    url: `/finance/transactions/${transaction.id}`,
    method: "PATCH",
    body: { transaction },
  }),
  invalidatesTags: ["Transactions"],
}),

deleteTransaction: builder.mutation<{ success: true; id: string }, string>({
  query: (id) => ({
    url: `/finance/transactions/${id}`,
    method: "DELETE",
  }),
  invalidatesTags: ["Transactions"],
}),

  }),
  
});

// Auto-generated hooks — use these in components
export const {
  useGetFinanceSummaryQuery,
  useUpdateUserRoleMutation,
  useGetInsightsQuery,
  useGetFinanceChartsQuery,
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = financeApi;