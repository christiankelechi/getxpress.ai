import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";


// For animation
const MotionModalContent = motion(ModalContent);

const positionMap = {
  center: { justifyContent: "center", alignItems: "center" },
  bottom: { justifyContent: "center", alignItems: "flex-end" },
  top: { justifyContent: "center", alignItems: "flex-start" },
  "top-left": { justifyContent: "flex-start", alignItems: "flex-start" },
  "bottom-right": { justifyContent: "flex-end", alignItems: "flex-end" },
};

export const CustomModal = ({
  isOpen,
  onClose,
  title = "Custom Modal",
  children,
  position = "center",
  size = "md",
}) => {
  const modalPosition = positionMap[position] || positionMap.center;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={position === "center"}
      motionPreset="slideInBottom"
    >
      <ModalOverlay
        display="flex"
        {...modalPosition}
        bg={"rgba(110, 111, 119, 0.30)"}
      />
      <MotionModalContent
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        borderRadius="lg"
        shadow="xl"
        maxW={size}
        mx="2"
        bg={"#0f121c"}
        minH={"233px"}
        px={"10px"}
      >
        <ModalHeader>{title}</ModalHeader>
         <Divider/>
        <ModalCloseButton />
        <ModalBody
        display={"flex"}
        alignItems={"center"}
        >{children}
        </ModalBody>
      </MotionModalContent>
    </Modal>
  );
};

