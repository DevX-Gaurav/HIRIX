import React from "react";
import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
