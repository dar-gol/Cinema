import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import '../styles/Page/MoviesInfoPages.sass';

const MoviesInfoPage = () => {
  const [dataMovie, setDataMovie] = useState(false);
  const params = useParams();

  const fetchMovie = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/movies/${params.id}`,
      );
      const data = await response.json();
      setDataMovie(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  const genresList =
    dataMovie &&
    dataMovie.genres.map(
      (item, index) =>
        ` ${item}${index === dataMovie.genres.length - 1 ? '' : ','}`,
    );

  return (
    <div className="movie-wrap">
      {dataMovie.img ? (
        <img src={dataMovie.img} alt={dataMovie.title} className="big-image" />
      ) : (
        <div className="big-image" />
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
