// src/features/problems/problemsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const problemsSlice = createSlice({
  name: "problems",
  initialState: {
    problemsList: [],     // all problems
    selectedProblem: null // problem detail
  },
  reducers: {
    setProblems: (state, action) => {
      state.problemsList = action.payload; // payload = array of problems
    },
    setSelectedProblem: (state, action) => {
      state.selectedProblem = action.payload; // payload = single problem
    },
    clearSelectedProblem: (state) => {
      state.selectedProblem = null;
    },
  },
});

export const { setProblems, setSelectedProblem, clearSelectedProblem } = problemsSlice.actions;
export default problemsSlice.reducer;
