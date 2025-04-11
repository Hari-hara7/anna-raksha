// src/components/ChatBot.tsx
import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs
} from "firebase/firestore";
import { FaPaperPlane } from "react-icons/fa";
import Message from "./Message";

// Initialize Firebase services
const auth = getAuth();
const db = getFirestore();

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const fetchMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const querySnapshot = await getDocs(q);
    const messagesData = querySnapshot.docs.map((doc) => doc.data());
    setMessages(messagesData);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        user: auth.currentUser?.displayName || "Anonymous",
        timestamp: new Date(),
      });
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-4 bg-gray-800 rounded-lg w-full max-w-lg mx-auto">
      <div className="h-96 overflow-auto mb-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          className="w-full p-2 rounded-l-lg text-black"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button
          className="p-2 bg-blue-500 text-white rounded-r-lg"
          onClick={sendMessage}
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
