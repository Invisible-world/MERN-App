import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
const SignUp = () => {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData) {
      swal({
        title: "Error",
        text: "User registration data not found",
        icon: "error",
      });
      return;
    }

    if (
      !userData.name ||
      !userData.name ||
      !userData.password ||
      !userData.cpassword
    ) {
      swal({
        title: "Error",
        text: "Please fill up the required fields",
        icon: "error",
      });
      return;
    }
    //check Password-fix this after dinner
    const { password, cpassword } = userData;
    if (password.length === cpassword.length) {
      const isEqual = password === cpassword;
      if (isEqual === false) {
        swal({
          title: "Error",
          text: "Password doens't match",
          icon: "error",
        });
        return;
      }
    }

    debugger;
    await axios
      .post(`http://localhost:5000/api/v1/users/register`, userData)
      .then((res) => {
        if (res && (res.status === 201 || res.status === 200)) {
          setUserData({
            name: "",
            email: "",
            password: "",
            cpassword: "",
          });
          swal({
            title: "Success",
            text: "User successfully register",
            icon: "success",
          });
          navigate("/login");
        }
      })
      .err((err) => {
        debugger;
        swal("Error", { err }, "error");
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card mb-5 " style={{ marginTop: "7rem" }}>
            <form
              className="card-body  p-lg-5"
              style={style.cardbodyColor}
              onSubmit={handleSubmit}
            >
              <div
                style={{
                  textAlign: "center",
                  marginTop: "-1rem",
                  padding: "0.2rem",
                  backgroundColor: "black",
                  border: "1px solid #000",
                  color: "white",
                  marginBottom: "1rem",
                }}
              >
                <h3>Registration Form</h3>
              </div>

              <div className="mb-3 mt-2">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  onChange={handleChange}
                  value={userData?.name}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  value={userData?.email}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={userData?.password}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="cpassword"
                  placeholder=" Confirm Password"
                  onChange={handleChange}
                  value={userData?.cpassword}
                />
              </div>
              <div className="text-center mt-2">
                <button
                  type="submit"
                  className="btn px-5 mb-5 w-100"
                  style={style.btnColor}
                >
                  Register
                </button>
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Already Have An Account?{" "}
                <Link to="/login">
                  <a
                    className="text-dark fw-bold"
                    style={style.a}
                    href="/login"
                  >
                    {" "}
                    Login
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const style = {
  btnColor: {
    backgroundColor: "#0e1c36",
    color: "#fff",
  },

  profileImagePic: {
    height: "200px",
    width: "200px",
    objectFit: "cover",
  },

  cardbodyColor: {
    backgroundColor: "#ebf2fa",
  },

  a: {
    textDecoration: "none",
    cursor: "pointer",
  },
};

export default SignUp;
