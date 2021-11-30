import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: null,
};

const useMovie = createSlice({
    name: "Movie",
    initialState,
    reducers: {
        setMovie: (state, { payload }) => {
            state.movie = payload;
        },
    },
});

export const { setMovie } = useMovie.actions;

export const getMovie = (state) => state.Movie.movie;

export default useMovie.reducer;
