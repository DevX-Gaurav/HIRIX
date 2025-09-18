import React from "react";
import { Outlet } from "react-router-dom";

const EmployeerProtectionRoute = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default EmployeerProtectionRoute;
