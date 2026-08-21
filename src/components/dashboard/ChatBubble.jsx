import { Avatar, Box, Flex, HStack, IconButton, Text, Tooltip, useClipboard, useColorModeValue, useToast } from "@chakra-ui/react";
import { FiCheck, FiCopy, FiThumbsDown, FiThumbsUp, FiVolume2 } from "react-icons/fi";
import XpressAiLogo from "../../assets/icons/XpressAiLogo";
import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

export const ChatBubble = ({ sender, content, inputBg, textColor }) => {
  const isUser = sender === "user";
   const { onCopy } = useClipboard(content);
   const [copied, setCopied] = useState(false);
   const [liked, setLiked] = useState(false);
   const [disliked, setDisliked] = useState(false);
   const toast = useToast();


    const handleCopy = () => {
    onCopy();
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLiked(true);
    toast({
      title: "You liked this message",
      status: "info",
      duration: 1500,
      isClosable: true,
    });
    setTimeout(() => setLiked(false), 2000);
  };

   const handleDislike = () => {
    setDisliked(true);
    setLiked(false);
    toast({
      title: "You disliked this message",
      status: "warning",
      duration: 1500,
      isClosable: true,
    });
  };

  const handleSpeak = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Speech not supported",
        description: "Your browser does not support text-to-speech.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };


  return (
    <Flex justify={isUser ? "flex-end" : "flex-start"}>
      {/* <Box
        bg={isUser ? "#0f121c" : inputBg}
        color={isUser ? "white" : textColor}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="70%"
        boxShadow="sm"
      >
        <Text whiteSpace="pre-wrap">{content}</Text>
      </Box> */}
      <Flex
        // direction="column"
        align={isUser ? "flex-end" : "flex-start"}
        maxW="90%"
      >
        <Flex align="flex-start" gap={2}>
          {!isUser && (
            <XpressAiLogo  width="26px" height="28px"/>
            // <Avatar
            //   icon={}
            //   size="sm"
            //   bg={useColorModeValue("gray.200", "gray.700")}
            // />
          )
          }

          <Box
            bg={isUser ? "#0f121c" : inputBg}
            color={isUser ? "white" : textColor}
            px={"20px"}
            py={"10px"}
            borderRadius="lg"
            boxShadow="sm"
            maxW="full"
            minW="100px"
            minH={"58px"}
            display={"flex"}
            borderColor={"1px solid rgba(68, 68, 68, 0.22)"}
          >
            {isUser ? (
              <Text whiteSpace="pre-wrap">{content}</Text>
            ) : (
              <MarkdownRenderer content={content} />
            )}
          </Box>
        </Flex>

        {!isUser && (
          <HStack mt={1} ml="10px" spacing={2}>
            
            <Tooltip label="Listen" hasArrow>
              <IconButton
                icon={<FiVolume2 />}
                aria-label="Read aloud"
                size="xs"
                variant="ghost"
                onClick={handleSpeak}
              />
            </Tooltip>
            <Tooltip label={copied ? "Copied!" : "Copy"} hasArrow>
              <IconButton
                icon={copied ? <FiCheck /> : <FiCopy />}
                aria-label="Copy message"
                size="xs"
                variant="ghost"
                onClick={handleCopy}
                colorScheme={copied ? "green" : undefined}
              />
            </Tooltip>
            <Tooltip label={liked ? "Liked!" : "Like"}  hasArrow>
              <IconButton
                icon={<FiThumbsUp />}
                aria-label="Like message"
                size="xs"
                variant="ghost"
                onClick={handleLike}
                colorScheme={liked ? "blue" : undefined}
              />
            </Tooltip>
              <Tooltip label={disliked ? "Disliked!" : "Dislike"} hasArrow>
              <IconButton
                icon={<FiThumbsDown />}
                aria-label="Dislike message"
                size="xs"
                variant="ghost"
                onClick={handleDislike}
                colorScheme={disliked ? "red" : undefined}
              />
            </Tooltip>
          </HStack>
        )}
      </Flex>
    </Flex>
  );
};


