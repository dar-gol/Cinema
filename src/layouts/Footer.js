import React from "react";

import "../styles/Footer.sass";

const Footer = () => {
  return (
    <footer>
      <h3>O NAS</h3>
      <div className='link'>
        <a href="https://github.com/dar-gol">
          <div>
            <span>Dariusz Golomski</span>
          </div>
        </a>
        <a href="https://github.com/matixezor">
          <div>
            <span>Mateusz Romański</span>
          </div>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
