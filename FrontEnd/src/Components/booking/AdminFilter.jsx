import React, { useState } from "react";
import "../styles/booking-style/AdminFilter.css";
import ViewAllTicket from "./ViewAllTicket";
import ViewSearchedDate from "./ViewSearchedDate";
import ViewAllMovieName from "./ViewAllMovieName";
import Footer from "./Footer";
import Header from "../shared/HeaderUser";

function AdminFilter() {
  /**
   * States Used To Render Particular Component On Boolean Values
   */
  const [showMovie, setShowMovie] = useState(false);
  const [getMovies, setgetMovies] = useState(false);
  const [showMovieDate, setshowMovieDate] = useState(false);
  const [data, setData] = useState({
    id: "",
    moviename: "",
    date: "",
  });

  /**
   * Invert The States To Display The Particular Component
   */
  const handleSubmit = (e) => {
    setgetMovies(false);
    setShowMovie(!showMovie);
    e.preventDefault();
    const userData = {
      id: data.id,
      moviename: data.moviename,
      date: data.date,
    };
  };

  /**
   * Handle The Input Changes And Send It Over To The API By Changing State
   */
  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  /**
   * Invert The States To Display The Particular Component
   */
  const getallmovies = () => {
    setgetMovies(true);
    setShowMovie(false);
  };

  /**
   * Invert The States To Display The Particular Component
   */
  const searchmoviebynamedate = () => {
    setShowMovie(false);
    setshowMovieDate(true);
  };

  return (
    <>
      {/* Call The Header Component */}
      <Header></Header>
      <div className="admin_filter_main_container">
        <div className="admin_filter_heading">
          <h3>Admin Filter Section</h3>
        </div>
        <div className="admin_filter_search_back">
          {/* Admin Filter Section To Search By Name And Date */}
          <form className="admin_filter_search" onSubmit={handleSubmit}>
            <input
              type="text"
              name="moviename"
              placeholder="Movie Name"
              value={data.moviename}
              onChange={handleChange}
            />
            OR
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={data.date}
              onChange={handleChange}
            />
            {/* Search Button To Fetch From The API */}
            <button
              type="submit"
              className="submitButton"
              onClick={searchmoviebynamedate}
            >
              Search
            </button>
            {/* View All Button To View All The Movies Running */}
            <button type="button" className="viewAll" onClick={getallmovies}>
              View All
            </button>
          </form>
        </div>
        {/* On The Basis Of States The Component Is Rendered */}
        {getMovies ? <ViewAllTicket></ViewAllTicket> : " "}
        {showMovie ? <ViewAllMovieName moviename={data.moviename} /> : " "}
        {showMovieDate ? (
          <ViewSearchedDate moviedate={data.date}></ViewSearchedDate>
        ) : (
          " "
        )}
        {/* Call The Footer Component */}
        <Footer> </Footer>
      </div>
    </>
  );
}

export default AdminFilter;
