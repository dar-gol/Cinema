import { useState, useEffect } from "react";

import MoviesList from "../components/MoviesList";

import "../styles/Page/MoviesPage.sass";

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);

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

  return (
    <div className="movies">
      {movies ? (
        movies.map((item) => <MoviesList key={item.movie_id} item={item} />)
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
