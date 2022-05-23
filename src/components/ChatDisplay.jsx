import React from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Box, Flex } from "@chakra-ui/react";

export default function ChatDisplay() {
  return (
    <Flex flexDirection={"column"}>
      <Box
        centerContent
        overflowY="auto"
        maxHeight={{ base: "20em", lg: "30em" }}
        minHeight={{base:"15em"}}
        p={"10"}
     
        marginTop={{ base: "4", lg: "4" }}
        borderRadius={"8px"}
        backgroundColor={"grey"}
      >
        <Messages />
      </Box>
      <Box
        my={{ lg: "3", md: "2", sm: "0" }}
        borderRadius={"8px"}
        backgroundColor={"grey"}
        p={"6"}
      >
        <MessageInput />
      </Box>
    </Flex>
  );
}
