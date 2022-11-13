import { configureStore } from '@reduxjs/toolkit';
import MovieSlice from './slices/movies';

const store = configureStore({
  reducer: {
    movie: MovieSlice,
  },
});

export default store;
