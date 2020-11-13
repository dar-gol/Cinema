import {useState, useEffect} from "react";
import {NavLink} from "react-router-dom";

import TownList from "../components/TownList";

import "../styles/Header.sass";

const Header = () => {

  const [town, setTown] = useState(null);

  const fetchTown = async () => {
    try{
    const response = await fetch("http://matixezor-cinema-api.herokuapp.com/api/cinemas/?limit=100");
     const data = await response.json();
     setTown(data);
    }
    catch(e){
      console.error(e);
    }
  }
  
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
            <TownList town={town}/>
          </select>
        </div>
        <div className="window-of-login">
          <ul>
            <li><NavLink to="/login">Logowanie</NavLink></li>
            <li><NavLink to="/register">Rejestracja</NavLink></li>
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
