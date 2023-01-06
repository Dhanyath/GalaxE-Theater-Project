import { useState, useEffect } from "react";
import "../../styles/movie-style/AddMovie.css";
import axios from "axios";
import { isRouteErrorResponse, Link } from "react-router-dom";
// import "./AddMovie.css";
import { Multiselect } from "multiselect-react-dropdown";
import movieDeployedUrl from "../../environment/movieUrl";

function AddMovie({ setModalOpen }) {
  // const [id, setId] = useState("");
  const [movieCode, setMovieCode] = useState("");
  const [movieGenre, setMovieGenre] = useState("");
  const [movieName, setMovieName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [rating, setRating] = useState("");
  const [movieStatus, setMovieStatus] = useState("");
  const [cast, setCast] = useState("");
  const [language, setLanguage] = useState("");
  const [movieUrl, setMovieUrl] = useState("");
  const [firstName1, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("kumar");
  // const castList = [];
  const castData = [
    // { name: "Shreyas", castId: 5 },
    // { name: "Ranveer Singh", castId: 2 },
    // { name: "Ajay Devagan", castId: 3 },
    // { name: "Katrina Kaif", castId: 4 },
  ];
  const [Options, setOptions] = useState(castData);

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

  const postData = () => {
    console.log(
      movieCode,
      movieName,
      movieGenre,
      releaseDate,
      rating,
      duration,
      movieStatus,
      firstName1,
      language,
      movieUrl
    );
    // axios.post(`http://192.168.137.5:9090/movies/addmovie`, {
    axios.post(`${movieDeployedUrl}/addmovie`, {
      movieCode,
      movieUrl,
      movieName,
      movieGenre,
      releaseDate,
      duration,
      movieStatus,
      rating,
      language,
      cast: firstName1,
    });
  };
  const fieldValidation = (e) => {
    e.preventDefault();
    if (
      movieName.length === "" ||
      movieCode.length === "" ||
      movieGenre.length === "" ||
      movieStatus.length === "" ||
      movieUrl.length === "" ||
      rating.length === "" ||
      cast.length === "" ||
      language.length === "" ||
      duration.length === "" ||
      releaseDate === ""
    ) {
      alert("All fields must be filled!");
      e.preventDefault();
    } else {
      alert("Movie Added Sucessfully!");
    }
  };

  const [txt, setTxt] = useState("");
  const setMovieName1 = (e) => {
    const { value } = e.target;
    const re = /^[A-Za-z && 1-9]+$/;
    if (value === "" || re.test(value)) {
      setTxt(value);
    }
  };

  return (
    <div>
      <div className="AddMovie-Main">
        <form>
          <div className="Addmovie-App">
            <div className="Addmovie-addmovie">
              <div className="Addmovie-Moviename">
                <div className="Addmovie-name">
                  <p>Movie Name*</p>
                </div>
                <div>
                  <input
                    className="Addmovie-inputmovie"
                    placeholder="Enter the Movie Name"
                    type="text"
                    //  pattern="[a-z]{4,8}"
                    //  name={this.setMovieName1()}
                    onChange={(e) => {
                      setMovieName(e.target.value);
                      // setMovieName1(e);
                    }}
                  />
                </div>
              </div>

              {/* //////////////////////////////////////////////////MOVIE CODE////////////////////////////////////////////////// */}

              <div id="Addmovie-two">
                <div className="Addmovie-Language">
                  <p id="Addmovie-Language">Code*</p>
                  <select
                    id="Addmovie-myLanguage"
                    onChange={(e) => setMovieCode(e.target.value)}
                  >
                    <option value="R">R</option>
                    <option value="A">A</option>
                    <option value="UA">UA</option>
                  </select>
                </div>

                {/* //////////////////////////////////////////////////STATUS////////////////////////////////////////////////// */}

                <div className="Addmovie-Ratings">
                  <p id="Addmovie-Ratings">Status*</p>
                  <select
                    id="Addmovie-myRatings"
                    onChange={(e) => setMovieStatus(e.target.value)}
                  >
                    <option value="RUNNING">Running</option>
                    <option value="UPCOMING">Upcoming</option>
                    <option value="CLOSED">Closed</option>
                    <option value="DELETE">Delete</option>
                  </select>
                </div>
              </div>

              {/* //////////////////////////////////////////////////LANGUAGE////////////////////////////////////////////////// */}

              <div id="Addmovie-two">
                <div className="Addmovie-Language">
                  <p id="Addmovie-Language">Language*</p>
                  <select
                    id="Addmovie-myLanguage"
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="">Select Language</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Malyalam">Malyalam</option>
                  </select>
                </div>

                {/* //////////////////////////////////////////////////GENRE////////////////////////////////////////////////// */}

                <div className="Addmovie-Ratings">
                  <p id="Addmovie-Ratings">Genre*</p>
                  <select
                    id="Addmovie-myRatings"
                    defaultValue=""
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

              {/* ///////////////////////////////////////////////// RELEASE DATE ////////////////////////////////////////////////// */}

              <div id="Addmovie-two">
                <div className="Addmovie-Language">
                  <p id="Addmovie-Language">Release-Date*</p>
                  <input
                    type="date"
                    id="Addmovie-myLanguage"
                    onChange={(e) => setReleaseDate(e.target.value)}
                  ></input>
                </div>

                {/* ///////////////////////////////////////////////// DURATION ////////////////////////////////////////////////// */}

                <div className="Addmovie-Ratings">
                  <p id="Addmovie-Ratings">Duration(mins)*</p>
                  <input
                    id="Addmovie-myRatings"
                    // onInput={(e) => {
                    //     if (
                    //         e.target.value.length >
                    //         e.target.maxLength
                    //     )
                    //         e.target.value =
                    //             e.target.value.slice(
                    //                 0,
                    //                 e.target.maxLength
                    //             );
                    // }}
                    type="number"
                    maxlength={3}
                    onChange={(e) => setDuration(e.target.value)}
                  ></input>
                </div>
              </div>

              {/* //////////////////////////////////////////////////IMAGE LINK////////////////////////////////////////////////// */}

              <div id="Addmovie-two">
                <div className="Addmovie-Moviename">
                  <p className="Addmovie-link">Image Link*</p>
                  <input
                    type="text"
                    id="Addmovie-inputimage"
                    placeholder="Give the movie image link"
                    onChange={(e) => setMovieUrl(e.target.value)}
                  />
                </div>

                {/* //////////////////////////////////////////////////RATINGS////////////////////////////////////////////////// */}

                <div className="Addmovie-Duration">
                  <p id="Addmovie-Duration">Ratings*</p>
                  <input
                    id="Addmovie-myDuration"
                    // onInput={(e) => {
                    //     if (
                    //         e.target.value.length >
                    //         e.target.maxLength
                    //     )
                    //         e.target.value =
                    //             e.target.value.slice(
                    //                 0,
                    //                 e.target.maxLength
                    //             );
                    // }}
                    type="number"
                    maxlength={2}
                    placeholder="Enter the Ratings"
                    onChange={(e) => setRating(e.target.value)}
                  />
                </div>
              </div>

              {/* //////////////////////////////////////////////////CAST////////////////////////////////////////////////// */}

              <div className="Addmovie-Cast">
                <p id="Addmovie-castname">Cast*</p>
                <Multiselect
                  options={Options}
                  displayValue={"firstName"}
                  id="Addmovie-inputcast"
                  onSelect={(e) => {
                    console.log("CastList", e);
                    setFirstName(e);
                  }}
                />
              </div>

              {/* //////////////////////////////////////////////////ADD AND CANCEL////////////////////////////////////////////////// */}
              <div className="addandcancel">
                <div className="Addmovie-Moviebtn">
                  <button
                    id="Addmovie-addbtn"
                    name="formBtn"
                    onClick={(e) => {
                      postData();
                      setModalOpen(false);
                      // fieldValidation(e);
                      window.setTimeout(function () {
                        window.location.reload();
                      }, 2000);
                    }}
                  >
                    Add Movie
                    {/* <Link path="/">
                                       
                                       
                                        </Link> */}
                  </button>
                </div>

                <div className="Addmovie-Moviebtn">
                  <button
                    id="Addmovie-cancelbtn"
                    onClick={() => setModalOpen(false)}
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

export default AddMovie;
