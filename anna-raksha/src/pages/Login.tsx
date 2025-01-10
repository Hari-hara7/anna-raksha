// src/pages/Login.tsx
import React, { useState } from 'react';
import { loginWithEmail, loginWithGoogle } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold">Login</h2>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mt-4 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full p-2 mt-4 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-full p-2 mt-4 bg-blue-600 text-white rounded">Login</button>
      <button onClick={handleGoogleLogin} className="w-full p-2 mt-4 bg-red-600 text-white rounded">Login with Google</button>
    </div>
  );
};

export default Login;
