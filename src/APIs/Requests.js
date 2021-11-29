const API_KEY = "23517fc10cdd60bba34303c2b32628d2";

const Requests = {
    fetchTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/movie?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchKidsMovies: `/discover/movie?api_key=${API_KEY}&certification_country=US&certification.lte=G&sort_by=popularity.desc`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_geners=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_geners=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_geners=10749`,
    fetchTrendingTv: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginalsTv: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRatedTv: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchPopularTv: `/tv/popular?api_key=${API_KEY}&language=en-US`,
    fetchOnTheAirTv: `/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`,
    fetchAiringTodayTv: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
};

export default Requests;
