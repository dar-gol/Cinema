import {useRef, useState, useEffect, useCallback} from "react";
import { NavLink } from "react-router-dom";

import "../styles/Navigation.sass";

const menuList = [
  { name: "Start", path: "/", exact: true },
  { name: "Repertuar", path: "/repertory" },
  { name: "Filmy", path: "/movies" },
  { name: "Kontakt", path: "/contact" },
];

const Navigation = () => {
  const [offsetTop, setOffsetTop] = useState(0);

  const nav = useRef();

  const menu = menuList.map((item) => (
    <li key={item.path}>
      <NavLink to={item.path} exact={item.exact ? item.exact : false}>
        {item.name}
      </NavLink>
    </li>
  ));

  const handleScroll = useCallback(() => {
    if (nav.current.className === "menu") {
      setOffsetTop(nav.current.offsetTop);
    }
    if (offsetTop <= window.scrollY) {
      nav.current.className = "menu fixed-menu";
    } else {
      nav.current.className = "menu";
    }
  },[offsetTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    fetch("http://matixezor-cinema-api.herokuapp.com/api/movies/?limit=100")
      .then(res => res.json())
      .then(data => data);
  }, []);
  
  return (
    <nav className="menu" ref={nav}>
      <ul>{menu}</ul>
    </nav>
  );
};

export default Navigation;
