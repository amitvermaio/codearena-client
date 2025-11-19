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
    loaduser: (state, action) => {
      state.user = action.payload
    },
    setloading: (state, action) => {
      state.loading = action.payload
    },
    logoutuser: (state) => {
      state.user = null;
    },
    updateuserfield: (state, action) => {
      const { name, value } = action.payload;
      if (state.user) state.user[name] = value;
    },
    adduserskill: (state, action) => {
      if (state.user) state.user.skills.push(action.payload);
    },
    removeuserskill: (state, action) => {
      if (state.user) state.user.skills = state.user.skills.filter((skill) => skill !== action.payload);
    },
  }
})

export const { loaduser, setloading, logoutuser, updateuserfield, adduserskill, removeuserskill } = userSlice.actions
export default userSlice.reducer
