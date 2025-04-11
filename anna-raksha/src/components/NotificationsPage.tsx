import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { FaBell } from 'react-icons/fa';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, `users/${user.uid}/notifications`),
      orderBy('time', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-[#2c2c2c] text-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400 flex items-center gap-3 mb-8">
          <FaBell className="animate-bounce" /> Your Notifications
        </h2>

        {notifications.length === 0 ? (
          <div className="text-center text-gray-400 mt-16">No messages yet.</div>
        ) : (
          notifications.map((note) => (
            <div
              key={note.id}
              className="glassmorphism border border-yellow-500/30 rounded-2xl p-5 mb-6 shadow-xl transition-transform hover:scale-[1.02] hover:shadow-yellow-500/20 flex gap-5 items-start backdrop-blur-md"
            >
              {/* Profile or Initials */}
              {note.responderPhoto ? (
                <img
                  src={note.responderPhoto}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover border-2 border-yellow-500"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-yellow-600 text-black flex items-center justify-center font-bold text-lg border-2 border-yellow-300">
                  {note.responderName?.charAt(0)}
                </div>
              )}

              {/* Notification Details */}
              <div>
                <p className="text-lg font-semibold text-yellow-300">{note.responderName}</p>
                <p className="text-sm text-gray-400">{note.responderEmail}</p>
                <p className="italic text-white mt-2">"{note.helpMessage}"</p>
                <p className="text-xs text-gray-500 mt-1">
                  {note.time?.toDate().toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
