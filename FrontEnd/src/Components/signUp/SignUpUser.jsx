import React, { useState } from "react";
import axios from "axios";
import '../styles/login-style/entire.css';
import baseUrl from "../environment/baseUrl";
import { Navigate, useNavigate } from "react-router-dom";
// import Header from "./Header";

function SignUpUser() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    mobileNumber: "",
    phoneNumber: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  // Setting user(Admin) input values
  const onTextFieldChange = (e) => {
    setUserData({
      ...userData,

      [e.target.name]: e.target.value,
    });
  };

  //Password setting
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  // Sign up Handling
  async function handleSignup(e) {

    // Posting user data
    const value = await axios.post(`${baseUrl}/user/user`, userData);
    console.log(value.data);
    if (userData.password === password) {
      if (value.data === "User registration success") {
        const value1 = await axios.get(`${baseUrl}/sendWelcomeMail/${userData.email}`);
        navigate("/");
      }
      else {
        document.getElementById("signUpAlert").innerHTML = value.data;
      }
    }
    else {
      alert("fail Password");
      document.getElementById("signUpAlert").innerHTML = "Password and Confirm password did not match";
    }
  }

  //JSX Component
  return (
    <div className="Sfull">
      <button className="Sfirst"><a href="/login">SignIn</a></button>
      <button className="Ssecond"><a>SignUp</a></button>
      <div className="Sdetails">
        <h4 className="text-center">User Details</h4>
        <div className="flex-items">
          <div className='Sfirstname flex-item-single'>
            <label htmlFor='Sfirstname'>First Name<code>*</code></label><br />
            <input type="text" name="firstName" onChange={(e) => onTextFieldChange(e)}></input>
          </div>
          <div className='Slastname flex-item-single'>
            <label htmlFor='Slastname'>Last Name<code>*</code></label><br />
            <input type="text" name="lastName" onChange={(e) => onTextFieldChange(e)}></input>
          </div>
        </div>
        <div className="flex-items">
          <div className='Sbirthday flex-item-single'>
            <label htmlFor='Sbirthday'>Birthday <code>*</code></label><br />
            <input type="date" name="" min="1924-12-06" max="2004-12-06"></input>
          </div>
          <div className='Sgender flex-item-single'>
            <label htmlFor='Sgender'>Gender <code>*</code></label><br />
            <select name="gender" onChange={(e) => onTextFieldChange(e)}>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>
        </div>
        <div className="flex-items">
          <div className='Smobile flex-item-single'>
            <label htmlFor='Smobile'>Mobile Number <code>*</code></label><br />
            <input type="text" name="mobileNumber" onChange={(e) => onTextFieldChange(e)}></input>
          </div>
          <div className='Shome flex-item-single'>
            <label htmlFor='Shome'>Tele-Phone</label><br />
            <input type="text" name="phoneNumber" onChange={(e) => onTextFieldChange(e)}></input>
          </div>
        </div>
        <div className="Slogin">
          <h4 className="text-center">LogIn Details</h4>
          <div className="flex-items">
            <div className='Susername flex-item-single'>
              <label htmlFor='Susername'>User Name <code>*</code></label><br />
              <input type="text" name="userName" onChange={(e) => onTextFieldChange(e)}></input>
            </div>
            <div className='Smail flex-item-single'>
              <label htmlFor='Smail'>Email <code>*</code></label><br />
              <input type="text" name="email" onChange={(e) => onTextFieldChange(e)}></input>
            </div>
          </div>
          <div className="flex-items">
            <div className='Snew flex-item-single'>
              <label htmlFor='Snew'>Password <code>*</code></label><br />
              <input type="password" name="password" onChange={(e) => onTextFieldChange(e)}></input>
            </div>
            <div className='Sconfirm flex-item-single'>
              <label htmlFor='Sconfirm'>Confirm Password <code>*</code></label><br />
              <input type="password" name="confirmPassword" onChange={(e) => handlePassword(e)}></input>
            </div>
          </div><br />
          <div className="admin-register-submit">
            <button className="Sbutton " onClick={(e) => handleSignup(e)}>Submit</button>
          </div>
          <div id="sigUpAlert"></div>
        </div>
      </div>
    </div>




  );
}
export default SignUpUser;
