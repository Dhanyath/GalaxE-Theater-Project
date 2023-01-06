/* eslint-disable no-undef */
import React, { useState } from "react";
import axios from "axios";
import "../styles/login-style/entire.css";
import baseUrl from "../environment/baseUrl";
import LandingPage from "../landingPage/LandingPage";
import Settings from "../settingslogin/Settings";
// import Header from './Header';
import SignUpAdmin from "../signUp/SignUpAdmin";
import SignUpUser from "../signUp/SignUpUser";
import { Link, Navigate, useHistory, useNavigate } from "react-router-dom";
// import { RepeatOneSharp } from "@mui/icons-material";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [errorResponse, setErrorResponse] = useState();
  const [errorResponse1, setErrorResponse1] = useState();

  function handleInput(e) {
    // Validating Email
    setEmail(e.target.value);
    var x = document.getElementById("email");
    var pass = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (x.value.match(pass)) {
      document.getElementById("emailLabel").innerHTML = "";
    } else {
      document.getElementById("emailLabel").innerHTML =
        "Please enter valid email address";
      x.value = "";
      document.getElementById("email").focus();
    }
  }
  function handleInput1(e) {
    setPassword(e.target.value);
    // Validating password
    var y = document.getElementById("password");
    if (y.value.length == 0) {
      document.getElementById("passwordLabel").innerHTML =
        "Password is required";
    } else {
      document.getElementById("passwordLabel").innerHTML = "";
    }
  }

  // Comparing the Email and Password entered by the user with database data.
  async function log(e) {
    const response1 = await axios
      .get(`${baseUrl}/user/settings/${email}/${password}`)
      .catch((error) => {
        if (error.response.status == 400) {
          setErrorResponse1(error.response.data);
        }
      });
    const response2 = await axios
      .get(`${baseUrl}/user/${email}/${password}`)
      .catch((error) => {
        if (error.response.status == 400) {
          document.getElementById("logInAlert").innerHTML =
            "Invalid Email/Password";
          setErrorResponse(error.response.data);
        }
      });

    //console.log(response2.data);
    console.log(response1.data);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("code", response1.data.code);
    localStorage.setItem("role", response1.data.role);
    // Storing current role in a variable
    const roleFetcher = response1.data.role;

    if (response2.data === true && response1.data != "") {
      if (response1.data.role === "ADMIN") {
        navigate("/adminlandingpage");
      } else {
        navigate("/mainUser");
      }
    } else if (errorResponse === "false") {
      document.getElementById("logInAlert").innerHTML =
        "Invalid Email/Password";
    } else {
      document.getElementById("logInAlert").innerHTML =
        "Invalid Email/Password";
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //JSX element
  return (
    <div className="signup-up">
      <div className="signup-user-container ">
        <div className="buttons">
          <button type="submit" className="first">
            <a href="/">Sign in</a>
          </button>
          <button type="submit" className="second">
            <a href="/registerUser">Sign up</a>
          </button>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="login">
            <div className="email">
              <div className="flex-item-single">
                <label htmlFor="email" id="emailLabel">
                  Email
                </label>
                <br />
                <input
                  type="text"
                  className="email"
                  name="email"
                  id="email"
                  autoComplete="off"
                  onBlur={(e) => handleInput(e)}
                />{" "}
              </div>
              <label id="emailLabel" style={{ color: "red" }}></label>
              <label id="emailLabel1"></label>
            </div>
            <div className="password">
              <div className="flex-item-single">
                <label htmlFor="password" id="passwordLabel">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  className="password"
                  name="password"
                  id="password"
                  autoComplete="off"
                  onBlur={(e) => handleInput1(e)}
                />
              </div>
              <label id="passwordLabel" style={{ color: "red" }}></label>
              <div id="logInAlert" style={{ color: "red" }}></div>
            </div>
            <div id="forgetDiv">
              <a href="/forgetPassword" id="forgetStyle">
                forgot password?
              </a>
              <br />
              <button
                className="login-submit"
                type="submit"
                onClick={(e) => log(e)}
              >
                Log in
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
