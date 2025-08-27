import { createSlice } from "@reduxjs/toolkit";
import {
  fetchUserProfile,
  updateUserProfile,
  loginUser,
  registerUser,
  logoutUser,
} from "../../actions/user/userAction";

const initialState = {
  user: null,          // logged in user info
  token: null,         // JWT token or auth token
  loading: false,      // loading state for any async action
  error: null,         // error state
  isAuthenticated: false, // auth check
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
      if (state.user) {
        state.user[name] = value;
      }
    },
    addUserSkill: (state, action) => {
      if (state.user && !state.user.skills.includes(action.payload)) {
        state.user.skills.push(action.payload);
      }
    },
    removeUserSkill: (state, action) => {
      if (state.user) {
        state.user.skills = state.user.skills.filter(
          (skill) => skill !== action.payload
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = { ...state.user, ...action.payload };
      state.error = null;
    });
    builder.addCase(updateUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    });
  },
});

export const { clearError, updateUserField, addUserSkill, removeUserSkill } = userSlice.actions;
export default userSlice.reducer;
