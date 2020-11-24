import React, { useEffect, useState } from "react";
import { Route} from "react-router-dom";

import HomePage from "../pages/HomePage";
import RepertoryPage from "../pages/RepertoryPage";
import OrderPage from "../pages/OrderPage"
import MoviesPage from "../pages/MoviesPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LogoutPage from "../pages/LogoutPage";

import "../styles/Page/Page.sass";

const Page = (props) => {

  const [repertory, setRepertory] = useState(false);

  useEffect(() => {
    // console.log("Repertory: " + props.selectTown);
    fetchRepertoryOfCity();
  }, [props.selectTown]);

  const fetchRepertoryOfCity = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/repertoire/${props.selectTown}`
      );
      const data = await response.json();
      console.log(data);
      setRepertory(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="page">
      <Route path="/" exact component={HomePage} />

      <Route path="/repertory" exact render={
        () => <RepertoryPage repertory={repertory} />
      } />

      <Route path="/order/cinema/:cinema_id/movie/:id" render={
        () => <OrderPage repertory={repertory} />
      } />

      <Route path="/movies" exact component={MoviesPage} />
      
      <Route path="/contact" exact component={ContactPage} />

      <Route path="/login" exact render={
        () => <LoginPage handleLogin={props.handleLogin} failedLogin={props.failedLogin} />
      } />
      <Route path="/logout" exact render={
        () => <LogoutPage handleLogout={props.handleLogout} />
      } />
      <Route path="/register" exact component={RegisterPage} />
    </main>
  );
};

export default Page;
