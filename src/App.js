import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import LoginPage from './pages/loginPage';

function App() {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Check if the auth token exists

  return (
    <Router>
      <Routes>
        {/* Protected Route for Home */}
        <Route 
          path="/home" 
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
        />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Redirect any other path to login if not authenticated */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
