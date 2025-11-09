import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    loadprofile: (state, action) => {
      state.profile = action.payload
    },
    removeprofile: (state) => {
      state.profile = null
    },
    setloading: (state, action) => {
      state.loading = action.payload
    },
    seterror: (state, action) => {
      state.error = action.payload
    },
  }
});

export const { loadprofile, removeprofile, setloading, seterror } = profileSlice.actions
export default profileSlice.reducer
