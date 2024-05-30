import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './styles.css';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
    documentType: 'Cedula',
    documentFront: '',
    documentBack: '',
    reference1: '',
    reference2: '',
    username: '',
    password: '',
    email: ''
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'documentFront' || e.target.name === 'documentBack') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, 'secret-key').toString();
        setFormData({
          ...formData,
          [e.target.name]: encrypted
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar los datos del domiciliario en el localStorage
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    deliveries.push(formData);
    localStorage.setItem('deliveries', JSON.stringify(deliveries));

    // Mostrar mensaje de confirmación
    setMessage(`Domiciliario registrado. Este es su usuario: ${formData.username} y su contraseña: ${formData.password}. No la comparta con nadie.`);

    // Redirigir a la página de login después de unos segundos
    setTimeout(() => {
      navigate('/login/delivery');
    }, 5000); // Espera 5 segundos antes de redirigir
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Registro de Domiciliario</h2>
        <div>
          <label>Nombre Completo:</label>
          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
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
          <label>Tipo de Documento:</label>
          <select name="documentType" value={formData.documentType} onChange={handleChange}>
            <option value="Cedula">Cédula</option>
          </select>
        </div>
        <div>
          <label>Foto de la Cédula (Frente):</label>
          <input type="file" name="documentFront" onChange={handleChange} required />
        </div>
        <div>
          <label>Foto de la Cédula (Reverso):</label>
          <input type="file" name="documentBack" onChange={handleChange} required />
        </div>
        <div>
          <label>Referencia 1:</label>
          <input type="text" name="reference1" value={formData.reference1} onChange={handleChange} required />
        </div>
        <div>
          <label>Referencia 2:</label>
          <input type="text" name="reference2" value={formData.reference2} onChange={handleChange} required />
        </div>
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

export default DeliveryForm;
