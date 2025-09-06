import axios from "@/config/axios.config";

export const checkAuth = async () => {
  try {
    const res = await axios.get("/auth/login/success", { withCredentials: true });
    if (res.status === 200) {
      return res.data; 
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
