import React, { useState, useEffect, useContext } from "react";

import { UserContext } from "../Context/UserContext";

import "../styles/Form.sass";

const AboutMePage = (props) => {
  const { access_token } = useContext(UserContext);
  const [dataAccount, setDataAccount] = useState(null);

  useEffect(() => {
    fetchMe();
  }, []);

  const fetchMe = async () => {
    try {
      const response = await fetch(
        "http://matixezor-cinema-api.herokuapp.com/api/me/",
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
            Host: "api.producthunt.com",
          },
        }
      );
      const data = await response.json();
      setDataAccount(data);
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="wrapper-form">
      {dataAccount && 
      <div className="form">
        <h3>{dataAccount.name} {dataAccount.surname}</h3>
        <p>E-mail: {dataAccount.email}</p>
        <p>Telefon: {dataAccount.phone}</p>
      </div>
      }
    </div>
  );
};

export default AboutMePage;
