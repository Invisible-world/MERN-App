import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    setUser(loggedInUser);
  }, [user]);
  console.log(`user from navbar ${user}`);

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
            {user && user ? (
              ""
            ) : (
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  SignUp
                </Link>
              </li>
            )}
            {user && user ? (
              "null"
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  LogIn
                </Link>
              </li>
            )}

            {user && user ? (
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link"
                  onClick={() => {
                    localStorage.clear();
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
