import React from "react";
import { useAuth } from "../contexts/AuthProvider";
import { Box, Text } from "@chakra-ui/react";

export default function MessageItem({ text, messageUser, messageUsername }) {
  const { user } = useAuth();

  return (
    <>

  
   <Box justifySelf={'end'}>
      <Text>{messageUsername}</Text>
      <Box
        maxW={"fit-content"}
        py={'3'}
        px={"6"}
        backgroundColor={messageUser === user.id ? "green" : "blue"}
        borderRadius={"10px"}
      >
        <Text>{text}</Text>
      </Box>
      </Box>
    </>
  );
}
