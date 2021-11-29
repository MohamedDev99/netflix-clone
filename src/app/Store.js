import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import movieReducer from "../features/useMovie";

export const store = configureStore({
    reducer: {
        users: userReducer,
        Movie: movieReducer,
    },
});
