import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";
import { useUser } from "../useUser";

const Todo = () => {
  const [first, setfirst] = useState(false);
  const [todoState, setTodoState] = useState(null);

  const user = useUser();
  const location = useLocation();
  const {
    state: { todo },
  } = location;

  const navigate = useNavigate();

  useEffect(() => {
    //set the application state on mounting of the component

    setTodoState(todo);
    // setComponnetState();
  }, []);

  console.log(todoState);
  // const setComponnetState = () => {
  // };

  const handleEdit = async (e, todoId) => {
    if (e.currentTarget.innerHTML === "edit") {
      setfirst(true);
    } else {
      if (!todoState.title || !todoState.description) {
        swal({
          title: "Error",
          text: "Field cannot be empty at all ",
          icon: "error",
        });
        return;
      } else {
        try {
          const { title, description, completed } = todoState;
          const updatedTodo = { title, description, completed };
          const response = await axios.put(
            `http://localhost:5000/api/v1/userTodos/update/${todoId}`,
            updatedTodo,
            {
              headers: {
                Authorization: `Bearer ${user && user.token}`,
              },
            }
          );
          if (response && response.status === 200) {
            swal("Success", " Edited Successfully...", "success");
            setfirst(false);
          }
        } catch (error) {
          swal("Error", "N/w Error", "error");
          throw new Error(error);
        }
      }
    }
  };
  const handleDelete = async (e, todoId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/v1/userTodos/delete/${todoId}`,
        {
          headers: {
            Authorization: `Bearer ${user && user.token}`,
          },
        }
      );
      if (response && response.status === 200) {
        const willDelete = await swal({
          title: "Are you sure?",
          text: "Are you sure that you want to delete ?",
          icon: "warning",
          dangerMode: true,
        });

        if (willDelete) {
          swal("Deleted!", "Your todo has been deleted!", "success");
        }

        navigate("/dashboard");
      }
    } catch (error) {
      swal("Error", "N/w Error", "error");
      throw new Error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTodoState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <div className="container mt-5">
      <div className="row d-flex justify-content-center">
        <div className="col">
          <div className="text-center">
            {todoState && todoState ? (
              <>
                <h1 className="lead">TodoState Id:{todoState._id}</h1>
                <React.Fragment key={todoState._id}>
                  <div
                    className=""
                    style={{
                      border: "2px solid whitesmoke",
                      width: "50%",
                      margin: "auto",
                      height: "55vh",
                      padding: "2rem",
                    }}
                  >
                    <h3 className="lead" style={{ padding: "22px" }}>
                      Title:{" "}
                      {first ? (
                        <>
                          <input
                            type="text"
                            value={todoState.title}
                            onChange={handleInputChange}
                            name="title"
                          />
                        </>
                      ) : (
                        `${todoState.title}`
                      )}
                    </h3>
                    <p className="lead">
                      Description:{" "}
                      {first ? (
                        <>
                          <textarea
                            type="text"
                            value={todoState.description}
                            name="description"
                            onChange={handleInputChange}
                          />
                        </>
                      ) : (
                        `${todoState.description}`
                      )}
                    </p>
                    <small>
                      {/* Status:{todoState.completed ? "Pending" : "Completed"}{" "} */}
                      Status:{" "}
                      {first ? (
                        <>
                          <input
                            type="checkbox"
                            name="completed"
                            checked={todoState.completed ? true : false}
                            onChange={handleInputChange}
                            // value={todoState.completed}
                          />
                        </>
                      ) : (
                        `${todoState.completed ? "completed" : "pending"}`
                      )}
                    </small>
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        className=""
                        style={{
                          backgroundColor: " rgb(16 82 41)",
                        }}
                        onClick={(e, id) => handleEdit(e, todoState._id)}
                      >
                        {first ? "save" : "edit"}
                      </button>

                      <button
                        className=""
                        style={{
                          marginLeft: "0.4rem",
                          backgroundColor: "#c41c1c",
                        }}
                        onClick={(e, id) => handleDelete(e, todoState._id)}
                      >
                        delete
                      </button>
                    </div>
                  </div>
                </React.Fragment>
              </>
            ) : (
              "No todoState at all "
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
