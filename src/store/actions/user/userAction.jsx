import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '@/config/axios.config';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  setLoading,
  setError,
  updateStats,
  setAchievements,
  initializeUser,
  addActivity,
} from '../../features/user/userSlice';

// Authentication Actions
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(loginStart());
      
      const response = await axios.post('/auth/login', credentials);
      console.log("before login Success: \n\n", response.data);
      const { user, stats, preferences, achievements } = response.data.data;
      
      dispatch(loginSuccess({ 
        user, 
        stats, 
        preferences, 
        achievements 
      }));
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      if (preferences) {
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
      }
      
      return { user, stats, preferences, achievements };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(message));
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(registerStart());
      
      const response = await axios.post('/auth/register', userData);
      const { user } = response.data.data;
      
      dispatch(registerSuccess({ user }));
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Log registration activity
      dispatch(addActivity({
        type: 'registration',
        description: 'Joined the platform',
      }));
      
      return { user };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch(registerFailure(message));
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await axios.post('/auth/logout');
      
      // Clear localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('problemProgress');
      
      return true;
    } catch (error) {
      // Even if logout fails on server, clear local data
      localStorage.removeItem('user');
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('problemProgress');
      
      const message = error.response?.data?.message || 'Logout failed';
      return rejectWithValue(message);
    }
  }
);

// Profile Actions
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(updateProfileStart());
      
      const response = await axios.put('/user/profile', profileData);
      const { user } = response.data.data;
      
      dispatch(updateProfileSuccess(user));
      
      // Update localStorage
      localStorage.setItem('user', JSON.stringify(user));
      
      // Log profile update activity
      dispatch(addActivity({
        type: 'profile_update',
        description: 'Updated profile information',
      }));
      
      return user;
    } catch (error) {
      const message = error.response?.data?.message || 'Profile update failed';
      dispatch(updateProfileFailure(message));
      return rejectWithValue(message);
    }
  }
);

export const uploadUserAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (file, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await axios.post('/user/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { avatarUrl } = response.data.data;
      
      dispatch(updateProfileSuccess({ avatar: avatarUrl }));
      dispatch(setLoading(false));
      
      return avatarUrl;
    } catch (error) {
      dispatch(setLoading(false));
      const message = error.response?.data?.message || 'Avatar upload failed';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

// Stats and Progress Actions
export const fetchUserStats = createAsyncThunk(
  'user/fetchStats',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('/user/stats');
      const stats = response.data.data;
      
      dispatch(updateStats(stats));
      
      return stats;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch stats';
      return rejectWithValue(message);
    }
  }
);

export const updateProblemStatus = createAsyncThunk(
  'user/updateProblemStatus',
  async ({ problemId, status }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/user/problems/${problemId}/status`, { status });
      const { stats } = response.data.data;
      
      if (stats) {
        dispatch(updateStats(stats));
      }
      
      // Log activity based on status
      let activityType = 'problem_update';
      let description = `Marked problem as ${status.toLowerCase()}`;
      
      if (status === 'Solved') {
        activityType = 'problem_solved';
        description = 'Solved a problem';
      } else if (status === 'Attempted') {
        activityType = 'problem_attempted';
        description = 'Attempted a problem';
      }
      
      dispatch(addActivity({
        type: activityType,
        description,
        problemId,
      }));
      
      return { problemId, status, stats };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update problem status';
      return rejectWithValue(message);
    }
  }
);

// Achievements Actions
export const fetchUserAchievements = createAsyncThunk(
  'user/fetchAchievements',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get('/user/achievements');
      const achievements = response.data.data;
      
      dispatch(setAchievements(achievements));
      
      return achievements;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch achievements';
      return rejectWithValue(message);
    }
  }
);

// Preferences Actions
export const updateUserPreferences = createAsyncThunk(
  'user/updatePreferences',
  async (preferences, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put('/user/preferences', preferences);
      const updatedPreferences = response.data.data;
      
      // Update localStorage
      localStorage.setItem('userPreferences', JSON.stringify(updatedPreferences));
      
      return updatedPreferences;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update preferences';
      return rejectWithValue(message);
    }
  }
);

// Initialize user from stored data
export const initializeUserFromStorage = createAsyncThunk(
  'user/initializeFromStorage',
  async (_, { dispatch }) => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedPreferences = localStorage.getItem('userPreferences');
      
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const preferences = storedPreferences ? JSON.parse(storedPreferences) : null;
        
        // Verify token is still valid
        try {
          const response = await axios.get('/auth/me');
          const currentUser = response.data.data.user;
          
          dispatch(initializeUser({
            user: currentUser,
            preferences,
          }));
          
          // Fetch latest stats and achievements
          dispatch(fetchUserStats());
          dispatch(fetchUserAchievements());
          
          return { user: currentUser, preferences };
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('user');
          localStorage.removeItem('userPreferences');
          return null;
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error initializing user from storage:', error);
      return null;
    }
  }
);

// Password and Security Actions
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      
      await axios.put('/user/change-password', {
        currentPassword,
        newPassword,
      });
      
      dispatch(setLoading(false));
      
      dispatch(addActivity({
        type: 'security_update',
        description: 'Changed account password',
      }));
      
      return true;
    } catch (error) {
      dispatch(setLoading(false));
      const message = error.response?.data?.message || 'Failed to change password';
      dispatch(setError(message));
      return rejectWithValue(message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  'user/deleteAccount',
  async ({ password }, { dispatch, rejectWithValue }) => {
    try {
      await axios.delete('/user/account', {
        data: { password }
      });
      
      // Clear all local data
      localStorage.removeItem('user');
      localStorage.removeItem('userPreferences');
      localStorage.removeItem('problemProgress');
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete account';
      return rejectWithValue(message);
    }
  }
);
