import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        CrewLayover
      </Link>

      <ul className="navbar-menu">
        <li>
          <NavLink to="/map">Map</NavLink>
        </li>
        <li>
          <NavLink to="/destinations">Destinations</NavLink>
        </li>
      </ul>

      <div className="navbar-user">
        <div className="user-avatar">
          {user?.full_name?.charAt(0) || 'U'}
        </div>
        <span>{user?.full_name}</span>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
