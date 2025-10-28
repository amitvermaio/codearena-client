import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios.config";

// ✅ Login
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      const token = data?.data?.accessToken;
      if (token) localStorage.setItem("accessToken", token);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// ✅ Register
export const registerUser = createAsyncThunk(
  "user/register",
  async (userDetails, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/register", userDetails);
      const token = data?.data?.accessToken;
      if (token) localStorage.setItem("accessToken", token);
      return data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

// ✅ Refresh current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/auth/login/success', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      // First check if we have a token
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return rejectWithValue("No authentication token found");
      }

      // Fetch user profile
      const res = await axios.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Return the user data in the expected format
      return { 
        user: res.data.data,
        accessToken: token
      };
    } catch (err) {
      console.error("Error fetching user profile:", err);
      // If unauthorized, clear the invalid token
      if (err.response?.status === 401) {
        localStorage.removeItem("accessToken");
        dispatch(logoutUser());
      }
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user profile");
    }
  }
);

// ✅ Update profile
export const updateUserProfile = createAsyncThunk(
  "user/updateProfile",
  async (updates, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch("/users/me", updates);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

// ✅ Logout
export const logoutUser = createAsyncThunk("user/logout", async () => {
  const token = localStorage.getItem("accessToken");
  const { data } = await axios.post("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("accessToken");
  return data;
});

// Get User Profile
export const getUserByUsername = createAsyncThunk(
  "user/getUserByUsername",
  async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/users/profile/${username}`);
      return data?.data ?? data;
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Failed to fetch user profile";
      return rejectWithValue({ status, message });
    }
  }
);