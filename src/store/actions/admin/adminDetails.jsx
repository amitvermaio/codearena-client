import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios.config";

export const getAdminDetails = createAsyncThunk('/administration', async (credential, { rejectWithValue }) => {
  try {
    
  } catch (error) {
    rejectWithValue(error);
  }
});