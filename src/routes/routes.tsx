// src/routes/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Page2 from '../pages/Page2';
import Page1 from '../pages/Page1';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/Page2" element={<Page2 />} />
    </Routes>
  );
};

export default AppRoutes;
