import {
  ChakraProvider,
  Grid,
  GridItem,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Header from "../dashboardTheater/Header";
import Theater from "../dashboardTheater/Theater";
import Filter from "../dashboardTheater/Filter";
import Footer from "../dashboardTheater/Footer";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import theaterBase from "../../sch_environment/theaterBaseUrl";
import baseUrl from "../../environment/baseUrl";
import { useNavigate } from "react-router-dom";

function Provider(props) {
  var nav = useNavigate();
  const [APIdata, setAPIdata] = useState([]);
  const [filterType, setFilterType] = useState("All");
  const [value, setValue] = useState("kiru");
  const [isEmpty, setIsEmpty] = useState(false);
  const [errors, setErrors] = useState("Loading Data ...");

  const [role, setRole] = useState("");

  useEffect(() => {
    handleProfileSettings();
  }, []);



  async function handleProfileSettings(e) {
    const response = await axios.get(
      `${baseUrl}/user/settings/${localStorage.getItem(
        "email"
      )}/${localStorage.getItem("password")}`
    );

    setRole(response.data.role);
    var name = response.data.userName;
  }

  const userType = localStorage.getItem("role");

  useEffect(() => {
    setAPIdata([]);
    if (filterType == "All" || filterType == "Filter") {
      axios
        .get(`${theaterBase}all`)
        .then((response) => {
          if (response.status == "200") {
            console.log(response);
            setAPIdata(response.data);
            setIsEmpty(true);
          } else if (response.status == "404") {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          } else {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsEmpty(false);
          setErrors(error.message);
          if (error.response != null) {
            setErrors(error.response.data);
          }
        });
    } else if (
      filterType == "city" ||
      filterType == "name" ||
      filterType == "address"
    ) {
      axios
        .get(`${theaterBase}${filterType}/${value}`)
        .then((response) => {
          if (response.status == "200") {
            console.log(response);
            setAPIdata(response.data);
            setIsEmpty(true);
          } else if (response.status == "404") {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          } else {
            console.log(response.data);
            setIsEmpty(false);
            setErrors(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsEmpty(false);
          setErrors(error.message);
          if (error.response != null) {
            setErrors(error.response.data);
          }
        });
    }
  }, [filterType]);

  return (
    <>
      
        <ChakraProvider>
          <Header pass={userType} />
          <Filter
            userType={userType}
            setValue={setValue}
            setFilterType={setFilterType}
          />
          <Grid
            templateColumns="repeat(2, 1fr)"
            gap={8}
            align="center"
            margin="0% 5%"
          >
            {/* {console.log(APIdata)} */}
            {isEmpty ? (
              APIdata?.map((data) => {
                return (
                  <div>
                    <GridItem colSpan={1}>
                      <Theater
                        userType={userType}
                        TheaterName={data?.name}
                        TheaterDesc={data?.address.addressLine1}
                        theaterCode={data?.code}
                        TheaterDetails={
                          data?.address.addressLine1 +
                          " " +
                          data?.address.addressLine2 +
                          " " +
                          data?.address.city +
                          " " +
                          data?.address.state +
                          " " +
                          data?.address.country +
                          " " +
                          data?.address.pincode
                        }
                        TheaterDetailsOnCard={
                          data?.address.addressLine1 +
                          " " +
                          data?.address.addressLine2 +
                          " " +
                          data?.address.city
                        }
                        logo={data?.imgUrl}
                        data={data}
                      />
                    </GridItem>
                  </div>
                );
              })
            ) : (
              <Alert status="warning" margin="10% 2%">
                <AlertIcon />
                {errors}
              </Alert>
            )}
          </Grid>
          <Footer />
        </ChakraProvider>
      )
      
    </>
  );
}

export default Provider;
