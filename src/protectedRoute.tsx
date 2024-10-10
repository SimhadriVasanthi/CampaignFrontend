import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const isAuthenticated = () => {
  const token = localStorage.getItem("_campaign_token");
  return !!token;
};

const ProtectedRoute: React.FC<{ link: string }> = ({ link }) => {
  const location = useLocation();
  const queryParams:any = new URLSearchParams(location.search);
  localStorage.setItem("tempId",queryParams.get("s"))
  localStorage.setItem("tempP",queryParams.get("p"))

  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
