import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "../styles/Page/MoviesInfoPages.sass";

const MoviesInfoPage = (props) => {
  const [dataMovie, setDataMovie] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchMovie();
  }, [])

  const fetchMovie = async() => {
    try {
        const response = await fetch(
          `http://matixezor-cinema-api.herokuapp.com/api/movies/${params.id}`
        );
        const data = await response.json();
        setDataMovie(data);
      } catch (e) {
        console.error(e);
      }
  }

  const genresList = dataMovie && dataMovie.genres.map(
    (item, index) => ` ${item}${index === dataMovie.genres.length - 1 ? "" : ","}`
  );

  return (
    <div className="movie-wrap">
        {dataMovie.img ? (
          <img src={dataMovie.img} alt={dataMovie.title} className="big-image" />
        ) : (
          <div className="big-image"></div>
        )}
        <div className="basic-info">
          <h2>{dataMovie.title}</h2>
          <p>Premiera: {dataMovie.premiere}</p>
          <p>Reżyser: {dataMovie.director}</p>
          <p>Gatunek: {genresList}</p>
          <p>Opis: {dataMovie.description}</p>
        </div>
    </div>
  );
};

export default MoviesInfoPage;
