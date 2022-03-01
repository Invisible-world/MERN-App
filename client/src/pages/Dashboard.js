import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let loginUser = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    setUser(loginUser);
  }, []);
  console.log(user);
  return (
    <div className="text-center mt-4">
      <h3>Dashboard</h3>
      <p>Welcome {user && user.name}</p>
    </div>
  );
};

export default Dashboard;
