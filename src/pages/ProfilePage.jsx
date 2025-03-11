/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import axios from "axios";

export default function ProfilePage() {
  const { user, token } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://your-api-url/api/user/update", // Replace with your update endpoint
        { email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local user data if API returns updated user
      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Profile
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleUpdate}>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          />
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            Theme
          </label>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 mb-4 bg-gray-200 dark:bg-gray-700 rounded"
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
