import React from 'react';
import "../styles/MainContainer.css"
import logo from "./logo.png";


function MainContainer() {
  return (
    <div className='mainContainer'>
        <div className='mainContainer-card'>
            <div className=''>
                <img src={logo} alt="movie"></img>
            </div>
            <div className='mainContainer-rating'>
            <p>rating</p>
            </div>
        </div>
        
    </div>
  )
}

export default MainContainer