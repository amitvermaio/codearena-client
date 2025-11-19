import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    potd: null,
    loading: false,
    error: null,
    loaded: false,
}

const potdSlice = createSlice({
  name: "potd",
  initialState,
  reducers: {
    loadpotd: (state, action) => {
      state.potd = action.payload;
      state.loading = false;
      state.error = null;
      state.loaded = true;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
})

export default potdSlice.reducer;
export const { loadpotd, setLoading, setError } = potdSlice.actions;