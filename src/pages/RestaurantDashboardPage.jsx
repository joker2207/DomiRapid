import React from 'react';
import { Link } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import PromotionForm from '../components/PromotionForm';
import './styles.css';

const RestaurantDashboardPage = () => {
  return (
    <div className="container">
      <h1>Restaurant Dashboard</h1>
      <Link to="/edit/restaurant">Editar Información del Restaurante</Link>
      <h2>Agregar Productos</h2>
      <ProductForm />
      <h2>Agregar Promociones</h2>
      <PromotionForm />
    </div>
  );
};

export default RestaurantDashboardPage;
