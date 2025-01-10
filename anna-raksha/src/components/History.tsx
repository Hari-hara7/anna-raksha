import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

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

  if (loading) {
    return <p>Loading food posts...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Post History</h1>
      {foodPosts.length > 0 ? (
        <div className="space-y-4">
          {foodPosts.map((post) => (
            <div key={post.id} className="border p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{post.name}</h2>
              <p className="text-gray-600">Quantity: {post.quantity}</p>
              <p className="text-gray-600">
                Date: {new Date(post.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No food posts available.</p>
      )}
    </div>
  );
};

export default HistoryPage;
