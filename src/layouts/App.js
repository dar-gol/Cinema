import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import axios from "axios";

import UserContext from '../Context/UserContext';

import Header from './Header';
import Navigation from './Navigation';
import Page from './Page';
import Footer from './Footer';

import '../styles/App.sass';

function App() {
  const [failedLogin, setFailedLogin] = useState(false);

  const [user, setUser] = useState({
    email: '',
    access_token: '',
    isUserLogged: !!sessionStorage.getItem('token'),
  });

  const handleLogin = (data, e) => {
    console.log(data);
    fetch('https://matixezor-cinema-api.herokuapp.com/api/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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
        sessionStorage.setItem('token', res.access_token);
        setUser({
          email: data.email,
          access_token: res.access_token,
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
      email: '',
      access_token: '',
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
            handleLogout={handleLogout}
            failedLogin={failedLogin}
          />
        }
        {<Footer />}
      </Router>
    </UserContext.Provider>
  );
}

export default App;
