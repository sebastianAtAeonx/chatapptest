import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/chat"
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
