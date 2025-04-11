import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import FoodRequestsFeed from './FoodRequestsFeed'; // 👈 Add this import
import { toast } from 'react-hot-toast';

const RequestPage: React.FC = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handlePostRequest = async () => {
    if (!user) {
      toast.error('Please login to post a request.');
      return;
    }

    if (!foodName || quantity <= 0) {
      toast.error('Please enter valid food name and quantity.');
      return;
    }

    try {
      await addDoc(collection(db, 'foodRequests'), {
        foodName,
        quantity,
        message,
        userId: user.uid,
        timestamp: Timestamp.fromDate(new Date()),
        email: user.email,
        displayName: user.displayName,
        profilePicture: user.photoURL,
      });

      toast.success('Food request posted!');
      setFoodName('');
      setQuantity(0);
      setMessage('');
    } catch (error) {
      console.error('Error posting food request:', error);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🍽️ Request Food</h1>
      {user ? (
        <div className="mb-10">
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 mb-4 w-full"
          />
          <textarea
            placeholder="Message or Reason for Request"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 mb-4 w-full"
          />
          <button
            onClick={handlePostRequest}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Post Request
          </button>
        </div>
      ) : (
        <p className="text-red-600">Please login to post a food request.</p>
      )}

      {/* 👉 Real-Time Feed Below */}
      <div className="mt-10">
        <FoodRequestsFeed />
      </div>
    </div>
  );
};

export default RequestPage;
