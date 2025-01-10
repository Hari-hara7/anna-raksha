// src/firebase/firestore.ts
import { doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

// Add food post (donor)
export const postFood = async (name: string, quantity: string) => {
  const foodRef = collection(firestore, 'food');
  try {
    await addDoc(foodRef, {
      name,
      quantity,
      timestamp: Timestamp.now(),
    });
  } catch (error) {
    console.error('Error posting food: ', error.message);
  }
};
