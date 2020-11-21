import React, { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RepertoryPage from "../pages/RepertoryPage";
import MoviesPage from "../pages/MoviesPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LogoutPage from "../pages/LogoutPage";

import "../styles/Page.sass";

const Page = (props) => {
  return (
    <main className="page">
      <Route path="/" exact component={HomePage} />
      <Route path="/repertory" exact component={RepertoryPage} />
      <Route path="/movies" exact component={MoviesPage} />
      <Route path="/contact" exact component={ContactPage} />

      <Route path="/login" exact render={
        () => <LoginPage handleLogin={props.handleLogin} failedLogin={props.failedLogin} />
      } />
      <Route path="/logout" exact render={
        () => <LogoutPage handleLogout={props.handleLogout} />
      } />
      <Route path="/register" exact render={
        () => <RegisterPage 
        handleRegister={props.handleRegister} 
        failedRegister={props.failedRegister}
        messageRegister={props.messageRegister}
        />
      } />
    </main>
  );
};

export default Page;
