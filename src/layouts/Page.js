import React from "react";
import { Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RepertoryPage from "../pages/RepertoryPage";
import MoviesPage from "../pages/MoviesPage";
import ContactPage from "../pages/ContactPage";

import "../styles/Page.sass";

const Page = () => {
  return (
    <>
      <Route path="/" exact component={HomePage} />
      <Route path="/repertory" exact component={RepertoryPage} />
      <Route path="/movies" exact component={MoviesPage} />
      <Route path="/contact" exact component={ContactPage} />
    </>
  );
};

export default Page;
