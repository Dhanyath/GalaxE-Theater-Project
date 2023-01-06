import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Buttons.css";
import Main from "../main/Main";
import AddMovie from "../addmovie/AddMovie";

export default function Buttons({ setMovieStatus ,add}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [addbtn, setaddbtn] = useState(true);



  const [allMovies, setAllMovies] = useState(true);
  const [upComingMovies, setUpcomingMovies] = useState(false);
  const [runningMovies,setRunningMovies]=useState(false);
  
  const all = () => {
    // event.preventDefault();
    setAllMovies(true);
    setUpcomingMovies(false);
    setRunningMovies(false);
   }
  
   const upcoming = () => {
    // event.preventDefault();
      setAllMovies(false);
    setUpcomingMovies(true);
    setRunningMovies(false);
      }
  
  
  
      const running = () => {
        // event.preventDefault();
        setAllMovies(false);
        setUpcomingMovies(false);
        setRunningMovies(true);
          }



  return (
    <div>
      <form>
        <div className="movie-mainbuttons">
          <div className="movie-buttons">
            <button className="movie-btn" onClick={() => {setMovieStatus("");
            // all();
            
            } }  style={{ backgroundColor: allMovies? "#EB4E62" : "",
                        color: allMovies ? "white" : "",}}>
              All Movies
            </button>

            <button
              className="movie-btn"
              onClick={(e) => {
                e.preventDefault();
                setMovieStatus("getByStatus/RUNNING");
                 running();
              }}

              style={{ backgroundColor: runningMovies? "#EB4E62" : "",
                        color: runningMovies ? "white" : "",}}
            >
              Running Movies
            </button>

            <button
              className="movie-btn"
              onClick={(e) => {
                e.preventDefault();
                setMovieStatus("getByStatus/UPCOMING");
                 upcoming();
              }}
              
              style={{ backgroundColor: upComingMovies? "#EB4E62" : "",
                        color: upComingMovies ? "white" : "",}}
            >
              Upcoming Movies
            </button>
          </div>
          <div className="movie-addbutton">
            
            { add=='admin'?
            <p>
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
                </p> : null
              }
            </div>
            {modalOpen && <AddMovie setModalOpen={setModalOpen} />}
        </div>
      </form>
    </div>
  );
}
