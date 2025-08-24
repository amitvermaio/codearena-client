import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // User data
  user: null,
  isAuthenticated: false,
  
  // Loading states
  isLoading: false,
  isLoginLoading: false,
  isRegisterLoading: false,
  isUpdateLoading: false,
  
  // Error states
  error: null,
  loginError: null,
  registerError: null,
  updateError: null,
  
  // User statistics
  stats: {
    problemsSolved: 0,
    totalAttempts: 0,
    streakCount: 0,
    longestStreak: 0,
    difficultyBreakdown: {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    lastActiveDate: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Authentication actions
    loginStart: (state) => {
      state.isLoginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.isLoginLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.loginError = null;
      state.error = null;
      
      if (action.payload.stats) {
        state.stats = { ...state.stats, ...action.payload.stats };
      }
    },

    loginFailure: (state, action) => {
      state.isLoginLoading = false;
      state.loginError = action.payload;
      state.error = action.payload;
    },

    registerStart: (state) => {
      state.isRegisterLoading = true;
      state.registerError = null;
    },
    registerSuccess: (state, action) => {
      state.isRegisterLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.registerError = null;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isRegisterLoading = false;
      state.registerError = action.payload;
      state.error = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginError = null;
      state.registerError = null;
      state.updateError = null;
      state.recentActivity = [];
      state.following = [];
      state.followers = [];
      state.achievements = [];
    },

    // Profile update actions
    updateProfileStart: (state) => {
      state.isUpdateLoading = true;
      state.updateError = null;
    },
    updateProfileSuccess: (state, action) => {
      state.isUpdateLoading = false;
      state.user = { ...state.user, ...action.payload };
      state.updateError = null;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.isUpdateLoading = false;
      state.updateError = action.payload;
      state.error = action.payload;
    },

    // Preferences actions
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    updateTheme: (state, action) => {
      state.preferences.theme = action.payload;
    },
    updateNotificationSettings: (state, action) => {
      state.preferences.notifications = { 
        ...state.preferences.notifications, 
        ...action.payload 
      };
    },

    // Stats actions
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    incrementProblemsSolved: (state, action) => {
      const { difficulty } = action.payload;
      state.stats.problemsSolved += 1;
      state.stats.totalAttempts += 1;
      
      // Update difficulty breakdown
      if (difficulty && state.stats.difficultyBreakdown[difficulty.toLowerCase()]) {
        state.stats.difficultyBreakdown[difficulty.toLowerCase()] += 1;
      }
      
      // Update last active date
      state.stats.lastActiveDate = new Date().toISOString();
    },
    updateStreak: (state, action) => {
      const { streakCount } = action.payload;
      state.stats.streakCount = streakCount;
      
      // Update longest streak if current is longer
      if (streakCount > state.stats.longestStreak) {
        state.stats.longestStreak = streakCount;
      }
    },
    incrementAttempts: (state) => {
      state.stats.totalAttempts += 1;
      state.stats.lastActiveDate = new Date().toISOString();
    },

    // Achievements actions
    addAchievement: (state, action) => {
      const achievement = action.payload;
      // Check if achievement already exists
      const exists = state.achievements.find(a => a.id === achievement.id);
      if (!exists) {
        state.achievements.push({
          ...achievement,
          unlockedAt: new Date().toISOString(),
        });
      }
    },
    setAchievements: (state, action) => {
      state.achievements = action.payload;
    },

    // Social features actions
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    addFollowing: (state, action) => {
      const userId = action.payload;
      if (!state.following.includes(userId)) {
        state.following.push(userId);
      }
    },
    removeFollowing: (state, action) => {
      const userId = action.payload;
      state.following = state.following.filter(id => id !== userId);
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    addFollower: (state, action) => {
      const userId = action.payload;
      if (!state.followers.includes(userId)) {
        state.followers.push(userId);
      }
    },
    removeFollower: (state, action) => {
      const userId = action.payload;
      state.followers = state.followers.filter(id => id !== userId);
    },

    // Activity actions
    setRecentActivity: (state, action) => {
      state.recentActivity = action.payload;
    },
    addActivity: (state, action) => {
      const activity = {
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.recentActivity.unshift(activity);
      
      // Keep only last 50 activities
      if (state.recentActivity.length > 50) {
        state.recentActivity = state.recentActivity.slice(0, 50);
      }
    },

    // General loading and error actions
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
      state.loginError = null;
      state.registerError = null;
      state.updateError = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Initialize user from localStorage or token
    initializeUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        
        if (action.payload.preferences) {
          state.preferences = { ...state.preferences, ...action.payload.preferences };
        }
        
        if (action.payload.stats) {
          state.stats = { ...state.stats, ...action.payload.stats };
        }
        
        if (action.payload.achievements) {
          state.achievements = action.payload.achievements;
        }
      }
    },

    // Reset specific error
    clearLoginError: (state) => {
      state.loginError = null;
    },
    clearRegisterError: (state) => {
      state.registerError = null;
    },
    clearUpdateError: (state) => {
      state.updateError = null;
    },
  },
});

