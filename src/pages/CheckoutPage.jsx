import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css';


const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state;
  const [formData, setFormData] = useState({
    address: '',
    reference: '',
    phone: '',
    paymentMethod: '',
    bank: '',
    accountType: ''
  });
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener métodos de pago desde el localStorage
    const storedRestaurants = JSON.parse(localStorage.getItem('restaurants')) || [];
    if (storedRestaurants.length > 0) {
      const methods = storedRestaurants[0].paymentMethods;
      setAvailablePaymentMethods(Object.keys(methods).filter(key => methods[key] === true));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simular el proceso de pago y almacenar los pedidos en el localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
      customerName: 'Cliente', // Puedes agregar lógica para obtener el nombre del cliente autenticado
      address: formData.address,
      reference: formData.reference,
      phone: formData.phone,
      items: cart.map(item => item.productName),
      total: cart.reduce((total, item) => total + parseFloat(item.productPrice), 0).toFixed(2),
      paymentMethod: formData.paymentMethod,
      bank: formData.bank,
      accountType: formData.accountType
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    // Mostrar mensaje de confirmación
    alert('Pago realizado con éxito.');

    // Redirigir al cliente al dashboard
    navigate('/dashboard/customer');
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dirección:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        </div>
        <div>
          <label>Referencia:</label>
          <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
        </div>
        <div>
          <label>Teléfono:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
        <div>
          <label>Método de Pago:</label>
          <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="">Seleccione</option>
            {availablePaymentMethods.map((method, index) => (
              <option key={index} value={method}>{method}</option>
            ))}
          </select>
        </div>
        {formData.paymentMethod === 'pse' && (
          <div>
            <label>Banco:</label>
            <input type="text" name="bank" value={formData.bank} onChange={handleChange} required />
            <label>Tipo de Cuenta:</label>
            <select name="accountType" value={formData.accountType} onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="ahorro">Ahorro</option>
              <option value="corriente">Corriente</option>
            </select>
          </div>
        )}
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
