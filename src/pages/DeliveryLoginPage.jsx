import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const DeliveryLoginPage = () => {
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

    // Obtener los datos del domiciliario desde el localStorage
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const storedDelivery = deliveries.find(delivery => delivery.username === formData.username && delivery.password === formData.password);

    if (storedDelivery) {
      localStorage.setItem('currentDelivery', JSON.stringify(storedDelivery));
      navigate('/dashboard/delivery');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión Domiciliario</h2>
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
  );
};

export default DeliveryLoginPage;
