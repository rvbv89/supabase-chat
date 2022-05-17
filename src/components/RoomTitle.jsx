import React, { useEffect, useState } from "react";
import { DEFAULT_ROOM, useMessage } from "../contexts/MessageProvider";
import { Heading } from "@chakra-ui/react";

export default function RoomTitle() {
  const { rooms, currentRoom } = useMessage();
  const [roomTitle, setRoomTitle] = useState("");

  useEffect(() => {
    if (rooms === []) return;

    const currentRoomTitle = rooms.filter((room) =>
      Object.values(room).includes(currentRoom)
    );
    setRoomTitle(currentRoomTitle);
  }, [currentRoom]);

  return (
    <>
      {currentRoom === DEFAULT_ROOM ? (
        <Heading
          marginBottom={{ base: "3", md: "5", lg: "5" }}
          p={{ base: "3", md: "5", lg: "5" }}
          position={"absolute"}
          color={"#E2DFE4"}
          key={DEFAULT_ROOM}
        >
          General
        </Heading>
      ) : (
        roomTitle &&
        roomTitle.map((room) => {
          return (
            <Heading
              marginBottom={{ base: "3", md: "5", lg: "5" }}
              p={{ base: "3", md: "5", lg: "5" }}
              position={"absolute"}
              color={"#E2DFE4"}
              key={room.room_id}
            >
              {room.room_name}
            </Heading>
          );
        })
      )}
    </>
  );
}
