import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./assesment/LoginForm";
import Dashboard from "./assesment/Dashboard";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import LogIn from "./pages/LogIn";
// import SignUp from "./pages/SignUp";
import ProtectedRoutes from "../src/ProtectedRoutes";
import Header from "./assesment/Header";
import LoginForm from "./assesment/LoginForm";
// import { AuthContext } from "./context/AppContext";
// import AddTodo from "./pages/AddTodo/AddTodo";
// import PageNotFound from "./pages/PageNotFound";
// import { Home } from "./pages/Home/Home";
// import Todo from "./pages/Todo/Todo";
// import Header from "./components/Header/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<LoginForm />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}
export default App;
