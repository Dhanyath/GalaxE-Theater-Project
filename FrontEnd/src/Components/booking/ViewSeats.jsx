import React, { useState, useEffect } from "react";
import "../styles/booking-style/ViewSeats.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../environment/baseUrl";

function ViewSeats() {
  const navigate = useNavigate();
  const [APIData, setAPIData] = useState([]);

  // Get The Seat API
  useEffect(() => {
    axios
      .get(`https://booking.learn.skillassure.com/seats`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  // Post What Gets Selected
  function postSeat() {
    axios.post(`https://booking.learn.skillassure.com/seats/saveSeat`, APIData);
  }

  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMoviePrice = JSON.parse(
    localStorage.getItem("selectedMoviePrice")
  );

  let number = 10;
  let seats = [];
  for (let i = 0; i < number; i++) {
    seats.push(
      <div class="rowSeat">
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
        <div class="seat" onClick={selecting}></div>
      </div>
    );
  }
  function selecting() {
    const moviecontainer = document.querySelector(".moviecontainer");
    const seats = document.querySelectorAll(".rowSeat .seat:not(.sold)");
    const count = document.getElementById("count");
    const total = document.getElementById("total");
    const movieSelect = document.getElementById("movie");

    populateUI();

    // Save selected movie index and price
    function setMovieData(movieIndex, moviePrice) {
      localStorage.setItem("selectedMovieIndex", movieIndex);
      localStorage.setItem("selectedMoviePrice", moviePrice);
    }

    // Update total and count
    function updateSelectedCount() {
      const selectedSeats = document.querySelectorAll(
        ".rowSeat .seat.selected"
      );

      const seatsIndex = [...selectedSeats].map((seat, index) => {
        console.log(index);
        return [...seats].indexOf(seat);
      });

      localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

      const selectedSeatsCount = selectedSeats.length;

      count.innerText = selectedSeatsCount;

      setMovieData(movieSelect.selectedIndex, movieSelect.value);
    }

    // Get data from localstorage and populate UI
    function populateUI() {
      const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

      if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
          if (selectedSeats.indexOf(index) > -1) {
            console.log(seat.classList.add("selected"));
          }
        });
      }

      const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

      if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
        console.log(selectedMovieIndex);
      }
    }
    console.log(populateUI());

    // Movie select event
    if (movieSelect) {
      movieSelect.addEventListener("change", (e) => {
        //   ticketPrice = +e.target.value;
        setMovieData(e.target.selectedIndex, e.target.value);
        updateSelectedCount();
      });
    }

    // Seat click event
    if (moviecontainer) {
      moviecontainer.addEventListener("click", (e) => {
        if (
          e.target.classList.contains("seat") &&
          !e.target.classList.contains("sold")
        ) {
          e.target.classList.toggle("selected");

          updateSelectedCount();
        }
      });
    }

    updateSelectedCount();
  }
  function checkSeat() {
    const selectedSeatCount = localStorage.getItem("selectedSeats");
    console.log(selectedSeatCount);
    if (selectedSeatCount == null) {
      document.getElementById("check-seat-error").innerText =
        "Please Select Seats";
    } else if (selectedSeatCount == []) {
      document.getElementById("check-seat-error").innerText =
        "Please Select Seats";
    } else {
      if (localStorage.getItem("role").toLowerCase() === "user")
        navigate("/foodAndBeveragesUser", {
          state: { selectedSeatCount: selectedSeatCount },
        });
      else if (localStorage.getItem("role").toLowerCase() === "admin")
        navigate("/foodAndBeveragesAdmin", {
          state: { selectedSeatCount: selectedSeatCount },
        });
      // localStorage.removeItem("selectedSeats");
    }
  }
  return (
    <div className="movie_main_container">
      <ul class="showcase">
        <li>
          <div class="seat"></div>
          <small>Available</small>
        </li>
        <li>
          <div class="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div class="seat sold"></div>
          <small>Sold</small>
        </li>
      </ul>
      <div class="moviecontainer">
        <div class="screen"></div>
        {seats.map((i) => i)}
      </div>

      <p class="text">
        You have selected <span id="count">0</span> seat
      </p>
      <button type="button" className="proceedButton" onClick={checkSeat}>
        Proceed
      </button>
      <p id="check-seat-error" style={{ color: "white" }}></p>
    </div>
  );
}

export default ViewSeats;
