export default function ChatMessage({ text, sender }) {
  return (
    <div
      className={`p-2 my-2 rounded-lg max-w-md ${
        sender === "user"
          ? "ml-auto bg-blue-500 text-white"
          : "mr-auto bg-gray-200 dark:bg-gray-700 dark:text-white"
      }`}
    >
      {text}
    </div>
  );
}
