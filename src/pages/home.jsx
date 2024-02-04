// Enviroment
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Compoennts
import LanguageSelect from "../components/Language-Select";
import MovieCard from "../components/Movie-Card";
import MovieFilter from "../components/Movie-Filter";
import MovieSearch from "../components/Movie-Search";

//Store
import { fetchMovies } from "../redux/slices/movies";

const Home = () => {
  const movieList = useSelector((state) => state.movie.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies({ movieTypes: "popular", movieRates: 1 }));
  }, [dispatch]);

  return (
    <div className='container'>
      <div className='header'>
        <MovieSearch />
        <LanguageSelect />
      </div>
      <div className='content'>
        <MovieFilter />
        <div className='row'>
          {movieList.map((movie, index) => (
            <MovieCard movies={movie} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
