import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // בדיקה אם המשתמש כבר מחובר
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setIsLoggedIn(true); // הסתרת הטופס
      navigate("/user/dashboard"); // מעבר מיידי לעמוד המשתמש
    }
  }, [navigate]);

  // טיפול בהתחברות
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(
          `Login failed: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Login successful:", data);

      localStorage.setItem("user", JSON.stringify(data));
      setIsLoggedIn(true); // הסתרת הטופס לאחר התחברות

      navigate("/user/dashboard"); // ניתוב לעמוד המשתמש
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    }
  };

  // אם המשתמש מחובר, לא מציגים את טופס ההתחברות
  if (isLoggedIn) {
    return null;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
        </div>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
