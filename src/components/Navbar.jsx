import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/chat"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          ChatApp
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              <Link
                to="/profile"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500"
              >
                Logout
              </button>
            </>
          )}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
