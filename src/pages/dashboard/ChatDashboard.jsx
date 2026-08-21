import {
  Box,
  Flex,
  Text,
  IconButton,
  Avatar,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  VStack,
  HStack,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Center,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  keyframes,
} from "@chakra-ui/react";
import { FiMenu, FiShare2, FiSearch, FiPaperclip } from "react-icons/fi";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";
import VideoIcon from "../../assets/icons/VideoIcon";
import useUserStore from "../../hooks/storage/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../../store/user/api";
import { ChatBubble } from "../../components/dashboard/ChatBubble";
import CollapsibleSidebar from "../../components/dashboard/CollapsibleSideBar";
import AvatarCall from "../../components/dashboard/AvatarCall";



const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
`;


export default function ChatDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // sidebar
  const {
    isOpen: isProfileOpen,
    onOpen: openProfile,
    onClose: closeProfile,
  } = useDisclosure(); // profile modal

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef();
  const { user:userData } = useUserStore((state) => state);
  const { user } = userData;
  const toast = useToast();
  const [chatId, setChatId] = useState("");
  const [isNewChat, setIsNewChat] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [latestAiResponse, setLatestAiResponse] = useState("");
  const queryClient = useQueryClient();



  const inputBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const{ mutate:submitCreateChat, isLoading } = useMutation(createChat,{
    onSuccess: (response) => {
     //update the messages array
    const { chat_id } = response?.data || {};
    setMessages((prev) => [...prev, response?.data, { new_chat:false , chat_id: response?.data?.chat_id }]);
    queryClient.invalidateQueries(["getChatHistory"])
    
    // Only update once
    if (isNewChat && chat_id) {
      setChatId(chat_id);
      setIsNewChat(false);
    }

    if (response?.data?.prompt_output) {
      setLatestAiResponse(response.data.prompt_output);
    }

    setMessage("");
    },
    onError: () => {
       toast({
        title: "Failed to send message, Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  })


    const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      new_chat: isNewChat,
      chat_id:chatId,
      prompt_in:message,
      sender:"user"
    };


    setMessages((prev) => [...prev, newMessage, ]);
    setMessage("");

    //update the messages array
   submitCreateChat(newMessage)
  };

  const handleSendMessage = (text, emotion) => {
    const newMessage = {
      new_chat: isNewChat,
      chat_id: chatId,
      prompt_in: text,
      emotion: emotion,
      sender: "user"
    };
    setMessages((prev) => [...prev, newMessage]);
    submitCreateChat(newMessage);
  };

  if (isCallActive) {
    return (
      <Box h="calc(100vh - 100px)" w="full" p={4}>
        <AvatarCall 
          onClose={() => setIsCallActive(false)} 
          onSendMessage={handleSendMessage}
          isProcessing={isLoading}
          aiResponse={latestAiResponse}
        />
      </Box>
    );
  }

  return (
    <Flex  direction="column">

      {/* Chat Interface */}
      {messages.length === 0 ? (
        <Center flex="1" flexDirection="column" textAlign="center" px={4}>
          <Text fontSize="3xl" fontWeight="bold" color={textColor}>
            Hi {user?.full_name?.split(" ")[0]},
          </Text>
          <Text fontSize={{base:"14px",lg:"18px"}} mb={"62px"} mt={3} color={textColor}>
            Want to continue from our previous <br /> conversation or <Link className="text-[#0E47D8]">start a new chat here?</Link>
          </Text>
        </Center>
      ) : (
      <Box flex="1" px={[4, 6]} py={4} overflowY="auto">
      <VStack align="stretch" spacing={4}>
       {messages.map((msg, id) => {
       const isUser = msg.sender === "user";
      const content = isUser ? msg.prompt_in : msg.prompt_output;

     // Don't render if there's no content
      if (!content) return null;

     return (
      <ChatBubble
      key={id}
      sender={msg.sender}
      content={content}
      inputBg={inputBg}
      textColor={textColor}
    />
  );
})}

    {isLoading && (
    <HStack spacing={3} align="center">
     {[...Array(3)].map((_, i) => (
      <Box
        key={i}
        w="8px"
        h="8px"
        borderRadius="full"
        bg="blue.400"
        animation={`${pulse} 1.2s ease-in-out ${i * 0.2}s infinite`}
      />
    ))}
    </HStack>
    )}

    <Box ref={messagesEndRef} />
    </VStack>
    </Box>

      )}

  {/* Message Input Only if Chat Started */}
  <Box
  p="10px"
  background="#0f121c"
  h="60px"
  w={{base:"full",lg:"796px"}}
  m="auto"
  borderRadius="full"
  border="1px solid"
  borderColor={"rgba(68, 68, 68, 0.22)"}
>
  <HStack
    spacing={3}
    bg="#0f121c"
    px={4}
    borderRadius="full"
    // borderColor={useColorModeValue("gray.200", "gray.700")}
    h="full"
    align="center"
    justify="space-between"
  >
    {/* Left: Video Icon */}
    <IconButton
      icon={<VideoIcon strokeWidth="1.5"/>}
      aria-label="Video Call"
      variant="ghost"
      color="gray.400"
      _hover={{ bg: "transparent", color: "blue.400" }}
      onClick={() => setIsCallActive(true)}
    />

    {/* Middle: Input field (flex-grow fills available space) */}
    <Input
      placeholder="Ask Anything..."
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      variant="unstyled"
      color="white"
      mx={2}
      flex="1"
      onKeyDown={(e) => {
        if (e.key === "Enter") handleSend();
      }}
    />

    {/* Right: Attach Icon + Send Button */}
    <HStack spacing={1}>
      <IconButton
        icon={<FiPaperclip />}
        aria-label="Attach"
        variant="ghost"
        size="lg"
        color={useColorModeValue("gray.700","gray.200")}
       _hover={{ bg: "transparent", color: "blue.400" }}
      />

      <CustomButton
        title="Send"
        borderRadius="full"
        onClick={handleSend}
        background="#142557"
        isBgGradient={false}
      />
    </HStack>
  </HStack>
  </Box>
    </Flex>
  );
}
