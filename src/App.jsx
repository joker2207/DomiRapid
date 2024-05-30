import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // Deja esta línea si vas a usar HomePage
import RestaurantPage from './pages/RestaurantPage';
import CartPage from './pages/CartPage';
import OrderTrackingPage from './pages/OrderTrackingPage';
import RestaurantLoginPage from './pages/RestaurantLoginPage';
import DeliveryLoginPage from './pages/DeliveryLoginPage';
import CustomerLoginPage from './pages/CustomerLoginPage';
import RestaurantRegisterPage from './pages/RestaurantRegisterPage';
import DeliveryRegisterPage from './pages/DeliveryRegisterPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import RestaurantDashboardPage from './pages/RestaurantDashboardPage';
import DeliveryDashboardPage from './pages/DeliveryDashboardPage';
import CustomerDashboardPage from './pages/CustomerDashboardPage';
import CheckoutPage from './pages/CheckoutPage';
import UserSelectionPage from './pages/UserSelectionPage';
import RestaurantEditForm from './components/RestaurantEditForm';
import DeliveryEditForm from './components/DeliveryEditForm';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<UserSelectionPage />} />
          <Route path="/home" element={<HomePage />} />  {/* Añadir esta línea para usar HomePage */}
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-tracking" element={<OrderTrackingPage />} />
          <Route path="/login/restaurant" element={<RestaurantLoginPage />} />
          <Route path="/login/delivery" element={<DeliveryLoginPage />} />
          <Route path="/login/customer" element={<CustomerLoginPage />} />
          <Route path="/register/restaurant" element={<RestaurantRegisterPage />} />
          <Route path="/register/delivery" element={<DeliveryRegisterPage />} />
          <Route path="/register/customer" element={<CustomerRegisterPage />} />
          <Route path="/dashboard/restaurant" element={<RestaurantDashboardPage />} />
          <Route path="/dashboard/delivery" element={<DeliveryDashboardPage />} />
          <Route path="/dashboard/customer" element={<CustomerDashboardPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/edit/restaurant" element={<RestaurantEditForm />} />
          <Route path="/edit/delivery" element={<DeliveryEditForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

