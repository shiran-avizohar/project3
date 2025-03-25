import { Link } from 'react-router-dom';
import "./Dashboard.css"

const Dashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      {/* Button for adding a new vacation */}
      <Link to="/admin/add">
        <button>Add New Vacation</button>
      </Link>
      {/* Link to view all vacations */}
      <Link to="/admin/view">
        <button>View All Vacations</button>
      </Link>
    </div>
  );
};

export default Dashboard;
