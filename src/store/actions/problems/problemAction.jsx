import axios from "@/config/axios.config"
import { setLoading, setError, setProblems, setCurrentProblem } from "@/store/features/problems/problemSlice";

export const asyncloadproblems = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`/problems`, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY
      }
    });

    if (data.statusCode === 200) {
      console.log(data.data)
      dispatch(setProblems(data.data));
    } else {
      dispatch(setError(data.message));
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error)
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
}

export const asyncloadcurrentproblem = (problemId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const { data } = await axios.get(`/problems/${problemId}`, {
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY
      }
    });
    if (data.statusCode === 200) {
      console.log(data.data)
      dispatch(setCurrentProblem(data.data));
    } else {
      dispatch(setError(data.message));
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error)
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
}