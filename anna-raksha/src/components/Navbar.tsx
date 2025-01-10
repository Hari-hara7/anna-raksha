import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="text-xl font-bold">
          My App
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link to="/" className="hover:text-gray-400">Home</Link>
        <Link to="/donor" className="hover:text-gray-400">Donor</Link>
        <Link to="/history" className="hover:text-gray-400">History</Link>
        <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
        {user ? (
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
          >
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
