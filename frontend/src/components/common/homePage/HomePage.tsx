import { Link } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our Dream Vacation Service!</h1>
      <div className="cards">
        <div className="card">
          <h2>Already a user? Log in</h2>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="card">
          <h2>New here? Join us now!</h2>
          <Link to="/registration">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
