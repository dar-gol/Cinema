import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../styles/Page/OrderPage.sass';

const OrderPage = (props) => {
  const { repertory } = props;

  const [startTime, setStartTime] = useState(repertory[0].schedule[0]);

  const params = useParams();

  const oneMovie =
    repertory &&
    repertory.find((item) => item.movie.movie_id === parseInt(params.id, 10));
  const { movie, schedule } = oneMovie;

  const genresList = movie.genres.map(
    (item, index) => ` ${item}${index === movie.genres.length - 1 ? '' : ','}`,
  );

  const handleStartTime = (e) => {
    setStartTime(schedule.find((item) => item.start_time === e.target.value));
    console.log('handleStartTime');
    console.log(startTime);
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
              value={startTime.start_time}
            >
              {schedule.map((item) => (
                <option key={item.start_time}>{item.start_time}</option>
              ))}
            </select>
          </label>
          <Link
            to={`hall/${startTime.hall_id}/repertory/${startTime.repertoire_id}`}
          >
            <div className="button-hour">Wybierz</div>
          </Link>
        </div>
      </div>
    )
  );
};

export default OrderPage;
