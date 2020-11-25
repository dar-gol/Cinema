import React, {useEffect, useState} from "react";

import TownList from "../components/TownList";

import "../styles/ContactPage.sass";
import '../styles/Form.sass';

const ContactPage = (props) => {
  const [cinemaInfo, setCinemaInfo] = useState(null);

  useEffect(() => {
    fetchCinemaInfo();
  }, [props.selectTown.cinema_id])

  const fetchCinemaInfo = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/cinemas/${props.selectTown.cinema_id}`
      );
      const data = await response.json();
      console.log(data);
      setCinemaInfo(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="wrapper-form">
      <h2>SKONTAKTUJ SIĘ Z NAMI </h2>
      <div className="form">
        <div className="change-of-city">
          <label htmlFor="city">Wybierz miasto:</label>
          <select
            name=""
            id="city"
            onChange={props.handleSelectTown}
            value={props.selectTown.city}
          >
            <TownList town={props.towns} />
          </select>
        </div>
        {cinemaInfo && <div className="basic-info">
          <div className='picture'>
            <i className="fas fa-phone"></i>
            <i className="fas fa-at"></i>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <div className='info'>
            <span>{cinemaInfo.contact_phone}</span>
            <span>{cinemaInfo.address}</span>
            <span>{cinemaInfo.contact_email}</span>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ContactPage;
