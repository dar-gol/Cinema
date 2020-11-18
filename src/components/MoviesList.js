import React from "react";

const MoviesList = (props) => {
  const { title, genres, director, min_img } = props.item;

  const genresList = genres.map((item, index) => ` ${item}${index === genres.length - 1 ? '' : ','}`)

  return (
    <>
      <div className="movie">
        {min_img ? <img src={min_img} className="image" alt={title}/> : <div className="image"></div>}
        <div>
          <h2>Tytuł: {title}</h2>
          <p>Reżyser: {director}</p>
          <p>Gatunek: {genresList}</p>
        </div>
      </div>
    </>
  );
};

export default MoviesList;
