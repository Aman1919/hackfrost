import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store";
import React from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user ,loading} = useAuthStore();
  if(loading || user===undefined){
    return <h1>Loading....</h1>;
 }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { user ,loading} = useAuthStore();
   if(loading || user===undefined){
      return <h1>Loading....</h1>;
   }
    if (user===null) {
      return <Navigate to="/home" />;
    }
  
    return <>{children}</>;
  };

export default ProtectedRoute;
