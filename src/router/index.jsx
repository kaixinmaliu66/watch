import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import InputPage from '../pages/InputPage/InputPage';
import DataPage from '../pages/DataPage/DataPage';
import StatsPage from '../pages/StatsPage/StatsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/input" element={<InputPage />} />
      <Route path="/data" element={<DataPage />} />
      <Route path="/stats" element={<StatsPage />} />
      <Route path="/" element={<Navigate to="/input" replace />} />
    </Routes>
  );
}

