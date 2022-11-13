import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  loading: false,
  status: null,

  movieTrailers: [],
  movieGenres: [],
};

/*--- Generates Pending, Fulfilled and Rejected Action Types (All Movies) ---*/
export const fetchMovies = createAsyncThunk(
  "movie/fetchMovies",
  async (params) => {
    const movieApi = `https://api.themoviedb.org/3/movie/${params.movieTypes}?api_key=ebd322daebc2cc0384ea5de245be29e7&page=${params.movieRates}`;
    try {
      const response = await axios.get(movieApi);
      return response.data.results;
    } catch (error) {
      console.error("Error", error);
    }
  }
);

/*--- Generates Pending, Fulfilled and Rejected Action Types (Movie Trailer By Movie Id) ---*/
export const fetchMovieTrailer = createAsyncThunk(
  "movie/fetchMovieTrailer",
  async () => {
    const movieId = JSON.parse(localStorage.getItem("MovieDetail")).id;
    const movieTrailerApi = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=ebd322daebc2cc0384ea5de245be29e7`;
    try {
      const response = await axios.get(movieTrailerApi);
      return response.data.results;
    } catch (error) {
      console.error("Error", error);
    }
  }
);

/*--- Generates Pending, Fulfilled and Rejected Action Types (Movie Genres By Movie Genre Ids) ---*/
export const fetchMovieGenres = createAsyncThunk(
  "movie/fetchMovieGenres",
  async () => {
    const movieGenresApi = `https://api.themoviedb.org/3/genre/movie/list?api_key=ebd322daebc2cc0384ea5de245be29e7`;
    try {
      const response = await axios.get(movieGenresApi);
      return response.data.genres;
    } catch (error) {
      console.error("Error", error);
    }
  }
);

/*--- Generates Pending, Fulfilled and Rejected Action Types (Movies By Name) ---*/
export const fetchMoviesByName = createAsyncThunk(
  "movie/fetchMoviesByName",
  async (name) => {
    const movieApi = `https://api.themoviedb.org/3/search/movie?api_key=ebd322daebc2cc0384ea5de245be29e7&query=${name}`;
    try {
      const response = await axios.get(movieApi);
      return response.data.results;
    } catch (error) {
      console.error("Error", error);
    }
  }
);

const MovieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /*-- All Movies --*/
    builder.addCase(fetchMovies.pending, (state) => {
      state.loading = true;
      state.status = "Pending";
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "Fulfilled";
    });
    builder.addCase(fetchMovies.rejected, (state) => {
      state.loading = false;
      state.data = [];
      state.status = "Rejected";
    });
    /*---------------*/

    /*-- Movie Trailers --*/
    builder.addCase(fetchMovieTrailer.pending, (state) => {
      state.loading = true;
      state.status = "Pending";
    });
    builder.addCase(fetchMovieTrailer.fulfilled, (state, action) => {
      state.loading = false;
      state.movieTrailers = action.payload;
      state.status = "Fulfilled";
    });
    builder.addCase(fetchMovieTrailer.rejected, (state) => {
      state.loading = false;
      state.status = "Rejected";
    });
    /*---------------*/

    /*-- Movie Genres --*/
    builder.addCase(fetchMovieGenres.pending, (state) => {
      state.loading = true;
      state.status = "Pending";
    });
    builder.addCase(fetchMovieGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.movieGenres = action.payload;
      state.status = "Fulfilled";
    });
    builder.addCase(fetchMovieGenres.rejected, (state) => {
      state.loading = false;
      state.status = "Rejected";
    });
    /*---------------*/

    /*-- Movies By Name --*/
    builder.addCase(fetchMoviesByName.pending, (state) => {
      state.loading = true;
      state.status = "Pending";
    });
    builder.addCase(fetchMoviesByName.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.status = "Fulfilled";
    });
    builder.addCase(fetchMoviesByName.rejected, (state) => {
      state.loading = false;
      state.status = "Rejected";
    });
    /*---------------*/
  },
});

export default MovieSlice.reducer;
