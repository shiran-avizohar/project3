import './UserDashboard.css';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [navigate, user?.email]);

  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-header">Welcome to DreamTrip</h2>
      <div className="user-dashboard-info">
        <h3>Hey {user?.firstName || "Guest"}!</h3>
        <p>We're so glad you're here! Get ready to plan your dream vacation with us.</p>
        <p>Explore, discover, and make your perfect getaway a reality!</p>
      </div>
      <div className="user-dashboard-links">
        <Link to="/user/vacations"><button className="user-dashboard-button"> Find Your Dream Trip</button></Link>
      </div>
    </div>
  );
};

export default UserDashboard;
