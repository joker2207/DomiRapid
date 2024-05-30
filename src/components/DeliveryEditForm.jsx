import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './styles.css';

const DeliveryEditForm = () => {
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

  useEffect(() => {
    const storedDelivery = JSON.parse(localStorage.getItem('currentDelivery'));
    if (storedDelivery) {
      setFormData(storedDelivery);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const reader = new FileReader();
      reader.onloadend = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, 'secret-key').toString();
        setFormData({
          ...formData,
          [name]: encrypted
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Actualizar los datos del domiciliario en el localStorage
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const updatedDeliveries = deliveries.map((delivery) =>
      delivery.username === formData.username ? formData : delivery
    );
    localStorage.setItem('deliveries', JSON.stringify(updatedDeliveries));
    localStorage.setItem('currentDelivery', JSON.stringify(formData));

    // Mostrar mensaje de confirmación
    setMessage('Datos actualizados con éxito.');

    // Redirigir a la página de dashboard después de unos segundos
    setTimeout(() => {
      setMessage('');
      navigate('/dashboard/delivery');
    }, 3000); // Espera 3 segundos antes de redirigir
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Editar Datos del Domiciliario</h2>
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
          <input type="file" name="documentFront" onChange={handleChange} />
        </div>
        <div>
          <label>Foto de la Cédula (Reverso):</label>
          <input type="file" name="documentBack" onChange={handleChange} />
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
        <button type="submit">Guardar Cambios</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeliveryEditForm;
