// src/store/financeSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type{ FinanceState } from "../types";

const initialState: FinanceState = {
  stats: [],
  lastUpdated: null,
  selectedRole: "Viewer (Read-only)",
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Action: user picks a new role from the dropdown
    setSelectedRole(state, action: PayloadAction<string>) {
      state.selectedRole = action.payload;
    },
  },
});

export const { setSelectedRole } = financeSlice.actions;
export default financeSlice.reducer;