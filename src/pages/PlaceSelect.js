import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';

import UserContext from '../Context/UserContext';

import '../styles/Page/PlaceSelect.sass';

const PlaceSelect = () => {
  const { isUserLogged, access_token } = useContext(UserContext);
  const [places, setPlaces] = useState(null);
  const [tickets, setTickets] = useState(null);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [bought, setBought] = useState('no');
  const [busyPlace, setBusyPlace] = useState([]);
  const [cost, setCost] = useState({ ticketId: 1, name: 'normal', value: 0 });

  const params = useParams();

  // console.log(params);
  // console.log(places);
  console.log(`Data: ${params.selectedDate}`);

  const handlePlace = (i, e) => {
    console.log(cost);
    console.log(selectedPlaces);
    if (busyPlace && busyPlace.includes(i)) {
      console.log('Zawiera sie w busyPlace');
    } else if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
      setSelectedPlaces((prev) => prev.filter((item) => item.number !== i));
    } else {
      e.target.classList.add('selected');
      setSelectedPlaces((prev) => [
        ...prev,
        { number: i, cost: Number(cost.value), ticketId: cost.ticketId },
      ]);
    }
    if (selectedPlaces.length === 0) {
      setBought('no');
      console.log('set bought on no');
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
      return items;
    }
    return null;
  };

  const fetchBusy = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/repertoire/${params.repertoryId}/seats/${params.selectedDate}`,
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
      setCost((prev) => ({
        name: prev.name,
        value: data[0].price,
        ticketId: data[0].ticket_id,
      }));
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
      setPlaces(data);
      handlePush(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReservations = () => {
    console.log(`Data ${params.selectedDate}`);
    if (selectedPlaces.length !== 0) {
      console.log('Kupuję i płacę :)');
      console.log(tickets);
      console.log(selectedPlaces);

      fetch('http://matixezor-cinema-api.herokuapp.com/api/reservations/', {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${access_token}`,
          Host: 'api.producthunt.com',
        },
        body: JSON.stringify({
          reservation: {
            repertoire_id: params.repertoryId,
            price: selectedPlaces.reduce((prevValue, currentValue) => {
              console.log(prevValue, currentValue);
              return prevValue + currentValue.cost;
            }, 0),
            day: params.selectedDate,
          },
          tickets: selectedPlaces.map((item) => ({
            ticket_id: item.ticketId,
            seat: item.number,
          })),
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('Wynik:');
          console.log(res);
          setBought('yes');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error('Nie wybrano żadnego miejsca');
      setBought('Nie wybrano żadnego miejsca!');
    }
  };

  const changeRadioTickets = (e, ticketId) => {
    const { id, value } = e.target;
    setCost({ ticketId, name: id, value });
  };

  useEffect(() => {
    fetchBusy();
    fetchTickets();
    fetchHall();
  }, [busyPlace[0]]);

  if (!isUserLogged) {
    return <Redirect to="/login" />;
  }
  if (bought === 'yes') {
    return <Redirect to="/account" />;
  }

  return (
    tickets && (
      <>
        <div className="places">{handlePush(places)}</div>
        <div className="wrapper-form">
          <h2>WYBIERZ MIEJSCA I OPCJĘ</h2>
          <div className="form">
            {tickets.map((item) => (
              <div key={item.ticket_id} className="radio-item">
                <label htmlFor={item.name}>
                  <input
                    id={item.name}
                    type="radio"
                    value={item.price}
                    name="kindOfTicket"
                    onChange={(e) => changeRadioTickets(e, item.ticket_id)}
                    checked={cost.name === item.name}
                  />{' '}
                  {item.name}({item.price} zł)
                </label>
              </div>
            ))}
            Wybrane miejsca:
            <ul>
              {selectedPlaces.map((item) => (
                <li key={item.number}>
                  Miejsce nr: {item.number} (Koszt: {item.cost} zł)
                </li>
              ))}
            </ul>
            {selectedPlaces.length !== 0 ? (
              <p>
                Łączny koszt:{' '}
                {selectedPlaces.reduce((prevValue, currentValue) => {
                  return prevValue + currentValue.cost;
                }, 0)}{' '}
                zł
              </p>
            ) : null}
            {bought !== 'yes' && bought !== 'no' && <p>{bought}</p>}
            <button type="submit" onClick={handleReservations}>
              Kupuję z obowiązkiem zapłaty
            </button>
          </div>
        </div>
      </>
    )
  );
};

export default PlaceSelect;
