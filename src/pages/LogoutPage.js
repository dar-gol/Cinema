import React, { useEffect } from "react";

const LogoutPage = (props) => {
  
    useEffect(() => {
        props.handleLogout();
    }, [])

  return (
    <>
      <div><p>Wylogowano pomyślnie!</p></div>
    </>
  );
};

export default LogoutPage;
