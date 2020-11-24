import React from "react";
import { Link } from "react-router-dom";

import "../styles/Page/MoviesPage.sass";

const RepertoryPage = (props) => {
  const {repertory} = props;

  return (
    <div className="movies">
      {repertory &&
        repertory.map((item) => (
          <Link to={`/order/cinema/${item.cinema_id}/movie/${item.movie.movie_id}`} key={item.movie.movie_id}>
          <div className="movie">
            {item.movie.min_img ? (
              <img src={item.movie.min_img} className="image" alt={item.movie.title} placeholder='600px'/>
            ) : (
              <div className="image"></div>
            )}
            <div>
              <h2>Tytuł: {item.movie.title}</h2>
              <p>Reżyser: {item.movie.director}</p>
            </div>
          </div>
          </Link>
        ))}
    </div>
  );
};

export default RepertoryPage;
