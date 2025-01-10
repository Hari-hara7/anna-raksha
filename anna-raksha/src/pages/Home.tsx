// src/pages/Home.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold">Welcome to the Food Donation Platform</h1>
        <p className="mt-4 text-lg">Donate food to those in need and make a difference in someone's life.</p>
        <div className="mt-8">
          <h2 className="text-2xl">Features:</h2>
          <ul className="mt-4 list-disc pl-8">
            <li>Post food donations</li>
            <li>View donation history</li>
            <li>Receive food donations near you</li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
