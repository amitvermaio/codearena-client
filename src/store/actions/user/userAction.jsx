import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios.config";

// ✅ Refresh current user
export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("CodeArena_Token")}`,
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
      const token = localStorage.getItem("CodeArena_Token");
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
        token: token
      };
    } catch (err) {
      console.error("Error fetching user profile:", err);
      // If unauthorized, clear the invalid token
      if (err.response?.status === 401) {
        localStorage.removeItem("CodeArena_Token");
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
  const token = localStorage.getItem("CodeArena_Token");
  const { data } = await axios.post("/auth/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  localStorage.removeItem("CodeArena_Token");
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