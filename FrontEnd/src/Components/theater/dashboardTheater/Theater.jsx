import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Heading,
    Text,
    Divider,
    CardFooter,
    Button,
    CardHeader,
    Flex,
    Avatar,
    Box,
    IconButton,
    GridItem,
} from "@chakra-ui/react";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import "../../styles/theater-style/Theater.css";
import UpdateTheater from "../updateTheater/UpdateTheater";
import DeleteTheater from "../deleteTheater/DeleteTheater";
import { useNavigate } from "react-router-dom";



function Theater(props) {
    var theatername = props.TheaterName;

    const [loggedIn, setLoggedIn] = useState(false);
    
    useEffect(() => {
      if (localStorage.getItem("code") != null) {
        console.log(localStorage.getItem("code"));
        setLoggedIn(true);
      }
    }, [loggedIn]);

    const navigate = useNavigate();
    return (
      <div className="Theaters">
        <Card maxW="lg" align="center" border="1px solid black">
          <CardHeader align="left">
            <Flex padding="0% 2%">
              <Flex
                flex="1"
                gap="4"
                alignItems="center"
                flexWrap="wrap"
                width="100%"
              >
                <Avatar name="Logo" src={props.logo} width="10%" />

                <Box width="70%">
                  <Heading size="sm">{props?.TheaterName}</Heading>
                  {/* <Text>{props?.TheaterDesc}</Text> */}
                </Box>
                {props?.userType == "ADMIN" ? (
                  <DeleteTheater TheaterName={props?.TheaterName} />
                ) : (
                  <div></div>
                )}
              </Flex>
            </Flex>
          </CardHeader>
          <Divider orientation="horizontal" width="80%" />
          <Popover>
            <CardBody>
              {props?.TheaterDetailsOnCard}
              <p>
                <PopoverTrigger>
                  <Button bg="lightgray" color="black">
                    View More
                  </Button>
                </PopoverTrigger>
              </p>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
              >
                <PopoverHeader pt={4} fontWeight="bold" border="0">
                  Address
                </PopoverHeader>

                <PopoverArrow />

                <PopoverCloseButton />

                <PopoverBody>{props?.TheaterDetails}</PopoverBody>

                <PopoverFooter
                  border="0"
                  d="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  pb={4}
                ></PopoverFooter>
              </PopoverContent>
            </CardBody>
          </Popover>

          <CardFooter
            justify="space-between"
            flexWrap="wrap"
            sx={{
              "& > button": {
                minW: "50px",
              },
            }}
            gap={2}
          >
            <Button
              flex="1"
              variant="ghost"
              className="BuyTicket"
              bg="#EB4E62"
              color="white"
              borderRadius="30px"
              onClick={() => {
                {loggedIn
                  ? navigate("/UserSide_view")
                  : navigate("/LogIn");}
                localStorage.setItem("theater_name", props?.TheaterName);
              }}
            >
              Buy Tickets
            </Button>

            {props?.userType == "ADMIN" ? (
              <UpdateTheater
                theatername={theatername}
                theaterCode={props.theaterCode}
                url={props.logo}
                data={props.data}
              />
            ) : null}
          </CardFooter>
        </Card>

        {/* Modal */}
      </div>
    );
}

export default Theater;
