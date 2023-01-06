import React from "react";
import OrderSummary from "./OrderSummary";
import "../styles/booking-style/ViewTicket.css";
// Order Summary Component Called
function ViewTicket() {
  return (
    <div className="view_ticket_main_container">
      <div className="view_ticket_main">
        <OrderSummary />
      </div>
    </div>
  );
}

export default ViewTicket;
