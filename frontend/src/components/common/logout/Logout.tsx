import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove user data from localStorage
        localStorage.removeItem('user');
        // Navigate to login page after logging out
        navigate("/");
    };

    return (
        <div className="logout-container">
            {/* Logout button */}
            <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
