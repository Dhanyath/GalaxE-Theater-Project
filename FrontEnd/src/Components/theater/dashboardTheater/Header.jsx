import React from "react";
import { Box, Img, Wrap, WrapItem, Avatar } from "@chakra-ui/react";
import logo from "../../images/logo.png";
import "../../styles/theater-style/Header.css";
import logo2 from "../../images/logo2.png";
import logo1 from "../../images/logo1.png";

function Header(props) {
  return (
    <div className="Headers">
      <Box bg="#333545" w="100%" p={4} color="#333545" className="Box">
        <img src={logo} alt="Logo" id="Logo" />
        <div className="navs">
          <div className="movie" width="40%">
            <div className="movieIcon">
              <img src={logo2} />
            </div>
            <a href="/"><h1 className="movieNav">Movies</h1></a>
          </div>
          <div className="theater">
            <div className="theaterIcon">
              <img src={logo1} />
            </div>
            <h1 className="theaterNav">Theaters</h1>
          </div>
        </div>
        <div className="user">
          <Wrap>
            <WrapItem>
              <div className="flexer">
                <h1 className="username"><a href="/viewSettings">Settings</a></h1>
              </div>
            </WrapItem>
          </Wrap>
        </div>
      </Box>
    </div>
  );
}

export default Header;
