import axios from "axios";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import baseUrl from "../environment/baseUrl";
import { useState } from "react";

function ViewSettings() {
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    handleProfileSettings();
  }, []);
  async function handleProfileSettings(e) {
    const response = await axios.get(
      `${baseUrl}/user/settings/${localStorage.getItem(
        "email"
      )}/${localStorage.getItem("password")}`
    );
    console.log(response.data);
    setEmail(response.data.email);
    setMobileNumber(response.data.mobileNumber);
    setFirstName(response.data.firstName);
    setlastName(response.data.lastName);
    setGender(response.data.gender);
    // localStorage.setItem("firstName",response.data.firstName);
    // localStorage.setItem("lastName",response.data.lastName);
    // localStorage.setItem("mobileNumber",response.data.mobileNumber);
    // localStorage.setItem("gender",response.data.gender);
  }

  const updateUser = (e) => {
    navigate("/settings");
  };

  const logout = (e) => {
    localStorage.setItem("email", null);
    localStorage.setItem("password", null);
    localStorage.removeItem("code");
    localStorage.setItem("role", null);
    navigate("/");
  };
  return (
    <div className="SEfull">
      <div className="SEaccount">
        <div className="SEstart">
          <h1>View Profile</h1>
        </div>

        <div className="SEdetails">
          <h5>Account details</h5>
          <form>
            <div className="SEemail">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                placeholder="User@gmail.com"
                name="email"
                value={email}
              ></input>
              <br />
            </div>
            <div className="SEmobile">
              <label htmlFor="mobile">Mobile:</label>
              <br />
              <input
                className="SElabel2"
                type="text"
                placeholder="9999999999"
                name="mobileNumber"
                value={mobileNumber}
              ></input>
              <br />
            </div>
          </form>
          <br></br>
        </div>
      </div>

      <div className="SEperson">
        <h5>Personal Details</h5>
        <div className="SEfirstname">
          <label htmlFor="firstname">First Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter First Name here"
            name="firstName"
            value={firstName}
          ></input>
          <br />
        </div>
        <div className="SElastname">
          <label htmlFor="lastname">Last Name:</label>
          <br />
          <input
            type="text"
            placeholder="Enter Last Name here"
            name="lastName"
            value={lastName}
          ></input>
          <br />
        </div>

        <div className="SEgender">
          <label htmlFor="gender" className="SELABgender">
            Gender:
          </label>
          <br />
          <select name="gender" value={gender}>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </div>

        <button id="SEedit" onClick={(e) => updateUser(e)}>
          Edit Profile
        </button>
        <br />
        <button id="logOut" onClick={(e) => logout(e)}>
          Log Out
        </button>
      </div>
    </div>
  );
}
export default ViewSettings;
