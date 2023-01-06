import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignUpAdmin from '../signUp/SignUpAdmin';

function RegisteredFailed() {
  //JSX Component
  const navigate = useNavigate();
  const handleTryAgain = (e) => {
    navigate("/register");
  }
  const handleDashboard = (e) => {
    navigate("/mainUser");
  }
  return (
    <div className='RegisteredFailed'>
      <div className='popupPage'>
        <div className='popupWindow'>
          <div>
            <img src=""></img>
            <h1 className='text-center'>Registration Failed</h1>
            <p className='text-center'>This Email Address has been already taken for one Account</p>
            <p className='text-center'>Try with another email Address</p>
          </div>
          <div className='success-buttons'>
            <button onClick={(e) => handleTryAgain(e)}>Try Again</button>
            <button onClick={(e) => handleDashboard(e)}>Go to DashBoard</button>
          </div>
        </div>
      </div>
      {/* <SignUpAdmin/> */}
    </div>
  )
}

export default RegisteredFailed;