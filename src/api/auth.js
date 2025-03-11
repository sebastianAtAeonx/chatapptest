import axios from "axios";

const API_URL = "http://your-api-url/api/auth"; // Replace with your API base URL

export const signup = async (email, password) => {
  const response = await axios.post(`${API_URL}/signup`, { email, password });
  return response.data; // { token, user }
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // { token, user }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
