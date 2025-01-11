// src/components/Message.tsx
import React from "react";

const Message: React.FC<{ message: any }> = ({ message }) => {
  return (
    <div className="mb-2 p-2 rounded-lg bg-gray-700">
      <p className="font-bold text-yellow-400">{message.user}</p>
      <p>{message.text}</p>
      <p className="text-xs text-gray-400">{new Date(message.timestamp.seconds * 1000).toLocaleString()}</p>
    </div>
  );
};

export default Message;
