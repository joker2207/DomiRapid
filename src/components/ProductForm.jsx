import React, { useState } from 'react';
import './styles.css';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    productPrice: '',
    productImage: ''
  });

  const handleChange = (e) => {
    if (e.target.name === 'productImage') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          productImage: reader.result
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
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Agregar Producto</h2>
      <div>
        <label>Nombre del Producto:</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
      </div>
      <div>
        <label>Descripción:</label>
        <textarea name="productDescription" value={formData.productDescription} onChange={handleChange} required />
      </div>
      <div>
        <label>Precio:</label>
        <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} required />
      </div>
      <div>
        <label>Imagen:</label>
        <input type="file" name="productImage" onChange={handleChange} required />
      </div>
      <button type="submit">Agregar Producto</button>
    </form>
  );
};

export default ProductForm;

