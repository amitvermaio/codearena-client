// src/store/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    fullname: "",
    bio: "",
    location: "",
    website: "",
    profileColor: "default",
    skills: [],
    socialLinks: {
      github: "",
      twitter: "",
      linkedin: ""
    }
  },
  isAdmin: false,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Replace user object (e.g. after fetching profile)
    loadUser: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload ?? null;
    },

    logoutUser: (state) => {
      state.user = { ...initialState.user };
      state.isAdmin = false;
      state.loading = false;
      state.error = null;
    },

    updateUserField: (state, action) => {
      const { name, value } = action.payload ?? {};
      if (!name) return;
      if (name.includes(".")) {
        const parts = name.split(".");
        let cur = state.user;
        for (let i = 0; i < parts.length - 1; i++) {
          if (cur[parts[i]] == null) return;
          cur = cur[parts[i]];
        }
        const last = parts[parts.length - 1];
        if (Object.prototype.hasOwnProperty.call(cur, last)) cur[last] = value;
      } else {
        if (state.user && Object.prototype.hasOwnProperty.call(state.user, name)) {
          state.user[name] = value;
        }
      }
    },

    addUserSkill: (state, action) => {
      const skill = action.payload;
      if (!skill) return;
      if (!state.user) state.user = { ...initialState.user };
      if (!Array.isArray(state.user.skills)) state.user.skills = [];
      if (!state.user.skills.includes(skill)) {
        state.user.skills.push(skill);
      }
    },

    removeUserSkill: (state, action) => {
      const skill = action.payload;
      if (!state.user || !Array.isArray(state.user.skills)) return;
      state.user.skills = state.user.skills.filter((s) => s !== skill);
    },

    setAdmin: (state, action) => {
      state.isAdmin = !!action.payload;
    },

    // ---------- REDUNDANT / NO-OP (intentional) ----------
    // This reducer does nothing (keeps state unchanged).
    // It's safe but redundant — useful if you need a placeholder.
    noop: (state) => {
      return state;
    }
  }
});

export const selectUser = (state) => state.user.user;
export const selectIsAdmin = (state) => state.user.isAdmin;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;

export const {
  loadUser,
  setLoading,
  setError,
  logoutUser,
  updateUserField,
  addUserSkill,
  removeUserSkill,
  setAdmin,
  noop
} = userSlice.actions;

export default userSlice.reducer;
