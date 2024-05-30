import React, { useState } from 'react';
import './styles.css';

const PromotionForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    promotionName: '',
    promotionDescription: '',
    promotionImage: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'promotionImage') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          promotionImage: reader.result
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Promoción</h2>
      <div>
        <label>Nombre de la Promoción:</label>
        <input type="text" name="promotionName" value={formData.promotionName} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea name="promotionDescription" value={formData.promotionDescription} onChange={handleChange} required />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" name="promotionImage" onChange={handleChange} required />
      </div>
      <button type="submit">Agregar Promoción</button>
    </form>
  );
};

export default PromotionForm;
