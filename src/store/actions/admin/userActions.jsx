import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios.config";

const requestPatch = async (url, data = {}) => {
  const res = await axios.patch(url, data, { withCredentials: true });
  return res.data;
};

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await axios.get("/admin/users", { withCredentials: true });
  return res.data;
});

export const changeRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, role }) => {
    await requestPatch(`/admin/users/${userId}/role`, { role });
    return { userId, role };
  }
);

export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async ({ userId, status }) => {
    await requestPatch(`/admin/users/${userId}/status`, { status });
    return { userId, status };
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await requestPatch(`/admin/users/${userId}/delete`);
  return userId;
});

export const restoreUser = createAsyncThunk("users/restoreUser", async (userId) => {
  await requestPatch(`/admin/users/${userId}/restore`);
  return userId;
});
