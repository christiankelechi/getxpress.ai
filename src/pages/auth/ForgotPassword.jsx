"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import XpressAiLogo from "../../assets/icons/XpressAiLogo";
import { FaApple } from "react-icons/fa";
import GoogleAuth from "./GoogleAuth";
import { useMutation } from "@tanstack/react-query";
import { loginAuth } from "../../store/auth/api";
import useUserStore from "../../hooks/storage/userStore";

export const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });

  const { setUser } = useUserStore((state) => state);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // call use mutation

  const { mutate: submitLogin, isLoading } = useMutation(loginAuth, {
    onSuccess: (response) => {
      toast({
        title: "Login Successful",
        description: response.data?.message || "Welcome!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      // Save user data locally
      setUser(response.data);
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error?.response?.data?.error,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = inputs;

    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please fill all the necessary details.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      email: inputs?.email,
      password: inputs?.password,
      code: inputs?.code,
    };
    submitLogin(payload);
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "#0f121c")}
    >
      <Stack
        // border={"1px solid red"}
        spacing={8}
        mx={"auto"}
        w={"lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading
            as={RouterLink}
            to={"/"}
            display={"flex"}
            alignItems={"center"}
            fontSize={"4xl"}
            textAlign={"center"}
          >
            <XpressAiLogo width="48px" height="49px" />
            press AI
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "#0f121c")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={"20px"}>
            <Heading as={"h3"} fontSize={{ base: "24", lg: "32px" }}>
              Forgotten Password ?{" "}
            </Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={inputs?.email}
                onChange={handleChange}
              />
            </FormControl>

            {/* code and send code button */}
            <Stack
              direction={"row"}
              gap={"9px"}
              justifyContent={"space-between"}
            >
              <FormControl id="code" flexBasis={"50%"}>
                <Input
                  type="text"
                  name="code"
                  placeholder="#code"
                  value={inputs?.code}
                  onChange={handleChange}
                  padding={"20px"}
                />
              </FormControl>
              <Button
                flexBasis={"50%"}
                padding={"20px"}
                borderRadius="8px"
                border="1px solid rgba(158, 158, 158, 0.20)"
                // bgGradient="linear(to-r, #173685 0%, rgba(23, 54, 133, 0.50) 50%, #718517 100%)"
                color="white"
                _hover={{
                  bgGradient:
                    "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)",
                }}
                // isLoading={isLoading}
              >
                Send
              </Button>
            </Stack>
            <FormControl id="newPassword">
              <FormLabel>Enter New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your new password"
                  onChange={handleChange}
                  value={inputs?.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirmNewPassword">
              <FormLabel>Confirm New Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Confirm your new password"
                  value={inputs?.confirmPassword}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={6}>
              <Button
                borderRadius="8px"
                border="1px solid rgba(158, 158, 158, 0.20)"
                // bgGradient="linear(to-r, #173685 0%, rgba(23, 54, 133, 0.50) 50%, #718517 100%)"
                color="white"
                _hover={{
                  bgGradient:
                    "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)",
                }}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
