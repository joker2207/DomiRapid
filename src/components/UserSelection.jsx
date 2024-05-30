import React from 'react';
import { Link } from 'react-router-dom';

const UserSelection = () => {
  return (
    <div>
      <h1>Welcome to DomiRapid</h1>
      <p>Please select your user type:</p>
      <div>
        <h2>Restaurant</h2>
        <Link to="/login/restaurant">Ya estoy registrado</Link>
        <Link to="/register/restaurant">Registrar</Link>
      </div>
      <div>
        <h2>Delivery</h2>
        <Link to="/login/delivery">Ya estoy registrado</Link>
        <Link to="/register/delivery">Registrar</Link>
      </div>
    </div>
  );
};

export default UserSelection;
