import React, { useState } from "react";
import {
  Box,
  Button,
  InputGroup,
  LinkBox,
  Input,
  Flex,
  Stack,
  Select,
} from "@chakra-ui/react";
import { MdTune } from "react-icons/md";
import "../../styles/theater-style/Filter.css";
import AddTheater from "../addTheater/AddTheater";
import { FcSearch } from "react-icons/fc";

// var e = document.getElementById("FilterOption");
// var value = e.value;
// var text = e.options[e.selectedIndex].text;
function Filter(props) {
  const [filter, setFilter] = useState("");
  // const[value,setValue]=useState("");
  const changeFilter = () => {
    settingvalue();
    //
    props.setFilterType(document.getElementById("FilterOption").value);
    document.getElementById("FilterOption").value = "Filter";
  };

  const settingvalue = (e) => {
    // props.setValue(e.target.value);props.setFilterType(null);
    props.setFilterType(null);
  };
  return (
    <div>
      <Box marginTop="-10" width="100%" >
        <Flex className="filters" justifyContent="space-between" marginTop="5%">
          <Button
            flex="1"
            variant="ghost"
            className="All"
            color="white"
            bg="#EB4E62"
            padding="0% 5%"
            margin="0% 1%"
          >
            {filter}
            {/* {text} */}
          </Button>

          <InputGroup>
            <Input
              placeholder="Name/City/Address/"
              maxW="sm"
              id="fields"
              onChange={(e) => {
                props.setValue(e.target.value);
              }}
            ></Input>

            <Stack margin="0% 2%">
              <Select
                icon={<MdTune />}
                bg="ButtonFace"
                id="FilterOption"
                onChange={() => {
                  console.log("In function");
                  setFilter(document.getElementById("FilterOption").value);
                }}
              >
                <option value="Filter" disabled selected>
                  Filter
                </option>
                <option value="name">By Name</option>
                <option value="city">By City</option>
                <option value="address">By Address</option>
                <option value="All">All</option>
              </Select>
            </Stack>
            <Button
              leftIcon={<FcSearch />}
              colorScheme="blue"
              variant="solid"
              onClick={changeFilter}
            >
              Search
            </Button>
            {props.userType == "ADMIN" ? <AddTheater /> : <div></div>}
          </InputGroup>
        </Flex>
      </Box>
    </div>
  );
}

export default Filter;
