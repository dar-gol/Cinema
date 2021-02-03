import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import UserContext from '../Context/UserContext';

import '../styles/Page/PlaceSelect.sass';

const PlaceSelect = () => {
  const { handleSubmit } = useForm();

  const { isUserLogged } = useContext(UserContext);
  // const [places, setPlaces] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [divPlaces, setDivPlaces] = useState(null);
  const [busyPlace, setBusyPlace] = useState([]);

  const params = useParams();

  // console.log(params);
  // console.log(places);

  const handlePlace = (i, e) => {
    // console.log(busyPlace);
    if (busyPlace && busyPlace.includes(i)) {
      console.log('Zawiera sie w busyPlace');
    } else if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      setSelectedPlaces((prev) => prev.filter((item) => item !== i));
    } else {
      e.target.classList.add('selected');
      setSelectedPlaces((prev) => [...prev, i]);
    }
  };

  const handlePush = (item) => {
    console.log(`BusyPlace: ${busyPlace}`);
    if (item) {
      const { capacity } = item;
      const items = [];
      for (let i = 1; i <= capacity; i += 1) {
        items.push(
          <button
            type="button"
            key={i}
            className={`seat ${
              busyPlace && busyPlace.includes(i) ? 'busy' : ''
            }`}
            onClick={(e) => handlePlace(i, e)}
          >
            {i}
          </button>,
        );
      }
      setDivPlaces(items);
    }
  };

  const fetchBusy = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/repertoire/${params.repertoryId}/seats/2020-12-04`,
      );
      const data = await response.json();
      // console.log(data);
      setBusyPlace(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/tickets/`,
      );
      const data = await response.json();
      console.log(data);
      setTickets(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchHall = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/cinemas/${params.cinemaId}/hall/${params.hallId}`,
      );
      const data = await response.json();
      // console.log(data);
      // setPlaces(data);
      handlePush(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReservations = () => {
    console.log('Kupuję i płacę :)');
    console.log(tickets);
    console.log(selectedPlaces);
  };

  useEffect(() => {
    fetchBusy();
    fetchTickets();
    fetchHall();
  }, [busyPlace[0]]);

  if (!isUserLogged) {
    return <Redirect to="/login" />;
  }

  return (
    tickets && (
      <>
        <div className="places">{divPlaces}</div>
        <div className="wrapper-form">
          <h2>WYBIERZ MIEJSCA I OPCJĘ</h2>
          <form className="form" onSubmit={handleSubmit(handleReservations)}>
            {tickets.map((item) => (
              <div key={item.ticket_id} className="radio-item">
                <label htmlFor>
                  <input type="radio" value="item.value" name="kindOfTicket" />{' '}
                  {item.name}
                </label>
              </div>
            ))}
            <button type="submit">Kupuję z obowiązkiem zapłaty</button>
          </form>
        </div>
      </>
    )
  );
};

export default PlaceSelect;
