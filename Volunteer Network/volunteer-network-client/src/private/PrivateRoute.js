import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const {
    currentUser: { email },
    loading,
  } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  else if (email) return children;
  return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;
