import React from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

const RestaurantPage = () => {
  const { id } = useParams();
  const restaurant = { id, name: 'Example Restaurant', menu: ['Item 1', 'Item 2'] }; // Fetch actual data in real implementation

  return (
    <div>
      <h1>{restaurant.name}</h1>
      <ul>
        {restaurant.menu.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantPage;
