import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/api";

const NavbarAdmin = props => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {/* <li className="nav-item">
          <Link className="nav-link" to="#" onClick={props.onHomeRoute}>HOME</Link>    
          </li> */}
          <li className="nav-item">
          <Link className="nav-link" to="#" onClick={props.onHomeRoute}>ADD USER</Link>
          </li>
          <li className="nav-item" >
          <Link className="nav-link" to="#" onClick={logout}>LOGOUT</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default NavbarAdmin;
