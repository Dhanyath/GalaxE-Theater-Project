import React, { useState, useEffect } from "react";
import Footer from "../../shared/Footer";
import Moviecard from "../movie/Moviecard";
import Navbar from "../../shared/Navbar";
import "../../../../src/App.css";
import MovieOptions from "../button/MovieOptions";
import HeaderUser from "../../shared/HeaderUser";
import axios from "axios";
import baseUrl from "../../environment/baseUrl";

function MainUser() {
  const [movieStatus, setMovieStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    handleProfileSettings();
  }, []);
  // Getting role from the user management module
  async function handleProfileSettings(e) {
    const response = await axios.get(
      `${baseUrl}/user/settings/${localStorage.getItem(
        "email"
      )}/${localStorage.getItem("password")}`
    );
    setRole(response.data.role);
  }
  const role1 = localStorage.getItem("role");
  return (
    <div className="main-container">
      {/* calling all the components  */}
      <div className="main-Container-head">
        <HeaderUser pass={role1} />
      </div>
      <div className="main-Container-nav">
        <Navbar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          setMovieStatus={setMovieStatus}
          movieStatus={movieStatus}
        />
      </div>

      <MovieOptions
        add={role1}
        setMovieStatus={setMovieStatus}
        movieStatus={movieStatus}
      />
      <Moviecard movieStatus={movieStatus} add={role1} />

      <Footer />
    </div>
  );
}

export default MainUser;
