// src/pages/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { getDonationHistory } from '../firebase/firestore';

const Dashboard = () => {
  const [donations, setDonations] = useState<any[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      const history = await getDonationHistory();
      setDonations(history);
    };

    fetchDonations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold">Your Donations</h2>
      <ul className="mt-4">
        {donations.map((donation) => (
          <li key={donation.id} className="p-2 border mt-2">
            <p>Food: {donation.foodName}</p>
            <p>Quantity: {donation.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
