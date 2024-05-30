import React, { useState } from 'react';
import './styles.css';

const LoginForm = ({ userType }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí deberías añadir la lógica para autenticar al usuario
    console.log(`Logging in ${userType} with username: ${username} and password: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login for {userType}</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
