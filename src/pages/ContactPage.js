import React, { useEffect, useState } from 'react';

import TownList from '../components/TownList';

import '../styles/ContactPage.sass';
import '../styles/Form.sass';

const ContactPage = ({ selectTown, handleSelectTown, towns }) => {
  const [cinemaInfo, setCinemaInfo] = useState(null);

  const fetchCinemaInfo = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/cinemas/${selectTown.cinema_id}`,
      );
      const data = await response.json();
      console.log(data);
      setCinemaInfo(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchCinemaInfo();
  }, [selectTown.cinema_id]);

  return (
    <div className="wrapper-form">
      <h2>SKONTAKTUJ SIĘ Z NAMI </h2>
      <div className="form">
        <div className="change-of-city">
          <label htmlFor="city">
            Wybierz miasto:
            <select
              name=""
              id="city"
              onChange={handleSelectTown}
              value={selectTown.city}
            >
              <TownList town={towns} />
            </select>
          </label>
        </div>
        {cinemaInfo && (
          <div className="basic-info">
            <div className="picture">
              <i className="fas fa-phone" />
              <i className="fas fa-at" />
              <i className="fas fa-map-marker-alt" />
            </div>
            <div className="info">
              <span>{cinemaInfo.contact_phone}</span>
              <span>{cinemaInfo.address}</span>
              <span>{cinemaInfo.contact_email}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
