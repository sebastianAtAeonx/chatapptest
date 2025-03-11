import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex p-2 bg-white dark:bg-gray-800 border-t"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 p-2 rounded-l dark:bg-gray-700 dark:text-white"
      />
      <button
        type="submit"
        className="p-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
      >
        Send
      </button>
    </form>
  );
}
