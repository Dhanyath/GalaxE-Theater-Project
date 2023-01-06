import React,{useState} from "react";
import NavbarStyle from "../styles/movie-style/NavbarStyle.css";
// import { FaSearch } from "react-icons/fa";
import { MdOutlineArrowRight } from "react-icons/md";

function Navbar({setMovieStatus}) {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="navbar-main">
      <div className="navbar-filter">
        <h2>Filter</h2>
      </div>
      <div className="navbar-title-search">
        <div className="navbar-title">
          <input
            type="text"
            placeholder="Title/Cast"
            className="navbar-title-input"
            onChange={(e)=>{
              e.preventDefault();
              setSearchInput(e.target.value);
            }}
          />
        </div>
        <div className="navbar-title-search-icon">
          {/* <FaSearch /> */}
        </div>
      </div>
      <div className="navbar-date">
        <div className="navbar-calender">
          {/* <BsCalendar2DateFill /> */}
          <h4> Date </h4>
          <MdOutlineArrowRight className="navbar-right-arrow"/>
        </div>
        <div className="navbar-date-main">
          <input type="date" className="navbar-date-in" />
          {/* <input type="text" placeholder="14th Nov 2022"
                    onfocus="(this.type='date')" className="date-input"/> */}
        </div>
        <div className="navbar-search-Button">
          <button className="navbar-search-button"
          onClick={(e)=>{
            e.preventDefault();
            setMovieStatus(`getByName/${searchInput}`)
            setSearchInput()
          }}

          >Search</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
