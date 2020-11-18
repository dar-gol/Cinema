import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RepertoryPage from "../pages/RepertoryPage";
import MoviesPage from "../pages/MoviesPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import "../styles/Page.sass";

const Page = (props) => {

  return (
    <main className="page">
      <Route path="/" exact component={HomePage} />
      <Route path="/repertory" exact component={RepertoryPage} />
      <Route path="/movies" exact component={MoviesPage} />
      <Route path="/contact" exact component={ContactPage} />

      <Route path="/login" exact render={
        () => <LoginPage handleLogin={props.handleLogin} />
      } />
      <Route path="/register" exact render={
        () => <RegisterPage handleRegister={props.handleRegister} />
      } />
    </main>
  );
};

export default Page;
