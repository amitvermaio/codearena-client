// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

// Feature slices
import problemsReducer from "./features/problems/problemSlice";
import userReducer from "./features/user/userSlice";
import adminUserReducer from "./features/admin/userSlice";
import profileReducer from "./features/profile/profileSlice";
import potdReducer from "./features/problems/potdSlice";

export const store = configureStore({
  reducer: {
    // Common user state
    user: userReducer,

    // Admin panel user management
    adminUsers: adminUserReducer,

    // Problem-related data (listing, filtering, etc.)
    problems: problemsReducer,

    // User profile information
    profile: profileReducer,

    // POTD (Problem of the Day)
    potd: potdReducer,

    // contests: contestsReducer, // future use
  },
});

// ----------------------
// Example Selectors
// ----------------------

export const selectUser = (state) => state.user;
export const selectAdminUsers = (state) => state.adminUsers;
export const selectProfile = (state) => state.profile;
export const selectProblems = (state) => state.problems;
export const selectPOTD = (state) => state.potd;
