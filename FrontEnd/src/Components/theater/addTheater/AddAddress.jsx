import React from "react";
import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
function AddAddress(props) {
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
      backdropInvert="10%"
      backdropBlur="2px"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { isOpen1, onToggle } = useDisclosure();
  const [addressLine1, setaddressLine1] = useState("");
  const [addressLine2, setaddressLine2] = useState("");
  const [city, setcity] = useState("");
  const [state, setstate] = useState("");
  const [pincode, setpincode] = useState("");
  const [country, setcountry] = useState("");

  const submitfunctiontorow = () => {
    const details = JSON.parse(localStorage.getItem("data"));
    console.log(details);
    const address = {
      addressLine1,
      addressLine2,
      city,
      state,
      pincode,
      country,
    };
    console.log(address);

    const userdata = {
      code: details.code,
      name: details.name,
      imgUrl: details.imgUrl,
      address: address,
    };

    console.log(userdata);

    localStorage.setItem("Theateraddresses", JSON.stringify(userdata));
  };

  const submitter = () => {
    console.log("first"+props.validtheater1)
    props.submitfunction();
    console.log(props.validtheater1)
    if(props.validtheater1){
      console.log("second"+props.validtheater1)
      onOpen();
    }
  };
  const [validaddress,setValidaddress]=useState(false);
  const validateAddress=()=>{
   var  regexforpincode= /^[1-9]{1}[0-9]{2}[0-9]{3}$/;
    if(addressLine1==""||addressLine2==""||city==""||state==""||pincode==""||country==""){
      // alert("Please Enter All the fields")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Please Enter All the fields</p>
      `;
    }
    else if(addressLine1.length<3){
      // alert("Enter valid  addressline1")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter valid  addressline1</p>
      `;
    }
    else if(addressLine2.length<3){
      // alert("Enter valid addresslin2")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter valid addresslin2</p>
      `;
    }
    
    else if(city.length<3){
      // alert("Enter valid city")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter valid city</p>
      `;
    }
    else if(state.length<3){
      // alert("Enter valid state")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter valid state</p>
      `;
    }
    else if(!regexforpincode.test(pincode)){
      // alert("Enter the valid Pincode")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter the valid Pincode</p>
      `;
    }
    else if(country.length<3){
      // alert("Enter valid country")
      document.getElementById("AddAddress-error").innerHTML = `
        <p style="color:red; padding:0% 0% 0% 5%">Enter valid country</p>
      `;
    }
    
    else{
      setValidaddress(true)
      document.getElementById("AddAddress-error").innerHTML = ``;
    }
  }
  const updater = () => {
    validateAddress()
    if(validaddress){ onClose()}
    submitfunctiontorow();
  };
  return (
    <div>
      <Button onClick={submitter} colorScheme="blue" mr={3}>
        Add Address
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay
          bg="none"
          backdropFilter="auto"
          backdropInvert="10%"
          backdropBlur="2px"
        />
        <Box>
          <ModalContent backgroundColor="#333545" color="white">
            <div id="AddAddress-error"></div>
            <ModalHeader>Add Address</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel color="white">Street Address 1</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Street Address 1"
                  type="text"
                  value={addressLine1}
                  onChange={(e) => {
                    setaddressLine1(e.target.value);
                  }}
                />
              </FormControl>

              <FormControl>
                <FormLabel color="white">Street Address 2</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Street Address 2"
                  type="text"
                  value={addressLine2}
                  onChange={(e) => {
                    setaddressLine2(e.target.value);
                  }}
                />
              </FormControl>

              <Grid templateColumns="repeat(2, 2fr)" gap={8} align="center">
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel color="white">City</FormLabel>
                    <Input
                      placeholder="City"
                      type="text"
                      value={city}
                      onChange={(e) => {
                        setcity(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2} size="xs">
                    <FormLabel color="white">State</FormLabel>
                    <Input
                      placeholder="State"
                      type="text"
                      value={state}
                      onChange={(e) => {
                        setstate(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel color="white">Pincode</FormLabel>
                    <Input
                      placeholder="Pincode"
                      type="number"
                      value={pincode}
                      onChange={(e) => {
                        setpincode(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
                <GridItem colSpan={1}>
                  <FormControl mt={2}>
                    <FormLabel color="white">Country</FormLabel>
                    <Input
                      placeholder="Country"
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setcountry(e.target.value);
                      }}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </ModalBody>

            <ModalFooter>
              <Button onClick={updater} colorScheme="blue" mr={3}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Box>
      </Modal>
    </div>
  );
}

export default AddAddress;
