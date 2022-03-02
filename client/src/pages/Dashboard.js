import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
const Dashboard = () => {
  const { state } = useContext(AppContext);
  return (
    <div className="text-center mt-4">
      <h3>Dashboard</h3>
      <p>
        Welcome{" "}
        {state.isAuthenticated && state.isAuthenticated
          ? `Hi ${state.user.name}`
          : "You  must login "}
      </p>
    </div>
  );
};

export default Dashboard;
