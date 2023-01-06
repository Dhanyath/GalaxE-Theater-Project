import React from "react";
import { useState } from "react";
import axios from 'axios';
import baseUrl from "../environment/baseUrl";
import { useNavigate } from "react-router-dom";

function Settings() {
    const [password, setPassword1] = useState("");

    const [password1, setPassword] = useState("");

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        gender: "",
        mobileNumber: "",
        email: ""
    });
    const handleInput = (e) => {
        setUserData({
            ...userData,

            [e.target.name]: e.target.value,
        });
    };

    const onTextFieldChange = (e) => {
        setPassword1(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function changePassword(e) {
        const response1 = await axios.get(`${baseUrl}/user/settings/${localStorage.getItem("email")}/${localStorage.getItem("password")}`);
        console.log(response1.data);
        if (password1 === response1.data.password) {
            const responseChange = await axios.post(`${baseUrl}/user/${localStorage.getItem("email")}/${password}`, password);
            document.getElementById("passwordValidation").innerHTML = "Password updated successfully";
        }
        else {
            document.getElementById("passwordValidation").innerHTML = "Password and confirm password are not matching";
        }

    }
    async function updateUser(e) {
        const updateResponse = await axios.put(`${baseUrl}/user`, userData);
        console.log(updateResponse.data);
    }

    async function deleteAccount(e) {
        const deleteResponse = await axios.delete(`${baseUrl}/user/${localStorage.getItem("email")}`);
        navigate("/");
    }



    return (

        <div className="SEfull" >

            <div className="SEaccount">
                <div className="SEstart">
                    <h1>Edit Profile</h1>
                </div>

                <div className="SEdetails">
                    <h5>Account details</h5>
                    <form>
                        <div className="SEemail">
                            <label htmlFor="email">Email:</label>
                            <input type="text" placeholder="User@gmail.com" name="email" onChange={(e) => handleInput(e)}></input><br />
                        </div>
                        <div className="SEmobile">
                            <label htmlFor="mobile">Mobile:</label><br />
                            <input className="SElabel2" type="text" placeholder="9999999999" name="mobileNumber" onChange={(e) => handleInput(e)}></input><br />
                        </div>
                    </form>
                    <br></br>
                </div>


            </div>

            <div className="SEperson">
                <h5>Personal Details</h5>
                <div className="SEfirstname">
                    <label htmlFor="firstname">First Name:</label><br />
                    <input type="text" placeholder="Enter First Name here" name="firstName" onChange={(e) => handleInput(e)}></input><br />
                </div>
                <div className="SElastname">
                    <label htmlFor="lastname">Last Name:</label><br />
                    <input type="text" placeholder="Enter Last Name here" name="lastName" onChange={(e) => handleInput(e)}></input><br />
                </div>

                <div className="SEgender">
                    <label htmlFor="gender" className="SELABgender">Gender:</label><br />
                    <select name="gender" onChange={(e) => handleInput(e)}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                </div>
                <button onClick={(e) => updateUser(e)}>Save Details</button>
            </div>


            <div className="SEpassword">
                <h5>Edit Password</h5>
                <div className="SEcurrent">
                    <label htmlFor="Current">Current Password:</label><br />
                    <input type="password" placeholder="" name="currentPassword" onChange={(e) => handlePassword(e)} ></input>
                </div>
                <div className="SEnew">
                    <label htmlFor="New">New Password:</label><br />
                    <input type="password" name="password" placeholder="" onChange={(e) => onTextFieldChange(e)}></input>
                </div>
                <div className="SEconfirm">
                    <label htmlFor="Confirm">Confirm Password:</label><br />
                    <input type="password" placeholder="" name="confirmPassword" onChange={(e) => onTextFieldChange(e)} ></input>
                </div>
                <button onClick={(e) => changePassword(e)}>Edit</button>
                <div id="passwordValidation"></div>

            </div>
            <div className="SEdelete">
                <div onClick={(e) => deleteAccount(e)}>Delete Account</div>
            </div>

        </div>
    );
}

export default Settings;
