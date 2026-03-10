import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/**
 * AdminRoutes Component
 * Handles routing for the Admin application.
 */
const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: '20px' }}>Admin Dashboard Placeholder</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
