import {
  Flex,
  IconButton,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Button,
  Box,
  useDisclosure,
  Text,
  useClipboard,
  useToast,
  chakra
} from "@chakra-ui/react";
import useUserStore from "../../hooks/storage/userStore";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { CustomModal } from "./CustomModal";
import ShareIconComponent from "../../assets/icons/ShareIcon";


export const  HeaderBar = () => {
  const chatUrl = window.location.href;
  const navigate = useNavigate();
  const { user: userData ,logout} = useUserStore((state) => state);
  const { user } = userData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onCopy } = useClipboard(chatUrl);
  const toast = useToast();
  const ShareIcon = chakra(ShareIconComponent);

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  const handleCopy = () => {
   onCopy();
    // setCopied(true);
    toast({
      title: "Link Copied to clipboard",
      status: "success",
      duration: 1500,
      isClosable: true,
    });
    // setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Flex
      justifyContent={{base:"flex-start", md:"flex-end"}}
      align="center"
      px={4}
      py={3}
      borderBottom="1px solid"
      borderColor="gray.700"
      flexBasis={"100%"}
    >
      <Box /> {/* Placeholder if you want to add logo later */}
      <Flex align="center" gap={2}>
        <IconButton 
        onClick={onOpen}
        icon={<ShareIcon w={{base:"18px", lg:"24px"}} h={{base:"18px",lg:"24px"}}/>} 
        aria-label="Share" variant="ghost"
        title="hii"
         />
         <CustomModal 
         isOpen={isOpen}
         onClose={onClose}
         title="Share link"
         >
         <Box
         display={"flex"}
         flexDirection={"column"}
         gap="16px"
         justifyContent={"center"}
         alignItems={"center"}
         >
          <Text 
          wordBreak={"break-all"}
          fontSize={"18px"}
          >{chatUrl}</Text>
          <CustomButton
          title="Copy Link"
          onClick={handleCopy}
          />
         </Box>
         </CustomModal>
        <Menu>
          <MenuButton as={Button} rounded="full" variant="link" minW={0}>
            <Avatar size="sm" src={user?.profile_image} />
          </MenuButton>
          <MenuList bg="#0f121c" border="none" color="white">
            <MenuItem>Theme</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Upgrade</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
            <MenuItem>Help</MenuItem> 
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
}
