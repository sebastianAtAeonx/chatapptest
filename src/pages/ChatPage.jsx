/* eslint-disable no-unused-vars */
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([{ id: 1, title: "New Chat" }]);
  const [currentChat, setCurrentChat] = useState(1);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: "user" }]);
    // Simulate a bot reply (replace with API call later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: "Hello! How can I help?", sender: "bot" },
      ]);
    }, 500);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <Sidebar
        chats={chats}
        setChats={setChats}
        setCurrentChat={setCurrentChat}
      />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} text={msg.text} sender={msg.sender} />
          ))}
        </div>
        <ChatInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
