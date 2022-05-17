import React from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Box, Flex } from "@chakra-ui/react";

export default function ChatDisplay() {
  return (
    <Flex flexDirection={"column"}>
      <Box
        overflowY="scroll"
        maxHeight="30em"
        sx={{
          "&::-webkit-scrollbar": {
            padding: "4em",
            margin: "4em",
            width: "16px",
            borderRadius: "5px",
            backgroundColor: "whitesmoke",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `#B1B0B1`,
            borderRadius: "5px",
          },
        }}
        my={{ lg: "4", sm: "0" }}
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
