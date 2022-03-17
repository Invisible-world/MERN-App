import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ProtectedRoutes from "../src/ProtectedRoutes";
import { AuthContext } from "./context/AppContext";
import AddTodo from "./pages/AddTodo/AddTodo";
import PageNotFound from "./pages/PageNotFound";
import { Home } from "./pages/Home/Home";
import Todo from "./pages/Todo/Todo";

function App() {
  return (
    <>
      <AuthContext>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addTodo" element={<AddTodo />}></Route>
              <Route path="/todo/:id" element={<Todo />}></Route>
            </Route>

            {/* <Route path="/" element={<ProtectedRoutes />}>
            </Route> */}
            <Route path="login" element={<LogIn />}></Route>
            <Route path="signup" element={<SignUp />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </Router>
      </AuthContext>
    </>
  );
}
export default App;
