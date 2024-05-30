import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar los datos del cliente en el localStorage
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    customers.push(formData);
    localStorage.setItem('customers', JSON.stringify(customers));

    // Mostrar mensaje de confirmación
    setMessage(`Cliente registrado. Este es su usuario: ${formData.username} y su contraseña: ${formData.password}. No la comparta con nadie.`);

    // Redirigir a la página de login después de unos segundos
    setTimeout(() => {
      navigate('/login/customer');
    }, 5000); // Espera 5 segundos antes de redirigir
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registro de Cliente</h2>
        <div>
          <label>Nombre de Usuario:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Contraseña:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CustomerForm;
