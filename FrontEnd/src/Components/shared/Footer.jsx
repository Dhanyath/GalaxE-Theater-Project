import React from "react";
import logo from "../images/logo.png";
import "../styles/movie-style/Footer.css";
export default function Footer() {
  return (
    <div className="footer-exact">
      <div className="footer-finalmain">
        <div className="footer-main">
          <div className="footer-logo">
            <img src={logo} alt="Italian Trulli" />
          </div>
          <div className="footer-all">
            <div>
              <a href="#" className="footer-contact">
                Contact Us
              </a>
            </div>
            <div>
              <a href="#" className="footer-support">
                Support
              </a>
            </div>
            <div>
              <a href="#" className="footer-privacy">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
        <div className="footer-copy">
          <p>CopyRight: All Rights Reserved by GalaxE Solutions</p>
        </div>
      </div>
    </div>
  );
}
