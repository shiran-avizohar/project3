import './UserDashboard.css'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    // If the user is not logged in (no email in localStorage), navigate to the login page
    if (!user?.user?.email) {
      navigate("/login"); // move to login page if no user
    }
  }, [navigate, user?.user]);

  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-header">User Dashboard</h2>
      <div className="user-dashboard-info">
        <h3>Welcome, {user?.name || "Guest"}</h3>
        <p>Your profile and vacation details</p>
      </div>
      <div className="user-dashboard-links">
        {/* Link to the 'Vacations' page */}
        <Link to="/user/vacations">
          <button className="user-dashboard-button">My Vacations</button>
        </Link>
        {/* Link to the 'Followed Vacations' page */}
        <Link to="/user/follow">
          <button className="user-dashboard-button">Followed Vacations</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