// Export actions
export const {
  // Authentication
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  
  // Profile
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  
  // Preferences
  updatePreferences,
  updateTheme,
  updateNotificationSettings,
  
  // Stats
  updateStats,
  incrementProblemsSolved,
  updateStreak,
  incrementAttempts,
  
  // Achievements
  addAchievement,
  setAchievements,
  
  // Social
  setFollowing,
  addFollowing,
  removeFollowing,
  setFollowers,
  addFollower,
  removeFollower,
  
  // Activity
  setRecentActivity,
  addActivity,
  
  // General
  setLoading,
  clearError,
  setError,
  initializeUser,
  clearLoginError,
  clearRegisterError,
  clearUpdateError,
} = userSlice.actions;

// Selectors
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsLoginLoading = (state) => state.user.isLoginLoading;
export const selectIsRegisterLoading = (state) => state.user.isRegisterLoading;
export const selectIsUpdateLoading = (state) => state.user.isUpdateLoading;
export const selectError = (state) => state.user.error;
export const selectLoginError = (state) => state.user.loginError;
export const selectRegisterError = (state) => state.user.registerError;
export const selectUpdateError = (state) => state.user.updateError;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectUserStats = (state) => state.user.stats;
export const selectUserAchievements = (state) => state.user.achievements;
export const selectUserFollowing = (state) => state.user.following;
export const selectUserFollowers = (state) => state.user.followers;
export const selectRecentActivity = (state) => state.user.recentActivity;

// Computed selectors
export const selectUserDisplayName = (state) => {
  const user = selectUser(state);
  return user?.displayName || user?.username || user?.email?.split('@')[0] || 'Anonymous';
};

export const selectUserAvatar = (state) => {
  const user = selectUser(state);
  return user?.avatar || user?.profilePicture || null;
};

export const selectSolvedProblemsCount = (state) => {
  return selectUserStats(state).problemsSolved || 0;
};

export const selectCurrentStreak = (state) => {
  return selectUserStats(state).streakCount || 0;
};

export const selectUserLevel = (state) => {
  const stats = selectUserStats(state);
  const solved = stats.problemsSolved || 0;
  
  // Calculate level based on problems solved
  if (solved >= 200) return 'Expert';
  if (solved >= 100) return 'Advanced';
  if (solved >= 50) return 'Intermediate';
  if (solved >= 10) return 'Beginner';
  return 'Newbie';
};

export const selectUserProgress = (state) => {
  const stats = selectUserStats(state);
  const solved = stats.problemsSolved || 0;
  
  // Calculate progress to next level
  const levelThresholds = [0, 10, 50, 100, 200];
  const currentLevel = levelThresholds.findIndex(threshold => solved < threshold) - 1;
  const currentThreshold = levelThresholds[currentLevel < 0 ? levelThresholds.length - 1 : currentLevel];
  const nextThreshold = levelThresholds[currentLevel + 1] || levelThresholds[levelThresholds.length - 1];
  
  const progress = nextThreshold > currentThreshold ? 
    ((solved - currentThreshold) / (nextThreshold - currentThreshold)) * 100 : 100;
  
  return {
    current: solved,
    next: nextThreshold,
    progress: Math.min(progress, 100),
    level: currentLevel >= 0 ? currentLevel : levelThresholds.length - 1,
  };
};

export default userSlice.reducer;