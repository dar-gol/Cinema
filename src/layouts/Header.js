import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import TownList from "../components/TownList";

import "../styles/Header.sass";

const Header = (props) => {
  const { isUserLogged } = useContext(UserContext);

  return (
    <header>
      <h1>MAXI KINO</h1>
      <div className="window-of-options">
        <div className="change-of-city">
          <label htmlFor="city">Wybierz miasto:</label>
          <select name="" id="city" onChange={props.handleSelectTown} value={props.selectTown}>
            <TownList town={props.towns} />
          </select>
        </div>
        <div className="window-of-login">
          <ul>
            <li>
              {!isUserLogged ? <NavLink to="/login">Logowanie</NavLink> : <NavLink to="/account">Konto</NavLink>}
            </li>
            <li>
            {!isUserLogged ? <NavLink to="/register">Rejestracja</NavLink> : <NavLink to="/logout">Wyloguj</NavLink>}
            </li>
          </ul>
        </div>
        <div className="search">
          <input type="search" placeholder="Szukaj..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
