import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // שימוש ב-useNavigate
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // שימוש ב-useNavigate

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => { // נוסיף את הסוג של e
        e.preventDefault();

        // Validation checks
        if (!email || !password) {
            setError('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (password.length < 4) {
            setError('Password must be at least 4 characters long.');
            return;
        }

        // Here you would typically verify the login details with a backend service
        // For now, assume credentials are valid
        const isLoginValid = email === 'user@example.com' && password === 'password123';

        if (isLoginValid) {
            setError('');
            // Redirect to the vacations page upon successful login
            navigate('/vacations'); // שימוש ב-navigate במקום push
        } else {
            setError('Incorrect email or password.');
        }
    };

    return (
        <div className='login-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
