// CollapsibleSidebar.tsx
import {
  Box,
  IconButton,
  VStack,
  Tooltip,
  Input,
  InputGroup,
  InputLeftElement,
  useToast,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { useMemo, useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useQuery } from "@tanstack/react-query";


import SideBarIcon from "../../assets/icons/SideBarIcon";
import CloseSideBarIcon from "../../assets/icons/CloseSideBarIcon";
import NewChatIcon from "../../assets/icons/NewChatIcon";
import CustomButton from "../CustomButton";
import { getChatHistory } from "../../store/user/api";
import { ConversationList } from "./ConversationList";
import useUserStore from "../../hooks/storage/userStore";
import { Link as RouterLink } from "react-router-dom";


export default function CollapsibleSidebar() {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setChatsHistory } = useUserStore((state) => state);


  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [conversations, setConversations] = useState([]);

  const bg = useColorModeValue("gray.50", "#0f121c");
  const textColor = useColorModeValue("gray.800", "white");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  const { isLoading } = useQuery(["getChatHistory"], getChatHistory, {
    onSuccess: (response) => {
      setConversations(response.data || []);
      setChatsHistory(response?.data)
    },
    onError: (error) =>
      toast({
        title: "Could not fetch chat history",
        description: error?.response?.data?.error || "Unexpected error",
        status: "error",
        duration: 4000,
        isClosable: true,
      }),
  });

  // const filteredConversations = conversations.filter((conv) =>
  //   conv.title.toLowerCase().includes(searchValue.toLowerCase())
  // );
  const filteredConversations = useMemo(() => {
  return conversations.filter((conv) =>
    conv.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}, [conversations, searchValue]);


const handleToggle = () => {
  isMobile ? onOpen() : setIsCollapsed(prev => !prev);
};



  const renderSidebar = () => (
    <Box
      w={isCollapsed ? "60px" : "262px"}
      transition="width 0.3s"
      bg={bg}
      minH="100vh"
      px={isCollapsed ? 2 : 4}
      py={4}
      // position={"fixed"}
      overflowY="auto" maxH="85vh"
    >
      <VStack align="start" spacing={4}>
        <IconButton
          icon={isCollapsed ? <SideBarIcon width="24px" height="25px" /> : <CloseSideBarIcon />}
          aria-label="Toggle Sidebar"
          onClick={handleToggle}
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
                as={RouterLink}
                to="/dashboard"
              />
              <ConversationList
                isLoading={isLoading}
                conversations={filteredConversations}
              />
            </Box>
          </>
        )}

        {!isMobile && isCollapsed && (
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

  return isMobile ? (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Chat List"
        onClick={onOpen}
        position="fixed"
        top="4"
        right="4"
        zIndex="overlay"
        display={{ base: "flex", md: "none" }}
        // justifyContent={"flex-end"}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerHeader borderBottomWidth="1px" color={textColor}>
            Chats
          </DrawerHeader>
          <DrawerBody>
            <ConversationList
              isLoading={isLoading}
              conversations={filteredConversations}
              isMobile={isMobile}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  ) : (
    renderSidebar()
  );
}
