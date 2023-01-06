import axios from "axios";
import { useState, useEffect } from "react";
import Header from "../shared/Header";
import HeaderUser from "../shared/HeaderUser";
import "../styles/foodAndBeverages-style/user-body.css";
import bookingUrl from "../environment/bookingUrl";
import foodandbeweragesUrl from "../environment/foodandbeweragesUrl";
import { Link, useLocation, useNavigate } from "react-router-dom";

let imageUrl =
  "https://assets-in.bmscdn.com/promotions/cms/creatives/1652696821976_728x100.png";
let categories = ["All", "Popcorn", "Snacks", "Drinks", "Combos"];

// let demoImageUrl = "https://th.bing.com/th/id/R.8cb86f6efd4f3b632b77daa06c369205?rik=3X%2bZfn99yejiRw&riu=http%3a%2f%2fprintmeposter.com%2fblog%2fwp-content%2fuploads%2f2016%2f09%2fA-Creative-Food-Poster-for-Kitchen.jpg&ehk=V0OONQwhJ%2fWinRE6Cbk0YONWkMc32EPuUPSrJRJxYfQ%3d&risl=&pid=ImgRaw&r=0";

/////////////////////////////////////////////// Billing configuration//////////

let convenienceFeesPercentage = 0.16;
let IGSTPercentage = 0.18;
let theaterName = localStorage.getItem("selectedTheatre");

let currentCategory = "All";
let previousCategory;

