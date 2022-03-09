import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import { AppContext } from "./context/AppContext";
const ProtectedRoutes = () => {
  // const { state } = useContext(AppContext);
  let location = useLocation();

  const auth = JSON.parse(localStorage.getItem("user"));
  console.log(auth);
  return auth && auth.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
