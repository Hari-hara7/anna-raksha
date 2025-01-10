import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const RequestPage: React.FC = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handlePostRequest = async () => {
    if (user) {
      try {
        // Post the food request to Firestore
        await addDoc(collection(db, 'foodRequests'), {
          foodName,
          quantity,
          message,
          userId: user.uid,
          timestamp: Timestamp.fromDate(new Date()), // Store the current timestamp
          email: user.email,
          displayName: user.displayName,
          profilePicture: user.photoURL,
        });

        // Clear input fields after submitting the request
        setFoodName('');
        setQuantity(0);
        setMessage('');
      } catch (error) {
        console.error('Error posting food request:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Request Food</h1>
      {user ? (
        <div>
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
          <button onClick={handlePostRequest} className="bg-blue-500 text-white p-2 rounded">
            Post Request
          </button>
        </div>
      ) : (
        <p>Please login to post a food request.</p>
      )}
    </div>
  );
};

export default RequestPage;
