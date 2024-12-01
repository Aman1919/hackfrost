import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";
import React from "react";
import Spinner from "./spinner";

interface RouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<RouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading || user === undefined) {
    return <Spinner/>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export const PublicRoute: React.FC<RouteProps> = ({ children }) => {
  const { user, loading } = useAuthStore();

  if (loading || user === undefined) {
    return <Spinner/>;
  }

  if (user) {
    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
