import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const UserSelectionPage = () => {
  return (
    <div>
      <h1>Bienvenido a DomiRapid</h1>
      <p>Seleccione su tipo de usuario:</p>
      <div>
        <h2>Restaurante</h2>
        <Link to="/login/restaurant">Ya estoy registrado</Link>
        <Link to="/register/restaurant">Registrar</Link>
      </div>
      <div>
        <h2>Domiciliario</h2>
        <Link to="/login/delivery">Ya estoy registrado</Link>
        <Link to="/register/delivery">Registrar</Link>
      </div>
      <div>
        <h2>Cliente</h2>
        <Link to="/login/customer">Quiero comprar</Link>
        <Link to="/register/customer">Registrar</Link>
      </div>
    </div>
  );
};

export default UserSelectionPage;
