import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  Timestamp,
} from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const FoodRequestsFeed: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [helpMessage, setHelpMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'foodRequests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setRequests(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleOfferHelp = (req: any) => {
    if (!user) {
      toast.error('You must be logged in to help.');
      return;
    }
    setSelectedRequest(req);
  };

  const sendHelpMessage = async () => {
    if (!helpMessage.trim()) {
      toast.error('Please enter a message.');
      return;
    }

    try {
      await addDoc(
        collection(db, `users/${selectedRequest.userId}/notifications`),
        {
          responderId: user.uid,
          responderName: user.displayName || 'Anonymous',
          responderEmail: user.email,
          responderPhoto: user.photoURL || '',
          requestId: selectedRequest.id,
          helpMessage,
          time: Timestamp.now(),
        }
      );

      toast.success('Message sent to requester!');
      setHelpMessage('');
      setSelectedRequest(null);
    } catch (err) {
      console.error(err);
      toast.error('Error sending message.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">📦 Live Food Requests</h2>
      {requests.map((req) => (
        <div key={req.id} className="border border-gray-300 p-4 mb-3 rounded shadow-md">
          <h3 className="font-semibold text-lg">{req.foodName} (x{req.quantity})</h3>
          <p className="italic">{req.message}</p>
          <p className="text-sm text-gray-600 mt-1">
            Requested by: {req.displayName || req.email}
          </p>

          <button
            onClick={() => handleOfferHelp(req)}
            className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
          >
            I Can Help
          </button>
        </div>
      ))}

      {/* 🚀 Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-2">Send Help Message</h3>
            <textarea
              className="w-full border p-2 rounded mb-4"
              rows={4}
              placeholder="Describe how you can help..."
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-300 text-black px-3 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={sendHelpMessage}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodRequestsFeed;
