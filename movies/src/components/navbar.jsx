import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Link } from "react-router-dom";
const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand navbar-dark text-light bg-dark">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/movies">
              Movies
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customers">
              Customers
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/rentals">
              Rentals
            </Link>
          </li>
         {!props.current?<> <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">
            Register
            </Link>
          </li></>:<><li className="nav-item">
          <span className="nav-link"> {props.current.user.email}</span>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/logout">
            Logout
            </Link>
          </li>
          </>}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
