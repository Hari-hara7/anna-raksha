// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getUserDonations } from '../firebase/firestore'; // Fetch donations from Firestore
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard: React.FC = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const data = await getUserDonations();  // Function to get donations from Firestore
      setDonations(data);
    };

    fetchDonations();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-200">
        <h2 className="text-2xl font-bold mb-4">Your Donations</h2>
        <ul className="space-y-4">
          {donations.map((donation, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow-md w-full max-w-md">
              <p><strong>Food:</strong> {donation.foodDetails}</p>
              <p><strong>Location:</strong> {donation.location}</p>
              <p><strong>Status:</strong> {donation.status}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
