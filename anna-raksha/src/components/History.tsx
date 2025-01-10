import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { FaEnvelope, FaPhone, FaUtensils, FaCalendarAlt } from 'react-icons/fa';

const HistoryPage: React.FC = () => {
  const [foodPosts, setFoodPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch food posts from Firestore on page load
  useEffect(() => {
    const fetchFoodPosts = async () => {
      try {
        const q = query(collection(db, 'foodPosts'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
<<<<<<< HEAD
      <div className="flex justify-center items-center h-screen w-screen bg-black text-white ">
=======
      <div className="flex justify-center items-center h-screen bg-black text-white w-screen ">
>>>>>>> 15bd79eb7f6dbaa353dbe620574506f3701e39f5
        <p className="text-xl">Loading food posts...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-black text-white min-h-screen w-screen">
      <h1 className="text-3xl font-bold mb-8 text-center border-b border-gray-700 pb-4">
        Food Post History
      </h1>
      {foodPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodPosts.map((post) => (
            <div
              key={post.id}
              className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={post.profilePicture || 'https://via.placeholder.com/50'}
                    alt="Profile"
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{post.displayName}</h3>
                    <p className="text-sm text-gray-400 flex items-center">
                      <FaEnvelope className="mr-2" />
                      {post.email}
                    </p>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2 text-yellow-400">{post.name}</h2>
                <p className="text-gray-400 flex items-center mb-1">
                  <FaUtensils className="mr-2" /> Quantity: {post.quantity}
                </p>
                <p className="text-gray-400 flex items-center mb-1">
                  <FaUtensils className="mr-2" /> Food Type: {post.foodType}
                </p>
                <p className="text-gray-400 flex items-center mb-1">
                  <FaUtensils className="mr-2" /> Organization: {post.organizationName}
                </p>
                <p className="text-gray-400 flex items-center mb-1">
                  <FaPhone className="mr-2" /> Phone: {post.phoneNumber}
                </p>
                <p className="text-gray-400 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Date: {new Date(post.timestamp.seconds * 1000).toLocaleString()}
                </p>
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
