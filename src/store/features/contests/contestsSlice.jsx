// src/features/contests/contestsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const contestsSlice = createSlice({
  name: "contests",
  initialState: {
    contestsList: [],     // all contests
    selectedContest: null // contest detail
  },
  reducers: {
    setContests: (state, action) => {
      state.contestsList = action.payload; // payload = array of contests
    },
    setSelectedContest: (state, action) => {
      state.selectedContest = action.payload; // payload = single contest
    },
    clearSelectedContest: (state) => {
      state.selectedContest = null;
    },
  },
});

export const { setContests, setSelectedContest, clearSelectedContest } = contestsSlice.actions;
export default contestsSlice.reducer;
