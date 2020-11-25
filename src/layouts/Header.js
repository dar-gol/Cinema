import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import "../styles/Header.sass";

const Header = (props) => {
  const { isUserLogged } = useContext(UserContext);

  return (
    <header>
      <h1>MAXI KINO</h1>
      <div className="window-of-options">
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
      </div>
    </header>
  );
};

export default Header;
