import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  potd: null,
  loading: false,
  error: null,
  loaded: false,
  createdBy: null,
  updatedBy: null
}

const potdSlice = createSlice({
  name: "potd",
  initialState,
  reducers: {
    loadpotd: (state, action) => {
      state.potd = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoaded: (state, action) => {
      state.loaded = action.payload;
    },
    setAuditFields: (state, action) => {
      const { createdBy = null, updatedBy = null } = action.payload || {};
      state.createdBy = createdBy;
      state.updatedBy = updatedBy;
    }
  }
})

export default potdSlice.reducer;
export const { loadpotd, setLoading, setError, setLoaded, setAuditFields } = potdSlice.actions;