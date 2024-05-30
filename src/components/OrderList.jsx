import React from 'react';
import './styles.css';

const OrderList = ({ orders = [], onSelectOrder }) => {
  return (
    <div>
      <h2>Pedidos</h2>
      <ul>
        {orders.map((order, index) => (
          <li key={index} onClick={() => onSelectOrder(order)}>
            {order.customerName} - {order.items.join(', ')} - {order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
