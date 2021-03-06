import React from 'react';
import { Link } from 'react-router-dom';

const RepertoryList = ({ item }) => {
  const { cinema_id, movie } = item;

  return (
    <Link to={`/order/cinema/${cinema_id}/movie/${movie.movie_id}/`}>
      <div className="movie">
        {movie.min_img ? (
          <img src={movie.min_img} className="image" alt={movie.title} />
        ) : (
          <div className="image" />
        )}
        <div>
          <h2>Tytuł: {movie.title}</h2>
          <p>Reżyser: {movie.director}</p>
        </div>
      </div>
    </Link>
  );
};

export default RepertoryList;
