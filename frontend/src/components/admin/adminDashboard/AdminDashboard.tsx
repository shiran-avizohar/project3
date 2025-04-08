import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2 className="dashboard-header">Admin Dashboard</h2>
      
      <div className="dashboard-links">
        <Link to="/admin/addVacation">
          <button className="dashboard-button">Add New Vacation</button>
        </Link>
        
        <Link to="/admin/manageVacations">
          <button className="dashboard-button">Manage Vacations</button>
        </Link>

        <Link to="/admin/reports">
          <button className="dashboard-button">Reports</button>
        </Link>
        
        <Link to="/admin/csvDownload">
          <button className="dashboard-button">Download Reports</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
