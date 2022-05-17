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
  const { user } = useAuth();
  const [messageData, setMessageData] = useState([]);
  // const [messages, setMessages] = useState([]);
  const [insertMessageToggle, setInsertMessageToggle] = useState(false);
  const [serverMessages, setServerMessages] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(DEFAULT_ROOM);
  

  async function fetchRooms() {
    const { data, error } = await supabase
      .from("rooms")
      .select()
      .order("id", { ascending: true });
    setRooms(data);
    
   console.log(currentRoom);
  }

  useEffect(() => {
    if (!user) return;
    console.log(user)
    fetchRooms();
    console.log(rooms)
  }, [user]);

  const fetchMessages = async () => {
    let { data: messages, error } = await supabase
      .from("messages")
      .select("*")
      .eq("room", currentRoom)
      .order("id", { ascending: true });

    setMessageData(messages);
    if (error) {
      console.log(error);
    }
    console.log("fetch");
  }

  async function INSERT_MESSAGE(message) {
    const { data, error } = await supabase
      .from("messages")
      .insert({ user: message.id, username:user.user_metadata.username, message: message.msg, room: currentRoom });
    console.log("INSERT_MESSAGE called");
    setInsertMessageToggle(!insertMessageToggle);
  }

  async function INSERT_ROOM(roomName) {
    const roomId = uuidv4();
    const { data, error } = await supabase
      .from("rooms")
      .insert([
        { room_name: roomName, room_id: roomId, created_by_user: user.id },
      ]);
  }

  useEffect(() => {
    const roomSubscription = supabase
      .from("rooms")
      .on("*", (payload) => {
        if (payload.eventType !== "DELETE") {
          const newRoom = payload.new;
          setRooms((prevRooms) => {
            const roomExists = prevRooms.find((r) => r.id === newRoom.id);
            let newRooms;
            if (roomExists) {
              window.alert("A Room with this name already exists...");
              //remove room
            } else {
              newRooms = [...prevRooms, newRoom];
            }
            return newRooms;
          });
        }
      })
      .subscribe();
    return () => {
      supabase.removeSubscription(roomSubscription);
    };
  }, []);

  // function handleMessage(message) {
  //   console.log(message);

  //   setMessages(message);
  // }

  const value = {
    fetchMessages,
    messageData,
    setMessageData,
    fetchRooms,
    DEFAULT_ROOM,
    INSERT_MESSAGE,
    INSERT_ROOM,
    // handleMessage,
    // messages,
    serverMessages,
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
