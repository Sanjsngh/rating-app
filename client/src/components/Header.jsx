import React from 'react';
import { Link} from "react-router-dom";

export default function Header({ isLoggedIn, logout }) {
  return (
    <div>
        <nav className="navbar">
          <h1>Rating App</h1>
          <ul className="navbar-container">
            <li className="nav-links">
              <Link className="link" to="/">HOME</Link>
            </li>
            
            {isLoggedIn() ? (
              <>
                <li className="nav-links">
                  <Link className="link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-links">
                  <button onClick={() => logout()}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-links">
                  <Link className="link" to="/login">LOGIN</Link>
                </li>
                <li className="nav-links">
                  <Link className="link" to="/register">REGISTER</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
    </div>
  )
}
