import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../useUser";
import "./AddTodo.css";
import swal from "sweetalert";

const AddTodo = () => {
  const [todo, setTodo] = useState(null);
  const user = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((todo) => ({ ...todo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo || !todo.title || !todo.description) {
      swal({
        title: "Error",
        text: "Please add all  required field",
        icon: "warning",
      });
      return;
    } else if (!user) {
      swal({
        title: "Error",
        text: "Not authorized -login ",
        icon: "warning",
      });
      return;
    } else {
      let finalTodo;
      if (todo) {
        finalTodo = { ...todo, completed: false };
      }
      try {
        const response = await axios.post(
          "http://localhost:5000/api/v1/userTodos/create",
          finalTodo,
          {
            headers: {
              Authorization: `Bearer ${user && user.token}`,
            },
          }
        );
        // debugger;
        if (response && response.statusText === "Created") {
          swal("Success", " Created Successfully...", "success");
          setTodo({
            title: "",
            description: "",
          });
        }
      } catch (error) {
        swal({
          title: "Error",
          text: { error },
          icon: "error",
        });
        throw new Error(error);
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <form className="regForm" onSubmit={handleSubmit}>
              <h1 className="register">Add Todo</h1>
              <div className="tab">
                <h6>Title</h6>
                <p>
                  {" "}
                  <input
                    type="text"
                    placeholder="Title..."
                    name="title"
                    value={todo?.title}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  />
                </p>
              </div>
              <div className="tab">
                <h6>Description</h6>
                <p>
                  <textarea
                    type="text"
                    value={todo?.description}
                    placeholder="Description..."
                    name="description"
                    onChange={handleChange}
                  />
                </p>
              </div>

              <div style={{ overflow: "auto" }} className="text-center">
                <div>
                  {" "}
                  <button
                    type="submit"
                    className="heading"
                    style={{ backgroundColor: "black" }}
                  >
                    Create Todo
                  </button>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
