import React from "react";
import {NavLink} from "react-router-dom";

import "../styles/Header.sass";

const Header = () => {
  return (
    <header>
      <h1>WIELKIE KINO</h1>
      <div className="window-of-options">
        <div className="change-of-city">
          <label htmlFor="city">Wybierz miasto:</label>
          <select name="" id="city">
            <option value="poznan">Poznań</option>
            <option value="krakow">Kraków</option>
            <option value="gdansk">Gdańsk</option>
          </select>
        </div>
        <div className="window-of-login">
          <ul>
            <li><NavLink to="/login">Logowanie</NavLink></li>
            <li><NavLink to="/register">Rejestracja</NavLink></li>
          </ul>

          {/* <button>Logowanie</button>
          <button>Rejestracja</button> */}
        </div>
        <div className="search">
          <input type="search" placeholder="Szukaj..." />
          <button>
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
