// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { financeApi } from "../api/financeApi";
import financeReducer from "./financeSlice";

export const store = configureStore({
  reducer: {
    finance: financeReducer,          // UI state (selected role, etc.)
    [financeApi.reducerPath]: financeApi.reducer,  // API cache
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(financeApi.middleware),
});

// TypeScript helpers — use these everywhere instead of raw types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;