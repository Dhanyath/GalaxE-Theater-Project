import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/movie-style/Buttons.css";
import Main from "../main/Main";
import AddMovie from "../addmovie/AddMovie";
import Adminschedule from "../../AdminSchedule/Adminschedule";

export default function MovieOptions({ setMovieStatus, add }) {
  //States to open and close  the model
  const [modalOpen, setModalOpen] = useState(false);
  const [addSchedule, setAddSchedule] = useState(false);

  //To navoige to particular module
  const navigate = useNavigate();

  //To chenge the background color and color of the respective button on clicking on them
  const [allMovies, setAllMovies] = useState(true);
  const [upComingMovies, setUpcomingMovies] = useState(false);
  const [runningMovies, setRunningMovies] = useState(false);

  //Navigate to the Schedule page
  function schedulePage() {
    navigate("/adminSchedule");
  }

  //Navigate to the Bookiing page
  function bookingAdmin() {
    navigate("/AdminFilterViewAllTicket");
  }

  // Funtions to change color of the buttons
  const all = () => {
    // event.preventDefault();
    setAllMovies(true);
    setUpcomingMovies(false);
    setRunningMovies(false);
  };

  const upcoming = () => {
    // event.preventDefault();
    setAllMovies(false);
    setUpcomingMovies(true);
    setRunningMovies(false);
  };

  const running = () => {
    // event.preventDefault();
    setAllMovies(false);
    setUpcomingMovies(false);
    setRunningMovies(true);
  };

  return (
    <div>
      <form>
        <div className="movie-mainbuttons">
          <div className="movie-buttons">
            {/* To display all movies */}
            <button
              className="movie-btn"
              onClick={() => {
                setMovieStatus("");
                all();
              }}
              style={{
                backgroundColor: allMovies ? "#EB4E62" : "",
                color: allMovies ? "white" : "",
              }}
            >
              All Movies
            </button>
            {/* To display all the Running movies */}
            <button
              className="movie-btn"
              onClick={(e) => {
                e.preventDefault();
                setMovieStatus("getByStatus/RUNNING");
                running();
              }}
              style={{
                backgroundColor: runningMovies ? "#EB4E62" : "",
                color: runningMovies ? "white" : "",
              }}
            >
              Running Movies
            </button>
            {/* To display all the upcoming movies */}
            <button
              className="movie-btn"
              onClick={(e) => {
                e.preventDefault();
                setMovieStatus("getByStatus/UPCOMING");
                upcoming();
              }}
              style={{
                backgroundColor: upComingMovies ? "#EB4E62" : "",
                color: upComingMovies ? "white" : "",
              }}
            >
              Upcoming Movies
            </button>
          </div>
          {/* The Buttons Should only be displayed to the admin */}
          <div className="movie-schedulebutton">
            {add == "ADMIN" ? (
              <p
                className="landingpage-buttons"
                style={{
                  display: "flex",
                  gap: "0.25rem",
                  marginTop: "1rem",
                  marginLeft: "1rem",
                }}
              >
                <button
                  className="movie-addbtn"
                  onClick={(e) => {
                    {
                      e.preventDefault();
                      setModalOpen(true);
                    }
                  }}
                >
                  Add Movies
                </button>
                <button
                  className="movie-schedulebtn"
                  onClick={() => {
                    schedulePage();
                  }}
                >
                  Add Schedule
                </button>
                <button
                  className="movie-bookingbtn"
                  onClick={() => {
                    bookingAdmin();
                  }}
                >
                  Booking Filter
                </button>
                <button
                  className="movie-addbtn"
                  onClick={(e) => {
                    navigate("/foodAndBeveragesdefault");
                  }}
                >
                  Food and beverages
                </button>
              </p>
            ) : null}
          </div>
          {/* To open the  */}
          {modalOpen && <AddMovie setModalOpen={setModalOpen} />}
        </div>
      </form>
    </div>
  );
}
