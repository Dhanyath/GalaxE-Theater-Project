import React, { useState } from "react";
import '../styles/login-style/entire.css';
// import Header from "./Header";
import axios from "axios";
import baseUrl from "../environment/baseUrl";

const Reset = () => {

  const [password,setPassword1]=useState("");
    
      const [password1, setPassword] = useState("");
    
      // Setting password1
      const onTextFieldChange = (e) => {
        setPassword1(e.target.value);
      }
    
      // Setting password
      function handlePassword(e) {
        setPassword(e.target.value);
      }
    
     
    const [message, setErrorMessage] = useState('')
  
    // Validating password
    // const validate = (value) => {
   
    //   if (validator.isStrongPassword(value, {
    //     minLength: 8, minLowercase: 1,
    //     minUppercase: 1, minNumbers: 1, minSymbols: 1
    //   })) {
    //     setErrorMessage('Is Strong Password')
    //   } else {
    //     setErrorMessage('Is Not Strong Password')
    //   }
    // }

    //Changing password
    async function changePassword(e){
      const response=await axios.get(`${baseUrl}/user/settings/${localStorage.getItem("email")}/${localStorage.getItem("password")}`);
      console.log(response.data.password);
       if(password1===password){
          const response1=await axios.post(`${baseUrl}/user/${localStorage.getItem("email")}/${password}`,password);
          console.log(response1.data);
          alert("hi");
       }
       else{
           alert("hello");
       }
       
   }

// JSX Component
return (
   <>
    <div id="fexternaldiv">
    
    
            <form id="fform" onSubmit={(e)=>changePassword(e)}>
            
                         <input className="finput1" type="password" placeholder="New Password" onChange={(e)=>onTextFieldChange(e)}></input>
                
                         <input className="finput2" type="password" placeholder="Confirm Password" onChange={(e)=>handlePassword(e)}></input>
        
                       
               
                <button type="submit">Reset</button>
            </form>
    </div>
    
    </>
)}
export default Reset;