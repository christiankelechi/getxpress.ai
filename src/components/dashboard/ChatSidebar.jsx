// components/ChatSidebar.jsx
import {
  Box,
  VStack,
  InputGroup,
  InputLeftElement,
  Input,
  Skeleton,
  Text,
  Tooltip,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import NewChatIcon from "../../assets/icons/NewChatIcon";

export default function ChatSidebar({
  isCollapsed,
  toggleCollapse,
  conversations = [],
  isLoading,
  searchValue,
  setSearchValue,
}) {
  const navigate = useNavigate();
  const bgHoverColor = useColorModeValue("gray.100", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  const filteredConversations = conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <Box
      w={isCollapsed ? "60px" : "262px"}
      transition="width 0.3s"
      minH="100vh"
      px={isCollapsed ? 2 : 4}
      py={4}
    >
      <VStack align="start" spacing={4}>
        <IconButton
          icon={toggleCollapse.icon}
          aria-label="Toggle Sidebar"
          onClick={toggleCollapse.onClick}
          size="sm"
          alignSelf={isCollapsed ? "center" : "flex-end"}
        />

        {!isCollapsed && (
          <>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiSearch color={placeholderColor} />
              </InputLeftElement>
              <Input
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search"
                size="sm"
                fontSize="14px"
                fontWeight="600"
                color={textColor}
              />
            </InputGroup>

            <Box mt={4} w="full">
              <CustomButton
                leftIcon={<NewChatIcon />}
                title="New Chat"
                borderRadius="8px"
                width="full"
                height="40px"
                mb={4}
                display="flex"
                justifyContent="flex-start"
              />

              <VStack align="start" spacing={3} overflowY="auto" maxH="65vh">
                {isLoading ? (
                  [...Array(20)].map((_, idx) => (
                    <Skeleton key={idx} height="10px" width="100%" borderRadius="md" />
                  ))
                ) : filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <Box
                      key={conversation.chat_id}
                      fontSize="14px"
                      px={3}
                      py={2}
                      w="full"
                      borderRadius="md"
                      cursor="pointer"
                      _hover={{ bg: bgHoverColor }}
                      onClick={() => navigate(`/chat/${conversation.chat_id}`)}
                    >
                      {conversation.title}
                    </Box>
                  ))
                ) : (
                  <Text fontSize="sm" color="gray.500">
                    No conversations found.
                  </Text>
                )}
              </VStack>
            </Box>
          </>
        )}

        {isCollapsed && (
          <VStack spacing={4}>
            <Tooltip label="New Chat" placement="right">
              <CustomButton leftIcon={<NewChatIcon />} borderRadius="8px" width="40px" height="40px" p={2} />
            </Tooltip>
            <Tooltip label="Search" placement="right">
              <IconButton icon={<FiSearch />} aria-label="Search" size="sm" />
            </Tooltip>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
