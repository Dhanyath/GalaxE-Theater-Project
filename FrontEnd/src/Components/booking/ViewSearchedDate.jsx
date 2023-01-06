import React from "react";
import { useState, useEffect } from "react";
import "../styles/booking-style/ViewAllTicket.css";
import axios from "axios";

const ViewSearchedDate = ({ moviedate }) => {
  /**
   * States Used To Render Particular Component On Boolean Values
   */
  const [showContainer, setShowContainer] = useState(false);
  const [Ticket, setTicket] = useState([]);
  /**
   * Axios Get Is Performed On UseEffect As State Triggers And Message Is Given On Response Status
   */
  useEffect(() => {
    axios
      .get(`http://localhost:9091/movie/date/${moviedate}`)
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
      {/* Map Is Run Over The List Of Movies */}
      {Ticket.map((data) => {
        return (
          <div className="mainticket">
            <div className="ticketcard">
              <img src={`${data.url}`}></img>
              <div className="datadetails">
                <div className="moviename">{data.name}</div>
                <div className="moviegenre">{data.genre}</div>
                <div className="movieduration">{data.duration}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <p id="error"></p>
  );
};

export default ViewSearchedDate;
