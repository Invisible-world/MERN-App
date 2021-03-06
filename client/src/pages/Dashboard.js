import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUser } from "./useUser";
import "./Dashboard.css";
import swal from "sweetalert";
import { AppContext } from "../context/AppContext";

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const [userData, setUserData] = useState(null);
  const user = useUser();

  useEffect(() => {
    getUserTodo();
  }, []);

  const getUserTodo = async () => {
    if (!user) {
      swal({
        title: "Error",
        text: "Not authorized user",
        icon: "error",
      });
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/userTodos/create",
        {
          headers: {
            Authorization: `Bearer ${user && user.token}`,
          },
        }
      );
      if (response && response.status === 200) {
        setUserData(response.data);
        dispatch({ type: "GET_USER_TODO", payload: response.data.userTodo });
      }
    } catch (error) {
      swal({
        title: "Network Error",
        text: { error },
        icon: "error",
      });
    }
  };

  const finalUserTodo = !state ? userData : state.userTodo;

  return (
    <div className="text-center mt-4">
      <h1 className="lead">
        {!user ? "You  must login -Not authorized " : ` Todo List :)`}
      </h1>

      <div className="container mt-5 mb-3">
        <div className="row text-center ">
          {finalUserTodo ? (
            finalUserTodo.map((todo, id) => cardComponent(todo))
          ) : (
            <Link to="/login">
              <button
                className="btn btn-danger btn-md"
                style={{ backgroundColor: "black" }}
              >
                Login
              </button>
            </Link>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

const cardComponent = (todo) => {
  return (
    <React.Fragment key={todo._id}>
      <div className="col-md-4 ">
        <div className="card p-3 mb-2">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-row align-items-center">
              <div className="icon">
                {" "}
                <i className="bx bxl-mailchimp"></i>{" "}
              </div>
              <div className="ms-2 c-details">
                <h6 className="mb-0">{todo.title}</h6> <span>{todo._id}</span>
              </div>
            </div>
            <div className="badge">
              {" "}
              <span>{todo.completed ? "True" : "false"}</span>{" "}
            </div>
          </div>

          <div className="">
            <p className="mb-0 lead">{todo.description}</p>
          </div>
          <div className="mt-5">
            <Link to={`/todo/${todo._id}`} state={{ todo: todo }}>
              <button className="heading" style={{ backgroundColor: "black" }}>
                View more
              </button>
            </Link>

            <div className="mt-5">
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: "50%" }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <div className="mt-3">
                {" "}
                <span className="text1">
                  Status{" "}
                  <span className="text2">
                    {todo.completed ? "completed" : "pending"}
                  </span>
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
