import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './loginPage.css';

const LoginPage = () => {
  // Predefined ID and password (for this example)
  const presetId = 'user123';
  const presetPassword = 'password123';

  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if the input ID and password match the predefined values
    if (userId === presetId && password === presetPassword) {
      // Simulate a token being stored in localStorage
      localStorage.setItem("authToken", "some_token_value");

      // Redirect to the home page
      navigate("/");  // This should redirect to the home page
    } else {
      // Show an error message if login credentials are wrong
      setErrorMessage('Invalid ID or password');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        <div className="form-group">
          <label htmlFor="userId">ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
