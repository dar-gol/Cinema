import React from "react";

const MoviesList = (props) => {
  const { title, genre, director } = props.item;
  return (
    <>
      <div className="movie">
        <div className="image"></div>
        <div>
          <h2>Tytuł: {title}</h2>
          <p>Reżyser: {director}</p>
          <p>Gatunek: {genre}</p>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
