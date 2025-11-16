import axios from "@/config/axios.config";
import { loadpotd, setError, setLoading } from "../../features/problems/potdSlice";

export const asyncgetpotd = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const res = await axios.get("/problems/potd", { 
      headers: {
        "x-secret-key": import.meta.env.VITE_SECRET_KEY,
      }
    });
    if (res.status === 200) {
      dispatch(loadpotd(res.data?.data));
    } else {
      dispatch(setError(res.data.message));
    }     
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to load POTD"));
  } finally {
    dispatch(setLoading(false));
  }
}