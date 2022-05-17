import React from "react";
import { Spinner } from "@chakra-ui/react";

export default function FetchingMessages() {
  return (
    <Spinner
      size="xl"
      thickness="7px"
      speed=".65s"
      emptyColor="gray.200"
      color="themePurple"
    />
  );
}
