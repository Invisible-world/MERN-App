import React, { useContext, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const LogIn = () => {
  const [userFormData, setUserFormData] = useState(null);
  let navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  // console.log(dispatch({ type: "LOGIN_USER" }));
  const handleInputChange = (e) => {
    // console.log(e);
    const { name, value } = e.target;
    setUserFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    // console.log(userFormData);
    e.preventDefault();
    const response = await axios.post(
      `http://localhost:5000/api/v1/users/login`,
      userFormData
    );
    // debugger;

    if (response && (response.status === 201 || response.status === 200)) {
      // debugger;
      // toast.success("Success Notification !", { autoClose: 100 });
      // setUserData({
      //   name: "",
      //   email: "",
      //   password: "",
      //   cpassword: "",
      // });

      console.log(response);
      localStorage.setItem("user", JSON.stringify(response.data));
      // debugger;
      dispatch({ type: "LOGIN_USER", payload: response.data });
      setUserFormData(null);

      navigate("/");
      console.log(state);
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
                <a
                  className="text-dark fw-bold"
                  style={style.a}
                  href="google.com"
                >
                  {" "}
                  Create an Account
                </a>
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
