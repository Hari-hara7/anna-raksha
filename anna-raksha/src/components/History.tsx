import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaEnvelope, FaPhone, FaUtensils, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const HistoryPage: React.FC = () => {
  const [foodPosts, setFoodPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to check if a date is expired
  const isExpired = (expireDate: Date) => {
    return new Date() > expireDate;
  };

  // Fetch food posts from Firestore on page load
  useEffect(() => {
    const fetchFoodPosts = async () => {
      try {
        const q = query(collection(db, 'foodPosts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          expireDate: doc.data().expireDate ? doc.data().expireDate.toDate() : null, // Convert Firestore Timestamp to JS Date
        }));
        setFoodPosts(posts);
      } catch (error) {
        console.error('Error fetching food posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodPosts();
  }, []);

  // Add Tawk.to chatbot script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67817afbaf5bfec1dbe9eb10/1ih8sgqct';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Clean up the script on component unmount
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p className="text-xl">Loading food posts...</p>
      </div>
    );
  }
  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen w-screen">
      <h1 className="text-3xl font-bold mb-8 text-center border-b border-gray-700 pb-4 text-yellow-400">
        Food Post History
      </h1>
      {foodPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodPosts.map((post) => (
            <div
              key={post.id}
              className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden hover:bg-gray-700"
            >
              <div className="p-6 space-y-4">
                {/* Profile Picture and Name */}
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={post.profilePicture || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-yellow-400"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400">{post.displayName}</h3>
                    <p className="text-gray-300 flex items-center space-x-2">
                      <FaEnvelope className="text-yellow-400" />
                      <span>{post.email}</span>
                    </p>
                  </div>
                </div>

                {/* Food Post Details */}
                <h3 className="text-xl font-bold mb-2">{post.name}</h3>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaUtensils className="text-yellow-400" />
                  <p>Quantity: {post.quantity}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaUtensils className="text-yellow-400" />
                  <p>Food Type: {post.foodType}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaCalendarAlt className="text-yellow-400" />
                  <p>
                    Expiry Date: {new Date(post.expiryDate).toLocaleString()}{" "}
                    {new Date(post.expiryDate) < new Date() ? (
                      <span className="text-red-500 font-bold">(Expired)</span>
                    ) : (
                      <span className="text-green-500 font-bold">(Active)</span>
                    )}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaMapMarkerAlt className="text-yellow-400" />
                  <p>Location: {post.pickupLocation}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <p>Organization: {post.organizationName}</p>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FaPhone className="text-yellow-400" />
                  <p>{post.phoneNumber}</p>
                </div>
              </div>
              <div className="absolute top-0 left-0 h-1 w-full bg-yellow-400 transition-all duration-300 hover:w-0"></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400">No food posts available.</p>
      )}
    </div>
  );
};

export default HistoryPage;
