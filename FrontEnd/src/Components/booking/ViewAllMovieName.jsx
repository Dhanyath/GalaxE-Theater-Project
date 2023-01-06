import React from "react";
import { useState, useEffect } from "react";
// import "./ViewAllMovieName.css";
import "../styles/booking-style/ViewAllTicket.css";
import axios from "axios";

const ViewAllMovieName = ({ moviename }) => {
  /**
   * States Used To Render Particular Component On Boolean Values
   */
  const [Ticket, setTicket] = useState([]);
  const [showContainer, setShowContainer] = useState(false);
  /**
   * Axios Get Is Performed On UseEffect As State Triggers And Message Is Given On Response Status
   */
  useEffect(() => {
    axios
      .get(`https://movies.learn.skillassure.com/movies/getByName/${moviename}`)
      .then((response) => {
        setTicket(response.data);
        console.log(response);
        if (response.status !== 200) {
          document.getElementById("error").innerHTML = response.data;
          setShowContainer(false);
        } else {
          setShowContainer(true);
        }
      });
  }, []);
  return showContainer ? (
    <div className="view_all_ticket_container">
      {/* Based On State, Component Or Error Message Is Returned */}
      <div className="mainticket">
        <div className="ticketcard">
          <img src={`${Ticket.movieUrl}`}></img>
          <div className="ticketdetails">
            <div className="moviename">{Ticket.movieName}</div>
            <div className="moviegenre">{Ticket.movieGenre}</div>
            <div className="movieduration">{Ticket.duration}</div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p id="error"></p>
  );
};

export default ViewAllMovieName;
