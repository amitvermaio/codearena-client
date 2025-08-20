// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import problemsReducer from "../features/problems/problemsSlice";
import contestsReducer from "../features/contests/contestsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemsReducer,
    contests: contestsReducer,
  },
});
