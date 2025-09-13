import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios.config"; 

export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await axios.get("/admin/users", { withCredentials: true });
  return res.data;
});


export const changeRole = createAsyncThunk(
  "users/changeRole",
  async ({ userId, role }) => {
    await axios.patch(`/admin/admin/users/${userId}/role`, { role }, { withCredentials: true });
    return { userId, role };
  }
);


export const changeStatus = createAsyncThunk(
  "users/changeStatus",
  async ({ userId, status }) => {
    await axios.patch(`/admin/users/${userId}/status`, { status }, { withCredentials: true });
    return { userId, status };
  }
);


export const deleteUser = createAsyncThunk("users/deleteUser", async (userId) => {
  await axios.patch(`/admin/users/${userId}/delete`, {}, { withCredentials: true });
  return userId;
});


export const restoreUser = createAsyncThunk("users/restoreUser", async (userId) => {
  await axios.patch(`/admin/users/${userId}/restore`, {}, { withCredentials: true });
  return userId;
});
