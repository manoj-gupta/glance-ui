import React from "react";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <p>{`Hi ${process.env.REACT_APP_NAME}`}</p>
    </div>
  );
};

export default Dashboard;
