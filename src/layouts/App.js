import React, { useState, useEffect } from "react";
import { BrowserRouter as Router} from "react-router-dom";
// import axios from "axios";

import { UserContext } from "../Context/UserContext";

import Header from "./Header";
import Navigation from "./Navigation";
import Page from "./Page";
import Footer from "./Footer";

import "../styles/App.sass";

function App() {
  const [failedLogin, setFailedLogin] = useState(false);
  const [towns, setTowns] = useState(null);
  const [selectTown, setSelectTown] = useState({cinema_id: 1, city: "Poznań"});

  const [user, setUser] = useState({
    email: "",
    isUserLogged: sessionStorage.getItem("token") ? true : false,
  });

  useEffect(() => {
    fetchTown();
  }, []);

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
        console.log(res);
        if (!res.access_token) throw new Error(res.detail);
        sessionStorage.setItem("token", res.access_token);
        setUser({
          email: data.email,
          isUserLogged: true,
        });
        setFailedLogin(false);
      })
      .catch((error) => {
        console.log(error);
        setFailedLogin(true);
      });
    e.target.reset();
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser({
      email: "",
      isUserLogged: false,
    });
  };

  const fetchTown = async () => {
    try {
      const response = await fetch(
        "http://matixezor-cinema-api.herokuapp.com/api/cinemas/?limit=100"
      );
      const data = await response.json();
      setTowns(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSelectTown = (e) => {
    let index;
    if(towns !== null){
      towns.forEach(item => {
        if(item.city === e.target.value){
          index = item.cinema_id;
          return;
        }
      });
    }
    setSelectTown({cinema_id: index, city: e.target.value});
  }


  return (
    <UserContext.Provider value={user}>
      <Router>
        {<Header 
          handleSelectTown={handleSelectTown}
          selectTown={selectTown.city}
          towns={towns}
        />}
        {<Navigation />}
        {
          <Page
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            failedLogin={failedLogin}
            selectTown={selectTown.cinema_id}
          />
        }
        {<Footer />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
