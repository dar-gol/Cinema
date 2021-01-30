import React, { useState, useEffect, useRef } from 'react';

import MoviesList from '../components/MoviesList';

import '../styles/Page/MoviesPage.sass';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [search, setSearch] = useState(false);
  const inputSearch = useRef();

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        'http://matixezor-cinema-api.herokuapp.com/api/movies/',
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
    let item = movies.filter((element) =>
      element.title
        .toUpperCase()
        .includes(inputSearch.current.value.toUpperCase()),
    );
    item = item || false;
    setSearch(item);
    console.log(item);
    inputSearch.current.value = '';
  };

  const MoviesDiv = () => {
    if (search) {
      return search.map((item) => (
        <MoviesList key={item.movie_id} item={item} />
      ));
    }
    if (movies) {
      return movies.map((item) => (
        <MoviesList key={item.movie_id} item={item} />
      ));
    }
    return (
      <div className="loading">
        <p>
          Ładowanie <span>. . .</span>
        </p>
      </div>
    );
  };

  return (
    <div className="movies">
      <div className="option">
        <div className="search">
          <input type="search" placeholder="Szukaj..." ref={inputSearch} />
          <button type="button" onClick={handleSearchButton}>
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
      {MoviesDiv()}
    </div>
  );
};

export default MoviesPage;
