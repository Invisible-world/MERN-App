import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
    debugger;
    const response = await axios.post(
      `http://localhost:5000/api/v1/users/register`,
      userData
    );
    if (response && (response.status === 201 || response.sttaus === 200)) {
      toast.success("Success Notification !", { autoClose: 15000 });
      setUserData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
      navigate("/login");
    } else {
      console.log(response.data);
      alert(`${response.data}`);
    }
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
              <div className="mb-3">
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
              <div className="text-center">
                <button
                  type="submit"
                  className="btn px-5 mb-5 w-100"
                  style={style.btnColor}
                >
                  Register
                </button>
                <ToastContainer />
              </div>
              <div
                id="emailHelp"
                className="form-text text-center mb-5 text-dark"
              >
                Already Have An Account?{" "}
                <a className="text-dark fw-bold" style={style.a}>
                  {" "}
                  Register
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
export default SignUp;
