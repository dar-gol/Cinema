import React, { useState, useEffect, useContext } from 'react';

import UserContext from '../Context/UserContext';

import '../styles/Form.sass';
import '../styles/Page/AboutMePage.sass';

const AboutMePage = () => {
  const { access_token } = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);

  const fetchMe = async () => {
    console.log(`Token: ${access_token}`);
    try {
      const response = await fetch(
        'http://matixezor-cinema-api.herokuapp.com/api/me/',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${access_token}`,
            Host: 'api.producthunt.com',
          },
        },
      );
      const data = await response.json();
      setDataAccount(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  return (
    <div className="wrapper-form">
      {dataAccount && (
        <div className="form">
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
      )}
    </div>
  );
};

export default AboutMePage;
