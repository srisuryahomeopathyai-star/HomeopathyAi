// /** @format */
// import React, { useState, useEffect } from "react";
// import "./Navbar.css";
// import logo from "../assets/Bhanulogo.png";
// import { Link, useNavigate } from "react-router-dom";
// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // ✅ Check login status from localStorage
//     const user = localStorage.getItem("user");
//     setIsLoggedIn(!!user);
//   }, []);

//   const handleLogout = () => {
//     // ✅ Clear auth info
//     localStorage.removeItem("user");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <header className='navbar'>
//       <nav className='navbar-container'>
//         {/* Logo */}
//         <div className='navbar-logo'>
//           <img src={logo} alt='Bhanu Clinic Logo' className='logo-img' />
//           <h1>Bhanu Clinic</h1>
//         </div>

//         {/* Hamburger Icon */}
//         <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
//           <span className={menuOpen ? "bar open" : "bar"}></span>
//           <span className={menuOpen ? "bar open" : "bar"}></span>
//           <span className={menuOpen ? "bar open" : "bar"}></span>
//         </div>

//         {/* Links */}
//         <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/about">About</Link></li>
//           <li><Link to="/contact">Contact</Link></li>

//           {isLoggedIn ? (
//             <>
//               <li><Link to="/addcase">Add Case</Link></li>
//               <li><Link to="/cases">View Cases</Link></li>
//               <li><Link to="/followup">Followup</Link></li>
//               <li>
//                 <button
//                   onClick={handleLogout}
//                   style={{
//                     background: "none",
//                     border: "none",
//                     color: "red",
//                     cursor: "pointer"
//                   }}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li><Link to="/login">Sign In</Link></li>
//               <li><Link to="/register" className='signup-btn'>Sign Up</Link></li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };
// export default Navbar;
/** @format */
import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../assets/Bhanulogo.png";
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
    <header className="navbar">
      <nav className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={logo} alt="Bhanu Clinic Logo" className="logo-img" />
          <h1>Bhanu Clinic</h1>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>

        {/* Links */}
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? "active-link" : ""}>About</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active-link" : ""}>Contact</NavLink>
          </li>

          {isLoggedIn ? (
            <>
              <li>
                <NavLink to="/addcase" className={({ isActive }) => isActive ? "active-link" : ""}>Add Case</NavLink>
              </li>
              <li>
                <NavLink to="/cases" className={({ isActive }) => isActive ? "active-link" : ""}>View Cases</NavLink>
              </li>
              <li>
                <NavLink to="/followup" className={({ isActive }) => isActive ? "active-link" : ""}>Followup</NavLink>
              </li>
              <li>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Sign In</NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) => isActive ? "active-link signup-btn" : "signup-btn"}
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
