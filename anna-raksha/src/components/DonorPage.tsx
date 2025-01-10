import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { addFoodPost } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const DonorPage: React.FC = () => {
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const { user } = useAuth();
  const [foodPosts, setFoodPosts] = useState<any[]>([]); // For storing food posts

  useEffect(() => {
    const fetchFoodPosts = async () => {
      if (user) {
        // Query to fetch food posts that match the logged-in user's uid
        const foodPostsCollection = collection(db, 'foodPosts');
        const foodPostsQuery = query(foodPostsCollection, where('uid', '==', user.uid)); // Filter by user.uid
        const querySnapshot = await getDocs(foodPostsQuery);
        const posts = querySnapshot.docs.map((doc) => doc.data());
        setFoodPosts(posts);
      }
    };

    fetchFoodPosts();
  }, [user]); // Re-fetch whenever the user changes

  const handlePostFood = async () => {
    if (user) {
      // Post food details along with user uid
      await addFoodPost({
        name: foodName,
        quantity,
        dateTime: new Date(),
        uid: user.uid, // Associate the food post with the logged-in user
      });

      // Fetch updated list of food posts after posting
      const foodPostsCollection = collection(db, 'foodPosts');
      const foodPostsQuery = query(foodPostsCollection, where('uid', '==', user.uid));
      const querySnapshot = await getDocs(foodPostsQuery);
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setFoodPosts(posts);

      // Clear input fields after posting
      setFoodName('');
      setQuantity(0);
    }
  };

  return (
    <div className="p-4">
      {user ? (
        <div>
          <input
            type="text"
            placeholder="Food Name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            className="border p-2 mb-4"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 mb-4"
          />
          <button onClick={handlePostFood} className="bg-blue-500 text-white p-2 rounded">
            Post Food
          </button>
        </div>
      ) : (
        <p>Please login to post food.</p>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold mb-4">Your Posted Food</h2>
        {foodPosts.length > 0 ? (
          <ul>
            {foodPosts.map((post, index) => (
              <li key={index} className="mb-4">
                <h3 className="text-xl font-semibold">{post.name}</h3>
                <p>Quantity: {post.quantity}</p>
                <p>Posted at: {post.dateTime?.toDate().toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No food posts available.</p>
        )}
      </div>
    </div>
  );
};

export default DonorPage;
