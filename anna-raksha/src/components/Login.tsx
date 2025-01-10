import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithGoogle, loginWithEmail } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithEmail(email, password);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      {/* Glassmorphic Card */}
      <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-opacity-30 bg-black backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500">
        {/* Title */}
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 text-center mb-6 tracking-wider">
          Sign In
        </h2>
        {/* Input: Email */}
        <div className="flex items-center bg-gray-800 bg-opacity-50 text-yellow-300 mb-4 px-3 sm:px-4 py-2 sm:py-3 rounded-full focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
          <FaEnvelope className="text-lg sm:text-xl" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-transparent text-yellow-200 placeholder-yellow-500 ml-2 sm:ml-4 text-sm sm:text-base focus:outline-none"
            placeholder="Email Address"
          />
        </div>
        {/* Input: Password */}
        <div className="flex items-center bg-gray-800 bg-opacity-50 text-yellow-300 mb-6 px-3 sm:px-4 py-2 sm:py-3 rounded-full focus-within:ring-2 focus-within:ring-yellow-400 transition-all">
          <FaLock className="text-lg sm:text-xl" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent text-yellow-200 placeholder-yellow-500 ml-2 sm:ml-4 text-sm sm:text-base focus:outline-none"
            placeholder="Password"
          />
        </div>
        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold text-sm sm:text-base rounded-full shadow-lg hover:shadow-yellow-400 hover:scale-105 transition-transform duration-300"
        >
          Login
        </button>
        {/* OR Divider */}
        <div className="flex items-center my-6">
          <span className="flex-grow border-t border-yellow-500"></span>
          <span className="mx-4 text-yellow-300 font-semibold text-sm sm:text-base">OR</span>
          <span className="flex-grow border-t border-yellow-500"></span>
        </div>
        {/* Google Login Button */}
        <button
          onClick={() => loginWithGoogle()}
          className="w-full py-2 sm:py-3 flex items-center justify-center bg-yellow-500 text-black font-bold text-sm sm:text-base rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-yellow-400 hover:scale-105 transition-transform duration-300"
        >
          <FaGoogle className="text-lg sm:text-2xl mr-2 sm:mr-3" />
          Login with Google
        </button>
        {/* Animated Decorative Elements */}
        <div className="absolute top-[-20px] sm:top-[-40px] right-[-20px] sm:right-[-40px] w-16 sm:w-24 h-16 sm:h-24 bg-yellow-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-20px] sm:bottom-[-40px] left-[-20px] sm:left-[-40px] w-16 sm:w-24 h-16 sm:h-24 bg-yellow-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};

export default Login;
