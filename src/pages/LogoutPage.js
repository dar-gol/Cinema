import React, { useEffect } from 'react';

import '../styles/Form.sass';

const LogoutPage = (props) => {
  useEffect(() => {
    props.handleLogout();
  }, []);

  return (
    <div className="wrapper-form">
      <div className="form">
        <p>Wylogowano pomyślnie!</p>
      </div>
    </div>
  );
};

export default LogoutPage;
