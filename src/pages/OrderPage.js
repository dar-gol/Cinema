import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "../styles/Page/OrderPage.sass";

const OrderPage = (props) => {
  const { repertory } = props;
  const params = useParams();

  const oneMovie =
    repertory && repertory.find((item) => item.movie.movie_id == params.id);
  const { movie, schedule } = oneMovie;

  console.log(movie, schedule);

  const genresList =
    movie &&
    movie.genres.map(
      (item, index) => ` ${item}${index === movie.genres.length - 1 ? "" : ","}`
    );

  return (
    <div className="order">
      {movie && (
        <div className="ordering-movie">
          {movie.img ? <img src={movie.img} alt={movie.title} className='big-image'/> : <div className='big-image'></div>}
          <div className="basic-info">
            <h2>{movie.title}</h2>
            <p>Premiera: {movie.premiere}</p>
            <p>Reżyser: {movie.director}</p>
            <p>Gatunek: {genresList}</p>
          </div>
        </div>
      )}
      {schedule && <div className="ordering-panel">
            <h2>Kup bilet</h2>
            <label htmlFor="hour">Wybierz godzinę:</label>
            <select name="" id="hour">
            {schedule.map((item) => (
                <option key={item.start_time}>{item.start_time}</option>
                ))}
            </select>
            <div className="button-hour">Wybierz</div>
      </div>}
    </div>
  );
};

export default OrderPage;
