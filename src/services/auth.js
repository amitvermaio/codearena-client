import axios from "@/config/axios.config";

export const checkAuth = async () => {
  try {
    const res = await axios.get("/auth/me");
    if (res.status === 200) return res.data;
    return null;
  } catch (error) {
    return null;
  }
};
