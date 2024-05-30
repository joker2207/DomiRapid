import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const RestaurantList = () => {
  const restaurants = [
    { id: 1, name: 'Pizza Place' },
    { id: 2, name: 'Sushi Spot' },
    { id: 3, name: 'Burger Joint' }
  ];

  return (
    <div>
      <h2>Restaurants</h2>
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>{restaurant.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
