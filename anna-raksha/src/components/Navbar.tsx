import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaHome, FaUser, FaHistory, FaSignOutAlt, FaBars, FaTimes, FaMapMarkedAlt } from 'react-icons/fa'; // Import FaMapMarkedAlt for the map icon
import logo from '../assets/annaraksha.png'; // Ensure correct path for logo

const Navbar: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#121212] text-white p-4 flex justify-between items-center shadow-lg rounded-lg relative">
      <div className="flex items-center space-x-2">
        {/* Logo */}
        <img src={logo} alt="Anna Raksha Logo" className="w-10 h-10" />
        {/* Website Name */}
        <Link to="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-500 transition duration-300">
          Anna Raksha
        </Link>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaHome className="mr-2" />
          Home
        </Link>
        <Link to="/donor" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaUser className="mr-2" />
          Donor
        </Link>
        <Link to="/requestPage" className="flex items-center hover:text-yellow-500 transition duration-300">
  <FaMapMarkedAlt className="mr-2" />
  Request
</Link>

        <Link to="/history" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaHistory className="mr-2" />
          History
        </Link>
        <Link to="/notifications" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaMapMarkedAlt className="mr-2" /> {/* Map Icon */}
         Notifcations
        </Link>
        <Link to="/dashboard" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaUser className="mr-2" />
          Dashboard
        </Link>
        <Link to="/map" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaMapMarkedAlt className="mr-2" /> {/* Map Icon */}
          Map
        </Link>
        {user ? (
          <button
            onClick={signOut}
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center transition duration-300"
          >
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        ) : (
          <Link to="/login" className="flex items-center hover:text-yellow-500 transition duration-300">
            <FaUser className="mr-2" />
            Signin
          </Link>
        )}
      </div>
      
      {/* Mobile Menu */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          className="text-white text-3xl focus:outline-none hover:text-yellow-500 transition duration-300"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Slide-in Mobile Menu with Overlay */}
      <div
        className={`${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-0 bg-black bg-opacity-60 z-40 flex justify-start items-start transition-transform duration-300 ease-in-out`}
      >
        {/* Sliding Menu */}
        <div className="bg-[#121212] text-white w-3/4 h-full p-6 flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-6">
            {/* Logo and Close Button */}
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Anna Raksha Logo" className="w-10 h-10" />
              <Link to="/" className="text-xl font-bold text-yellow-400">
                Anna Raksha
              </Link>
            </div>
            <button onClick={toggleMenu} className="text-white text-3xl">
              <FaTimes />
            </button>
          </div>

          {/* Menu Items */}
          <Link
            to="/"
            className="flex items-center hover:text-yellow-500 transition duration-300"
            onClick={toggleMenu}
          >
            <FaHome className="mr-3 text-lg" />
            Home
          </Link>
          <Link
            to="/donor"
            className="flex items-center hover:text-yellow-500 transition duration-300"
            onClick={toggleMenu}
          >
            <FaUser className="mr-3 text-lg" />
            Donor
          </Link>
          <Link
            to="/history"
            className="flex items-center hover:text-yellow-500 transition duration-300"
            onClick={toggleMenu}
          >
            <FaHistory className="mr-3 text-lg" />
            History
          </Link>
          <Link to="/requestPage" className="flex items-center hover:text-yellow-500 transition duration-300">
  <FaMapMarkedAlt className="mr-2" />
  Request
</Link>
<Link to="/notifications" className="flex items-center hover:text-yellow-500 transition duration-300">
          <FaMapMarkedAlt className="mr-2" /> {/* Map Icon */}
         Notifcations
        </Link>
          <Link
            to="/dashboard"
            className="flex items-center hover:text-yellow-500 transition duration-300"
            onClick={toggleMenu}
          >
            <FaUser className="mr-3 text-lg" />
            Dashboard
          </Link>
          <Link
            to="/map"
            className="flex items-center hover:text-yellow-500 transition duration-300"
            onClick={toggleMenu}
          >
            <FaMapMarkedAlt className="mr-3 text-lg" />
            Map
          </Link>

          {/* Authentication */}
          {user ? (
            <button
              onClick={signOut}
              className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 flex items-center transition duration-300"
            >
              <FaSignOutAlt className="mr-2" />
              Sign Out
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center hover:text-yellow-500 transition duration-300"
              onClick={toggleMenu}
            >
              <FaUser className="mr-3 text-lg" />
              Signin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
