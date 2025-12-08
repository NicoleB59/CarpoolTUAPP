import React, { useState } from 'react';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = { email, password };

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);

    if (res.ok) {
      localStorage.setItem('userEmail', email); // Store email for profile fetching
      // Redirect to dashboard on success
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

       {/* ✅ MUST BE LOWERCASE */}
        <p className="register-link">
          <Link to="/register">
            Haven&apos;t made an account? Register Here!
          </Link>
        </p>

        {/* <button type="submit">Login</button> */}
        {/* Button */}
       <button type="submit" onClick={handleLogin}>
        Login
      </button>
      </form>
    </div>
  );
}

export default Login;
