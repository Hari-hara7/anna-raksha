import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Check if the user is signed in
  if (!user) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen w-screen px-4 ${isDarkMode ? 'bg-gray-900 text-yellow-400' : 'bg-gray-50 text-gray-700'}`}>
        <p className="text-lg sm:text-2xl font-semibold text-center">
          You need to sign in to access the dashboard.
        </p>
      </div>
    );
  }

  const profileImage = user.photoURL || 'https://www.example.com/default-avatar.png';
  const displayName = user.displayName || 'User';

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-yellow-400' : 'bg-gradient-to-br from-yellow-50 via-white to-gray-100'} min-h-screen w-screen flex flex-col items-center px-4 sm:px-6`}>
      {/* Theme Toggle */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-2 rounded-full shadow-md focus:outline-none ${
            isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-yellow-400'
          }`}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Profile Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} w-full max-w-md sm:max-w-lg shadow-lg rounded-xl p-6 text-center`}>
        <img
          src={profileImage}
          alt="User profile"
          className="rounded-full w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4 object-cover shadow-md border-4 border-yellow-500"
        />
        <h1 className="text-xl sm:text-2xl font-bold mb-2">
          Welcome, <span className="text-yellow-500">{displayName}</span>!
        </h1>
        <p className="text-sm sm:text-base mb-4">
          Email: <span className="font-medium">{user.email}</span>
        </p>
        <button
          onClick={signOut}
          className={`w-full py-2 text-sm sm:text-base mt-4 rounded-lg shadow-md focus:outline-none focus:ring-2 transition-all ${
            isDarkMode
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
              : 'bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          Sign Out
        </button>
      </div>

      {/* Additional Section */}
      <div className={`${isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'} w-full max-w-md sm:max-w-lg mt-8 shadow-lg rounded-xl p-6`}>
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Dashboard Features</h2>
        <ul className="space-y-3 text-sm sm:text-base">
          <li className="flex items-center">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 font-bold ${
              isDarkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-500 text-white'
            }`}>
              1
            </span>
            View your profile and manage account settings.
          </li>
          <li className="flex items-center">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 font-bold ${
              isDarkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-500 text-white'
            }`}>
              2
            </span>
            Access personalized recommendations.
          </li>
          <li className="flex items-center">
            <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 font-bold ${
              isDarkMode ? 'bg-yellow-500 text-gray-900' : 'bg-yellow-500 text-white'
            }`}>
              3
            </span>
            Track your activity and progress.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
