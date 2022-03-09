import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);
  const isUser = useUser();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" style={{ marginLeft: "15px" }} to="/">
          pZero
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {isUser && isUser ? (
              <li className="nav-item active">
                <Link to="/dashboard" className="nav-link">
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item active">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
            )}

            {isUser && isUser ? (
              ""
            ) : (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </li>
            )}
            {isUser && isUser ? (
              "null"
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  LogIn
                </Link>
              </li>
            )}

            {isUser && isUser ? (
              <li className="nav-item ">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "LOGOUT_USER" });
                    Navigate("/login");
                  }}
                >
                  LogOut
                </Link>
              </li>
            ) : null}

            {isUser && isUser ? (
              <li className="nav-item " style={{ float: "right" }}>
                <Link to="/addTodo" className="nav-link">
                  Create Todo
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    </div>
  );
};

const useUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return true;
  } else {
    return false;
  }
};

export default Navbar;
