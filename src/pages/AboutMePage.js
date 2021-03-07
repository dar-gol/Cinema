import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import Ticket from '../components/Ticket';

import UserContext from '../Context/UserContext';

import '../styles/Form.sass';
import '../styles/Page/AboutMePage.sass';

const AboutMePage = () => {
  const { access_token } = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);
  const [dataTickets, setDataTickets] = useState(null);

  const fetchMe = async () => {
    try {
      const response = await fetch(
        'http://matixezor-cinema-api.herokuapp.com/api/me/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: `Bearer ${access_token}`,
            Host: 'api.producthunt.com',
          },
        },
      );
      const data = await response.json();
      setDataAccount(data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMyRepertoire = async () => {
    try {
      const response = await fetch(
        'http://matixezor-cinema-api.herokuapp.com/api/reservations/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Authorization: `Bearer ${access_token}`,
            Host: 'api.producthunt.com',
          },
        },
      );
      const data = await response.json();
      setDataTickets(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMyRepertoire();
    fetchMe();
  }, []);

  return (
    dataAccount && (
      <div className="wrapper-form">
        {dataAccount.email ? (
          <>
            <div className="form">
              <div>
                <h3>
                  {dataAccount.name} {dataAccount.surname}
                </h3>
                <p>
                  <i className="fas fa-at" /> {dataAccount.email}
                </p>
                <p>
                  <i className="fas fa-phone" /> {dataAccount.phone}
                </p>
              </div>
            </div>
            <h3>Aktualne bilety:</h3>
            <div className="form form-horizontal">
              {dataTickets &&
                dataTickets.map((item) => {
                  const {
                    reservation_id,
                    repertoire,
                    day,
                    tickets,
                    price,
                  } = item;
                  return (
                    <Ticket
                      key={reservation_id}
                      repertoire={repertoire}
                      day={day}
                      tickets={tickets}
                      totalPrice={price}
                    />
                  );
                })}
            </div>
          </>
        ) : (
          <Redirect to="/logout" />
        )}
      </div>
    )
  );
};

export default AboutMePage;
