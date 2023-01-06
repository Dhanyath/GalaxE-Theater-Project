import React from "react";
import axios from "axios";
import theaterBase from "../../sch_environment/theaterBaseUrl";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";

function DeleteTheater(props) {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const initialFocusRef = React.useRef();

  const callDeleteApi = () => {
    axios
      .delete(
        `${theaterBase}${props.TheaterName}`
      )
      .then((Response) => {
        window.location.reload();
        {
          console.log("deleted suceefully");
        }
      });



  }
  const callfunction = () => {
    callDeleteApi();
    onClose();
  }
  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={initialFocusRef}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          bg="#EB4E62"
          color="white"
          borderRadius="6rem"
          margin="-2% -6% 0% 0%"
        >
          <AiFillCloseCircle />
        </Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          Delete Theater
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>Are you sure you want to Delete this Theater?</PopoverBody>
        <PopoverFooter
          border="0"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <ButtonGroup size="sm">
            <Button colorScheme="green" onClick={callfunction}>
              Yes Delete
            </Button>
            <Button colorScheme="blue" onClick={onClose}>
              Cancel
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default DeleteTheater;
