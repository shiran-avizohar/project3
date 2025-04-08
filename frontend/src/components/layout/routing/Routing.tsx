import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../common/login/Login";
import Registration from "../../common/registration/Registration";
import UserDashboard from "../../user/userDashboard/UserDashboard";
import Vacations from "../../user/vacations/Vacations";  // Vacation page component
import Follow from "../../user/follow/Follow";  // Followed Vacations page component
import Reports from "../../admin/reports/Reports";
import EditVacation from "../../admin/editVacation/EditVacation";
import AddVacation from "../../admin/addVacation/AddVacation";
import CsvDownload from "../../admin/csvDownload/CsvDownload";
import AdminDashboard from "../../admin/adminDashboard/AdminDashboard";
import HomePage from "../../common/homePage/HomePage";
import Unfollow from "../../user/unfollow/Unfollow";

// Helper function to check if the user is logged in
const isLoggedIn = () => localStorage.getItem("user") !== null;

// Helper function to check if the user is an admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  console.log('User:', user); // הדפסת המידע שנשמר ב-localStorage
  return user?.role === "admin";
};


export default function Routing(): JSX.Element {
  return (
    <Routes>
      {/* If the user is not logged in, navigate to the homepage */}
      <Route path="/" element={isLoggedIn() ? <Navigate to="/user/dashboard" /> : <HomePage />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />} />
      <Route path="/admin/reports" element={isAdmin() ? <Reports /> : <Navigate to="/login" />} />
      <Route path="/admin/addVacation" element={isAdmin() ? <AddVacation /> : <Navigate to="/login" />} />
      <Route path="/admin/editVacation/:id" element={isAdmin() ? <EditVacation /> : <Navigate to="/login" />} />
      <Route path="/admin/csvDownload" element={isAdmin() ? <CsvDownload /> : <Navigate to="/login" />} />

      {/* User Routes */}
      {/* User Dashboard route will redirect to dashboard page if logged in */}
      <Route path="/user/dashboard" element={isLoggedIn() ? <UserDashboard /> : <Navigate to="/login" />} />
      {/* The 'Vacations' route will lead directly to the vacations page */}
      <Route path="/user/vacations" element={isLoggedIn() ? <Vacations /> : <Navigate to="/login" />} />
      {/* The 'Followed Vacations' route will lead directly to the followed vacations page */}
      <Route path="/user/follow" element={isLoggedIn() ? <Follow /> : <Navigate to="/login" />} />
      <Route path="/user/unfollow" element={isLoggedIn() ? <Unfollow /> : <Navigate to="/login" />} />

      {/* Redirect to Login if the user is not logged in */}
<Route 
  path="*" 
  element={isLoggedIn() 
    ? (isAdmin() 
        ? <Navigate to="/admin/dashboard" /> 
        : <Navigate to="/user/dashboard" />) 
    : <Navigate to="/login" />
  } 
/>

    </Routes>
  );
}
