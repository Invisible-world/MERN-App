import React, { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
const Navbar = () => {
  const { state, dispatch } = useContext(AppContext);

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
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {state && state.token ? (
              ""
            ) : (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </li>
            )}
            {state && state.token ? (
              "null"
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  LogIn
                </Link>
              </li>
            )}

            {state && state.token ? (
              <li className="nav-item">
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
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
