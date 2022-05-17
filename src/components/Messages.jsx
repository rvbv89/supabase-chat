import React, { useEffect, useState, useRef } from "react";
import FetchingMessages from "./FetchingMessages";
import MessageItem from "./MessageItem";
import { Container, Box } from "@chakra-ui/react";
import { supabase } from "../supabase/init";
import { useAuth } from "../contexts/AuthProvider";
import { useMessage } from "../contexts/MessageProvider";

export default function Messages() {
  const { messageData, setMessageData, currentRoom } = useMessage();
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

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
    console.log("fetch");
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, [currentRoom]);

  useEffect(() => {
    const msgSubscription = supabase
      .from(`messages:room=eq.${currentRoom}`)
      .on("INSERT", (payload) => {
        const newMessage = payload.new;
        setMessageData((prevMess) => {
          return [...prevMess, newMessage];
        });

        console.log("new message", payload);
      })
      .subscribe((status, e) => {
        console.log("status", status, e);
      });
    return () => {
      supabase.removeSubscription(msgSubscription);
      setMessageData([]);
    };
  }, [currentRoom]);

  return (
    <>
      <Container direction={"column"} spacing={8}>
        <Box
          mx={"4"}
          backgroundColor={"grey"}
          minH={{ base: "50vh", md: "70vh", lg: "70vh" }}
        >
          <div>
            {loading ? (
              <FetchingMessages />
            ) : (
              messageData.map((message) => (
                <MessageItem
                  key={message.id}
                  messageUser={message.user}
                  messageUsername={message.username}
                  text={message.message}
                  createdAt={message.created_at}
                />
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </Box>
      </Container>
    </>
  );
}
