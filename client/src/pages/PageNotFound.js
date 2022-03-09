import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="container mt-4 text-center">
      <h3>PageNotFound</h3>
      <Link to="/login">
        <button className="btn btn-danger btn-sm">Go to Login</button>
      </Link>
    </div>
  );
};

export default PageNotFound;
