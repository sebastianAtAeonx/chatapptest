import { createContext, useState, useEffect } from "react";
import { signup, login, logout } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token, user]);

  const handleSignup = async (email, password) => {
    try {
      const { token, user } = await signup(email, password);
      setToken(token);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const { token, user } = await login(email, password);
      setToken(token);
      setUser(user);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const handleLogout = () => {
    logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signup: handleSignup,
        login: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
