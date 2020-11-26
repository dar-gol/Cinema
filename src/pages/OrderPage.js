import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import "../styles/Page/OrderPage.sass";

const OrderPage = (props) => {
  const { repertory } = props;

  const [startTime, setStartTime] = useState(
    repertory[0].schedule[0].start_time
  );

  const params = useParams();

  const oneMovie = repertory.find((item) => item.movie.movie_id == params.id);
  const { movie, schedule } = oneMovie;

  const genresList = movie.genres.map(
    (item, index) => ` ${item}${index === movie.genres.length - 1 ? "" : ","}`
  );

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  return (
    <div className="order">
      <div className="ordering-movie">
        {movie.img ? (
          <img src={movie.img} alt={movie.title} className="big-image" />
        ) : (
          <div className="big-image"></div>
        )}
        <div className="basic-info">
          <h2>{movie.title}</h2>
          <p>Premiera: {movie.premiere}</p>
          <p>Reżyser: {movie.director}</p>
          <p>Gatunek: {genresList}</p>
        </div>
      </div>
      <div className="ordering-panel">
        <h2>Kup bilet</h2>
        <label htmlFor="hour">Wybierz godzinę:</label>
        <select name="" id="hour" onChange={handleStartTime} value={startTime}>
          {schedule.map((item) => (
            <option key={item.start_time}>{item.start_time}</option>
          ))}
        </select>
        <Link to={`hall/${startTime}`}>
          <div className="button-hour">Wybierz</div>
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;
