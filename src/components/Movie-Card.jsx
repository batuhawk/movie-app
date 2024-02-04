import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { fetchMovieTrailer } from "../redux/slices/movies";

const MovieCard = (props) => {
  const movieImage = `https://image.tmdb.org/t/p/w500/`;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="movie-card">
      <img
        src={movieImage + props.movies.poster_path}
        alt={props.movies.title}
        className="movie-card__image"
      />
      <div className="movie-card__preview">
        <h4>
          {t("Name")}
          {props.movies.title}
        </h4>
        <p>
          {t("Relase date")}
          {props.movies.release_date.replaceAll("-", ".")}
        </p>
        <button
          onClick={() => {
            dispatch(fetchMovieTrailer(props.movies));
            localStorage.setItem("MovieDetail", JSON.stringify(props.movies));
            navigate("/detail");
          }}
        >
          {t("Detail")}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
