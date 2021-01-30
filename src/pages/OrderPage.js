import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../styles/Page/OrderPage.sass';

const OrderPage = (props) => {
  const { repertory } = props;

  const [startTime, setStartTime] = useState(
    repertory[0].schedule[0].start_time,
  );

  const params = useParams();

  console.log(repertory);

  const oneMovie =
    repertory &&
    repertory.find((item) => item.movie.movie_id === parseInt(params.id, 10));
  const { movie, schedule } = oneMovie;

  console.log(oneMovie);

  const genresList = movie.genres.map(
    (item, index) => ` ${item}${index === movie.genres.length - 1 ? '' : ','}`,
  );

  const handleStartTime = (e) => {
    setStartTime(e.target.value);
  };

  return (
    repertory && (
      <div className="order">
        <div className="ordering-movie">
          {movie.img ? (
            <img src={movie.img} alt={movie.title} className="big-image" />
          ) : (
            <div className="big-image" />
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
          <label htmlFor="hour">
            Wybierz godzinę:
            <select
              name="hour"
              id="hour"
              onChange={handleStartTime}
              value={startTime}
            >
              {schedule.map((item) => (
                <option key={item.start_time}>{item.start_time}</option>
              ))}
            </select>
          </label>
          <Link to={`hall/${startTime}`}>
            <div className="button-hour">Wybierz</div>
          </Link>
        </div>
      </div>
    )
  );
};

export default OrderPage;
