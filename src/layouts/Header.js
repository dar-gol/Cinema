import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";

import { UserContext } from "../Context/UserContext";

import TownList from "../components/TownList";

import "../styles/Header.sass";

const Header = () => {
  const [town, setTown] = useState(null);

  const { isUserLogged } = useContext(UserContext);

  const fetchTown = async () => {
    try {
      const response = await fetch(
        "http://matixezor-cinema-api.herokuapp.com/api/cinemas/?limit=100"
      );
      const data = await response.json();
      setTown(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTown();
  }, []);

  return (
    <header>
      <h1>MAXI KINO</h1>
      <div className="window-of-options">
        <div className="change-of-city">
          <label htmlFor="city">Wybierz miasto:</label>
          <select name="" id="city">
            <TownList town={town} />
          </select>
        </div>
        <div className="window-of-login">
          <ul>
            <li>
              {!isUserLogged ? <NavLink to="/login">Logowanie</NavLink> : <NavLink to="/account">Konto</NavLink>}
            </li>
            <li>
            {!isUserLogged ? <NavLink to="/registe">Rejestracja</NavLink> : <NavLink to="/logout">Wyloguj</NavLink>}
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
