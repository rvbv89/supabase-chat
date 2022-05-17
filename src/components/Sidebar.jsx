import React, { useRef } from "react";
import {
  Stack,
  RadioGroup,
  Container,
  Box,
  Divider,
  Heading,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useMessage } from "../contexts/MessageProvider";
import RoomItem from "./RoomItem";

export default function Sidebar({ theme }) {
  const { rooms, currentRoom, setCurrentRoom } = useMessage();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Container>
      <Box
        as="button"
        height="3em"
        width="3em"
        borderRadius="50%"
        mx={{ lg: "3", sm: "2" }}
        marginTop={{ base: "-0.5", md: "2", lg: "3" }}
        marginBottom={{ base: "-0.5", md: "2", lg: "3" }}
        placement="right"
        ref={btnRef}
        backgroundColor={"#b794f4"}
        color={"whitesmoke"}
        onClick={onOpen}
      >
        <AddIcon />
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor={"grey"}>
          <DrawerCloseButton />
          <Divider />
          <DrawerBody>
            {/* <RadioGroup>
              <Stack direction="column"> */}
            <Heading as="h2" size="lg" marginBottom={".5em"}>
              Rooms
            </Heading>
            <Divider my={"1em"} />
            <RadioGroup
              onClick={onClose}
              colorScheme={"purple"}
              marginTop={".5em"}
              onChange={setCurrentRoom}
              value={currentRoom}
            >
              <Stack>
                {rooms &&
                  rooms.map((room) => (
                    <RoomItem
                      onClose={onClose}
                      roomId={room.room_id}
                      key={room.room_id}
                      roomName={room.room_name}
                    />
                  ))}
              </Stack>
            </RadioGroup>
            <Divider my={"1em"} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}
