// import { Navigate, Route, Routes } from "react-router-dom";
// import Login from "../../common/login/Login";
// import Registration from "../../common/registration/Registration";
// import UserDashboard from "../../user/userDashboard/UserDashboard";
// import Vacations from "../../user/vacations/Vacations"; 
// import Follow from "../../user/follow/Follow"; 
// import Reports from "../../admin/reports/Reports";
// import AddVacation from "../../admin/addVacation/AddVacation";
// import AdminDashboard from "../../admin/adminDashboard/AdminDashboard";
// import HomePage from "../../common/homePage/HomePage";
// import Unfollow from "../../user/unfollow/Unfollow";
// import ManageVacation from "../../admin/manageVacation/ManageVacation";

// // Helper function to check if the user is logged in
// const isLoggedIn = () => localStorage.getItem("user") !== null;

// // Helper function to check if the user is an admin
// const isAdmin = () => {
//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   return user?.role === "admin";
// };

// export default function Routing(): JSX.Element {
//   return (
//     <Routes>
//       {/* If the user is not logged in, navigate to the homepage */}
//       <Route
//         path="/"
//         element={
//           isLoggedIn() ? (
//             isAdmin() ? (
//               <Navigate to="/admin/dashboard" /> // If admin, go to admin dashboard
//             ) : (
//               <Navigate to="/user/dashboard" /> // Else, go to user dashboard
//             )
//           ) : (
//             <HomePage />
//           )
//         }
//       />
      
//       {/* Public Routes */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/registration" element={<Registration />} />
      
//       {/* Admin Routes */}
//       <Route
//         path="/admin/dashboard"
//         element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/admin/manageVacation"
//         element={isAdmin() ? <ManageVacation /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/admin/reports"
//         element={isAdmin() ? <Reports /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/admin/addVacation"
//         element={isAdmin() ? <AddVacation /> : <Navigate to="/login" />}
//       />
      
//       {/* User Routes */}
//       <Route
//         path="/user/dashboard"
//         element={isLoggedIn() ? <UserDashboard /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/user/vacations"
//         element={isLoggedIn() ? <Vacations /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/user/follow"
//         element={isLoggedIn() ? <Follow /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/user/unfollow"
//         element={isLoggedIn() ? <Unfollow /> : <Navigate to="/login" />}
//       />
      
//       {/* Catch-all route */}
//       <Route
//         path="*"
//         element={
//           isLoggedIn() ? (
//             isAdmin() ? (
//               <Navigate to="/admin/dashboard" />
//             ) : (
//               <Navigate to="/user/dashboard" />
//             )
//           ) : (
//             <Navigate to="/login" />
//           )
//         }
//       />
//     </Routes>
//   );
// }


import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../common/login/Login";
import Registration from "../../common/registration/Registration";
import UserDashboard from "../../user/userDashboard/UserDashboard";
import Vacations from "../../user/vacations/Vacations";
import Follow from "../../user/follow/Follow";
import Reports from "../../admin/reports/Reports";
import AddVacation from "../../admin/addVacation/AddVacation";
import AdminDashboard from "../../admin/adminDashboard/AdminDashboard";
import HomePage from "../../common/homePage/HomePage";
import Unfollow from "../../user/unfollow/Unfollow";
import ManageVacation from "../../admin/manageVacation/ManageVacation";

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
      {/* If the user is not logged in, navigate to the homepage */}
      <Route
        path="/"
        element={
          isLoggedIn() ? (
            isAdmin() ? (
              <Navigate to="/admin/dashboard" /> // If admin, go to admin dashboard
            ) : (
              <Navigate to="/user/dashboard" /> // Else, go to user dashboard
            )
          ) : (
            <HomePage />
          )
        }
      />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />

      {/* Admin Routes */}
      <Route
        path="/admin/dashboard"
        element={isAdmin() ? <AdminDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/manageVacation"
        element={isAdmin() ? <ManageVacation /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/reports"
        element={isAdmin() ? <Reports /> : <Navigate to="/login" />}
      />
      <Route
        path="/admin/addVacation"
        element={isAdmin() ? <AddVacation /> : <Navigate to="/login" />}
      />

      {/* User Routes */}
      <Route
        path="/user/dashboard"
        element={isLoggedIn() && !isAdmin() ? <UserDashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/vacations"
        element={isLoggedIn() && !isAdmin() ? <Vacations /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/follow"
        element={isLoggedIn() && !isAdmin() ? <Follow /> : <Navigate to="/login" />}
      />
      <Route
        path="/user/unfollow"
        element={isLoggedIn() && !isAdmin() ? <Unfollow /> : <Navigate to="/login" />}
      />

      {/* Catch-all route */}
      <Route
        path="*"
        element={
          isLoggedIn() ? (
            isAdmin() ? (
              <Navigate to="/admin/dashboard" />
            ) : (
              <Navigate to="/user/dashboard" />
            )
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
