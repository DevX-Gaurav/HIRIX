import React from "react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster  reverseOrder={false} />
    </AuthProvider>
  );
};

export default App;
