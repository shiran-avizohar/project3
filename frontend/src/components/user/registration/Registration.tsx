import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Registration.css";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!email || !password || !firstName || !lastName || !role ) {
      setError("All fields are required");
      return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    // Password must be at least 4 characters
    if (password.length < 4) {
      setError("Password must be at least 4 characters long");
      return;
    }

    // Clear any errors
    setError("");

    // API call to register the user
    try {
      // Use the base URL from the environment variables
      const baseUrl = import.meta.env.VITE_REST_SERVER_URL;
      console.log(baseUrl);
      const response = await axios.post(`${baseUrl}/website/register`, {
        email,
        password,
        firstName,
        LastName,
        role,
      });

      if (response.data.success) {
        // Assuming the API response contains a success field
        console.log("Registration successful");

        // Save user data in localStorage
        const userData = { email, password, firstName, lastName };
        localStorage.setItem("user", JSON.stringify(userData));

        // Clear form fields after submission
        setEmail("");
        setPassword("");
        setFirstlName("");
        setLastlName("");

        // Optionally clear sessionStorage or localStorage if data is being stored there
        sessionStorage.clear(); // Or localStorage.clear() if you're using localStorage

        // Navigate to login page
        navigate("/login");
      } else {
        setError("Registration failed: " + response.data.message);
      }
    } catch (error) {
      // Handle errors from the API call
      setError("An error occurred during registration. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="register-container">
      <h2>Register to the site</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              👁️
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">
          Register
        </button>
      </form>
    </div>
  );
}
