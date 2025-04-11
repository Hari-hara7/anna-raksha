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
import { FaUserCircle } from 'react-icons/fa';

const FoodRequestsFeed: React.FC = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<any | null>(null);
  const [helpMessage, setHelpMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'foodRequests'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newRequests: any[] = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = { id: change.doc.id, ...change.doc.data() };
          newRequests.push(data);
          toast.success(`New request: ${data.foodName} by ${data.displayName || data.email}`);
        }
      });

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
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">📦 Live Food Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="glassmorphism border border-yellow-500/30 bg-black/40 backdrop-blur-lg text-white p-4 rounded-xl shadow-lg transform transition hover:scale-[1.03] duration-300"
          >
            <div className="flex items-center gap-4 mb-3">
              <img
                src={req.profilePicture || 'https://i.ibb.co/y4bM3y0/default-avatar.png'}
                alt="Requester"
                className="w-12 h-12 rounded-full border-2 border-yellow-400 shadow-md"
              />
              <div>
                <p className="font-semibold text-yellow-300">
                  {req.displayName || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-400">{req.email}</p>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-1 text-yellow-200">
              🍽️ {req.foodName} (x{req.quantity})
            </h3>
            <p className="italic text-gray-300 mb-3">
              {req.message || 'No message provided.'}
            </p>

            <button
              onClick={() => handleOfferHelp(req)}
              className="bg-yellow-400 text-black px-4 py-2 rounded-md font-bold hover:scale-105 transition-transform"
            >
              I Can Help
            </button>
          </div>
        ))}
      </div>

      {/* 🚀 Modal for Help Message */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
          <div className="bg-[#1c1c1c] border border-yellow-500/30 text-white p-6 rounded-xl shadow-2xl w-full max-w-md">
            <h3 className="text-xl font-bold mb-2 text-yellow-300">💬 Send Help Message</h3>
            <p className="text-sm text-gray-400 mb-2">
              To: {selectedRequest.displayName || selectedRequest.email}
            </p>
            <textarea
              className="w-full bg-black border border-yellow-500/40 p-3 rounded-md text-white mb-4"
              rows={4}
              placeholder="Describe how you can help..."
              value={helpMessage}
              onChange={(e) => setHelpMessage(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedRequest(null)}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={sendHelpMessage}
                className="bg-yellow-400 text-black px-4 py-2 rounded font-bold hover:scale-105 transition"
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
