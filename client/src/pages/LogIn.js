import React, { useContext, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import swal from "sweetalert";
import { useUser } from "./useUser";

const LogIn = (props) => {
  const [userFormData, setUserFormData] = useState(null);
  const user = useUser();
  console.log(user);
  let navigate = useNavigate();
  const { dispatch } = useContext(AppContext);

  const handleInputChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setUserFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userFormData) {
      swal({
        title: "Error",
        text: "No credentials found",
        icon: "error",
      });
      return;
    } else if (!userFormData?.email || !userFormData?.password) {
      swal({
        title: "Warning",
        text: "Please fill up the required fields",
        icon: "error",
      });
      return;
    } else {
      const response = await axios.post(
        `http://localhost:5000/api/v1/users/login`,
        userFormData
      );

      if (response.status === 400) {
        console.log(response.data);
      }
      if (!response.status === 200 || !response.status === 200) {
        console.log(response.data);
        swal("warning", "erro", "error");
      }

      if (response && (response.status === 201 || response.status === 200)) {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN_USER", payload: response.data });
        setUserFormData({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        swal({
          title: "Error",
          text: "N/w Error",
          icon: "error",
        });
        return;
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card my-5">
            <form
              className="card-body  p-lg-5"
              style={style.cardbodyColor}
              onSubmit={handleLogin}
            >
              <div className="text-center">
                <img
                  src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png"
                  className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                  width="200px"
                  alt="profile"
                />
              </div>

              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn px-5 mb-5 w-100"
                  style={style.btnColor}
                >
                  Login
                </button>
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Not Registered?{" "}
                <Link to="/signup">
                  <a
                    className="text-dark fw-bold"
                    style={style.a}
                    href="google.com"
                  >
                    {" "}
                    Create an Account
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
export default LogIn;
