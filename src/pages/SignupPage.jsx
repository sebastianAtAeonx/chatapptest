/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const { signup } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      navigate("/chat");
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSignup}
        className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          Sign Up
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
