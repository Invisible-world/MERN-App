import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import swal from "sweetalert";

const LoginForm = () => {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData) {
      swal("Warning", "NO USer data found", "warning");
      return;
    }
    const { login_id, password } = userData;
    if (login_id === "" || password === "") {
      swal("Warning", "NO USer data found", "warning");
      return;
    }

    axios
      .post(
        `https://jp-dev.cityremit.global/web-api/config/v1/auths/login`,
        userData
      )
      .then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            navigate("/dashboard");
            swal("Success", "Login Succesfully", "success");
          }
        },
        (err) => {
          debugger;
          swal("Error", err.message, "error");
          return;
        }
      );

    // if (response.data === 200) {
    // }
  };

  return (
    <div className="container justify-content-center mt-3 text-center">
      Login Form
      <div>
        <form className="form-control" onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            name="login_id"
            placeholder="login Id"
            onChange={handleChange}
          />

          <input
            className="form-control mt-2"
            type="password"
            onChange={handleChange}
            name="login_password"
            placeholder="Password"
          />
          <button type="submit" className="btn btn-success mt-1">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
