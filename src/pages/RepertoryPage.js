import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import TownList from "../components/TownList";
import RepertoryList from "../components/RepertoryList";

import "../styles/Page/MoviesPage.sass";

const RepertoryPage = (props) => {
  const { repertory } = props;

  const [search, setSearch] = useState(false);
  const inputSearch = useRef();

  console.log(repertory);

  const handleSearchButton = () => {
    console.log(inputSearch.current.value);
    let item = repertory.filter((item) =>
      item.movie.title.toUpperCase().includes(inputSearch.current.value.toUpperCase())
    );
    item = item ? item : false;
    setSearch(item);
    console.log(item);
    inputSearch.current.value = "";
  };

  return (
    <div className="movies">
      <div className="option">
        <div className="change-of-city">
          <label htmlFor="city">Wybierz miasto:</label>
          <select
            name=""
            id="city"
            onChange={props.handleSelectTown}
            value={props.selectTown.city}
          >
            <TownList town={props.towns} />
          </select>
        </div>
        <div className="search">
          <input type="search" placeholder="Szukaj..." ref={inputSearch} />
          <button onClick={handleSearchButton}>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      {repertory ? (
        search ? (
          search.map((item) => <RepertoryList key={item.movie.movie_id} item={item} />)
        ) : (
          repertory.map((item) => <RepertoryList key={item.movie.movie_id} item={item} />)
        )
      ) : (
        <div className="loading">
          <p>
            Ładowanie <span>. . .</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default RepertoryPage;
