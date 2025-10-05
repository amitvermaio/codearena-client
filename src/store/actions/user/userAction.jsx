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
      // Persist access token locally for route protection and API requests
      console.log(data);
      console.log(data.data.accessToken);
      if (data?.data?.accessToken) {
        localStorage.setItem("access_token", data.data.accessToken);
      }
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const registerUser = createAsyncThunk("user/register", async (userDetails, { rejectWithValue }) => {
    try {
      const { fullname, username, email, password } = userDetails;
      const { data } = await axios.post("/auth/register", { fullname, username, email, password });
      // Persist access token after registration
      if (data?.token) {
        localStorage.setItem("access_token", data.token);
      }
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Registration failed");
    }
  }
);

/* fetchCurrentUser — called on app start, backend reads refresh cookie & returns user + new access token */
export const fetchCurrentUser = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/refresh-token'); // withCredentials true via api instance
      const user = data.user || data.data?.user;
      const accessToken = data.accessToken;
      if (accessToken) localStorage.setItem('access_token', accessToken);
      return { user, accessToken };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Not authenticated');
    }
  }
);

export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
  const { data } = await axios.post("/auth/logout");
  // Remove token from localStorage on logout
  localStorage.removeItem("access_token");
  return data;
}); 


export const getUserByUsername = createAsyncThunk("user/getUserByUsername", async (username, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/profile/${username}`);
      console.log(data);
      
      return data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user");
    }
  }
);