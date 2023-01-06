import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignUpAdmin from '../signUp/SignUpAdmin';

function RegisteredSuccess() {
  //JSX Component
  const navigate = useNavigate();
  const handleAdmin = (e) => {
    navigate("/register");
  }
  const handleDashboard = (e) => {
    navigate("/mainUser");
  }
  return (
    <div className='RegisterSuccess'>
      <div className='popupPage text-center'>
        <div className='popupWindow'>
          <div>
            <img src="src/assets/images/tick.png"></img>
            <h1>Admin Added successfully</h1>
            <p>You created New Admin Account</p>
          </div>
          <div className='success-buttons'>
            <button onClick={(e) => handleAdmin(e)}>Add Another Admin</button>
            <button onClick={(e) => handleDashboard(e)}>Go to DashBoard</button>
          </div>
          {/* <button className='cancel secondary-button'>X</button> */}
        </div>
      </div>
      {/* <SignUpAdmin/> */}
    </div>
  );
}

export default RegisteredSuccess;