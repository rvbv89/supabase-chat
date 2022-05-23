import React from "react";
import { Radio } from "@chakra-ui/react";

export default function RoomItem({ roomName, roomId, onClose }) {
  return <Radio colorScheme="blue" value={roomId}>{roomName}</Radio>;
}
