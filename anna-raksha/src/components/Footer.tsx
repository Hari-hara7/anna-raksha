import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg mb-4">Food Donation Platform &copy; {new Date().getFullYear()}</p>
        <p className="text-sm text-gray-400">
          A place to donate food and help those in need. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
