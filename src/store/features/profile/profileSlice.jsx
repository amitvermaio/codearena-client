import { createSlice } from "@reduxjs/toolkit";
import { getUserByUsername } from "../../actions/user/userAction";

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserByUsername.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.user = null;
        });
        builder.addCase(getUserByUsername.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(getUserByUsername.rejected, (state, action) => {
            state.loading = false;
            state.user = null;
            state.error = action.payload;
        });
    },
});

export default profileSlice.reducer;
