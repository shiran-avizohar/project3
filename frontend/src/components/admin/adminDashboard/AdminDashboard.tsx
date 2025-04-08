import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const Dashboard = () => {
  return (
<div className="dashboard-container">
      <h2 className="dashboard-header">
        Hello! <br></br>
        What would you like to do today?
      </h2>


      <div className="dashboard-links">
        <Link to="/admin/addVacation">
          <button className="dashboard-button">Add New Vacation</button>
        </Link>
        
        <Link to="/admin/manageVacation">
          <button className="dashboard-button">Vacation Management</button>
        </Link>

        <Link to="/admin/reports">
          <button className="dashboard-button"> View Reports</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Dashboard;
