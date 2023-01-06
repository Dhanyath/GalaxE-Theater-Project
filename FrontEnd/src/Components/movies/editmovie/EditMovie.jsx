import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/movie-style/EditMovie.css";
import { Multiselect } from "multiselect-react-dropdown";
import movieDeployedUrl from "../../environment/movieUrl";

function EditMovie({ setModalOpen }) {
  const [id, setId] = useState(null);
  const [movieCode, setMovieCode] = useState("");
  const [rating, setRating] = useState("");
  const [movieName, setMovieName] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [releaseDate, setReleaseDate] = useState("2012-12-12");
  const [duration, setDuration] = useState("");
  const [movieStatus, setMovieStatus] = useState("");
  const [cast, setCast] = useState([]);
  const [language, setLanguage] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [firstName1, setFirstName] = useState("Akshay");
  const [castOfList, setCastOfList] = useState([]);
  const [Options, setOptions] = useState([]);
  const castData = [];

  //To get the multiselect Options for the Cast feild
  useEffect(() => {
    const getActorsData = async () => {
      const reqActor = await fetch(
        "https://633531b1849edb52d6fcfde6.mockapi.io/ActorsData"
      );
      const resActor = await reqActor.json();
      setOptions(resActor);
    };
    getActorsData();
  }, []);

  // Getting data from the localStorage
  useEffect(() => {
    setId(localStorage.getItem("id"));
    setMovieCode(localStorage.getItem("movieCode"));
    setRating(localStorage.getItem("rating"));
    setMovieName(localStorage.getItem("movieName"));
    setMovieGenre(localStorage.getItem("movieGenre"));
    setReleaseDate(localStorage.getItem("releaseDate"));
    setDuration(localStorage.getItem("duration"));
    setMovieStatus(localStorage.getItem("movieStatus"));
    setCast(localStorage.getItem("cast"));
    setLanguage(localStorage.getItem("language"));
    setMovieUrl(localStorage.getItem("movieUrl"));
  }, []);

  // Updating details to the api
  const updateAPIData = () => {
    axios.put(`${movieDeployedUrl}/updatemovie`, {
      movieCode,
      movieUrl,
      movieName,
      movieGenre,
      releaseDate,
      duration,
      rating,
      movieStatus,
      language,
      cast: firstName1,
    });
  };
  return (
    <div>
      <div className="editMovie-main">
        <form>
          <div className="editMovie-form">
            <div className="editMovie-innerDiv">
              <div className="editMovie-movieName">
                <div className="editMovie-label-group-name">
                  <p>Movie name*</p>
                </div>
                <div className="editMovie-field-name">
                  <input
                    id="editMovie-inputField-group-name"
                    type={"text"}
                    name="movieName"
                    value={movieName}
                    placeholder={"Movie name"}
                    onChange={(e) => setMovieName(e.target.value)}
                  ></input>
                </div>
              </div>
              {/*----------------------- Certification ---------------------*/}

              <div className="editMovie-field-code-status">
                <div className="editMovie-field-sub1">
                  <div className="editMovie-label-group-code">
                    <p>Movie Code*</p>
                  </div>
                  <div>
                    <select
                      id="editMovie-inputField-group-code"
                      defaultValue=""
                      value={movieCode}
                      placeholder={"Movie code"}
                      onChange={(e) => setMovieCode(e.target.value)}
                    >
                      {/* <option disabled={true} value="">
                        Select movie code
                      </option> */}
                      <option value="R">R</option>
                      <option value="A">A</option>
                      <option value="UA">UA</option>
                    </select>
                  </div>
                </div>

                {/* ---------------------- Status ------------------------ */}

                <div className="editMovie-field-sub2">
                  <div className="editMovie-label-group-status">
                    <p>Movie Status*</p>
                  </div>
                  <div>
                    <select
                      id="editMovie-inputField-group-status"
                      defaultValue=""
                      value={movieStatus}
                      placeholder={"Movie status"}
                      onChange={(e) => setMovieStatus(e.target.value)}
                    >
                      <option disabled={true} value="">
                        Select Status
                      </option>
                      <option value="RUNNING">Running</option>
                      <option value="UPCOMING">Upcoming</option>
                      <option value="CLOSED">Closed</option>
                      <option value="DELETE">Delete</option>
                    </select>
                  </div>
                </div>
              </div>

              {/*---------------------- Language --------------------------*/}

              <div className="editMovie-field-language-genre">
                <div className="editMovie-field-sub1">
                  <div className="editMovie-label-group-language">
                    <p>Language*</p>
                  </div>
                  {/* id="editMovie-inputField-group1" */}
                  <div>
                    <select
                      id="editMovie-inputField-group-language"
                      value={language}
                      placeholder={"Language"}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option disabled={true} value="">
                        Select Language
                      </option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Kannada">Kannada</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Tamil">Tamil</option>
                      <option value="Malyalam">Malyalam</option>
                    </select>
                  </div>
                </div>

                {/* ---------------------- Genre ------------------------ */}

                <div className="editMovie-field-sub2">
                  <div className="editMovie-label-group-genre">
                    <p>Genre*</p>
                  </div>
                  <div>
                    <select
                      id="editMovie-inputField-group-genre"
                      value={movieGenre}
                      placeholder={"Genre"}
                      onChange={(e) => setMovieGenre(e.target.value)}
                    >
                      <option disabled={true} value="">
                        Select Genre
                      </option>
                      <option value="Drama">Drama</option>
                      <option value="Horror">Horror</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Action">Action</option>
                    </select>
                  </div>
                </div>
              </div>

              {/*------------------- Realese Date ----------------------------*/}

              <div className="editMovie-field-date-duration">
                <div className="editMovie-field-sub1">
                  <div className="editMovie-label-group-date">
                    <p>Realese Date*</p>
                  </div>
                  <div>
                    <input
                      id="editMovie-inputField-group-date"
                      type={"text"}
                      min="1900-01-01"
                      max="2022-11-25"
                      name="releaseDate"
                      value={releaseDate}
                      onChange={(e) => setReleaseDate(e.target.value)}
                      placeholder="yyyy-mm-dd"
                    ></input>
                  </div>
                </div>

                {/* ---------------------- Genre ------------------------ */}

                <div className="editMovie-field-sub2">
                  <div className="editMovie-label-group-duration">
                    <p>Duration*</p>
                  </div>
                  <div>
                    <input
                      id="editMovie-inputField-group-duration"
                      type={"text"}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      name="duration"
                      placeholder="Duration"
                    ></input>
                  </div>
                </div>
              </div>

              {/* ----------------------- Image link -------------------------*/}

              <div className="editMovie-field-image-ratings">
                <div className="editMovie-field-sub1">
                  <div className="editMovie-label-group-image">
                    <p>Image Link*</p>
                  </div>
                  <div className="editMovie-field">
                    <input
                      type={"text"}
                      name="movieUrl"
                      value={movieUrl}
                      placeholder={"Image link"}
                      onChange={(e) => setMovieUrl(e.target.value)}
                      id="editMovie-inputField-group-image"
                    ></input>
                  </div>
                </div>

                {/* ---------------------- Ratings ------------------------ */}

                <div className="editMovie-field-sub2">
                  <div className="editMovie-label-group-ratings">
                    <p>Ratings*</p>
                  </div>
                  <div className="editMovie-field">
                    <input
                      type={"text"}
                      name="rating"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      id="editMovie-inputField-group-ratings"
                    ></input>
                  </div>
                </div>
              </div>

              {/* ---------------------- Cast ------------------------ */}

              <div>
                <div className="editMovie-label-group-cast">
                  <p>Cast*</p>
                </div>
                <div className="editMovie-field-cast">
                  <Multiselect
                    id="editMovie-multiSelect"
                    options={Options}
                    displayValue={"firstName"}
                    value={firstName1}
                    // onRemove={(e)=>{
                    //   console.log(e);
                    // }}
                    onSelect={(e) => {
                      console.log("CastList", e);
                      setFirstName(e);
                    }}
                  />
                </div>
              </div>
              <br />

              {/* -------------------------- Description --------------------- */}
              {/* <div>
              <div className="editMovie-label-group-description">
                <p>Movie description*</p>
              </div>
              <div className="editMovie-field-description">
                <textarea
                  id="editMovie-inputField-group-description"
                  type={"text"}
                  name="description"
                  placeholder={"Movie description..."}
                  // value={description}
                  // onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <br/> */}

              {/* ---------------------- Save button ------------------------ */}
              <div className="editMovie-buttons-save-cancel">
                <div className="editMovie-button-save">
                  <button
                    id="editMovie-save"
                    onClick={() => {
                      updateAPIData();
                      window.setTimeout(function () {
                        window.location.reload();
                      }, 2000);
                    }}
                  >
                    Save Movie
                  </button>
                </div>
                {/* ---------------------- Cancel button ------------------------ */}
                <div className="editMovie-button-save">
                  <button
                    id="editMovie-cancel"
                    onClick={() => {
                      setModalOpen(true);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
