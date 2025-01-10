import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const RequestsHistoryPage: React.FC = () => {
  const [foodRequests, setFoodRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch food requests from Firestore on page load
  useEffect(() => {
    const fetchFoodRequests = async () => {
      try {
        const q = query(collection(db, 'foodRequests'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFoodRequests(requests);
      } catch (error) {
        console.error('Error fetching food requests:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodRequests();
  }, []);

  if (loading) {
    return <p>Loading food requests...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Food Request History</h1>
      {foodRequests.length > 0 ? (
        <div className="space-y-4">
          {foodRequests.map((request) => (
            <div key={request.id} className="border p-4 rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={request.profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{request.displayName}</p>
                  <p className="text-sm text-gray-600">{request.email}</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold">{request.foodName}</h2>
              <p className="text-gray-600">Quantity: {request.quantity}</p>
              <p className="text-gray-600">Message: {request.message}</p>
              <p className="text-gray-600">
                Requested at: {new Date(request.timestamp.seconds * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No food requests available.</p>
      )}
    </div>
  );
};

export default RequestsHistoryPage;
