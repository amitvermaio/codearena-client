import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "@/config/axios.config"
import {
  setLoading,
  setError,
  setProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  setCurrentProblem,
  applyFilters
} from '../../features/problems/problemSlice';

// ------------------- Async Thunks ------------------- //

export const fetchProblems = createAsyncThunk('problems/fetchProblems', async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get('/problems');
      dispatch(setProblems(data));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch problems';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Fetch single problem by slug
export const fetchProblemBySlug = createAsyncThunk('problems/fetchProblemBySlug', async (slug, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`/problems/${slug}`);
      dispatch(setCurrentProblem(data));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch problem';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Create problem
export const createProblem = createAsyncThunk('problems/createProblem', async (problemData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post('/problems', problemData);
      dispatch(addProblem(data));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to create problem';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Update problem by slug
export const updateProblemBySlug = createAsyncThunk('problems/updateProblemBySlug', async ({ slug, updates }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.put(`/problems/${slug}`, updates);
      dispatch(updateProblem({ slug, updates: data }));
      dispatch(setLoading(false));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to update problem';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Delete problem by slug
export const deleteProblemBySlug = createAsyncThunk('problems/deleteProblemBySlug', async (slug, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      await axios.delete(`/problems/${slug}`);
      dispatch(deleteProblem(slug));
      dispatch(setLoading(false));
      return slug;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to delete problem';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Submit solution
export const submitSolution = createAsyncThunk('problems/submitSolution', async ({ slug, solution, language }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.post(`/problems/${slug}/submit`, { solution, language });

      // Update problem status
      if (data.passed) {
        dispatch(updateProblem({ 
          slug, 
          updates: { status: 'solved', solvedAt: new Date().toISOString() }
        }));
      } else {
        dispatch(updateProblem({ 
          slug, 
          updates: { status: 'attempted', attemptedAt: new Date().toISOString() }
        }));
      }

      dispatch(setLoading(false));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to submit solution';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// Search problems
export const searchProblems = createAsyncThunk('problems/searchProblems', async (searchParams, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const { data } = await axios.get(`/problems/search`, { params: searchParams });
      dispatch(setProblems(data));
      return data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to search problems';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

// ------------------- Helpers ------------------- //

// Sync filter + apply
export const filterAndSearch = (filters) => (dispatch, getState) => {
  Object.entries(filters).forEach(([key, value]) => {
    if (getState().problems.filters.hasOwnProperty(key)) {
      dispatch({ type: 'problems/setFilter', payload: { filterType: key, value } });
    }
  });
  dispatch(applyFilters());
};

// Refresh problems
export const refreshProblems = () => async (dispatch) => {
  try {
    dispatch({ type: 'problems/resetProblemState' });
    await dispatch(fetchProblems());
  } catch {
    dispatch(setError('Failed to refresh problems'));
  }
};

// Batch update
export const batchUpdateProblems = (updates) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const promises = updates.map(({ slug, data }) => axios.put(`/problems/${slug}`, data));
    const responses = await Promise.all(promises);
    responses.forEach((res, i) => {
      dispatch(updateProblem({ slug: updates[i].slug, updates: res.data }));
    });
    dispatch(setLoading(false));
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Failed to batch update problems';
    dispatch(setError(errorMessage));
  }
};
