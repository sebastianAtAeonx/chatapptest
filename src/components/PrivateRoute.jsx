import React from 'react';
import { Navigate } from 'react-router-dom/dist';

function PrivateRoute({ isLoggedIn, children }) {
  const userData = window.localStorage.getItem('UserData');
  if (isLoggedIn || userData) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
