import React from "react";
import { useState, useEffect } from "react";
import "../styles/booking-style/ViewAllTicket.css";
import axios from "axios";

const ViewAllTicket = () => {
  /**
   * States Used To Render Particular Component On Boolean Values
   */
  const [Ticket, setTicket] = useState([]);
  /**
   * Axios Get Is Performed On UseEffect As State Triggers
   */
  useEffect(() => {
    axios
      .get("https://movies.learn.skillassure.com/movies/getByStatus/RUNNING")
      .then((response) => {
        setTicket(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <div className="view_all_ticket_container">
      {/* Map Is Run Over The List Of Movies */}
      {Ticket.map((data) => {
        return (
          <div className="mainticket">
            <div className="ticketcard">
              <img src={`${data.movieUrl}`}></img>
              <div className="ticketdetails">
                <div className="TicketMoviename">{data.movieName}</div>
                <div className="moviegenre">{data.movieGenre}</div>
                <div className="movieduration">{data.duration}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ViewAllTicket;
