// src/pages/Home.tsx
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold">Welcome to My Donation App</h1>
      <p className="mt-4 text-lg">A platform where you can donate food and help those in need.</p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Features</h2>
        <ul className="list-disc ml-5 mt-2">
          <li>Post available food</li>
          <li>Send SMS notifications</li>
          <li>Track donation history</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
