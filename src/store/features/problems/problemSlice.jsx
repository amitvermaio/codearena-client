import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  problems: [],
  filteredProblems: [],
  currentProblem: null,
  loading: false,
  error: null,
  filters: {
    difficulty: 'all', // 'all', 'easy', 'medium', 'hard'
    category: 'all',
    status: 'all', // 'all', 'solved', 'unsolved', 'attempted'
    searchQuery: ''
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 20,
    totalItems: 0
  }
};

const problemSlice = createSlice({
  name: 'problems',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Problem management
    setProblems: (state, action) => {
      state.problems = action.payload;
      state.filteredProblems = action.payload;
      state.loading = false;
      state.error = null;
      state.pagination.totalItems = action.payload.length;
    },

    addProblem: (state, action) => {
      state.problems.push(action.payload);
      state.filteredProblems.push(action.payload);
      state.pagination.totalItems = state.problems.length;
    },

    updateProblem: (state, action) => {
      const { slug, updates } = action.payload;
      const index = state.problems.findIndex(p => p.slug === slug);
      if (index !== -1) {
        state.problems[index] = { ...state.problems[index], ...updates };
        const filteredIndex = state.filteredProblems.findIndex(p => p.slug === slug);
        if (filteredIndex !== -1) {
          state.filteredProblems[filteredIndex] = { ...state.filteredProblems[filteredIndex], ...updates };
        }
      }
    },

    deleteProblem: (state, action) => {
      const slug = action.payload;
      state.problems = state.problems.filter(p => p.slug !== slug);
      state.filteredProblems = state.filteredProblems.filter(p => p.slug !== slug);
      state.pagination.totalItems = state.problems.length;
    },

    // Current problem
    setCurrentProblem: (state, action) => {
      state.currentProblem = action.payload;
    },

    clearCurrentProblem: (state) => {
      state.currentProblem = null;
    },

    // Filtering and search
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value;
      state.pagination.currentPage = 1; // Reset to first page when filtering
    },

    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
      state.pagination.currentPage = 1;
    },

    applyFilters: (state) => {
      let filtered = [...state.problems];

      // Apply difficulty filter
      if (state.filters.difficulty !== 'all') {
        filtered = filtered.filter(p => p.difficulty === state.filters.difficulty);
      }

      // Apply category filter
      if (state.filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === state.filters.category);
      }

      // Apply status filter
      if (state.filters.status !== 'all') {
        filtered = filtered.filter(p => p.status === state.filters.status);
      }

      // Apply search query
      if (state.filters.searchQuery) {
        const query = state.filters.searchQuery.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.tags && p.tags.some(tag => tag.toLowerCase().includes(query)))
        );
      }

      state.filteredProblems = filtered;
      state.pagination.totalItems = filtered.length;
    },

    clearFilters: (state) => {
      state.filters = { ...initialState.filters };
      state.filteredProblems = state.problems;
      state.pagination.currentPage = 1;
      state.pagination.totalItems = state.problems.length;
    },

    // Pagination
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },

    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1;
    },

    // Problem status updates
    markProblemSolved: (state, action) => {
      const slug = action.payload;
      const problem = state.problems.find(p => p.slug === slug);
      if (problem) {
        problem.status = 'solved';
        problem.solvedAt = new Date().toISOString();
      }
      const filteredProblem = state.filteredProblems.find(p => p.slug === slug);
      if (filteredProblem) {
        filteredProblem.status = 'solved';
        filteredProblem.solvedAt = new Date().toISOString();
      }
    },

    markProblemAttempted: (state, action) => {
      const slug = action.payload;
      const problem = state.problems.find(p => p.slug === slug);
      if (problem && problem.status === 'unsolved') {
        problem.status = 'attempted';
        problem.attemptedAt = new Date().toISOString();
      }
      const filteredProblem = state.filteredProblems.find(p => p.slug === slug);
      if (filteredProblem && filteredProblem.status === 'unsolved') {
        filteredProblem.status = 'attempted';
        filteredProblem.attemptedAt = new Date().toISOString();
      }
    },

    // Reset state
    resetProblemState: () => initialState
  }
});

export const {
  setLoading,
  setError,
  setProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  setCurrentProblem,
  clearCurrentProblem,
  setFilter,
  setSearchQuery,
  applyFilters,
  clearFilters,
  setCurrentPage,
  setItemsPerPage,
  markProblemSolved,
  markProblemAttempted,
  resetProblemState
} = problemSlice.actions;

// Selectors
export const selectProblems = (state) => state.problems.problems;
export const selectFilteredProblems = (state) => state.problems.filteredProblems;
export const selectCurrentProblem = (state) => state.problems.currentProblem;
export const selectProblemLoading = (state) => state.problems.loading;
export const selectProblemError = (state) => state.problems.error;
export const selectProblemFilters = (state) => state.problems.filters;
export const selectPagination = (state) => state.problems.pagination;

// Paginated problems selector
export const selectPaginatedProblems = (state) => {
  const { filteredProblems, pagination } = state.problems;
  const { currentPage, itemsPerPage } = pagination;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return filteredProblems.slice(startIndex, endIndex);
};

export default problemSlice.reducer;
