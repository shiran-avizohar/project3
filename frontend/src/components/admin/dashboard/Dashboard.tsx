import { Link } from 'react-router-dom';
import './Dashboard.css';  // Import the CSS

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>
      
      <div className="dashboard-links">
        <Link to="/admin/add">
          <button className="dashboard-button">Add New Vacation</button>
        </Link>
        
        <Link to="/admin/view">
          <button className="dashboard-button">View All Vacations</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
