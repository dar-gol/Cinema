import React, { useState, useRef } from 'react';

import TownList from '../components/TownList';
import RepertoryList from '../components/RepertoryList';

import '../styles/Page/MoviesPage.sass';

const RepertoryPage = ({ handleSelectTown, repertory, selectTown, towns }) => {
  const [search, setSearch] = useState(false);
  const inputSearch = useRef();

  console.log(repertory);

  const handleSearchButton = () => {
    console.log(inputSearch.current.value);
    let item = repertory.filter((element) =>
      element.movie.title
        .toUpperCase()
        .includes(inputSearch.current.value.toUpperCase()),
    );
    item = item || false;
    setSearch(item);
    console.log(item);
    inputSearch.current.value = '';
  };

  const MoviesDiv = () => {
    if (search) {
      return search.map((item) => (
        <RepertoryList key={item.movie_id} item={item} />
      ));
    }
    if (repertory) {
      return repertory.map((item) => (
        <RepertoryList key={item.movie_id} item={item} />
      ));
    }
    return (
      <div className="loading">
        <p>
          Ładowanie <span>. . .</span>
        </p>
      </div>
    );
  };

  return (
    <div className="movies">
      <div className="option">
        <div className="change-of-city">
          <label htmlFor="city">
            Wybierz miasto:
            <select
              name=""
              id="city"
              onChange={handleSelectTown}
              value={selectTown.city}
            >
              <TownList town={towns} />
            </select>
          </label>
        </div>
        <div className="search">
          <input type="search" placeholder="Szukaj..." ref={inputSearch} />
          <button type="button" onClick={handleSearchButton}>
            <i className="fas fa-search" />
          </button>
        </div>
      </div>
      {MoviesDiv()}
    </div>
  );
};

export default RepertoryPage;
