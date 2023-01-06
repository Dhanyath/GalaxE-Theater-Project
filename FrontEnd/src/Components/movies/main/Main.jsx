import React, { useState } from "react";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import Moviecard from "../../movies/movie/Moviecard";
import Navbar from "../../shared/Navbar";
import "../../../../src/App.css";
import MovieOptions from "../button/MovieOptions";

function Main(role) {
  //To set the MovieURL which keeps changing in the child components NavBar and movieOptions
  const [movieStatus, setMovieStatus] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  //To fetch the actor details
  const role1 = localStorage.getItem("role");
  return (
    <div className="main-container">
      <div className="main-Container-head">
        {/* calling all the components  */}
        <Header pass={role1} />
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

export default Main;
