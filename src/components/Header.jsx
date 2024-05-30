import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  return (
    <header className="navbar">
      <h1>DomiRapid</h1>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/login/restaurant">Restaurante</Link>
        <Link to="/login/delivery">Domiciliario</Link>
        <Link to="/login/customer">Cliente</Link>
      </nav>
    </header>
  );
};

export default Header;
