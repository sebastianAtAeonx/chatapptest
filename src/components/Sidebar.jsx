export default function Sidebar({ chats, setChats, setCurrentChat }) {
  const addChat = () => {
    const newChat = { id: chats.length + 1, title: `Chat ${chats.length + 1}` };
    setChats([...chats, newChat]);
    setCurrentChat(newChat.id);
  };

  return (
    <div className="w-64 bg-gray-200 dark:bg-gray-800 p-4">
      <button
        onClick={addChat}
        className="w-full p-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        New Chat
      </button>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            onClick={() => setCurrentChat(chat.id)}
            className="p-2 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            {chat.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
