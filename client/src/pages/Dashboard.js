import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    getUserTodo();
  }, []);

  const getUserTodo = async () => {
    console.log(state);
    if (!state && !state.token) {
      throw new Error("No Authorization at all :)");
    }

    const response = await axios.get(
      "http://localhost:5000/api/v1/userTodos/create",
      {
        headers: {
          Authorization: `Bearer ${state && state.token}`,
        },
      }
    );
    console.log(response.data);
    dispatch({ type: "GET_USER_TODO", payload: response.data.userTodo });
    console.log(state);
  };

  return (
    <div className="text-center mt-4">
      <h1 className="lead">
        {state.isAuthenticated && state.isAuthenticated
          ? ` Todo List :)`
          : "You  must login "}
      </h1>

      <div className="container mt-5 mb-3">
        <div className="row text-center ">
          {state && state.userTodo && state.userTodo ? (
            state.userTodo.map((todo, id) => cardComponent(todo))
          ) : (
            <Link to="/login">
              <button className="btn btn-danger btn-md">Login</button>
            </Link>
          )}
        </div>{" "}
      </div>
    </div>
  );
};

const cardComponent = (todo) => {
  // debugger;
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
          <div className="mt-5">
            <h3 className="heading">{todo.description}</h3>
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
                  completed{" "}
                  <span className="text2">
                    {todo.completed ? "True" : "False"}
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
