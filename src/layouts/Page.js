import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import RepertoryPage from "../pages/RepertoryPage";
import OrderPage from "../pages/OrderPage";
import MoviesPage from "../pages/MoviesPage";
import MoviesInfoPage from "../pages/MoviesInfoPage";
import ContactPage from "../pages/ContactPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import LogoutPage from "../pages/LogoutPage";

import "../styles/Page/Page.sass";

const Page = (props) => {
  const [repertory, setRepertory] = useState(false);
  const [towns, setTowns] = useState(null);
  const [selectTown, setSelectTown] = useState({
    cinema_id: 1,
    city: "Poznań",
  });

  useEffect(() => {
    fetchTown();
    fetchRepertoryOfCity();
  }, [selectTown.cinema_id]);

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
    if (towns !== null) {
      towns.forEach((item) => {
        if (item.city === e.target.value) {
          index = item.cinema_id;
          return;
        }
      });
    }
    setSelectTown({ cinema_id: index, city: e.target.value });
  };

  const fetchRepertoryOfCity = async () => {
    try {
      const response = await fetch(
        `http://matixezor-cinema-api.herokuapp.com/api/repertoire/${selectTown.cinema_id}`
      );
      const data = await response.json();
      setRepertory(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="page">
      <Route path="/" exact component={HomePage} />

      <Route
        path="/repertory"
        exact
        render={() => (
          <RepertoryPage
            repertory={repertory}
            handleSelectTown={handleSelectTown}
            selectTown={selectTown}
            towns={towns}
          />
        )}
      />

      {repertory && (
        <Route
          path="/order/cinema/:cinema_id/movie/:id/"
          exact
          render={() => <OrderPage repertory={repertory} />}
        />
      )}

      <Route path="/movies" exact component={MoviesPage} />
      <Route path="/movies/:id" exact component={MoviesInfoPage} />

      <Route
        path="/contact"
        exact
        render={() => (
          <ContactPage
            handleSelectTown={handleSelectTown}
            selectTown={selectTown}
            towns={towns}
          />
        )}
      />

      <Route
        path="/login"
        exact
        render={() => (
          <LoginPage
            handleLogin={props.handleLogin}
            failedLogin={props.failedLogin}
          />
        )}
      />
      <Route
        path="/logout"
        exact
        render={() => <LogoutPage handleLogout={props.handleLogout} />}
      />
      <Route path="/register" exact component={RegisterPage} />
    </main>
  );
};

export default Page;
