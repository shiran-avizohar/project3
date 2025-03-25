import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Make an API call to check login credentials
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If login is successful, store user data in localStorage
            localStorage.setItem('user', email); // Save logged-in user info in localStorage
            navigate('/vacations'); // Navigate to vacations page
        } else {
            // Handle errors (e.g., show an error message)
            alert('Login failed');
        }
    };

    useEffect(() => {
        // Check if there is already a logged-in user and skip login page
        const user = localStorage.getItem('user');
        if (user) {
            navigate('/vacations'); // If user is logged in, navigate to vacations page
        }
    }, [navigate]); // Add navigate to dependency array

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
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
