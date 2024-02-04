import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { fetchMovies } from "../redux/slices/movies";

const MovieFilter = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const selectFilter = (event) => {
    const optionValue = event.target.value;

    let type = optionValue
      .slice(1, optionValue.indexOf("]"))
      .replaceAll("'", "")
      .split(",")[0];

    let rate = optionValue
      .slice(1, optionValue.indexOf("]"))
      .replaceAll("'", "")
      .split(",")[1];

    dispatch(fetchMovies({ movieTypes: type, movieRates: rate }));
  };

  return (
    <select className="movie-filter" onChange={selectFilter}>
      <option value="[popular,1]">{t("Most popular movies")}</option>
      <option value="[popular,500]">{t("Least popular movies")}</option>
      <option value="[top_rated,1]">{t("Most rating movies")}</option>
      <option value="[top_rated,500]">{t("Least rating movies")}</option>
    </select>
  );
};

export default MovieFilter;
