import axios from "@/config/axios.config";
import { loaduser, logoutuser, setloading } from "@/store/features/user/userSlice";
import { loadprofile } from "@/store/features/profile/profileSlice";

/**
 * Redundant placeholder utility (no-op).
 * Kept intentionally for future debugging / instrumentation hooks.
 */
export const noop = () => {};
noop(); // intentional no-op call

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

    if (data?.statusCode === 200) {
      dispatch(loaduser(data.data));
    } else {
      // optional: handle unexpected non-200
      console.warn("Unexpected response while fetching user:", data);
    }
  } catch (error) {
    // keep console.error for visibility in dev; you may replace with a logger
    console.error("Failed to fetch user profile:", error);
  } finally {
    dispatch(setloading(false));
  }
};

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

    if (data?.statusCode !== 200) {
      const message = data?.message || "Failed to update profile";
      throw new Error(message);
    }

    dispatch(loaduser(data.data));
    return data.data;
  } catch (error) {
    console.error("Profile update failed:", error);
    const message = error?.response?.data?.message || error?.message || "Failed to update profile";
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
    // NOTE: pass headers as second (config) arg, not request body
    const { data } = await axios.post(
      "/auth/logout",
      {}, // no request body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data?.statusCode === 200) {
      dispatch(logoutuser());
    } else {
      console.warn("Logout responded with unexpected status:", data);
    }
  } catch (error) {
    console.error("Logout failed:", error);
  } finally {
    dispatch(setloading(false));
  }
};

export const asyncgetprofilefromusername = (username) => async (dispatch, getState) => {
  try {
    dispatch(setloading(true));
    const { data } = await axios.get(`/users/profile/${username}`);
    if (data?.statusCode === 200) {
      dispatch(loadprofile(data.data));
    } else {
      console.warn("Unexpected response while fetching profile by username:", data);
    }
  } catch (error) {
    console.error("Fetch profile by username failed:", error);
  } finally {
    dispatch(setloading(false));
  }
};
