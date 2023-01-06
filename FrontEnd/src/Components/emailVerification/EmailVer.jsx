import axios from 'axios';
import React, { useState } from 'react'
import baseUrl from '../environment/baseUrl';
import '../styles/login-style/entire.css';
// import Header from './Header';
import { useNavigate } from 'react-router-dom';


function Emailver(){

    const navigate=useNavigate();
    const [email,setMail] = useState('');
    const [otp,setOTP]=useState('');

    //Setting Email
    const handleInput=(e)=>{
        setMail(e.target.value);
    }

    //Setting OTP
    const handleOTP=(e)=>{
        setOTP(e.target.value);
    }
    //Sending Mail
    async function handleSubmit(e){
        e.preventDefault();
        const response=await axios.get(`${baseUrl}/sendMail/${email}`);
        if(response.data==="Mail Sent Successfully"){
            document.getElementById("showEmailAlert").innerHTML="OTP sent successfully";
        }
        else{
            document.getElementById("showEmailAlert").innerHTML="There's a problem in sending email";
        }
       
    }

    //Validating OTP and resetting password
    async function handleReset(e){
        const response1=await axios.get(`${baseUrl}/user/${email}`);
        console.log(response1.data.otp);
        console.log(otp);
                if(otp==response1.data.otp){
                    alert("navigate to reset");
                    navigate("/resetpassword");
                }
                else{
                    document.getElementById("showEmailAlert").innerHTML="Invalid OTP entered";
                }
    }





  //JSX Component
  return (
    <div className='Emailver'>
     
            <div className='Eemail'>
                <label  className='Elabel1'>Email:</label>
                <br/>
                <input type="email" className='Elabel2'   onChange={(e)=>handleInput(e)} id="email" placeholder='user@gmail.com' name='email'></input><br/>
                <div id='showEmailAlert'></div><br/>
                <button type='Submit'  className='Ebutton1' onClick={(e)=>handleSubmit(e)}> Send OTP</button><br/>
                <input type="text" className='Elabel3'  onChange={(e) => handleOTP(e)} id="text" placeholder='Enter OTP' name='text'></input><br/><br></br>
                <button className='Elabel4' onClick={(e)=>handleReset(e)}><span>Reset Password</span></button>
            
                <button className='Ebutton2' type="button" ><a href="/" className='atag'>Cancel</a></button>
                <div id='showOtpAlert'></div><br/>
            </div>
            
    
    </div>
  )
}

export default Emailver;