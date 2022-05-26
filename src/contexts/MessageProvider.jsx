import React, { useContext, useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "./AuthProvider";
import { supabase } from "../supabase/init";

const MessageContext = React.createContext();

export const DEFAULT_ROOM = "eac667d7-aa09-4e8c-b133-eff10af7db0a";

export function useMessage() {
  return useContext(MessageContext);
}

export default function MessageProvider({ children }) {
  // user state from auth context
  const { user } = useAuth();
  //Message and room states, loading state
  //TODO: investigate creating redux stores instead of contexts as states become more complex
  const [messageData, setMessageData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [insertMessageToggle, setInsertMessageToggle] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(DEFAULT_ROOM);

  //fetch rooms from db
  async function fetchRooms() {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .order("id", { ascending: true });
    setRooms(data);

    console.log(currentRoom);
  }

  //On user state, fetch rooms from db
  useEffect(() => {
    if (!user) return;
    console.log(user);
    fetchRooms();
    console.log(rooms);
  }, [user]);
  //initial message fetch
  const fetchMessages = async () => {
    setLoading(true);
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room", currentRoom)
      .order("id", { ascending: true });

    setMessageData(messages);
    if (error) {
      console.log(error);
    }
    setLoading(false);
  };
  //insert messages to db
  async function INSERT_MESSAGE(message) {
    const { data, error } = await supabase.from("messages").insert({
      user: message.id,
      username: user.user_metadata.username,
      message: message.msg,
      room: currentRoom,
    });
    console.log("INSERT_MESSAGE called");
    setInsertMessageToggle(!insertMessageToggle);
    console.log(loading);
  }

  //encap context values in object
  const value = {
    loading,
    setLoading,
    fetchMessages,
    messageData,
    setMessageData,
    fetchRooms,
    DEFAULT_ROOM,
    INSERT_MESSAGE,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    insertMessageToggle,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
