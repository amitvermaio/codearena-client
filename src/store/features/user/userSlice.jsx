import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCurrentUser,
  updateUserProfile,
  logoutUser,
  fetchUserProfile,
} from "../../actions/user/userAction";

const initialState = {
  user: null,
  token: localStorage.getItem(import.meta.env.VITE_TOKEN_NAME) || null,
  loading: false,
  error: null,
  isAuthenticated: false,
  initialized: false, 
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateUserField: (state, action) => {
      const { name, value } = action.payload;
      if (state.user) state.user[name] = value;
    },
    addUserSkill: (state, action) => {
      if (state.user) state.user.skills.push(action.payload);
    },
    removeUserSkill: (state, action) => {
      if (state.user) state.user.skills = state.user.skills.filter((skill) => skill !== action.payload);
    },
  },
  extraReducers: (builder) => {
    // ✅ Fetch current user on app load
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.initialized = true; // ✅ auth check done
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        console.log("Slice me chala!!!")
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload || null;
        state.initialized = true; // ✅ still mark as checked
      });

    // ✅ Fetch User Profile
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isAuthenticated = true;
        state.initialized = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.initialized = true;
        state.error = action.payload;
      });

    // ✅ Update profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.initialized = true;
    });
  },
});

export const { clearError, updateUserField, addUserSkill, removeUserSkill } = userSlice.actions;
export default userSlice.reducer;
