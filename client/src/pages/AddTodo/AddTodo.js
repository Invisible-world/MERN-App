import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../useUser";
import "./AddTodo.css";

const AddTodo = () => {
  const [todo, setTodo] = useState(null);
  const [message, setMessage] = useState(null);
  const user = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo((todo) => ({ ...todo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todo.title || !todo.description) {
      return;
    }

    const finalTodo = { ...todo, completed: false };
    console.log(finalTodo);
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
      debugger;
      if (response && response.data) {
        debugger;
        console.log("sucess");
        setMessage({ message: "Todo Succesfully created" });

        setTodo({
          title: "",
          description: "",
        });
        debugger;
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <form className="regForm" onSubmit={handleSubmit}>
              <h1 className="register">Add Todo</h1>
              {message}
              <div className="tab">
                <h6>Title</h6>
                <p>
                  {" "}
                  <input
                    type="text"
                    placeholder="Title..."
                    name="title"
                    onChange={handleChange}
                  />
                </p>
              </div>
              <div className="tab">
                <h6>Description</h6>
                <p>
                  <textarea
                    type="text"
                    placeholder="Description..."
                    name="description"
                    onChange={handleChange}
                  />
                </p>
              </div>

              <div style={{ overflow: "auto" }} className="text-center">
                <div>
                  {" "}
                  <button type="submit">Create Todo</button>{" "}
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
