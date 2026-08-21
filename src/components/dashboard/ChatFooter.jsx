import {
  Box,
  HStack,
  IconButton,
  Input,
  useColorModeValue
} from "@chakra-ui/react";
import { FiPaperclip } from "react-icons/fi";
import { useState } from "react";
import VideoIcon from "../../assets/icons/VideoIcon";
import CustomButton from "../CustomButton";

export default function ChatFooter({ handleSend }) {
  const [message, setMessage] = useState("");

  return (
    <Box
      position="fixed"
      bottom="20px"
      left={{base:"50%",lg:"55%"}}
      transform="translateX(-50%)"
      bg="#0f121c"
      borderRadius={"full"}
      zIndex={10}
    >
      <Box
        background="#0f121c"
        h="60px"
        w={{ base: "90vw", md: "600px", lg: "796px" }}
        m="auto"
        borderRadius="full"
        border="1px solid"
        borderColor="rgba(68, 68, 68, 0.22)"
        px={3}
      >
        <HStack
          spacing={3}
          h="full"
          align="center"
          justify="space-between"
        >
          {/* Left: Video Icon */}
          <IconButton
            icon={<VideoIcon strokeWidth="1.5" />}
            aria-label="Video"
            variant="ghost"
            color="gray.400"
            _hover={{ bg: "transparent", color: "blue.400" }}
          />

          {/* Middle: Input */}
          <Input
            placeholder="Ask Anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            variant="unstyled"
            color="white"
            mx={2}
            flex="1"
            _placeholder={{ color: "gray.500" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend(message);
                setMessage("");
              }
            }}
          />

          {/* Right: Attach & Send */}
          <HStack spacing={1}>
            <IconButton
              icon={<FiPaperclip />}
              aria-label="Attach"
              variant="ghost"
              size="lg"
              color={useColorModeValue("gray.700", "gray.200")}
              _hover={{ bg: "transparent", color: "blue.400" }}
            />
            <CustomButton
              title="Send"
              borderRadius="full"
              onClick={() => {
                handleSend(message);
                setMessage("");
              }}
              background="#142557"
              isBgGradient={false}
            />
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}
