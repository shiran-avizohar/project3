import { Link } from 'react-router-dom';
import './UserDashboard.css'; // Import the CSS

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <h2 className="user-dashboard-header">User Dashboard</h2>

      <div className="user-dashboard-info">
        <h3>Welcome, [User Name]</h3>
        <p>Your profile and vacation details</p>
        {/* Here you can dynamically display user info */}
      </div>

      <div className="user-dashboard-links">
        <Link to="/user/vacations">
          <button className="user-dashboard-button">My Vacations</button>
        </Link>
        
        <Link to="/user/profile">
          <button className="user-dashboard-button">Edit Profile</button>
        </Link>

        <Link to="/user/change-password">
          <button className="user-dashboard-button">Change Password</button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
