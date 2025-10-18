import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../auth/auth';

export default function Navbar() {
  const navigate = useNavigate();
  const token = getToken();

  const logout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">Employee Portal</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            {token && (
              <>
                <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/leaves">Leaves</Link></li>
              </>
            )}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token && <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>}
            {token && <li className="nav-item"><button className="btn btn-outline-light" onClick={logout}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
}
