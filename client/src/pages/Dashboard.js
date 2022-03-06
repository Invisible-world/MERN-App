import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
const Dashboard = () => {
  const { state } = useContext(AppContext);
  const [todos, setTodos] = useState(null);
  useEffect(() => {
    getUserTodo();
  }, []);

  const getUserTodo = async () => {
    debugger;
    await axios
      .get("http://localhost:5000/api/v1/userTodos/create", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((res) => {
        debugger;
        setTodos(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        debugger;
        console.error(error);
      });
  };

  return (
    <div className="text-center mt-4">
      <h3>Dashboard</h3>
      <p>
        Welcome{" "}
        {state.isAuthenticated && state.isAuthenticated
          ? `Hi ${state.user.name}`
          : "You  must login "}
      </p>
      {todos && todos
        ? todos.map((todo, id) => <>{todo.title}</>)
        : "BAk bhoskid]key"}
    </div>
  );
};

export default Dashboard;
