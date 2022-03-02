import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  // useNavigate,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import ProtectedRoutes from "../src/ProtectedRoutes";
import { AuthContext } from "./context/AppContext";
function App() {
  return (
    <>
      <AuthContext>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProtectedRoutes />}>
              <Route path="/" element={<Dashboard />}></Route>
            </Route>
            <Route path="login" element={<LogIn />}></Route>

            <Route path="signup" element={<SignUp />}></Route>

            {/* <ProtectedRoutes
            path="/"
            exact
            element={user ? <Dashboard /> : <LogIn />}
          /> */}
          </Routes>
        </Router>
      </AuthContext>
    </>
  );
}
export default App;
