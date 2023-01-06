import { Link } from "react-router-dom";
import "../../styles/movie-style/Delete.css";
import { useState, useEffect } from "react";
import axios from "axios";
import movieDeployedUrl from "../../environment/movieUrl";

export default function Delete({ setModalOpen }, e) {
  const [movieName, setMovieName] = useState("");
  const onDelete = (id) => {
    axios
      .delete(
        // `http://192.168.137.5:9090/movies/deletemovie/${movieName}`
        `${movieDeployedUrl}/deletemovie/${movieName}`
      )
      .then(() => {
        getData();
        console.log("Delete");
      });
  };
  useEffect(() => {
    setMovieName(localStorage.getItem("movieName"));
  }, []);
  const getData = () => {
    axios.get(`${movieDeployedUrl}`);
    // axios.get(`http://localhost:9090/movies`);
  };

  return (
    <div className="delete-main-container">
      <div className="delete-exact">
        <form>
          <div className="delete-main">
            <div className="delete-container">
              <div className="delete-flex-v">
                <h5 className="delete1">{movieName}</h5>
                <h7 className="delete2">Do You Want Delete This Movie?</h7>
              </div>

              <div className="delete">
                <div>
                  <Link to="/">
                    <button
                      className="delete-buttonActive"
                      onClick={(e) => {
                        e.preventDefault();
                        onDelete(movieName);
                        setModalOpen(false);
                        window.setTimeout(function () {
                          window.location.reload();
                        }, 500);
                      }}
                    >
                      Confirm
                    </button>
                  </Link>
                </div>
                {/* <Link to="/"> */}
                <button
                  className="delete-buttonActive paddingbutton"
                  onClick={() => {
                    setModalOpen(false);
                  }}
                >
                  Cancel
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
