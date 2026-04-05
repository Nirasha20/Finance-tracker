// src/api/financeApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FinanceSummaryResponse, ChartsResponse, TransactionsResponse } from "../types";
import type { InsightsResponse } from "../components/InsightCards/icons";

export const financeApi = createApi({
  reducerPath: "financeApi",     // key in Redux store
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Finance"],
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
  providesTags: ["Finance"],
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
} = financeApi;