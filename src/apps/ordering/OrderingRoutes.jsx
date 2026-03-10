import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';

/**
 * OrderingRoutes Component
 * Handles routing for the Ordering application.
 */
const OrderingRoutes = () => {
  return (
    <Routes>
      {/* Authentication Page */}
      <Route path="/" element={<AuthPage />} />
      
      {/* Placeholder for Home Page after login */}
      <Route path="/home" element={<div style={{ padding: '20px' }}>Welcome Home! (Dashboard Placeholder)</div>} />
      
      {/* Redirect any unknown routes to Auth Page within /ordering */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default OrderingRoutes;
