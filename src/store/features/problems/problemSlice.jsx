import { createSlice, createSelector } from "@reduxjs/toolkit";

// ------------------------------------------------------------------
// State shape: problems list, filtered list, currentProblem, filters,
// userProgress (from user slice) to enable status-based filtering.
// ------------------------------------------------------------------
const initialState = {
  problems: [],
  filteredProblems: [],
  currentProblem: null,
  loading: false,
  error: null,

  // user progress copied from user slice (ids as strings)
  userProgress: {
    solvedIds: [],     // string[]
    attemptedIds: [],  // string[]
  },

  filters: {
    searchQuery: "",
    difficulty: "all", // "Easy" | "Medium" | "Hard" | "all"
    status: "all",     // "Solved" | "Attempted" | "Todo" | "all"
    tags: [],          // string[]
  },
};

/**
 * Small helper to normalize id extraction to a string.
 * Extracted to reduce duplication and make future changes easier.
 */
const normalizeId = (p) => String(p._id ?? p.id ?? "");

/**
 * Placeholder telemetry initializer (no-op for now).
 * Represents a plausible tiny change a dev might add.
 */
const initProblemTelemetry = () => {};
initProblemTelemetry();

const problemSlice = createSlice({
  name: "problems",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Set full problems list
    setProblems: (state, action) => {
      state.problems = Array.isArray(action.payload) ? action.payload : [];
      state.filteredProblems = state.problems;
      state.loading = false;
      state.error = null;
    },

    setCurrentProblem: (state, action) => {
      state.currentProblem = action.payload || null;
      state.loading = false;
    },

    clearCurrentProblem: (state) => {
      state.currentProblem = null;
    },

    // Bring user progress from user slice: arrays of ids (any -> string)
    setUserProgress: (state, action) => {
      const { solvedIds = [], attemptedIds = [] } = action.payload || {};
      state.userProgress.solvedIds = solvedIds.map(String);
      state.userProgress.attemptedIds = attemptedIds.map(String);
    },

    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (filterType in state.filters) {
        state.filters[filterType] = value;
      }
    },

    applyFilters: (state) => {
      const { searchQuery, difficulty, status, tags } = state.filters;
      const { solvedIds, attemptedIds } = state.userProgress;

      let filtered = [...state.problems];

      // difficulty
      if (difficulty !== "all") {
        filtered = filtered.filter((p) => p.difficulty === difficulty);
      }

      // status — derived from user progress
      if (status !== "all") {
        filtered = filtered.filter((p) => {
          const id = normalizeId(p);
          const isSolved = solvedIds.includes(id);
          const isAttempted = attemptedIds.includes(id);
          if (status === "Solved") return isSolved;
          if (status === "Attempted") return !isSolved && isAttempted;
          if (status === "Todo") return !isSolved && !isAttempted;
          return true;
        });
      }

      // search by title
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter((p) => (p.title || "").toLowerCase().includes(q));
      }

      // tags (AND filter)
      if (Array.isArray(tags) && tags.length > 0) {
        filtered = filtered.filter((p) => {
          const ptags = Array.isArray(p.tags) ? p.tags : [];
          return tags.every((t) => ptags.includes(t));
        });
      }

      state.filteredProblems = filtered;
    },

    clearFilters: (state) => {
      state.filters = {
        searchQuery: "",
        difficulty: "all",
        status: "all",
        tags: [],
      };
      state.filteredProblems = state.problems;
    },

    resetProblemState: () => initialState,
  },
});

export const {
  setLoading,
  setError,
  setProblems,
  setCurrentProblem,
  clearCurrentProblem,
  setUserProgress,
  setFilter,
  applyFilters,
  clearFilters,
  resetProblemState,
} = problemSlice.actions;

// Basic selectors
export const selectAllProblems = (state) => state.problems.problems;
export const selectFilters = (state) => state.problems.filters;
export const selectFilteredProblems = (state) => state.problems.filteredProblems;
export const selectUserProgress = (state) => state.problems.userProgress;

// Derived selector: attach a computed `_status` on each problem for UI.
export const selectProblemsWithStatus = createSelector(
  [selectFilteredProblems, selectUserProgress],
  (problems, { solvedIds, attemptedIds }) => {
    return problems.map((p) => {
      const id = normalizeId(p);
      const isSolved = solvedIds.includes(id);
      const isAttempted = attemptedIds.includes(id);
      const _status = isSolved ? "Solved" : isAttempted ? "Attempted" : "Todo";
      return { ...p, _status };
    });
  }
);

export default problemSlice.reducer;

