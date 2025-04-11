import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🔔 Your Notifications</h2>
      {notifications.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className="border border-gray-300 p-4 rounded mb-4 shadow-md flex items-start gap-4"
          >
            {note.responderPhoto ? (
              <img
                src={note.responderPhoto}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                {note.responderName?.charAt(0)}
              </div>
            )}

            <div>
              <p className="font-bold">{note.responderName}</p>
              <p className="text-sm text-gray-600">{note.responderEmail}</p>
              <p className="italic mt-2">"{note.helpMessage}"</p>
              <p className="text-xs text-gray-500 mt-1">
                {note.time?.toDate().toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationsPage;
