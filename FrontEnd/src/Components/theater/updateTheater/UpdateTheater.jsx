import React, { useState } from "react";
import axios from "axios";
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import UpdateAddress from "./UpdateAddress";
import UpdateSeats from "./UpdateSeats";
import theaterBase from "../../sch_environment/theaterBaseUrl";

function UpdateTheater(props) {
    const theatername = props.theatername;
    const OverlayOne = () => (
        <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const OverlayTwo = () => (
        <ModalOverlay
            bg="none"
            backdropFilter="auto"
            backdropInvert="80%"
            backdropBlur="2px"
        />
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = React.useState(<OverlayOne />);
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);
    const [rowAdd, setRowAdd] = useState(1);
    const [code, setcode] = useState(props.theaterCode);
    const [name, setname] = useState("");
    const [imgUrl, setimgUrl] = useState(props.url);

    const finalsubmit = () => {
        const details = JSON.parse(localStorage.getItem("Theateraddresses"));
        var row = JSON.parse(localStorage.getItem("array"));
        const userdata = {
            code: details.code,
            name: theatername,
            imgUrl: details.imgUrl,
            seatingCapacity: 70,
            address: details.address,
            row: row,
        };
        axios
            .put(`${theaterBase}update`, userdata)
            .then((response) => {
                localStorage.clear();

                if (response.data === "Updated Successfully") {
                    alert(response.data);
                } else {
                    alert("Saving failed");
                }
            })
            .catch(function (error) {
                console.log(error);

                if (error.response != null) {
                    alert(error.response.data);
                } else {
                    alert(error.message);
                }
            });
    };
    const databasesubmit = () => {
        onClose();
        finalsubmit();
    };
    const updateAddRow = () => {
        if (rowAdd <= 17 && rowAdd > 0) {
            setRowAdd((prevCount) => prevCount + 1);
            console.log(rowAdd);
        }
    };

    const [validateUpdateTheater, setValidateUpadteTheater] = useState(false);
    const ValiditeUpdateTheater = () => {
        var regexforCode = /^[A-Z]{2}[0-9]{2}$/;
        var regexforimgUrl = /^https?:\/\//i;

        if (code == "" || imgUrl == "") {
            // alert("Please Enter all the fields");
            document.getElementById("UpdateTheater-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Please Enter all the fields</p>
      `;
        } else if (!regexforCode.test(code)) {
            // alert("Please Enter the code correctly");
            document.getElementById("UpdateTheater-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Please Enter the code correctly</p>
      `;
        } else if (!regexforimgUrl.test(imgUrl)) {
            // alert("Enter the valid imgUrl");
            document.getElementById("UpdateTheater-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter the valid imgUrl</p>
      `;
        } else {
            setValidateUpadteTheater(true);
            console.log("inside the else block" + validateUpdateTheater);
            document.getElementById("UpdateTheater-error").innerHTML = ` `;
        }
    };
    const submitfunction = () => {
        ValiditeUpdateTheater();
        const data = { code, theatername, imgUrl };

        localStorage.setItem("data", JSON.stringify(data));
    };

    return (
      <div>
        <Button
          variant="outline"
          className="BuyTicket"
          color="white"
          borderRadius="30px"
          onClick={() => {
            setOverlay(<OverlayTwo />);
            onOpen();
          }}
        >
          Update Theater
        </Button>
        <>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
          >
            <ModalOverlay
              bg="none"
              backdropFilter="auto"
              backdropInvert="10%"
              backdropBlur="2px"
            />
            <ModalContent backgroundColor="#333545" color="white">
              <div id="UpdateTheater-error"></div>
              <ModalHeader>Update Theater</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel color="white">Theater Code</FormLabel>
                  <Input
                    ref={initialRef}
                    placeholder="Theater Code"
                    type="text"
                    value={code}
                    onChange={(e) => {
                      setcode(e.target.value);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="white">Theater Name</FormLabel>
                  <Input
                    placeholder="Theater name"
                    type="text"
                    value={props.theatername}
                    onChange={(e) => {
                      setname(props.theatername);
                    }}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel color="white">Image URL</FormLabel>
                  <Input
                    placeholder="Image URL"
                    type="text"
                    value={imgUrl}
                    onChange={(e) => {
                      setimgUrl(e.target.value);
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <UpdateAddress
                  submitfunction={submitfunction}
                  validateUpdateTheater1={validateUpdateTheater}
                  theatername={theatername}
                  data={props.data}
                ></UpdateAddress>
                <UpdateSeats
                  updateAddRow={updateAddRow}
                  rowAdd={rowAdd}
                ></UpdateSeats>
                {rowAdd > 15 ? (
                  <Button onClick={databasesubmit} colorScheme="cyan" mr={3}>
                    Submit
                  </Button>
                ) : null}
                <Button onClick={onClose} colorScheme="blackAlpha">
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      </div>
    );
}

export default UpdateTheater;
