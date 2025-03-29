import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../../assets/images/dreamt.png";

// Helper function to check if the user is logged in by checking localStorage
const isUserLoggedIn = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export default function Header() {
  const navigate = useNavigate(); // Initialize useNavigate to redirect
  const user = isUserLoggedIn(); // Check if a user is logged in

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the user from localStorage
    navigate("/login"); // Redirect to login page using navigate
  };

  return (
    <div className="Header">
      <div>
        <img src={logo} alt="Logo" />
      </div>
      <div>
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
                  <NavLink to="/admin/vacations">Manage Vacations</NavLink>
                  <NavLink to="/admin/reports">Reports</NavLink>
                  <NavLink to="/admin/addVacation">Add Vacation</NavLink>
                  <NavLink to="/admin/editVacation">Edit Vacation</NavLink>
                  <NavLink to="/admin/csvDownload">Download CSV</NavLink>
                </>
              )}
              {user.role !== "admin" && (
                <>
                  <NavLink to="/user/userDashboard">Home</NavLink>
                  <NavLink to="/user/vacations/follow">Followed Vacations</NavLink>
                  <NavLink to="/user/vacations">Vacations</NavLink>
                </>
              )}
              {user && (
                <>
                  <button onClick={handleLogout}>Logout</button>{" "}
                  {/* Logout button */}
                </>
              )}
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
