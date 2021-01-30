import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import UserContext from '../Context/UserContext';

const PlaceSelect = () => {
  const { isUserLogged } = useContext(UserContext);

  if (!isUserLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <p>Proszę wybrać miejsce :)</p>
    </div>
  );
};

export default PlaceSelect;
