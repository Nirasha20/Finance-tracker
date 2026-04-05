// src/store/transactionSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Transaction } from "../types";

interface TransactionState {
  items: Transaction[];
  hydrated: boolean; // true once API data is loaded into slice
}

const initialState: TransactionState = {
  items: [],
  hydrated: false,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    // Called once when API data arrives
    hydrateTransactions(state, action: PayloadAction<Transaction[]>) {
      if (!state.hydrated) {
        state.items = action.payload;
        state.hydrated = true;
      }
    },

    addTransaction(state, action: PayloadAction<Transaction>) {
      state.items.unshift(action.payload); // newest first
    },

    updateTransaction(state, action: PayloadAction<Transaction>) {
      const idx = state.items.findIndex((t) => t.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },

    deleteTransaction(state, action: PayloadAction<string>) {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const {
  hydrateTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = transactionSlice.actions;

export default transactionSlice.reducer;