import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import FoodRequestsFeed from './FoodRequestsFeed';
import { toast } from 'react-hot-toast';
import { FaUtensils, FaHashtag, FaCommentDots, FaPaperPlane } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gradient-to-br from-black via-[#1a1a1a] to-[#2c2c2c] text-white p-4">
      <div className="max-w-4xl mx-auto glassmorphism shadow-2xl p-6 rounded-2xl mt-8 backdrop-blur-md border border-yellow-400/20">
        <h1 className="text-3xl font-extrabold text-yellow-400 mb-6 flex items-center gap-2">
          <FaUtensils className="text-yellow-500 animate-pulse" />
          Request Food
        </h1>

        {user ? (
          <>
            {/* 🧑‍🦱 User Profile Card */}
            <div className="flex items-center gap-4 mb-6 p-4 bg-black/30 rounded-xl border border-yellow-600/30 shadow-md">
              <img
                src={user.photoURL || 'https://i.ibb.co/y4bM3y0/default-avatar.png'}
                alt="User Profile"
                className="w-14 h-14 rounded-full border-2 border-yellow-400 shadow-lg"
              />
              <div>
                <p className="text-yellow-300 font-semibold">{user.displayName}</p>
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            {/* ✍️ Request Form */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <label className="text-sm font-semibold text-yellow-300 flex items-center gap-2">
                  <FaUtensils />
                  Food Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Rice, Bread"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                  className="bg-black border border-yellow-500 text-white p-3 rounded-md focus:outline-yellow-400 placeholder:text-gray-400"
                />

                <label className="text-sm font-semibold text-yellow-300 flex items-center gap-2">
                  <FaHashtag />
                  Quantity
                </label>
                <input
                  type="number"
                  placeholder="e.g., 5"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-black border border-yellow-500 text-white p-3 rounded-md focus:outline-yellow-400 placeholder:text-gray-400"
                />

                <label className="text-sm font-semibold text-yellow-300 flex items-center gap-2">
                  <FaCommentDots />
                  Message
                </label>
                <textarea
                  placeholder="Optional message or reason..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-black border border-yellow-500 text-white p-3 rounded-md focus:outline-yellow-400 placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center justify-center mt-6 md:mt-0">
                <button
                  onClick={handlePostRequest}
                  className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300 flex items-center gap-2"
                >
                  <FaPaperPlane />
                  Post Request
                </button>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500 font-semibold text-center mt-4">
            Please login to post a food request.
          </p>
        )}

        <hr className="border-yellow-600 my-10" />

        {/* 📥 Feed */}
        <div className="mt-10">
          <FoodRequestsFeed />
        </div>
      </div>
    </div>
  );
};

export default RequestPage;
