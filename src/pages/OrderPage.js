import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import '../styles/Page/OrderPage.sass';

const OrderPage = (props) => {
  const { repertory } = props;

  const TodayDate = new Date();
  const formattedDate = `${TodayDate.getFullYear()}-${
    TodayDate.getMonth() < 10
      ? `0${TodayDate.getMonth()}`
      : TodayDate.getMonth()
  }-${
    TodayDate.getDate() < 10 ? `0${TodayDate.getDate()}` : TodayDate.getDate()
  }`;

  const [startTime, setStartTime] = useState(repertory[0].schedule[0]);
  const [selectedDate, setSelectedDate] = useState(formattedDate);

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

  const handleDate = (e) => {
    setSelectedDate(e.target.value);
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
          <label htmlFor="date">
            Wybierz datę:
            <input
              type="date"
              id="date"
              className="chossen-date"
              value={selectedDate}
              onChange={handleDate}
              min={formattedDate}
            />
          </label>
          <br />
          <label htmlFor="hour">
            Wybierz godzinę:
            <select
              name="hour"
              id="hour"
              className="chossen-date"
              onChange={handleStartTime}
              value={startTime.start_time}
            >
              {schedule.map((item) => (
                <option key={item.start_time}>{item.start_time}</option>
              ))}
            </select>
          </label>
          <Link
            to={`date/${selectedDate}/hall/${startTime.hall_id}/repertory/${startTime.repertoire_id}`}
          >
            <div className="button-hour">Wybierz</div>
          </Link>
        </div>
      </div>
    )
  );
};

export default OrderPage;
