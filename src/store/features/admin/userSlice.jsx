import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers, changeRole, changeStatus, deleteUser, restoreUser } from "../../actions/admin/userActions";;

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Change role
      .addCase(changeRole.fulfilled, (state, action) => {
        const { userId, role } = action.payload;
        const user = state.list.find((u) => u._id === userId || u.id === userId);
        if (user) user.role = role;
      })

      // Change status
      .addCase(changeStatus.fulfilled, (state, action) => {
        const { userId, status } = action.payload;
        const user = state.list.find((u) => u._id === userId || u.id === userId);
        if (user) user.status = status;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((u) => u._id !== action.payload && u.id !== action.payload);
      })

      // Restore user
      .addCase(restoreUser.fulfilled, (state, action) => {
        const user = state.list.find((u) => u._id === action.payload || u.id === action.payload);
        if (user) user.status = "Active";
      });
  },
});

export default userSlice.reducer;
