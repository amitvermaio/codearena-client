import axios from "@/config/axios.config";
import { loadpotd, setError, setLoading, setLoaded, setAuditFields } from "../../features/problems/potdSlice";

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
      dispatch(setAuditFields({
        createdBy: res.data?.data.createdBy,
        updatedBy: res.data?.data.updatedBy,
      }));
      dispatch(setLoaded(true));
    } else {
      dispatch(setError(res.data.message));
    }     
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to load POTD"));
  } finally {
    dispatch(setLoading(false));
  }
}

export const asyncupdatepotd = (problemId) => async (dispatch, getState) => {
  try {
    const res = await axios.put('/admin/update-potd', { problemId }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(import.meta.env.VITE_TOKEN_NAME)}`
      }
    });

    if (res.status === 200) {
      console.log(res.data.data)
      dispatch(loadpotd(res.data?.data));
      dispatch(setAuditFields({
        createdBy: res.data?.data.createdBy,
        updatedBy: res.data?.data.updatedBy,
      }));
      dispatch(setLoaded(false));
    } else {
      dispatch(setError(res.data.message));
    }
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Failed to update POTD"));
  } finally {
    dispatch(setLoading(false));
  }
}