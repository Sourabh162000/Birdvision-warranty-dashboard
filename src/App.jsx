import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  const token = localStorage.getItem("token");

  const routes = useRoutes([
    {
      path: "/login",
      element: token ? <Navigate to="/dashboard" /> : <Login />,
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Dashboard />} />,
    },
    { path: "*", element: <Navigate to="/login" /> },
  ]);

  return routes;
}

export default App;
