import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-lg">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4"
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4"
          placeholder="Password"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        <button
          type="button"
          onClick={() => loginWithGoogle()}
          className="bg-red-500 text-white p-2 rounded mt-4"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
