import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { fetchMoviesByName } from "../redux/slices/movies";

const MovieSearch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const searchMovie = (event) => {
    const value = event.target.value;

    if (value.length > 2) {
      dispatch(fetchMoviesByName(value));
    }
  };

  return (
    <input
      type='text'
      placeholder={t("Please search a movie")}
      className='movie-search'
      onKeyUp={searchMovie}
    />
  );
};

export default MovieSearch;
