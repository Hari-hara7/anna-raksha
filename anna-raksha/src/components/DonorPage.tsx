import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addFoodPost } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import io from 'socket.io-client';
import {
  FaAppleAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUserAlt,
  FaCalendarAlt,
  FaBox,
  FaInfoCircle,
  FaBuilding,
  FaEnvelope,
} from 'react-icons/fa';

// Connect to the backend Socket.IO server
const socket = io('http://localhost:4000'); // Change to your server URL

const DonorPage: React.FC = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [foodType, setFoodType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { user } = useAuth();
  const [foodPosts, setFoodPosts] = useState<any[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const fetchFoodPosts = async () => {
      if (user) {
        const foodPostsCollection = collection(db, 'foodPosts');
        const foodPostsQuery = query(foodPostsCollection, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(foodPostsQuery);
        const posts = querySnapshot.docs.map((doc) => doc.data());
        setFoodPosts(posts);
      }
    };

    fetchFoodPosts();

    // Listen for food post notifications from the server
    socket.on('foodPostNotification', (data: any) => {
      setNotification(`New food post: ${data.name} - Quantity: ${data.quantity}`);
    });

    // Clean up the socket listener when component unmounts
    return () => {
      socket.off('foodPostNotification');
    };
  }, [user]);

  const handlePostFood = async () => {
    if (user) {
      const profilePicture = user.photoURL || '';
      const name = user.displayName || 'Anonymous';
      const email = user.email || 'No Email';

      await addFoodPost({
        name: foodName,
        quantity,
        foodType,
        expiryDate,
        pickupLocation,
        pickupInstructions,
        organizationName,
        phoneNumber,
        profilePicture,
        email,
        displayName: name,
        dateTime: new Date(),
        uid: user.uid,
      });

      socket.emit('newFoodPost', { name: foodName, quantity });

      const foodPostsCollection = collection(db, 'foodPosts');
      const foodPostsQuery = query(foodPostsCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(foodPostsQuery);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setFoodPosts(posts);

      setFoodName('');
      setQuantity(0);
      setFoodType('');
      setExpiryDate('');
      setPickupLocation('');
      setPickupInstructions('');
      setOrganizationName('');
      setPhoneNumber('');
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-2">Welcome to the Donor Portal</h1>
        <p className="text-xl text-gray-400">Post your food donations and help those in need.</p>
      </div>

      {/* Profile Header */}
      {user && (
        <div className="flex items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
          <img
            src={user.photoURL || 'https://via.placeholder.com/50'}
            alt="Profile"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.displayName || 'Anonymous'}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
      )}

      {/* Input Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaBuilding className="mr-2 text-yellow-500" />
            <input
              type="text"
              placeholder="Organization Name"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <FaPhoneAlt className="mr-2 text-yellow-500" />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaAppleAlt className="mr-2 text-yellow-500" />
            <input
              type="text"
              placeholder="Food Name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <FaBox className="mr-2 text-yellow-500" />
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <FaInfoCircle className="mr-2 text-yellow-500" />
            <input
              type="text"
              placeholder="Food Type"
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaCalendarAlt className="mr-2 text-yellow-500" />
            <input
              type="datetime-local"
              placeholder="Expiry Date and Time"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
          <div className="flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-yellow-500" />
            <input
              type="text"
              placeholder="Pickup Location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="border-b-2 border-white bg-transparent text-white p-2 w-full"
            />
          </div>
          <textarea
            placeholder="Pickup Instructions"
            value={pickupInstructions}
            onChange={(e) => setPickupInstructions(e.target.value)}
            className="border-b-2 border-white bg-transparent text-white p-2 w-full h-32 resize-none"
          ></textarea>
          <button
            onClick={handlePostFood}
            className="mt-4 bg-yellow-500 text-black py-2 px-4 rounded-lg hover:bg-yellow-400 transition-all w-full"
          >
            Post Food
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div className="bg-yellow-200 text-black p-4 rounded-lg my-4 shadow-lg">
          {notification}
        </div>
      )}

      {/* Food Posts Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Posted Food</h2>
        {foodPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodPosts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <FaAppleAlt className="mr-2 text-yellow-500" />
                  {post.name}
                </h3>
                <p>
                  <FaBox className="inline-block mr-2 text-yellow-500" />
                  Quantity: {post.quantity}
                </p>
                <p>
                  <FaInfoCircle className="inline-block mr-2 text-yellow-500" />
                  Food Type: {post.foodType}
                </p>
                <p>
                  <FaCalendarAlt className="inline-block mr-2 text-yellow-500" />
                  Expiry: {new Date(post.expiryDate).toLocaleString()}
                </p>
                <p>
                  <FaMapMarkerAlt className="inline-block mr-2 text-yellow-500" />
                  Location: {post.pickupLocation}
                </p>
                <p>
                  <FaBuilding className="inline-block mr-2 text-yellow-500" />
                  Organization: {post.organizationName}
                </p>
                <p>
                  <FaPhoneAlt className="inline-block mr-2 text-yellow-500" />
                  Phone: {post.phoneNumber}
                </p>
                <p>
                  <FaEnvelope className="inline-block mr-2 text-yellow-500" />
                  Email: {post.email}
                </p>
                <div className="mt-4 flex items-center">
                  <img
                    src={post.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p>{post.displayName}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No food posts available. Please sign in to continue.</p>
        )}
      </div>
    </div>
  );
};

export default DonorPage;
