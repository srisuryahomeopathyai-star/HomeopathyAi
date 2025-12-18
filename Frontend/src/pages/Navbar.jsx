/** @format */
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/Bhanulogo.png";
import Navlogo from "../assets/Navlogo.png";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className='navbar'>
      <nav className='navbar-container'>
        {/* Logo */}
        <div className='navbar-logo'>
          <img src={Navlogo} alt='Sri Surya Clinic Logo' className='logo-img' />
          <h1>HomeoEra Neo</h1>
          <p className='tagline'>By srisuryahomeopathy clinic</p>
          
        </div>

        {/* Hamburger Icon */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/about'
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/contact'
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              Contact
            </NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to='/addcase'
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Add Case
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/cases'
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  View Cases
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/followup'
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Followup
                </NavLink>
              </li>
              {/* ⭐ Added Dashboard */}
              <li>
                <NavLink
                  to='/dashboard'
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button className='logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to='/login'
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Sign In
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/register'
                  className={({ isActive }) =>
                    isActive ? "active-link signup-btn" : "signup-btn"
                  }
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Navbar;
