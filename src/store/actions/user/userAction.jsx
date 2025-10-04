import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuth } from "@/services/auth";
import axios from "@/config/axios.config";

export const verifyAuth = createAsyncThunk("user/verifyAuth", async () => {
  const userData = await checkAuth();
  return userData; 
});


export const loginUser = createAsyncThunk("user/login", async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      console.log(data)
      localStorage.setItem("token", data.accessToken);
      return data; // { user, token }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk("user/register", async (userDetails, { rejectWithValue }) => {
    try {
      const { fullname, username, email, password } = userDetails;
      const { data } = await axios.post("/auth/register", { fullname, username, email, password });
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
    }
  }
);

export const updateUserProfile = createAsyncThunk("user/updateProfile", async (updates, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch("/users/me", updates);
      console.log(data);
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Update failed");
    }
  }
);

export const uploadPhoto = createAsyncThunk("upload/uploadPhoto", async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await axios.post("/users/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      return res.data.url; 
    } catch (err) {
      return rejectWithValue(err.response?.data || "Upload failed");
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  await axios.post("/auth/logout");
  return true;
});
