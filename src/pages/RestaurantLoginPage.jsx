import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const RestaurantLoginPage = () => {
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

    // Obtener los datos del restaurante desde el localStorage
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const storedRestaurant = restaurants.find(restaurant => restaurant.username === formData.username && restaurant.password === formData.password);

    if (storedRestaurant) {
      localStorage.setItem('currentRestaurant', JSON.stringify(storedRestaurant));
      navigate('/dashboard/restaurant');
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión Restaurante</h2>
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

export default RestaurantLoginPage;
