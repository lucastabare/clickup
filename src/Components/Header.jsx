import * as React from 'react';
import "bootstrap/dist/css/bootstrap.css";
const Header = () => {
  return (
    <nav className="navbar bg-primary text-white">
      <div className="container justify-content-center">
        <img
          src="https://rapiboy.com/img/logoMenu.png"
          alt="Bootstrap"
          width="40"
          height="44"
          className="me-4"
        />
        <h3>Informe de cambios por sprint</h3>
      </div>
    </nav>
  );
};

export default Header;
