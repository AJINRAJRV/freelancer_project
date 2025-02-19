import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // Check if user is logged in
  if (!currentUser) {
  
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;