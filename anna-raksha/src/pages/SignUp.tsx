// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { signUpWithEmail } from '../firebase/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUpWithEmail(email, password);
      navigate('/login');
    } catch (error) {
      console.error('SignUp failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold">Sign Up</h2>
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
      <button onClick={handleSignUp} className="w-full p-2 mt-4 bg-green-600 text-white rounded">Sign Up</button>
    </div>
  );
};

export default SignUp;
