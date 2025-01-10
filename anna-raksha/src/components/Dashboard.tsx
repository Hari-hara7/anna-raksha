import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  // Check if the user is signed in
  if (!user) {
    return <p>You need to sign in to access the dashboard.</p>;
  }

  // Set a fallback image in case the user doesn't have a photo
  const profileImage = user.photoURL || 'https://www.example.com/default-avatar.png';

  // Set a fallback display name if not available
  const displayName = user.displayName || 'User';

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {displayName}!
      </h1>
      <img
        src={profileImage}
        alt="User profile"
        className="rounded-full w-32 h-32 mb-4 object-cover"
      />
      <p className="text-lg text-gray-700 mb-4">Email: {user.email}</p>
      <button
        onClick={signOut}
        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Dashboard;
