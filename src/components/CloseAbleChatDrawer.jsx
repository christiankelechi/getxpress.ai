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
} from "@chakra-ui/react";
import { FiMenu, FiShare2, FiSearch, FiSend } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";

export default function ChatDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // sidebar
  const {
    isOpen: isProfileOpen,
    onOpen: openProfile,
    onClose: closeProfile,
  } = useDisclosure(); // profile modal

  const [user] = useState("Dear");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef();

  // Dark/Light Mode Colors
  const bg = useColorModeValue("gray.50", "gray.900");
  const inputBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "gray.100");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      content: message,
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    // Simulate typing effect
    setIsTyping(true);
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        sender: "bot",
        content: "This is a response from the system.",
      };
      setMessages((prev) => [...prev, reply]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <Flex height="100vh" direction="column" bg={bg}>
      {/* Top Navbar */}
      <Flex
        justify="space-between"
        align="center"
        px={4}
        py={3}
        bg={inputBg}
        borderBottom="1px solid"
        borderColor={borderColor}
      >
        <IconButton
          aria-label="Open sidebar"
          icon={<FiMenu />}
          onClick={onOpen}
          variant="ghost"
        />
        <Flex align="center" gap={2}>
          <IconButton icon={<FiShare2 />} aria-label="Share" variant="ghost" />
          <Avatar
            name={user}
            size="sm"
            cursor="pointer"
            onClick={openProfile}
          />
        </Flex>
      </Flex>

      {/* Main content */}
      <Box flex="1" px={6} py={4} overflowY="auto">
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          Hi {user},
        </Text>
        <Text mt={2} color={textColor}>
          Want to continue from our previous conversation or start a new chat here?
        </Text>

        {/* Messages Area */}
        <VStack align="start" spacing={3} mt={6}>
          {messages.map((msg) => (
            <Box
              key={msg.id}
              alignSelf={msg.sender === "user" ? "flex-end" : "flex-start"}
              bg={msg.sender === "user" ? "blue.500" : inputBg}
              color={msg.sender === "user" ? "white" : textColor}
              px={4}
              py={2}
              borderRadius="lg"
              maxW="70%"
              boxShadow="md"
            >
              {msg.content}
            </Box>
          ))}
          {isTyping && (
            <Box
              px={4}
              py={2}
              bg={inputBg}
              borderRadius="lg"
              boxShadow="sm"
              color={textColor}
            >
              <HStack>
                <Spinner size="sm" />
                <Text fontSize="sm">Typing...</Text>
              </HStack>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>

      {/* Message Input */}
      <Box px={6} py={4} borderTop="1px solid" borderColor={borderColor}>
        <HStack spacing={2}>
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            bg={inputBg}
            color={textColor}
            borderColor={borderColor}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <IconButton
            icon={<FiSend />}
            aria-label="Send"
            colorScheme="blue"
            onClick={handleSend}
          />
        </HStack>
      </Box>

      {/* Sidebar Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerHeader borderBottom="1px solid" borderColor={borderColor}>
            Previous Conversations
          </DrawerHeader>
          <DrawerBody>
            {/* Search Bar */}
            <InputGroup mb={4}>
              <InputLeftElement pointerEvents="none" children={<FiSearch />} />
              <Input
                placeholder="Search conversations..."
                bg={inputBg}
                color={textColor}
                borderColor={borderColor}
              />
            </InputGroup>

            {/* Conversations List */}
            <VStack align="start" spacing={3} color={textColor}>
              <Box cursor="pointer">• Chat with Support</Box>
              <Box cursor="pointer">• Pricing Inquiry</Box>
              <Box cursor="pointer">• Onboarding Guide</Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Profile Modal */}
      <Modal isOpen={isProfileOpen} onClose={closeProfile} isCentered>
        <ModalOverlay />
        <ModalContent bg={inputBg}>
          <ModalHeader color={textColor}>My Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb={2} color={textColor}>Name:</Text>
            <Text mb={4} color={textColor}>{user}</Text>
            <Text fontWeight="bold" mb={2} color={textColor}>Email:</Text>
            <Text mb={4} color={textColor}>user@example.com</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={closeProfile}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
