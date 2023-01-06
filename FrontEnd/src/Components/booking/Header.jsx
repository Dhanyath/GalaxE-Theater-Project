import React from "react";
import logo from "../images/logo.png";
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.png";
import "../styles/booking-style/Header.css";
export default function Header() {
  return (
    <div className="header-finalmain">
      <div className="header-main">
        <div className="header-logo">
          <img src={logo} alt="Italian Trulli" />
        </div>

        <div className="header-logo2">
          <img src={logo2} alt="Italian Trulli" />
          <p>Movies</p>
        </div>
        <div className="header-logo1">
          <img src={logo1} alt="Italian Trulli" />
          <p>Theaters</p>
        </div>
        <div className="header-admin">
          <a href="#">Admin</a>
        </div>
      </div>
    </div>
  );
}
