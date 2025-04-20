import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
const logo = "/images/dreamt.png";

// Helper function to check if the user is logged in by checking localStorage
const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default function Header() {
  const navigate = useNavigate();
  const user = isUserLoggedIn();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="Header">
      <div className="user-info-container">
        <img src={logo} alt="Logo" />
        {user && (
          <div className="user-info">
            Hello, {user.firstName} {user.lastName}
            {user.role === "admin" && " (admin)"}
          </div>
        )}
      </div>

      <div className="nav-section">
        <nav>
          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/registration">Register</NavLink>
            </>
          ) : (
            <>
              {user.role === "admin" && (
                <>
                  <NavLink to="/admin/adminDashboard">Home</NavLink>
                  <NavLink to="/admin/VacationManagement">Vacation Management</NavLink>
                  <NavLink to="/admin/reports">Reports</NavLink>
                  <NavLink to="/admin/addVacation">Add Vacation</NavLink>
                </>
              )}
              {user.role !== "admin" && (
                <>
                  <NavLink to="/user/userDashboard">Home</NavLink>
                  <NavLink to="/user/vacations">Vacations</NavLink>
                </>
              )}
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
