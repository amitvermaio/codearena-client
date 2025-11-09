import axios from "@/config/axios.config";
import { loaduser, logoutuser, setloading } from "@/store/features/user/userSlice";
import { loadprofile } from "@/store/features/profile/profileSlice";

export const asyncfetchuserprofile = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
    if (!token) {
      dispatch(logoutuser());
      return;
    }

    dispatch(setloading(true));
    const { data } = await axios.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.statusCode === 200) {
      dispatch(loaduser(data?.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setloading(false));
  }
}

export const asyncupdateuserprofile = (updates) => async (dispatch) => {
  try {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
    if (!token) {
      dispatch(logoutuser());
      throw new Error("Authentication token is missing");
    }

    dispatch(setloading(true));

    const { data } = await axios.patch("/users/me", updates, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.statusCode !== 200) {
      const message = data.message || "Failed to update profile";
      throw new Error(message);
    }

    dispatch(loaduser(data.data));
    return data.data;
  } catch (error) {
    console.error("Profile update failed:", error);
    const message = error.response?.data?.message || error.message || "Failed to update profile";
    throw new Error(message);
  } finally {
    dispatch(setloading(false));
  }
};

export const asynclogoutuser = () => async (dispatch, getState) => {
  try {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_NAME);
    if (!token) {
      dispatch(logoutuser());
      return;
    }
    dispatch(setloading(true));
    const { data } = await axios.post("/auth/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (data.statusCode === 200) {
      dispatch(logoutuser());
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setloading(false));
  }
}

export const asyncgetprofilefromusername = (username) => async (dispatch, getState) => {
  try {
    dispatch(setloading(true));
    const { data } = await axios.get(`/users/profile/${username}`);
    if (data.statusCode === 200) {
      dispatch(loadprofile(data?.data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setloading(false));
  }
}
