import React, { useEffect, useRef } from "react";
import { Box, useColorModeValue, VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import useUserStore from "../../hooks/storage/userStore";
import { ChatBubble } from "../../components/dashboard/ChatBubble";
import ChatFooter from "../../components/dashboard/ChatFooter";


const ChatView = () => {
  const inputBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const { chatId } = useParams();
  const messagesEndRef = useRef();
  const { chatsHistory } = useUserStore((state) => state);

  const selectedChat = chatsHistory.find((chat) => chat.chat_id === chatId);

   const scrollToBottom = () => {
     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   };
 
   useEffect(() => {
     scrollToBottom();
   }, [selectedChat]); 

  if (!selectedChat?.content?.length) {
    return (
      <Box textAlign="center" py={10}>
        No conversation found.
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDir="column"
      h="75vh"
      overflowY={"auto"}
      bg="#0d0f18"
      position="relative"
    >
    <Box flex="1" px={[4, 6]} py={4}>
    <VStack align="stretch" spacing={4}>
      {selectedChat.content.map((entry, index) => (
        <React.Fragment key={index}>
          {entry.prompt_in && (
            <ChatBubble
              sender="user"
              content={entry.prompt_in}
              inputBg={inputBg}
              textColor={textColor}
            />
          )}
          {entry.prompt_output && (
            <ChatBubble
              sender="assistant"
              content={entry.prompt_output}
              inputBg={inputBg}
              textColor={textColor}
            />
          )}
        </React.Fragment>
      ))}

    <Box ref={messagesEndRef} />
    </VStack>
    </Box>

     <ChatFooter/>
    </Box>
  );
};

export default ChatView;
