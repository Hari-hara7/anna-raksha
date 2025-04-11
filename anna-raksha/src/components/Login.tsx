import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaGoogle, FaUserTie, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [role, setRole] = useState<'donor' | 'user'>('user');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-4">
      <div className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-8 bg-opacity-30 bg-black backdrop-blur-lg rounded-2xl shadow-2xl border border-yellow-500">
        <h2 className="text-2xl sm:text-4xl font-bold text-yellow-400 text-center mb-6 tracking-wider">
          Sign In
        </h2>

        {/* Role Selection */}
        <div className="flex justify-between items-center mb-6">
          <button
            className={`flex-1 py-2 sm:py-3 flex items-center justify-center text-sm sm:text-base font-bold rounded-full transition duration-300 ${
              role === 'donor'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-yellow-300 hover:bg-yellow-500 hover:text-black'
            }`}
            onClick={() => setRole('donor')}
          >
            <FaUserTie className="mr-2" />
            Donor
          </button>
          <span className="mx-2 text-yellow-300 font-semibold">|</span>
          <button
            className={`flex-1 py-2 sm:py-3 flex items-center justify-center text-sm sm:text-base font-bold rounded-full transition duration-300 ${
              role === 'user'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-800 text-yellow-300 hover:bg-yellow-500 hover:text-black'
            }`}
            onClick={() => setRole('user')}
          >
            <FaUser className="mr-2" />
            User
          </button>
        </div>

        {/* Google Login */}
        <button
          onClick={() => {
            loginWithGoogle(role)
              .then(() => {
                if (role === 'donor') navigate('/donor-dashboard');
                else navigate('/dashboard');
              })
              .catch((error) => console.error('Google login failed:', error));
          }}
          className="w-full py-2 sm:py-3 flex items-center justify-center bg-yellow-500 text-black font-bold text-sm sm:text-base rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-yellow-400 hover:scale-105 transition-transform duration-300"
        >
          <FaGoogle className="text-lg sm:text-2xl mr-2 sm:mr-3" />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
