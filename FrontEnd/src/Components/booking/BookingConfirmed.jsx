import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/booking-style/bookingConfirmed.css";
import bookingUrl from "../environment/bookingUrl";
import foodandbeweragesUrl from "../environment/foodandbeweragesUrl";
import HeaderUser from "../shared/HeaderUser";

let convenienceFeesPercentage = 0.16;
let IGSTPercentage = 0.18;
let theaterName = localStorage.getItem("selectedTheatre");

let currentCategory = "All";
let previousCategory;

function BookingConfirmed() {
  const navigate = useNavigate();
  const location = useLocation();
  const [foodItemsList, setFoodItemsList] = useState([]);
  const [renderer, setRenderer] = useState(false);

  const [ticketBookingSummary, setTicketBookingSummary] = useState({
    seatType: "N/A",
    totalTickets: "N/A",
    seats: "N/A",
    theatre: "N/A",
    screen: "N/A",
    basicFare: "N/A",
  });

  const tempObj = {
    seatType: "balcony",
    totalTickets: 3,
    seats: ["C1", "C2", "C3"],
    theatre: localStorage.getItem("selectedTheatre"),
    screen: "2",
    basicFare: 150,
  };

  useEffect(() => {
    axios
      .get(`${bookingUrl}/seat`)
      .then((Response) => handleTicketBookingSummeryFetchEvent(Response.data));
  }, []);

  const handleTicketBookingSummeryFetchEvent = (data) => {
    if (data) {
      const temp = { ...ticketBookingSummary };
      const temp2 = data[0];
      temp.basicFare = temp2.price;
      temp.seatType = temp2.seatType;
      temp.seats = localStorage.getItem("selectedSeats");
      console.log(temp.seats);
      // localStorage.removeItem("selectedSeats");
      temp.totalTickets = generateSeatCount(
        location.state.selectedSeatCount
      ).length;
      temp.theatre = theaterName;
      setTicketBookingSummary(temp);
    }
  };

  const generateSeatCount = (seatString) => {
    seatString = seatString.slice(1, -1);
    return seatString.split(",");
  };

  useEffect(() => {
    axios
      .get(`${foodandbeweragesUrl}/all`)
      .then(
        (Response) => setFoodItemsList(Response.data),
        setRenderer(!renderer)
      );
  }, []);
  useEffect(() => {
    handleCategorySelectedEvent(currentCategory);
    setRenderer(!renderer);
  }, [foodItemsList]);

  let totalTicketPrice =
    parseFloat(ticketBookingSummary.basicFare) *
    parseFloat(ticketBookingSummary.totalTickets);
  let baseAmount = totalTicketPrice * convenienceFeesPercentage;
  let IGSTFee = baseAmount * IGSTPercentage;
  let totalConvenienceFee = baseAmount + IGSTFee;
  let [totalAddonsCost, setTotalAddonsCost] = useState(0);
  let [totalDiscount, setTotalDiscount] = useState(0);

  const [currentFoodIemsList, setCurrentFoodItemsList] =
    useState(foodItemsList);
  const [addedFoodItems, setAddedFoodItems] = useState({});

  /* Ticket Booking Post */

  const [SeatAPIData, setSeatAPIData] = useState([]);
  useEffect(() => {
    axios.get(`https://booking.learn.skillassure.com/seat`).then((response) => {
      setSeatAPIData(response.data);
    });
  }, []);

  const postBooking = () => {
    axios.post(`https://booking.learn.skillassure.com/bookings`, {
      code: "A",
      name: "9",
      seats: SeatAPIData,
      totalPrice: (
        totalAddonsCost +
        totalConvenienceFee +
        totalTicketPrice
      ).toFixed(2),
    });
    navigate("/BookingConfirmed");
    // alert("Booking Successful");
  };

  //   useEffect(() => {
  //     const obj = document.getElementById(currentCategory);
  //     obj.style.backgroundColor = "#181E40";
  //     obj.style.color = "#ffff";
  //     const prevObj = document.getElementById(previousCategory);
  //     if (prevObj) {
  //       prevObj.style.backgroundColor = "rgb(234, 234, 234)";
  //       prevObj.style.color = "#181E40";
  //     }
  //   }, [currentCategory]);

  const handleFoodItemAddEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      temp[id]++;
      setAddedFoodItems(temp);
    } else {
      temp[id] = 1;
      setAddedFoodItems(temp);
    }
  };
  const handleFoodItemDecrementEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      if (temp[id] > 0) temp[id]--;
      setAddedFoodItems(temp);
    }
  };
  const handleFoodItemRemoveEvent = (id) => {
    const temp = { ...addedFoodItems };
    if (id in temp) {
      delete temp[id];
      setAddedFoodItems(temp);
    }
  };

  const handleCategorySelectedEvent = (category) => {
    if (currentCategory != category) {
      previousCategory = currentCategory;
      currentCategory = category;
    }
    if (category === "All") setCurrentFoodItemsList(foodItemsList);
    else {
      setCurrentFoodItemsList(
        foodItemsList.filter((item) => item.category == category)
      );
    }
  };
  return (
    <div className="booking-confired-main-container">
      <div className="fandb-body-right">
        <div className="fandb-body-right-title">
          <p>ORDER SUMMARY</p>
          <p>
            <b>{localStorage.getItem("movieName")}</b>
          </p>
        </div>

        <div className="fandb-ticket-details">
          <div className="fandb-ticket-price">
            <p>
              {ticketBookingSummary.seatType.toUpperCase()}
              {" - "}
              {ticketBookingSummary.seats.toString()}
              <small>{` (${ticketBookingSummary.totalTickets} Tickets)`}</small>
            </p>
            <p className="fandb-amount-display">
              Rs.{totalTicketPrice.toFixed(2)}
            </p>
            <p className="fandb-theatrename-display">
              {ticketBookingSummary.theatre}
            </p>
          </div>
          <div className="fandb-convenience-fee">
            <p className="fandb-convenience-fee-text">
              {/* <i className="fandb-fa fa-caret-down convenience-fee-icon" aria-hidden="true"></i> */}
              {" Convenience fees"}
            </p>
            <p className="fandb-amount-display">
              Rs.{totalConvenienceFee.toFixed(2)}
            </p>
            <p
              className="fandb-sub-convenience-fee fandb-conv-fee-text "
              style={{ marginTop: "-1rem", marginLeft: "2rem" }}
            >
              {"Base Amount"}
            </p>
            <p
              className="fandb-sub-convenience-fee fandb-amount-display"
              style={{ marginTop: "-1rem" }}
            >{`Rs. ${baseAmount.toFixed(2)} `}</p>
            <p
              className="fandb-sub-convenience-fee fandb-conv-fee-text "
              style={{ marginTop: "-1rem", marginLeft: "2rem" }}
            >{`Integrated GST (IGST) @ ${IGSTPercentage * 100}% `}</p>
            <p
              className="fandb-sub-convenience-fee fandb-amount-display"
              style={{ marginTop: "-1rem" }}
            >{`Rs. ${IGSTFee.toFixed(2)} `}</p>
          </div>
        </div>
        <hr />
        <div className="fandb-subtotal">
          <span className="fandb-subtotal-title">{"Subtotal"}</span>
          <span className="fandb-subtotal-amount">
            Rs.{(totalTicketPrice + totalConvenienceFee).toFixed(2)}
          </span>
        </div>
        <div className="fandb-addons-title">
          <span>Food and Beverages</span>
          <span className="fandb-addons-title-price">
            Rs.{localStorage.getItem("amount-payable-food")}
          </span>
        </div>

        <div className="fandb-addons">
          <ul className="fandb-addons-ul">
            {Object.keys(addedFoodItems).map((id) => (
              <li key={id}>
                <button
                  className="button fandb-rm-btn"
                  value={id}
                  onClick={(e) => handleFoodItemRemoveEvent(e.target.value)}
                >
                  X
                </button>
                <span>
                  {foodItemsList.filter((item) => item.id == id)[0].name}
                </span>
                <button
                  className="button fandb-inc-btn"
                  value={id}
                  onClick={(e) => handleFoodItemAddEvent(e.target.value)}
                >
                  {"+"}
                </button>
                <button
                  className="button fandb-dec-btn"
                  value={id}
                  onClick={(e) => handleFoodItemDecrementEvent(e.target.value)}
                >
                  {"-"}
                </button>
                <span className="fandb-quantity">
                  {addedFoodItems[id]}
                  {"   "}
                </span>
                <span className="fandb-item-total-price">
                  Rs.
                  {(
                    foodItemsList.filter((item) => item.id == id)[0]
                      .offerPrice * addedFoodItems[id]
                  ).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="fandb-body-right-footer">
          <div className="fandb-pay-btn-div">
            <button>
              Amount payable Rs.
              {(
                Number(localStorage.getItem("amount-payable-food")) +
                totalConvenienceFee +
                totalTicketPrice
              ).toFixed(2)}
            </button>
          </div>
        </div>

        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            type="button"
            className="booking-more-tickets"
            style={{ marginTop: "0.5rem" }}
          >
            Book More Tickets!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default BookingConfirmed;
