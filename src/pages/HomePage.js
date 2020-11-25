import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../styles/Page/MoviesPage.sass";
import "../styles/HomePage.sass";

const HomePage = () => {
  const [randomMovie, setRandomMovie] = useState(null);

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const fetchRandomMovie = async () => {
    try {
      const response = await fetch(
        "http://matixezor-cinema-api.herokuapp.com/api/movies/recommended"
      );
      const data = await response.json();
      console.log(data);
      setRandomMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="home">
        <h2>MAXI KINO</h2>
      </div>
      <div className="movies">
        <div className='option'>
            <h3>POLECANY TYTUŁ </h3>
        </div>
        {randomMovie && 
        <Link to={`/movies/${randomMovie.movie_id}`}>
        <div className="movie">
          {randomMovie.min_img ? (
            <img src={randomMovie.min_img} className="image" alt={randomMovie.title} />
          ) : (
            <div className="image"></div>
          )}
          <div>
            <h2>Tytuł: {randomMovie.title}</h2>
            <p>Reżyser: {randomMovie.director}</p>
          </div>
        </div>
        </Link>
        }
      </div>
    </>
  );
};

export default HomePage;
