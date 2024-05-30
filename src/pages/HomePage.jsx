import React from 'react';
import RestaurantList from '../components/RestaurantList';
import './styles.css';

const HomePage = () => {
  return (
    <main>
      <h1>Welcome to Food Delivery App</h1>
      <RestaurantList />
    </main>
  );
};

export default HomePage;