const UserBody = () => {
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
    localStorage.setItem("amount-payable-food", totalAddonsCost.toFixed(2));
  };

  useEffect(() => {
    const obj = document.getElementById(currentCategory);
    obj.style.backgroundColor = "#181E40";
    obj.style.color = "#ffff";
    const prevObj = document.getElementById(previousCategory);
    if (prevObj) {
      prevObj.style.backgroundColor = "rgb(234, 234, 234)";
      prevObj.style.color = "#181E40";
    }
  }, [currentCategory]);

  useEffect(() => {
    let tempTotal = 0;
    for (const key in addedFoodItems) {
      tempTotal +=
        currentFoodIemsList.find((item) => item.id == key).offerPrice *
        addedFoodItems[key];
    }
    setTotalAddonsCost(tempTotal);
  }, [addedFoodItems]);

  const handleFoodItemAddEvent = (id) => {
    const temp = { ...addedFoodItems };
    const availableQuantity= foodItemsList.filter((item) => item.id == id)[0].quantityAvailable;
    if (id in temp && temp[id]+1<=availableQuantity) {
      temp[id]++;
      setAddedFoodItems(temp);
    } else if(!(id in temp)&& temp[id]+1<=availableQuantity){
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

  const handleSortEvent = (property) => {
    console.log(property);
    switch (property) {
      case "name:a-z": {
        let temp = foodItemsList;
        temp.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa < fb) return -1;
          if (fa > fb) return 1;
          return 0;
        });
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
      case "name:z-a": {
        let temp = foodItemsList;

        temp.sort((a, b) => {
          let fa = a.name.toLowerCase(),
            fb = b.name.toLowerCase();
          if (fa > fb) return -1;
          if (fa < fb) return 1;
          return 0;
        });
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
      case "price:low to high": {
        let temp = foodItemsList;
        temp.sort((a, b) => a.offerPrice - b.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
      case "price:high to low": {
        let temp = foodItemsList;
        temp.sort((a, b) => b.offerPrice - a.offerPrice);
        setCurrentFoodItemsList(temp);
        handleCategorySelectedEvent(currentCategory);
        setRenderer(!renderer);
        break;
      }
    }
  };

  return (
    <div>
      <div className="main-Container-head">
        <HeaderUser pass={"user"} />
      </div>
      <div style={{ height: "4.5rem" }}></div>
      <div className="fandb-bodymain">
        {/* ------------------------------Body left start here-------------------- */}
        <div className="fandb-body-left">
          {/* ----------------------------Ad-Image display-------------------------- */}
          <div className="fandb-adcard-display">
            <a href="#" title="click to get offer">
              <img
                className="fandb-ad-image"
                style={{ borderRadius: "0px" }}
                src={imageUrl}
                alt="ad-image"
              />
            </a>
          </div>
          {/* ----------------------------End od Ad-Image display-------------------------- */}
          {/* ----------------------------Title Bar grab a bite-------------------------- */}

          {/* ----------------------------Category list start-------------------------- */}
          <div className="fandb-food-category">
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <button
                    onClick={(e) => handleCategorySelectedEvent(e.target.id)}
                    key={category}
                    id={category}
                    title={`click here to display ${category} items`}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <label
                htmlFor="select-sorting"
                style={{ fontWeight: "600", marginLeft: "240px" }}
              >
                Sort By:{" "}
              </label>
              <li className="fandb-sorting">
                <select
                  name="sorting"
                  id="select-sorting"
                  onChange={(e) => handleSortEvent(e.target.value)}
                >
                  <option value="default" hidden={true} defaultValue={true}>
                    Default
                  </option>
                  <option value="name:a-z">Name: A-Z</option>
                  <option value="name:z-a">Name: Z-A</option>
                  <option value="price:low to high">PRICE: LOW TO HIGH</option>
                  <option value="price:high to low">PRICE: HIGH TO LOW</option>
                </select>
              </li>
            </ul>
          </div>
          {/* ----------------------------End of Category list start-------------------------- */}
          {/* ----------------------------Food items dynamic display starts here-------------------------- */}
          <div className="fandb-food-item-display">
            <div className="fandb-food-items">
              {currentFoodIemsList.length <= 0 ? (
                <div style={{ textAlign: "center", color: "red" }}>
                  <h6>Currently Unavailable! Please try again later.</h6>
                </div>
              ) : (
                currentFoodIemsList.map((item) => (
                  <div className="fandb-container" key={item.id}>
                    <div className="fandb-itemImage">
                      <img src={item.itemImageUrl} alt="Image of food item" />
                      <hr />
                    </div>
                    <div className="fandb-details">
                      <div className="fandb-title-description">
                        <p className="fandb-food-item-title">{item.name}</p>
                        <p className="fandb-food-item-description">
                          {item.description}
                        </p>
                      </div>
                      <div className="fandb-food-item-button-container ">
                        <div className="fandb-actualprice price">
                          <del style={{ color: "red" }}>
                            {item.actualPrice}/-
                          </del>
                        </div>
                        <div className="fandb-offerprice price">
                          <b>{item.offerPrice}/-</b>
                        </div>
                        <div className="fandb-button-container">
                          <button
                            className="btn btn-primary btn-sm  item-btn add"
                            value={item.id}
                            onClick={(e) =>
                              handleFoodItemAddEvent(e.target.value)
                            }
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="fandb-discountline">
                      <small>
                        save upto{" "}
                        {parseInt(
                          ((parseFloat(item.actualPrice) -
                            parseFloat(item.offerPrice)) /
                            parseFloat(item.actualPrice)) *
                            100
                        )}
                        %
                      </small>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* ----------------------------End of Food items dynamic display-------------------------- */}
        </div>

        {/* ------------------------------Body rightside part start-------------------- */}
        <div className="fandb-body-right">
          <div className="fandb-body-right-title">
            <p>ORDER SUMMAARY</p>
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
              Rs.{totalAddonsCost}
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
                    onClick={(e) =>
                      handleFoodItemDecrementEvent(e.target.value)
                    }
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
                  totalAddonsCost +
                  totalConvenienceFee +
                  totalTicketPrice
                ).toFixed(2)}
              </button>
            </div>
          </div>
          <center style={{ marginTop: "0.5rem" }}>
            <button
              type="button"
              className="booking-done"
              onClick={postBooking}
            >
              Book Ticket
            </button>
          </center>
        </div>
        {/* ------------------------------End of Body rightside part start-------------------- */}
      </div>
    </div>
  );
};

export default UserBody;
