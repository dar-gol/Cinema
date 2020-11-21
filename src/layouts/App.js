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
  const [failedRegister, setFailedRegister] = useState(false);
  const [messageRegister, setMessageRegister] = useState(null);

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

  const handleRegister = (data, e) => {
    setMessageRegister(null);
    setFailedRegister(false);
    if(data.password !== data.confirmPassword){
      return setFailedRegister([{
        loc: [
          "body",
          "confirmPassword"
        ],
        msg: "Potwierdzenie hasła nie jest prawidłowe!",
        type: "input"
      }])
    }
    fetch("http://matixezor-cinema-api.herokuapp.com/api/register", {
      method: "POST",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) throw res;
        setMessageRegister("Pomyślnie zarejestrowano!");
        e.target.reset();
        console.log(res);
        console.log("THEN");
      })
      .catch((error) => {
        // console.log("Error occurred");
        try {
          error.json().then((body) => {
            // console.log(body);
            // console.log(body.detail);
            if(typeof body.detail === 'string') {
              setMessageRegister(body.detail)
              e.target.reset();
            }
            else setFailedRegister(body.detail);
          });
        } catch (e) {
          console.log("Error parsing promise");
          console.log(error);
        }
      });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser({
      email: "",
      isUserLogged: false,
    });
  };

  return (
    <UserContext.Provider value={user}>
      <Router>
        {<Header />}
        {<Navigation />}
        {
          <Page
            handleLogin={handleLogin}
            handleRegister={handleRegister}
            handleLogout={handleLogout}
            failedLogin={failedLogin}
            failedRegister={failedRegister}
            messageRegister={messageRegister}
          />
        }
        {<Footer />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
