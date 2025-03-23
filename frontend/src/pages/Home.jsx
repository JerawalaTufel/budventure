import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1>Welcome to the Admin Panel</h1>
          <p className="lead">
            This is the home page of the admin panel. Please log in to access the dashboard.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg">
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;