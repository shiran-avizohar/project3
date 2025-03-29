import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../common/login/Login";
import Registration from "../../user/registration/Registration";
import UserDashboard from "../../user/userDashboard/UserDashboard";
import Vacations from "../../user/vacations/Vacations"; // אם יש דף כזה
import Reports from "../../admin/reports/Reports"; 
import EditVacation from "../../admin/editVacation/EditVacation";
import AddVacation from "../../admin/addVacation/AddVacation";
import CsvDownload from "../../admin/csvDownload/CsvDownload"; // אם יש דף כזה
import AdminDashboard from "../../admin/adminDashboard/AdminDashboard";
import HomePage from "../../common/homePage/HomePage"; // ייבוא של דף הבית

// Helper function to check if the user is logged in
const isLoggedIn = () => localStorage.getItem("user") !== null;

// Helper function to check if the user is an admin
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  return user?.role === "admin";
};

export default function Routing(): JSX.Element {
  return (
    <Routes>
    {/* <Route path="/" element={isLoggedIn() ? <HomePage /> : <Navigate to="/login" />} /> */}

      {/* Public Routes */}
      <Route path="/" element={<HomePage />} /> {/* דף הבית - ברירת מחדל */}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/vacation-reports"
        element={isAdmin() ? <Reports /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/add-vacation"
        element={isAdmin() ? <AddVacation /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/edit-vacation/:id"
        element={isAdmin() ? <EditVacation /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/csv-download"
        element={isAdmin() ? <CsvDownload /> : <Navigate to="/login" />}
      />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={isLoggedIn() ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/vacations"
        element={isLoggedIn() ? <Vacations /> : <Navigate to="/login" />}
      />

      {/* Redirect to login if no route matches */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
