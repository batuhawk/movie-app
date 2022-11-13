import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { fetchMovieTrailer } from '../redux/slices/movies';
import { fetchMovieGenres } from '../redux/slices/movies';

const Detail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const baseMoviePoster = `https://image.tmdb.org/t/p/w500/`;
  const baseTrailerUrl = 'https://www.youtube-nocookie.com/embed/';

  const [movieDetailStorage, setmovieDetailStorage] = useState();

  const movieTrailer = useSelector((state) => state.movie.movieTrailers);
  const trailerKey = movieTrailer
    .filter((trailer) => trailer.name.includes('Official Trailer'))
    .map((trailer) => trailer.key);

  const movieGenres = useSelector((state) => state.movie.movieGenres);
  const genreIds = JSON.parse(localStorage.getItem('MovieDetail')).genre_ids;
  const selectMovieGenres = movieGenres
    .filter((genre) => genreIds.some((id) => id === genre.id))
    .map((genre) => genre);

  useEffect(() => {
    const movieDetailRead = localStorage.getItem('MovieDetail');
    setmovieDetailStorage(JSON.parse(movieDetailRead));
  }, []);

  useEffect(() => {
    dispatch(fetchMovieTrailer());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchMovieGenres());
  }, [dispatch]);

  return (
    <div className="container-detail">
      <img
        src={baseMoviePoster + movieDetailStorage?.poster_path}
        alt={movieDetailStorage?.title}
        className="movie-image"
      />
      <div className="movie-details">
        <iframe
          width="850"
          height="525"
          src={`${baseTrailerUrl}${trailerKey[0]}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />

        <span>
          <b>{t('Name')}</b>
          {movieDetailStorage?.title}
        </span>
        <span>
          <b>{t('Relase date')}</b>
          {movieDetailStorage?.release_date.replaceAll('-', '.')}
        </span>
        <span>
          <b>{t('Summary')}</b>
          {movieDetailStorage?.overview}
        </span>
        <span>
          <b>{t('Rate')}</b>
          {movieDetailStorage?.vote_average}
        </span>
        <span>
          <b>{t('Genres')}</b>
          {selectMovieGenres.map((movie) => (
            <div key={movie.id}>{movie.name}</div>
          ))}
        </span>
      </div>
    </div>
  );
};

export default Detail;
