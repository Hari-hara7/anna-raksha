// src/pages/DonorPage.tsx
import React, { useState } from 'react';
import { postFoodDonation } from '../firebase/firestore'; // Assuming a function to save data in Firestore
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DonorPage: React.FC = () => {
  const [foodDetails, setFoodDetails] = useState('');
  const [location, setLocation] = useState('');

  const handlePostDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postFoodDonation(foodDetails, location);
      alert("Donation posted successfully!");
      setFoodDetails('');
      setLocation('');
    } catch (error) {
      console.error(error);
      alert("Failed to post donation.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
        <form onSubmit={handlePostDonation} className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-4">Donate Food</h2>
          <textarea
            placeholder="Describe the food being donated"
            value={foodDetails}
            onChange={(e) => setFoodDetails(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded"
            required
          />
          <button type="submit" className="w-full p-3 bg-orange-500 text-white rounded">Post Donation</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default DonorPage;
