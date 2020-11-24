import React from "react";

const TownList = (props) => {
  const { town } = props;

  const list = town ? town.map((item) => (
    <option key={item.cinema_id}>{item.city}</option>
  )) : <option key={'loading'}>Ładowanie...</option>;
  return <>{list}</>;
};

export default TownList;
