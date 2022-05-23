import React, { useEffect, useState, useRef } from "react";
import LoadingUI from "./LoadingUI";
import MessageItem from "./MessageItem";
import { Container, Box, Flex } from "@chakra-ui/react";
import { supabase } from "../supabase/init";
import { useAuth } from "../contexts/AuthProvider";
import { useMessage } from "../contexts/MessageProvider";

export default function Messages() {
  const { messageData, setMessageData, fetchMessages, currentRoom, loading } =
    useMessage();
  const [subLoading, setSubLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messageData]);

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
        setSubLoading(false);
        console.log("new message", payload);
      })
      .subscribe((status, e) => {
        console.log("status", status, e);
        if (status == "RETRYING_AFTER_TIMEOUT") {
          console.log("retr");
          setSubLoading(true);
          
        } else if (status =="SUBSCRIBED") {
          setSubLoading(false)
        }
      });

    return () => {
      supabase.removeSubscription(msgSubscription);
      setMessageData([]);
    };
  }, [currentRoom]);

  useEffect(() => {
    console.log(subLoading);
  }, [subLoading]);

  return (
    <>
      {/* <Container direction={"column"} spacing={8}>
        <Box
          // mx={"4"}
          // backgroundColor={"grey"}
          // minH={{ base: "50vh", md: "70vh", lg: "70vh" }}
          // maxH={'70vh'}
          // overflowY='auto'
        > */}
      <Flex direction={"column"}>
        {loading || subLoading ? (
          <LoadingUI />
        ) : (
          messageData.map((message) => (
            <MessageItem
            subLoading={subLoading}
              key={message.id}
              messageUser={message.user}
              messageUsername={message.username}
              text={message.message}
              createdAt={message.created_at}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </Flex>
      {/* </Box>
      </Container> */}
    </>
  );
}
