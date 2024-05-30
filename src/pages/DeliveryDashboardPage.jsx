import React, { useState, useEffect } from 'react';
import OrderList from '../components/OrderList';
import './styles.css';

const DeliveryDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    // Obtener pedidos desde el localStorage (simulado)
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleAcceptOrder = () => {
    alert(`Has aceptado la entrega a: ${selectedOrder.address}`);
    const updatedOrders = orders.filter(order => order !== selectedOrder);
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setSelectedOrder(null); // Resetear el pedido seleccionado después de aceptarlo
  };

  const handleRejectOrder = () => {
    alert(`Has rechazado la entrega a: ${selectedOrder.address}`);
    setSelectedOrder(null); // Resetear el pedido seleccionado después de rechazarlo
  };

  return (
    <div>
      <h1>Delivery Dashboard</h1>
      <OrderList orders={orders} onSelectOrder={handleSelectOrder} />
      {selectedOrder && (
        <div>
          <h2>Detalles de la Entrega</h2>
          <p>Dirección: {selectedOrder.address}</p>
          <p>Referencia: {selectedOrder.reference}</p>
          <p>Teléfono: {selectedOrder.phone}</p>
          <button onClick={handleAcceptOrder}>Aceptar Domicilio</button>
          <button onClick={handleRejectOrder}>Rechazar Domicilio</button>
        </div>
      )}
    </div>
  );
};

export default DeliveryDashboardPage;

