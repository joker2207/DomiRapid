import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CustomerDashboardPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener restaurantes, productos y promociones desde el localStorage
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const storedPromotions = JSON.parse(localStorage.getItem('promotions')) || [];
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setRestaurants(storedRestaurants);
    setPromotions(storedPromotions);
    setProducts(storedProducts);
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleCheckout = () => {
    // Redirigir a la página de pago
    navigate('/checkout', { state: { cart } });
  };

  const totalPrice = cart.reduce((total, item) => total + parseFloat(item.productPrice), 0).toFixed(2);

  return (
    <div>
      <h1>Restaurantes</h1>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={index}>
            {restaurant.restaurantName} - {restaurant.address} - {restaurant.phone}
          </li>
        ))}
      </ul>
      <h1>Promociones</h1>
      <ul>
        {promotions.map((promotion, index) => (
          <li key={index}>
            <h2>{promotion.promotionName}</h2>
            <p>{promotion.promotionDescription}</p>
            <img src={promotion.promotionImage} alt={promotion.promotionName} style={{ width: '200px', height: 'auto' }} />
          </li>
        ))}
      </ul>
      <h1>Productos Disponibles</h1>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            <h2>{product.productName}</h2>
            <p>{product.productDescription}</p>
            <img src={product.productImage} alt={product.productName} style={{ width: '200px', height: 'auto' }} />
            <p>${product.productPrice}</p>
            <button onClick={() => addToCart(product)}>Añadir al Carrito</button>
          </li>
        ))}
      </ul>
      <h2>
        <FontAwesomeIcon icon={faShoppingCart} /> Carrito de Compras
      </h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.productName} - ${item.productPrice}
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice}</h3>
      {cart.length > 0 && (
        <button onClick={handleCheckout}>Pagar con Nequi/Daviplata/PSE</button>
      )}
    </div>
  );
};

export default CustomerDashboardPage;

