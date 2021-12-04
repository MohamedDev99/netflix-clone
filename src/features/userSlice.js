import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userState: (state, { payload }) => {
            state.user = payload;
        },
        userLogOut: (state, { payload }) => {
            state.user = null;
        },
    },
});

export const { userState, userLogOut } = userSlice.actions;

// * get user info
export const getUser = (state) => state.users.user;

export default userSlice.reducer;
