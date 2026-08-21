import React, { useState, useEffect, useRef } from "react";
import { Box, Flex, Text, IconButton, VStack, HStack, keyframes, Spinner, Center } from "@chakra-ui/react";
import { FiMic, FiMicOff, FiVideo, FiVideoOff, FiX } from "react-icons/fi";
import * as faceapi from "face-api.js";

const pulseAnim = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0.7); }
  70% { box-shadow: 0 0 0 20px rgba(66, 153, 225, 0); }
  100% { box-shadow: 0 0 0 0 rgba(66, 153, 225, 0); }
`;

export default function AvatarCall({ onClose, onSendMessage, isProcessing, aiResponse }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [emotion, setEmotion] = useState("neutral");
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const videoRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        if (text.trim()) {
          onSendMessage(text, emotion);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [emotion, onSendMessage]);

  // Handle AI speaking back (TTS)
  useEffect(() => {
    if (aiResponse) {
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      synth.speak(utterance);
    }
  }, [aiResponse]);

  const toggleListen = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setTranscript("");
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  return (
    <Flex direction="column" h="full" w="full" bg="#0f121c" color="white" position="relative" borderRadius="xl" overflow="hidden">
      {/* Top Header */}
      <HStack justify="space-between" p={4} bg="rgba(0,0,0,0.5)">
        <Text fontSize="lg" fontWeight="bold">AI Tutor (Voice & Emotion)</Text>
        <IconButton icon={<FiX />} onClick={onClose} variant="ghost" color="white" _hover={{ bg: "red.500" }} />
      </HStack>

      {/* Main Avatar Area */}
      <Center flex="1" position="relative">
        <Box
          w="150px"
          h="150px"
          borderRadius="full"
          bg={isProcessing || isListening ? "blue.500" : "gray.700"}
          animation={isProcessing || aiResponse ? `${pulseAnim} 2s infinite` : "none"}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="xl"
          transition="all 0.3s"
        >
          {isProcessing ? <Spinner size="xl" color="white" /> : <Text fontSize="4xl">🤖</Text>}
        </Box>
        <Text position="absolute" bottom="20%" fontSize="md" color="gray.400">
          {isProcessing ? "AI is thinking..." : aiResponse ? "AI is speaking..." : isListening ? "Listening..." : "Tap mic to speak"}
        </Text>
      </Center>

      {/* User Camera Mini-View */}
      <Box position="absolute" bottom="80px" right="20px" w="120px" h="160px" bg="black" borderRadius="md" overflow="hidden" border="2px solid" borderColor="gray.600">
        <video ref={videoRef} autoPlay muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        {!isCameraOn && <Center h="full"><Text fontSize="xs">Camera Off</Text></Center>}
        {isCameraOn && <Box position="absolute" top={1} right={1} bg="rgba(0,0,0,0.6)" px={2} borderRadius="md"><Text fontSize="2xs">Emotion: {emotion}</Text></Box>}
      </Box>

      {/* Bottom Controls */}
      <HStack justify="center" p={4} spacing={6} bg="rgba(0,0,0,0.5)">
        <IconButton
          icon={isCameraOn ? <FiVideo /> : <FiVideoOff />}
          onClick={isCameraOn ? stopVideo : startVideo}
          colorScheme={isCameraOn ? "blue" : "gray"}
          isRound
          size="lg"
        />
        <IconButton
          icon={isListening ? <FiMic /> : <FiMicOff />}
          onClick={toggleListen}
          colorScheme={isListening ? "red" : "blue"}
          isRound
          size="lg"
          animation={isListening ? `${pulseAnim} 1.5s infinite` : "none"}
        />
      </HStack>
    </Flex>
  );
}
