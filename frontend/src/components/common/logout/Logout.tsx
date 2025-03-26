import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // מחיקת נתוני המשתמש מ-localStorage
        localStorage.removeItem('user');
        // נווט לדף הלוגין לאחר ההתנתקות
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
