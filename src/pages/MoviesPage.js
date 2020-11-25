import { useState, useEffect, useRef } from "react";

import MoviesList from "../components/MoviesList";

import "../styles/Page/MoviesPage.sass";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState(false);
  const inputSearch = useRef();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        "http://matixezor-cinema-api.herokuapp.com/api/movies/"
      );
      const data = await response.json();
      setMovies(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearchButton = () => {
    console.log(inputSearch.current.value);
    let item = movies.filter((item) => item.title.toUpperCase().includes(inputSearch.current.value.toUpperCase()));
    item = item ? item : false;
    setSearch(item);
    console.log(item);
    inputSearch.current.value = "";
  };

  return (
    <div className="movies">
      <div className="option">
        <div className="search">
          <input type="search" placeholder="Szukaj..." ref={inputSearch} />
          <button onClick={handleSearchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {movies ? (
        search ? (
          search.map((item) => <MoviesList key={item.movie_id} item={item} />)
        ) : (
          movies.map((item) => <MoviesList key={item.movie_id} item={item} />)
        )
      ) : (
        <div className="loading">
          <p>
            Ładowanie <span>. . .</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
