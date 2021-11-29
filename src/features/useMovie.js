import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movie: {
        movieId: "",
    },
};

const useMovie = createSlice({
    name: "Movie",
    initialState,
    reducers: {
        setMovieId: (state, { payload }) => {
            state.movie.movieId = payload.id;
        },
    },
});

export const { setMovieId } = useMovie.actions;

export const getMovieId = (state) => state.Movie.movie.movieId;

export default useMovie.reducer;
