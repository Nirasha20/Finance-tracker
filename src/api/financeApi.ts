// src/api/financeApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { FinanceSummaryResponse } from "../types";

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
    }),

  }),
});

// Auto-generated hooks — use these in components
export const { useGetFinanceSummaryQuery, useUpdateUserRoleMutation } = financeApi;