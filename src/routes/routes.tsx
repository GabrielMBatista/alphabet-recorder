// src/routes/routes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from '../pages/About';
import Home from '../pages/Home';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default AppRoutes;
