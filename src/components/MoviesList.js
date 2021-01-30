import React from 'react';
import { Link } from 'react-router-dom';

const MoviesList = ({ item }) => {
  const { title, genres, director, min_img, movie_id } = item;

  const genresList = genres.map(
    (element, index) => ` ${element}${index === genres.length - 1 ? '' : ','}`,
  );

  return (
    <>
      <Link to={`/movies/${movie_id}`}>
        <div className="movie">
          {min_img ? (
            <img src={min_img} className="image" alt={title} />
          ) : (
            <div className="image" />
          )}
          <div>
            <h2>Tytuł: {title}</h2>
            <p>Reżyser: {director}</p>
            <p>Gatunek: {genresList}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MoviesList;
