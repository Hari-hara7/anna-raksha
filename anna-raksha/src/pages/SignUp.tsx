// src/pages/SignUp.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signUp } from '../firebase/auth';  // Firebase sign-up helper function
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(name, email, password);
      history.push('/dashboard');  // Redirect to dashboard after sign-up
    } catch (error) {
      console.error(error);
      alert("Sign-up failed. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-200">
        <form onSubmit={handleSignUp} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full p-3 bg-green-500 text-white rounded">Sign Up</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
