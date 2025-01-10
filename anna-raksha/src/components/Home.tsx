import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Food Donation Platform</h1>
      <p className="text-lg text-gray-700 mb-8">A place to donate food and help those in need.</p>
      <div className="flex justify-center gap-8">
        <Link to="/donor" className="bg-green-500 text-white px-6 py-3 rounded-lg">Post Food</Link>
        <Link to="/dashboard" className="bg-blue-500 text-white px-6 py-3 rounded-lg">View Dashboard</Link>
      </div>
    </div>
  );
};

export default Home;
