import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import ChatDisplay from "./ChatDisplay";
import RoomTitle from "./RoomTitle";

export default function Dashboard() {
  return (
    <div>No</div>
    <Grid
      backgroundColor={"darkGrey"}
      minHeight="100vh"
      templateRows={{ base: "2", lg: "autoRows" }}
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(5, 1fr)" }}
      gap={4}
    >
      <GridItem
        m={{ base: "2", md: "0", lg: "0" }}
        p={{ base: "0", md: "0", lg: "0" }}
        colSpan={{ lg: "1", md: "0", sm: "0" }}
        rowSpan={{ base: "0", md: "0", lg: "3" }}
      >
        <Sidebar />
      </GridItem>

      <GridItem
        my={{ base: "2", md: "0", lg: "0" }}
        colSpan={3}
        rowSpan={{ lg: "2", md: "0", sm: "0" }}
        maxHeight={{ lg: "2", md: "-1", sm: "-3" }}
      >
        <ChatDisplay />
      </GridItem>
      <GridItem rowStart={{ base: "start", md: "start", lg: "auto" }}>
        <RoomTitle
          my={{ base: "2", md: "0", lg: "0" }}
          p={{ base: "0", md: "0", lg: "0" }}
          s
        />
      </GridItem>
    </Grid>
  );
}
