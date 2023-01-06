import { Button } from "bootstrap";
import React from "react";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import baseurl from "../sch_environment/BaseUrl";
import { useEffect } from "react";
import "../styles/schedule-style/AdminView.css";
import scheduleUrl from "../environment/scheduleUrl";
import Header from "../shared/Header";

export default function AdminView() {
  const [loading, setLoading] = useState(false);
  const [scheId, setScheId] = useState(0);
  const [delId, setDelId] = useState(0);
  const [input, setInput] = useState([]);
  let edit;
  const [tempArr, setTempArr] = useState({});
  const location = useLocation();
  var theaterName = location.state.theaterName;
  console.log(theaterName);
   const role1 = "ADMIN";
  // async function edit(e)
  // {
  //    const response= await axios.get(`http://localhost:8083/schedule/get/${e.target.value}`).then((response)=>{console.log(response.data);setDot(response.data)}).catch((e)=>console.log(e));

  // }

  // Deletion From Database All Schedules Available
  async function deleteAll(e) {
    await axios
      .delete(`${baseurl}/schedule/delete/${theaterName.theaterName}`)
      .catch((e) => console.log(e), console.log(e));
    deleteschedules(e.target.value);
  }
  // Removing From UI After Clearing From Database All Schedules
  const newArray = [];
  async function deleteschedules(e) {
    newArray.push(input);
    newArray.splice(0, 2);
    setInput(newArray);
  }

  // Removing Data from Database  Only Particular Schedule
  async function del(e) {
    // Delete From Database for particular Schedule in reference to ScheduleId
    await axios
      .delete(`${scheduleUrl}/schedule/${delId}`)
      .catch((e) => console.log(e));

    setLoading((prev) => !prev);
    await axios
      .get(`${scheduleUrl}/schedule/theatreSchedule/${theaterName.theaterName}`)
      .then((response) => {
        console.log(response.data);
        setInput(response.data);
      })
      .catch((e) => console.log(e));
  }

  // Receiving Data From API By Using Hook Call Use Effect
  useEffect(() => {
    axios
      .get(`${scheduleUrl}/schedule/theatreSchedule/${theaterName.theaterName}`)
      .then((response) => {
        console.log(response.data);
        setInput(response.data);
      })
      .catch((e) => console.log(e));
  }, [loading]);

  const [theaterNameError, setTheaterNameError] = useState("");
  const [MovieNameError, setMovieNameError] = useState("");
  const [schedulecodeError, setschedulecodeError] = useState("");
  const [scheduleNameError, setscheduleNameError] = useState("");
  const [scheduletimeError, setscheduletimeError] = useState("");
  const [scheduledateError, setscheduledateError] = useState("");
  const [scheduledateError1, setscheduledateError1] = useState("");

  //   Setting the Values To Object tempArr Variable
  const changeHandler = (e) => {
    setTempArr({ ...tempArr, [e.target.name]: e.target.value });
  };

  //  const useToggle = (initialState) => {
  //     const [toggleValue, setToggleValue] = useState(initialState);

  //     const toggler = () => { setToggleValue(!toggleValue) };
  //     return [toggleValue, toggler]
  //   };
  //   const [toggle, setToggle] = useToggle()

  // Updating Values Of Particular Schedule Based On ScheduleId
  async function updateSchedule() {
    console.log(tempArr);
    await axios
      .put(`${scheduleUrl}/schedule/update`, tempArr)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setLoading((prev) => !prev);
  }

  // Validation Of Add Schedule Form
  function validate(e) {
    e.preventDefault();
    const trail1 = document.getElementById("floatingInputs1");
    const trail2 = document.getElementById("floatingInputs2");
    const trail3 = document.getElementById("floatingInputs3");
    const trail4 = document.getElementById("floatingInputs4");
    const trail5 = document.getElementById("floatingInputs5");
    const trail6 = document.getElementById("floatingInputs6");
    const trail7 = document.getElementById("floatingInputs7");
    const schedulecode = /[a-zA-Z0-9]/;
    const schedulename = /[a-zA-Z0-9]/;
    const scheduletime = /((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/;
    const scheduledate =
      /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}/;

    // console.log(trail1.value);

    if (trail2.value === "" || trail2.value.length < 5) {
      // let k=document.getElementById("error2").innerHTML="Invalid Format"

      setMovieNameError("Invalid Format");
      trail2.value = "";
      trail2.focus();
    } else if (trail3.value == "" || !trail3.value.match(schedulecode)) {
      // let k=document.getElementById("error3").innerHTML="Invalid Format"
      setschedulecodeError("Invalid Format[should be like SC001]");
      trail3.value = "";
      trail3.focus();
    } else if (
      trail4.value == "" ||
      !trail4.value.match(schedulename) ||
      trail4.value.length < 8
    ) {
      // let k=document.getElementById("error4").innerHTML="Invalid Format"
      setscheduleNameError("Invalid Format");
      trail4.value = "";
      trail4.focus();
    } else if (trail5.value == "" || !trail5.value.match(scheduletime)) {
      // let k=document.getElementById("error5").innerHTML="Invalid Format"
      setscheduletimeError("Enter valid date format[yyyy-mm-dd]");
      trail5.value = "";
      trail5.focus();
    } else if (trail6.value == "" || !trail6.value.match(scheduledate)) {
      // let k=document.getElementById("error6").innerHTML="Invalid Format"
      setscheduledateError("Enter valid date format[yyyy-mm-dd]");
      trail6.value = "";
      trail6.focus();
    } else if (trail7.value == "" || !trail7.value.match(scheduledate)) {
      // let k=document.getElementById("error6").innerHTML="Invalid Format"
      setscheduledateError("Error");
      trail6.value = "";
      trail6.focus();
    } else {
      updateSchedule();
      navigate("/");
    }
  }

  //    Edited Values Are Stored in Temp Object
  const setUpdatedValue = (e) => {
    edit = input.filter((_, i) => input[i].scheduleId == e.target.value);
    setTempArr(edit[0]);
    // console.log(edit[0]);
  };

  // let newInput;
  // const remove=(e)=>
  // {

  // console.log(e.target.value)
  //     newInput=input.filter((_, i) => input[i].scheduleId !== e)
  //    console.log(newInput);
  //     setInput(newInput);
  // }

  const navigate = useNavigate();
  // Navigate To Update Page using Onclick Event
  function open() {
    navigate("/update");
  }
  // Navigate to Adminschedule Page On Event
  function addButton() {
    navigate("/");
  }
  return (
    <>
      <Header pass={role1}></Header>
      <br></br> <br></br> <br></br> <br></br>
      <div id="div1" className="Container">
        <h1 id="theatreName">{location.state.theaterName.theaterName}</h1>
        <div id="viewAdminButton">
          <button type="button" className="btn btn-success" id="bookingButton">
            Booking Button
          </button>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-toggle="modal"
            data-bs-target="#myModalDelete"
            id="deleteAllButton"
          >
            DeleteAllSchedules
          </button>
          <button
            type="button"
            className="btn btn-success"
            id="addButton"
            onClick={addButton}
          >
            Add Schedule
          </button>
        </div>
        {/* Table For Representing Schedules Of Concerned Theatre */}

        <table className="table " id="AdminViewTable">
          <thead id="thead">
            <tr>
              <th className="tab" scope="col">
                S.No
              </th>
              <th className="tab" scope="col">
                ScheduleCode
              </th>
              <th className="tab" scope="col">
                ScheduleName
              </th>
              <th className="tab" scope="col">
                MovieName
              </th>
              <th className="tab" scope="col">
                StartDate
              </th>
              <th className="tab" scope="col">
                EndDate
              </th>
              <th className="tab" scope="col">
                Start Time
              </th>
              <th className="tab" scope="col">
                Edit
              </th>
              <th className="tab" scope="col">
                Delete
              </th>
            </tr>
          </thead>
          {/* Displaying Data on Document based on Theatre Name from API */}
          <tbody>
            {input.length == 0 ? (
              <div>
                <br></br>
                <span
                  style={{ marginTop: "2rem", color: "red" }}
                  className="alert alert-danger"
                >
                  {" "}
                  No Schedule data{" "}
                </span>
              </div>
            ) : (
              input.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="tab" scope="row">
                      {index + 1}
                    </td>
                    <td className="tab">{item.scheduleCode}</td>
                    <td className="tab">{item.scheduleName}</td>
                    <td className="tab">{item.movieName}</td>
                    <td className="tab">{item.startDate}</td>
                    <td className="tab">{item.endDate}</td>
                    <td className="tab">{item.time}</td>
                    <td className="tab">
                      <button
                        type="button"
                        className="btn btn-success"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        id="editButton"
                        onClick={setUpdatedValue}
                        value={item.scheduleId}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        id="deleteButton"
                        value={item.scheduleId}
                        onClick={(e) => setDelId(item.scheduleId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Delete Pop up Particular Schedule */}

        <div className="container mt-3"></div>

        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure want to Delete ?</h5>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={del}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Delete All Schedules */}

        <div className="container mt-3"></div>

        <div className="modal" id="myModalDelete">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure want to Delete ?</h5>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                  onClick={deleteAll}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*  Edit Schedule Form */}
        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <form>
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
                <div className="modal-body">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      name="movieName"
                      id="floatingInputs1"
                      defaultValue={tempArr.movieName}
                      placeholder="name@example.com"
                      readOnly
                      pattern="[A-Za-z]{1,32}"
                      maxlength="15"
                      required
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="floatingInput" id="labelInputs">
                      movie
                    </label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      name="scheduleName"
                      id="floatingInputs2"
                      defaultValue={tempArr.scheduleName}
                      placeholder="name@example.com"
                      pattern="[A-Za-z]{1,32}"
                      maxlength="15"
                      required
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="floatingInput" id="labelInputs">
                      schedule
                    </label>
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      name="time"
                      id="floatingInputs3"
                      placeholder="name@example.com"
                      defaultValue={tempArr.time}
                      pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                      required
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="floatingInput" id="labelInputs">
                      Enter start Time
                    </label>
                  </div>

                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      name="startDate"
                      id="floatingInputs4"
                      defaultValue={tempArr.startDate}
                      pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                      maxlength="12"
                      required
                      placeholder="name@example.com"
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="floatingInput" id="labelInputs">
                      Enter From Date
                    </label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      name="endDate"
                      id="floatingInputs5"
                      defaultValue={tempArr.endDate}
                      pattern="(/^[a-zA-Z0-12!@#$%^&*()]+$/)"
                      maxlength="12"
                      required
                      placeholder="name@example.com"
                      onChange={(e) => changeHandler(e)}
                    />
                    <label htmlFor="floatingInput" id="labelInputs">
                      Enter To Date
                    </label>
                    <span className="input-errors">{scheduledateError}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={updateSchedule}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
