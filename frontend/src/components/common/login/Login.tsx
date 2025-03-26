import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState<string>('');
    
    const hasNavigated = useRef(false); // משתנה לבדיקה אם כבר ניווטנו

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error(`Login failed: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("Login successful:", data);

            localStorage.setItem('user', JSON.stringify(data));

            navigate("/vacations");

        } catch (error) {
            console.error("Login error:", error);
            setLoginError(error instanceof Error ? error.message : "An unknown error occurred");
        }
    };

    useEffect(() => {
        if (!hasNavigated.current) {
            const user = localStorage.getItem('user');
            if (user) {
                hasNavigated.current = true; // מסמנים שכבר ניווטנו כדי למנוע לולאה אינסופית
                navigate('/vacations');
            }
        }
    }, [navigate]);

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
                    <div style={{ position: 'relative' }}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        >
                            👁️
                        </span>
                    </div>
                </div>
                {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
