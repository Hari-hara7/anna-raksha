// src/firebase/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC1SE66I1e4qOlqhU1hf9TEQ483Q_PsLvA",
  authDomain: "crypto-2eb38.firebaseapp.com",
  projectId: "crypto-2eb38",
  storageBucket: "crypto-2eb38.firebasestorage.app",
  messagingSenderId: "539257024803",
  appId: "1:539257024803:web:78e43c24f87b6cfb4d5c96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Google Authentication Provider
const googleProvider = new GoogleAuthProvider();

// Signup and login with Email
const signUpWithEmail = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signInWithEmail = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Google login function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Optional: Handle additional user info like saving to Firestore if needed
    const userRef = collection(db, 'users');
    const docRef = await addDoc(userRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return result;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

// Add food data to Firestore
const addFoodPost = async (foodDetails: { name: string; quantity: number; dateTime: Date }) => {
  const user = auth.currentUser; // Get current logged-in user
  if (user) {
    const docRef = await addDoc(collection(db, 'foodPosts'), {
      ...foodDetails,
      uid: user.uid, // Store the user's UID along with the food post
      timestamp: Timestamp.fromDate(new Date()),
    });
    return docRef.id;
  }
  throw new Error('User not logged in');
};

// Fetch food posts for the current user
const fetchFoodPostsForUser = async (userId: string) => {
  const postsRef = collection(db, 'foodPosts');
  const foodPostsQuery = postsRef.where('uid', '==', userId); // Filter by user UID
  const querySnapshot = await getDocs(foodPostsQuery);
  const foodPosts = querySnapshot.docs.map(doc => doc.data());
  return foodPosts;
};

export { auth, db, signInWithGoogle, signUpWithEmail, signInWithEmail, addFoodPost, fetchFoodPostsForUser };
