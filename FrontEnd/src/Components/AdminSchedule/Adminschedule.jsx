import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
// import logo from '../../assets/logo.png';
// import logo1 from '../../assets/logo1.png';
// import logo2 from "../../assets/logo2.png";
import { useState, useEffect } from "react";
import baseurl from "../sch_environment/BaseUrl";
import axios from "axios";
import "../styles/schedule-style/AdminSchedule.css";
import scheduleUrl from "../environment/scheduleUrl";
import Header from "../shared/Header";
export default function Adminschedule({ addSchedule }) {
  const navigate = useNavigate(); //Function Defined For Navigation between Components
  // Creating Use State  of Object type For Posting Data into Database
  const [userRegistration, setUserRegistration] = useState({
    theatreName: "",
    movieName: "",
    scheduleCode: "",
    scheduleName: "",
    startDate: "",
    endDate: "",
    time: "",
  });
  const [theaterName, setTheaterName] = useState("");
  const [theaterNameError, setTheaterNameError] = useState("");
  const [MovieNameError, setMovieNameError] = useState("");
  const [schedulecodeError, setschedulecodeError] = useState("");
  const [scheduleNameError, setscheduleNameError] = useState("");
  const [scheduletimeError, setscheduletimeError] = useState("");
  const [scheduledateError, setscheduledateError] = useState("");
  const [scheduledateError1, setscheduledateError1] = useState("");
  const [movieData, setMovieData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [theatreData, setTheatreData] = useState([]);
  var today = new Date();
  useEffect(() => {
    axios
      .get("https://movies.learn.skillassure.com/movies")
      .then((response) => {
        console.log(response.data);
        setMovieData(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://theater.learn.skillassure.com/theater/theater/all")
      .then((response) => {
        console.log(response.data);
        setTheatreData(response.data);
      });
  }, []);

  const role1 = "ADMIN";

  //For Posting Data related to Add Schedule
  const send = (e) => {
    console.log(userRegistration);
    axios
      .post(
        `${scheduleUrl}/schedule/${userRegistration.theatreName}/${userRegistration.movieName}`,
        userRegistration
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  //For Setting Values using Hook
  const changeHandler = (e) => {
    setUserRegistration({
      ...userRegistration,
      [e.target.name]: e.target.value,
    });
  };

  function save(e) {
    window.location.reload(true);
  }
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0 so need to add 1 to make it 1!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  // document.getElementById("floatingInput6").setAttribute("min", today);
  // document.getElementById("floatingInput7").setAttribute("min", today);

  //Navigation From Adding Schedule to View All Schedules of Concerned Theatre
  function open() {
    navigate("/adminview", { state: { theaterName: { theaterName } } });
  }
  function closepop() {
    setModalOpen(false);
  }

  /********************************** */

  //Validations For Input Form Values
  function validate(e) {
    //    navigate("/");
    //    send(e);
    e.preventDefault();
    const trail1 = document.getElementById("floatingInput1");
    const trail2 = document.getElementById("floatingInput2");
    const trail3 = document.getElementById("floatingInput3");
    const trail4 = document.getElementById("floatingInput4");
    console.log(trail4.value);
    const trail5 = document.getElementById("floatingInput5");
    const trail6 = document.getElementById("floatingInput6");
    console.log(trail6.value);
    const trail7 = document.getElementById("floatingInput7");
    const theatreNamePattern = /[ a-z A-Z]+$/;
    const schedulecodePattern = /[a-z A-Z 0-9]/;
    const schedulename = /[A-Z a-z]{7,32}/;
    const scheduletime = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    const scheduledate =
      /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}/;

    // console.log(trail1.value);

    if (trail1.value === " " || !trail1.value.match(theatreNamePattern)) {
      //console.log("Error")

      setTheaterNameError("Required lower case & Upper Characters");
      trail1.value = "";
      trail1.focus();
    } else if (
      trail2.value === "" ||
      !trail2.value.match(schedulecodePattern)
    ) {
      // let k=document.getElementById("error2").innerHTML="Invalid Format"

      setMovieNameError("Invalid Format");
      trail2.value = "";
      trail2.focus();
    } else if (trail3.value == "" || !trail3.value.match(schedulecodePattern)) {
      // let k=document.getElementById("error3").innerHTML="Invalid Format"
      setschedulecodeError("Invalid Format[should be like SC001]");
      trail3.value = "";
      trail3.focus();
    } else if (trail4.value == " " || !trail4.value.match(schedulename)) {
      // let k=document.getElementById("error4").innerHTML="Invalid Format"
      setscheduleNameError("Invalid Format");
      trail4.value = "";
      trail4.focus();
    } else if (trail5.value == "" || !trail5.value.match(scheduletime)) {
      // let k=document.getElementById("error5").innerHTML="Invalid Format"
      setscheduletimeError("Enter valid Time format ");
      trail5.value = "";
      trail5.focus();
    } else if (trail5.value == "" || !trail5.value.match(scheduletime)) {
      // let k=document.getElementById("error5").innerHTML="Invalid Format"
      setscheduletimeError("Enter valid Time format ");
      trail5.value = "";
      trail5.focus();
    } else {
      setModalOpen(true);
      send(e);

      trail1.value = "";

      trail2.value = "";

      trail3.value = "";

      trail4.value = "";

      trail5.value = "";

      trail6.value = "";

      trail7.value = "";
    }
  }

  /************************** */

  return (
    //Header For Entire page
    <>
      <>
        <Header pass={role1}></Header>
        <br></br> <br></br> <br></br> <br></br>
        {/* <div className="header-finalmain">
            <div className="header-main">
                <div className="header-logo">
                    <img src={logo} alt="Italian Trulli" />
                </div>

                <div className="header-logo2">
                    <img src={logo2} alt="Italian Trulli" />
                    <p>&nbsp;Movies</p>
                </div>
                <div className="header-logo1">
                    <img src={logo1} alt="Italian Trulli" />
                    <p>&nbsp;Theaters</p>
                </div>
                <div>
                    <a href="#" className="header-admin">
                        Admin
                    </a>
                </div>
            </div>
        </div> */}
        {/* View Schedule Button  For Admin */}
        {/* Posting by Send Event */}
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          id="adminbtn1"
        >
          View Schedule
        </button>
        <div className="adminblock" id="formdiv">
          <text id="txt">
            <b>Add Schedule</b>
          </text>

          <form className="formblock" id="adminview">
            <div id="mDiv1" style={{ display: "flex", gap: " 10rem" }}>
              {/* Input tag for Theatre Name */}
              <div class="form-floating mb-3 ">
                <input
                  type="text"
                  list="xyz1"
                  className="form-control"
                  name="theatreName"
                  id="floatingInput1"
                  placeholder="name@example.com"
                  onChange={(e) => changeHandler(e)}
                  onKeyUp={() => setTheaterNameError("")}
                />
                <label htmlFor="floatingInput" id="labelInput">
                  Enter Theater Name
                </label>
                <datalist id="xyz1">
                  {theatreData.map((item) => {
                    return <option value={item.name} />;
                  })}
                </datalist>
                <span className="input-errors">{theaterNameError}</span>
              </div>
              {/* Input tag for Movie Name */}
              <div class="form-floating mb-3 " id="mmD1">
                <input
                  type="text"
                  list="xyz"
                  className="form-control"
                  name="movieName"
                  id="floatingInput2"
                  placeholder="name@example.com"
                  onChange={(e) => changeHandler(e)}
                  onKeyUp={() => setMovieNameError("")}
                />
                <label
                  htmlFor="floatingInput"
                  id="labelInput"
                  style={{ marginLeft: "-6rem" }}
                >
                  Enter Movie Name
                </label>
                <datalist id="xyz">
                  {movieData.map((item) => {
                    // console.log(item.movieName);
                    return <option value={item.movieName} />;
                  })}
                </datalist>
                <span className="input-errors">{MovieNameError}</span>
              </div>
            </div>
            {/* Input tag for Schedule Code*/}
            <div id="mDiv2" style={{ display: "flex" }}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="scheduleCode"
                  id="floatingInput3"
                  placeholder="name@example.com"
                  onKeyUp={() => setschedulecodeError("")}
                  onChange={(e) => changeHandler(e)}
                />
                <label htmlFor="floatingInput" id="labelInput">
                  Enter Schedule Code
                </label>
                <span className="input-errors">{schedulecodeError}</span>
              </div>
              {/* Input tag for Schedule Name */}
              <div class="form-floating mb-3" id="mmD1">
                <input
                  type="text"
                  class="form-control"
                  name="scheduleName"
                  id="floatingInput4"
                  placeholder="name@example.com"
                  maxlength="15"
                  onKeyUp={() => setscheduleNameError("")}
                  onChange={(e) => changeHandler(e)}
                />
                <label
                  htmlFor="floatingInput"
                  id="labelInput"
                  style={{ marginLeft: "4rem" }}
                >
                  Enter Schedule Name
                </label>
                <span className="input-errors">{scheduleNameError}</span>
              </div>
            </div>

            {/* Input tag for Start Time */}
            <div id="mDiv2" style={{ display: "flex" }}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  name="time"
                  id="floatingInput5"
                  placeholder="name@example.com"
                  pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                  onKeyUp={() => setscheduletimeError("")}
                  onChange={(e) => changeHandler(e)}
                />
                <label htmlFor="floatingInput" id="labelInput">
                  Enter start Time
                </label>
                <span className="input-errors">{scheduletimeError}</span>
              </div>

              {/* Input tag for Start Date with reference to playing in theatre */}
              <div className="form-floating mb-3" id="mmD1">
                <input
                  type="date"
                  class="form-control"
                  name="startDate"
                  id="floatingInput6"
                  min=""
                  pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                  maxlength="12"
                  placeholder="name@example.com"
                  onKeyUp={() => setscheduledateError("")}
                  onChange={(e) => changeHandler(e)}
                />
                <label
                  htmlFor="floatingInput"
                  id="labelInput"
                  style={{ marginLeft: "4rem" }}
                >
                  Enter From Date
                </label>
                <span className="input-errors">{scheduledateError}</span>
              </div>
            </div>
            {/* Input tag for End Date with reference to playing in theatre */}
            <div id="mDiv2" style={{ display: "flex" }}>
              <div className="form-floating mb-3">
                <input
                  type="date"
                  class="form-control"
                  name="endDate"
                  id="floatingInput7"
                  min=""
                  pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                  maxlength="12"
                  placeholder="name@example.com"
                  onKeyUp={() => setscheduledateError1("")}
                  onChange={(e) => changeHandler(e)}
                />
                <label htmlFor="floatingInput" id="labelInput">
                  Enter To Date
                </label>
                <span className="input-errors">{scheduledateError1}</span>
              </div>
            </div>
            {/* Add Schedule Button ,Validate by validate() method */}
            <button
              type="button"
              className="btn btn-success"
              id="adminbtn"
              onClick={validate}
            >
              Add Schedule
            </button>
            {/* Schedule added successfully */}
            {modalOpen ? (
              <div
                class="alert alert-success alert-dismissible fade show"
                role="alert"
                onClick={closepop}
              >
                <strong>Schedule Added Successfully!</strong>{" "}
                <button
                  type="button"
                  class="btn-close"
                  
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ) : null}

            {/* Pop Up Window After Schedule is Added */}

            {/* <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {" "}
                      <i className="bi bi-check-circle" id="check"></i>{" "}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">Schedule Added Sucessfully</div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={open}
                    >
                      View
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => save(e)}
                    >
                      Add New Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div> */}

            {/* View Schedule Form Page */}

            <div
              className="modal fade"
              style={{ marginTop: "10rem" }}
              id="exampleModal1"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  {/* Input tag for theatre Name*/}
                  <div
                    class="form-floating mb-3"
                    style={{
                      marginLeft: "2rem",
                      marginTop: "1rem",
                    }}
                  >
                    <input
                      type="text"
                      list="xyz2"
                      class="form-control"
                      name="theatreName"
                      id="floatingInput"
                      placeholder="name@example.com"
                      pattern="[A-Za-z]{1,32}"
                      onChange={(e) => setTheaterName(e.target.value)}
                    />
                    <label htmlFor="floatingInput" id="labelInput">
                      Enter Theater Name
                    </label>
                    <datalist id="xyz2">
                      {theatreData.map((item) => {
                        return <option value={item.name} />;
                      })}
                    </datalist>
                  </div>
                  {/* Input tag for Movie Name*/}
                  {/* <div class="form-floating mb-3" id="mmD1">
                                    <input type="text" class="form-control" name="movieName" id="floatingInput" placeholder="name@example.com" pattern="[A-Za-z]{1,32}" maxlength="15" onChange={(e) => changeHandler(e)} />
                                    <label htmlFor="floatingInput" id='labelInput'>Enter Movie Name</label>
                                </div> */}
                  {/* Navigate to view Schedule Page In Admin Side using open() */}
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={open}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <br /> <br />
        {/* Footer Page Bottom
            <div className="footer-finalmain">
                <div className="footer-main">
                    <div className="footer-logo">
                        <img src={logo} alt="Italian Trulli" />
                    </div>
                    <div className="footer-all">
                        <div>
                            <a href="#" className="footer-contact">
                                Contact Us
                            </a>
                        </div>
                        <div>
                            <a href="#" className="footer-support">
                                Support
                            </a>
                        </div>
                        <div>
                            <a href="#" className="footer-privacy">
                                Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
                <div className="footer-copy">
                    <p>CopyRight: All Rights Reserved by GalaxE Solutions</p>
                </div>
            </div> */}
      </>
    </>
  );
}
