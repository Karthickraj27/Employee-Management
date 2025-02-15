import React from 'react';
import './App.css';
import ListEmployeeComponent from './Component/ListEmployeeComponent';
import HeaderComponent from './Component/HeaderComponent';
import FooterComponent from './Component/FooterComponent';

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeComponent from './Component/EmployeeComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          {/* Redirect root to /employees */}
          <Route path="/" element={<Navigate to="/employees" />} />

          {/* List employees */}
          <Route path="/employees" element={<ListEmployeeComponent />} />

          {/* Add employee */}
          <Route path="/add-employee" element={<EmployeeComponent />} />

          {/* Update employee */}
          <Route path="/update-employee/:id" element={<EmployeeComponent />} />

          {/* Redirect all unmatched routes to /employees */}
          <Route path="*" element={<Navigate to="/employees" />} />
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
