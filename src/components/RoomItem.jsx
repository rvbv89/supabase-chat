import React from "react";
import { Radio } from "@chakra-ui/react";

export default function RoomItem({ roomName, roomId, onClose }) {
  return <Radio value={roomId}>{roomName}</Radio>;
}
