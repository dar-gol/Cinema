import React from "react";
import { Link } from "react-router-dom";

const MoviesList = (props) => {
  const { title, genres, director, min_img } = props.item;

  const genresList = genres.map(
    (item, index) => ` ${item}${index === genres.length - 1 ? "" : ","}`
  );

  return (
    <>
      <Link to={`/movies/${props.item.movie_id}`}>
        <div className="movie">
          {min_img ? (
            <img src={min_img} className="image" alt={title} />
          ) : (
            <div className="image"></div>
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
