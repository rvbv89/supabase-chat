import React, { useState, useRef} from "react";
import { Input, Box, Button } from "@chakra-ui/react";
import { useMessage } from "../contexts/MessageProvider";
import { useAuth } from "../contexts/AuthProvider";

export default function MessageInput() {
  const { user } = useAuth();
  const { INSERT_MESSAGE, currentRoom } = useMessage();
  const messageRef = useRef();
  const [input, setInput] = useState("");
 


  return (
    <Box minH={"35%"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          INSERT_MESSAGE({ id: user.id, msg: input, room: currentRoom });
          setInput("");
        }}
      >
        <Input
          onChange={(e) => {
            e.preventDefault();
            setInput(messageRef.current.value);
          }}
          value={input}
          ref={messageRef}
          size={"lg"}
          placeholder="Type Message Here..."
        />
        <Button
          type={"submit"}
          marginTop={"4"}
          onClick={(e) => {
            e.preventDefault();
            INSERT_MESSAGE({ id: user.id, msg: input, room: currentRoom });
            setInput("");
          }}
        >
          Send
        </Button>
      </form>
    </Box>
  );
}
