import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        isLogged: false,
        userName: null,
        userEmail: null,
        userProfilePic: null,
    },
};

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        userState: (state, { payload }) => {
            state.user.isLogged = payload.isLogged;
            state.user.userName = payload.name;
            state.user.userEmail = payload.email;
            state.user.userProfilePic = payload.profilePic;
        },
        userLogged: (state, { payload }) => {
            state.user.isLogged = payload.isLogged;
        },
    },
});

export const { userState, userLogged } = userSlice.actions;

// * get user info
export const getUser = (state) => state.users.user;

export default userSlice.reducer;
