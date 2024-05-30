import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CustomerLoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('customerUser'));

    if (storedUser && storedUser.username === formData.username && storedUser.password === formData.password) {
      navigate('/dashboard/customer');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión Cliente</h2>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default CustomerLoginPage;
