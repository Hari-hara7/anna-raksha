// src/pages/DonorPage.tsx
import React, { useState } from 'react';
import { addFoodToFirestore } from '../firebase/firestore';

const DonorPage = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handlePostFood = async () => {
    const foodDetails = {
      foodName,
      quantity,
      timestamp: new Date(),
    };
    await addFoodToFirestore(foodDetails);
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold">Post Food</h2>
      <input
        type="text"
        placeholder="Food Name"
        className="w-full p-2 mt-4 border rounded"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Quantity"
        className="w-full p-2 mt-4 border rounded"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={handlePostFood} className="w-full p-2 mt-4 bg-blue-600 text-white rounded">Post Food</button>
    </div>
  );
};

export default DonorPage;
