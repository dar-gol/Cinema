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
    name: "",
    email: "",
    isUserLogged: sessionStorage.getItem("token") ? true : false,
  });

  const handleLogin = (data, e) => {
    fetch("http://matixezor-cinema-api.herokuapp.com/api/token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        "username": data.username,
        "password": data.password
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.access_token);
        sessionStorage.setItem("token", res.access_token);
        setUser({
          name: data.username,
          email: data.username,
          isUserLogged: true,
        });
      })
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
        {<Page handleLogin={handleLogin} />}
        {<Footer />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
