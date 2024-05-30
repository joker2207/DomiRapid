import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const RestaurantEditForm = () => {
  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    phone: '',
    ownerName: '',
    username: '',
    password: '',
    email: '',
    paymentMethods: {
      nequi: false,
      daviplata: false,
      pse: false,
      pseDetails: {
        bank: '',
        accountType: ''
      }
    }
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRestaurant = JSON.parse(localStorage.getItem('currentRestaurant'));
    if (storedRestaurant) {
      setFormData(storedRestaurant);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        paymentMethods: {
          ...formData.paymentMethods,
          [name]: checked
        }
      });
    } else if (name === 'bank' || name === 'accountType') {
      setFormData({
        ...formData,
        paymentMethods: {
          ...formData.paymentMethods,
          pseDetails: {
            ...formData.paymentMethods.pseDetails,
            [name]: value
          }
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualizar los datos del restaurante en el localStorage
    const restaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    const updatedRestaurants = restaurants.map((restaurant) =>
      restaurant.username === formData.username ? formData : restaurant
    );
    localStorage.setItem('restaurants', JSON.stringify(updatedRestaurants));
    localStorage.setItem('currentRestaurant', JSON.stringify(formData));

    // Mostrar mensaje de confirmación
    setMessage('Datos actualizados con éxito.');

    // Redirigir a la página de dashboard después de unos segundos
    setTimeout(() => {
      setMessage('');
      navigate('/dashboard/restaurant');
    }, 3000); // Espera 3 segundos antes de redirigir
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Editar Datos del Restaurante</h2>
        <div>
          <label>Nombre del Restaurante:</label>
          <input type="text" name="restaurantName" value={formData.restaurantName} onChange={handleChange} required />
        </div>
        <div>
          <label>Dirección:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre del Propietario:</label>
          <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required />
        </div>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} readOnly />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Métodos de Pago:</label>
          <div>
            <label>
              <input type="checkbox" name="nequi" checked={formData.paymentMethods.nequi} onChange={handleChange} /> Nequi
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="daviplata" checked={formData.paymentMethods.daviplata} onChange={handleChange} /> Daviplata
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="pse" checked={formData.paymentMethods.pse} onChange={handleChange} /> PSE
            </label>
          </div>
          {formData.paymentMethods.pse && (
            <div>
              <label>Banco:</label>
              <input type="text" name="bank" value={formData.paymentMethods.pseDetails.bank} onChange={handleChange} />
              <label>Tipo de Cuenta:</label>
              <select name="accountType" value={formData.paymentMethods.pseDetails.accountType} onChange={handleChange}>
                <option value="">Seleccione</option>
                <option value="ahorro">Ahorro</option>
                <option value="corriente">Corriente</option>
              </select>
            </div>
          )}
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RestaurantEditForm;
