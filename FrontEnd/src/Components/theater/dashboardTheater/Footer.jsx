import { Avatar, Box, Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import logo from "../../images/logo.png";
import "../../styles/theater-style/Footer.css"

function Footer() {
  return (
    <div>
      <Box bg="#333338">
        <Flex color="white" className="footerBody">
          <Image src={logo} width="12%" padding="2%" />
          <Heading size="md" color="gray">
            Contact Us
          </Heading>
          <Heading size="md" color="gray">
            Support
          </Heading>
          <Heading size="md" margin="0% 20% 0% 0%" color="gray">
            Privacy Policy
          </Heading>
        </Flex>
        <Heading size="xs" color="gray" align="center" padding="0% 0% 2% 0%"> 
          CopyRight: All Rights Reserved by GalaxE Solutions
        </Heading>
      </Box>
    </div>
  );
}

export default Footer