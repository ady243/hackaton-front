"use client";
import React from 'react';

interface ChatBubbleProps {
  text: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text }) => {
  return (
    <div className="p-4  border-indigo-600 text-black rounded-lg mb-2 max-w-xs">
      {text}
    </div>
  );
};

export default ChatBubble;