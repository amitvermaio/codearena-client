import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "@/config/axios.config"
import {
  setLoading,
  setError,
  setProblems,
  addProblem,
  updateProblem,
  deleteProblem,
  loadCurrentProblem,
  applyFilters
} from '../../features/problems/problemSlice';

// ------------------- Async Thunks ------------------- //

export const fetchProblems = createAsyncThunk('problems/fetchProblems', async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get('/problems', {
        headers: {
          'x-secret-key': import.meta.env.VITE_SECRET_KEY,
        }
      });
      const { data } = response;
      const problems = data?.data ?? [];
      dispatch(setProblems(problems));
      return problems;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch problems';
      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);

export const asyncloadcurrentproblem = (problemId) => async (dispatch, getState) => {
  try {
    console.log(problemId)
    dispatch(setLoading(true));
    const { data } = await axios.get(`/problems/${problemId}`, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY
      }
    });
    if (data.statusCode === 200) {
      dispatch(loadCurrentProblem());
    }
  } catch (error) {
    console.log(error)
  }
}