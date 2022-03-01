import React from "react";
import { Navigate, Route, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  //   const auth = localStorage.getItem('user'); // determine if authorized, from context or however you're doing it
  const user = JSON.parse(localStorage.getItem("user"));
  //   console.log(user.token);

  //   if (user.token) {
  //     var token = true;
  //   }
  // determine if authorized, from context or however you're doing it
  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
