import React from 'react';
import logo from '../assets/annaraksha.png'; // Adjust the path according to where your logo is storedanna-raksha/src/assets/annaraksha.png

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-4">
          <img src={logo} alt="Logo" className="w-24 mx-auto" /> {/* Adjust size as needed */}
        </div>

        {/* Text Content */}
        <p className="text-lg mb-4">Food Donation Platform &copy; {new Date().getFullYear()}</p>
        <p className="text-sm text-gray-400">
          A place to donate food and help those in need. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
