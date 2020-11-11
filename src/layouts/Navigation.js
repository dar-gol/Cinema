import React from "react";
import { NavLink } from "react-router-dom";

import "../styles/Navigation.sass";

const menuList = [
  { name: "Start", path: "/", exact: true },
  { name: "Repertuar", path: "/repertory" },
  { name: "Filmy", path: "/movies" },
  { name: "Kontakt", path: "/contact" },
];

const Navigation = () => {
  const menu = menuList.map((item) => (
    <li key={item.path}>
      <NavLink to={item.path} exact={item.exact ? item.exact : false}>
        {item.name}
      </NavLink>
    </li>
  ));
  
  return (
    <nav className="menu">
      <ul>{menu}</ul>
    </nav>
  );
};

export default Navigation;
