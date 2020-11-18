import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import Header from "./Header";
import Navigation from "./Navigation";
import Page from "./Page";
import Footer from "./Footer";

import "../styles/App.sass";

function App() {
  const [user, setUser] = useState({
    email: "",
    isUserLogged: sessionStorage.getItem("token") ? true : false,
  });

  const handleLogin = (data, e) => {
    fetch("https://matixezor-cinema-api.herokuapp.com/api/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        username: data.email,
        password: data.password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        if(!res.access_token) throw new Error(res.detail);
        sessionStorage.setItem("token", res.access_token);
        setUser({
          email: data.email,
          isUserLogged: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  const handleRegister = (data, e) => {
    fetch("http://matixezor-cinema-api.herokuapp.com/api/register", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        email: data.email,
        name: data.name,
        surname: data.surname,
        password: data.password,
        phone: data.phone,
      }),
      referrerPolicy: 'no-referrer',
    })
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        {<Header />}
        {<Navigation />}
        {<Page handleLogin={handleLogin} handleRegister={handleRegister} />}
        {<Footer />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
