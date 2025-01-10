import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaBars, FaSignOutAlt } from 'react-icons/fa';  // For burger menu and sign out icon

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile burger menu

  return (
    <nav className="bg-white/30 backdrop-blur-lg text-white p-4 flex justify-between items-center fixed w-full z-50 shadow-lg transition-all ">
      {/* Logo and Website Name */}
      <div className="flex items-center space-x-3">
        <img
          src="/path/to/your/logo.png" // Replace with actual path to your logo
          alt="Anna Raksha Logo"
          className="w-12 h-12 rounded-full shadow-md"
        />
        <Link to="/" className="text-3xl font-extrabold text-white hover:text-gray-200 transition-all">
          Anna Raksha
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        <Link to="/" className="hover:text-gray-400 transition-all">Home</Link>
        <Link to="/donor" className="hover:text-gray-400 transition-all">Donor</Link>
        <Link to="/history" className="hover:text-gray-400 transition-all">History</Link>
        <Link to="/dashboard" className="hover:text-gray-400 transition-all">Dashboard</Link>
        {user ? (
          <button
            onClick={signOut}
            className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-all"
          >
            <FaSignOutAlt className="inline mr-2" /> Sign Out
          </button>
        ) : (
          <Link to="/login" className="hover:text-gray-400 transition-all">Login</Link>
        )}
      </div>

      {/* Mobile Burger Menu */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="bg-white/20 backdrop-blur-lg p-2 rounded-lg shadow-md hover:bg-white/30 transition-all"
        >
          <FaBars className="text-3xl text-white" />
        </button>
        {isMenuOpen && (
          <div className="absolute top-16 right-4 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-lg space-y-6 w-56 mt-4 transition-all">
            <Link to="/" className="block text-lg text-white hover:text-gray-200 transition-all">Home</Link>
            <Link to="/donor" className="block text-lg text-white hover:text-gray-200 transition-all">Donor</Link>
            <Link to="/history" className="block text-lg text-white hover:text-gray-200 transition-all">History</Link>
            <Link to="/dashboard" className="block text-lg text-white hover:text-gray-200 transition-all">Dashboard</Link>
            {user ? (
              <button
                onClick={signOut}
                className="block w-full bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
              >
                <FaSignOutAlt className="inline mr-2" /> Sign Out
              </button>
            ) : (
              <Link to="/login" className="block text-lg text-white hover:text-gray-200 transition-all">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
