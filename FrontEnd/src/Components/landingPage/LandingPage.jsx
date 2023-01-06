import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import '../styles/login-style/entire.css';
// import Header from './Header'
import '../images/logo.png'

export default function LandingPage() {

    const navigate = useNavigate();
    const goto = (e) => {
        navigate("/mainUser");
    }
    //JSX Component
    return (
        <div className='admin-landing'>




            <header style={HeaderStyle}>
                <h1 className="main-title text-center">WELCOME ADMIN</h1>
                <div className="admin_button">
                    <Link to="/register">
                        <button className="primary-button" >Add New Admin</button>
                    </Link>
                    <Link to="/mainUser">
                        <button className="primary-button" id="reg_btn" onClick={(e) => goto(e)}><span>Go to DashBoard</span></button>
                    </Link>
                </div>
            </header>
        </div>
    )
}


const HeaderStyle = {
    width: "100%",
    height: "80vh",
    backgroundPosition: "center",
    background: "black",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
}