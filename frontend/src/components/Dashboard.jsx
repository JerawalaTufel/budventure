import React from 'react';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Welcome to the Admin Panel</h2>
          <p className="card-text">
            You have successfully logged in. Manage your system from here.
          </p>
          <button onClick={onLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;