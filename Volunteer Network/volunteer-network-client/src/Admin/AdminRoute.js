import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { admin, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loader />;
  else if (admin) return children;
  return <Navigate to="/forbidden" state={{ from: location }} />;
};

export default AdminRoute;
