import {
  VStack,
  Box,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const ConversationList = ({ isLoading, conversations, isMobile, onClose  }) => {
  const navigate = useNavigate();
  const hoverBg = useColorModeValue("gray.100", "gray.700");

  return (
    <VStack align="start" spacing={3}>
      {isLoading
        ? [...Array(20)].map((_, idx) => (
            <Skeleton key={idx} height="10px" width="100%" borderRadius="md" />
          ))
        : conversations.length > 0
        ? conversations.map((conversation) => (
            <Box
              key={conversation.chat_id}
              fontSize="14px"
              px={3}
              py={2}
              w="full"
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: hoverBg }}
              onClick={() => {
                navigate(`/dashboard/chat/${conversation.chat_id}`);
                if (isMobile) onClose(); 
              }
            }
            >
              {conversation.title}
            </Box>
          ))
        : (
          <Text fontSize="sm" color="gray.500">
            No conversations found.
          </Text>
        )}
    </VStack>
  );
}
