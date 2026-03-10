import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/**
 * FoodListingRoutes Component
 * Handles routing for the Food Listing application.
 */
const FoodListingRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div style={{ padding: '20px' }}>Food Listing Placeholder</div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default FoodListingRoutes;
