// components/CollapsibleSidebar.jsx
import {
  Box,
  IconButton,
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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getChatHistory } from "../../store/user/api";
import { HamburgerIcon } from "@chakra-ui/icons";
import SideBarIcon from "../../assets/icons/SideBarIcon";
import CloseSideBarIcon from "../../assets/icons/CloseSideBarIcon";
import { ChatSidebar } from "./ChatsideBar";

export default function CollapsibleSidebar() {
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("gray.50", "#0f121c");
  const textColor = useColorModeValue("gray.800", "white");

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [conversations, setConversations] = useState([]);

  const { isLoading } = useQuery(["getChatHistory"], getChatHistory, {
    onSuccess: (response) => setConversations(response.data || []),
    onError: (error) => {
      toast({
        title: "Could not fetch chat history",
        description: error?.response?.data?.error || "Unexpected error",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const toggleCollapse = {
    icon: isCollapsed ? <SideBarIcon width="24px" height="25px" /> : <CloseSideBarIcon />,
    onClick: isMobile ? onOpen : () => setIsCollapsed(!isCollapsed),
  };

  const SidebarComponent = (
    <ChatSidebar
      isCollapsed={isCollapsed}
      toggleCollapse={toggleCollapse}
      conversations={conversations}
      isLoading={isLoading}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );

  return isMobile ? (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Chat List"
        onClick={onOpen}
        position="fixed"
        top="4"
        left="4"
        zIndex="overlay"
        display={{ base: "block", md: "none" }}
      />
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={bg}>
          <DrawerHeader borderBottomWidth="1px" color={textColor}>
            Chats
          </DrawerHeader>
          <DrawerBody>{SidebarComponent}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  ) : (
    SidebarComponent
  );
}
