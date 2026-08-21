'use client'

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
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'
import XpressAiLogo from '../../assets/icons/XpressAiLogo'
import GoogleAuth from './GoogleAuth'
import useUserStore from '../../hooks/storage/userStore'
import { useMutation } from '@tanstack/react-query'
import { signUpAuth } from '../../store/auth/api'

export const Signup = ()  => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const toast = useToast();
   const navigate = useNavigate();

    const [inputs, setInputs] = useState({
      email: "",
      password:"",
      confirmPassword:""
    });
  
   const { setUser } = useUserStore((state) => state );
  
    const handleChange = (e) => {
      setInputs(prev => ({...prev,[e.target.name]:e.target.value}))
    }

      const { mutate:submitLogin, isLoading } = useMutation(signUpAuth,{
        onSuccess:(response) => {
         toast({
              title: "Signup Successful",
              description: response.detail || "Welcome!",
              status: "success",
              duration: 4000,
              isClosable: true,
            });
    
          // Save user data locally
          // setUser(response);
          navigate("/login");

        },
        onError : (error) => {
             toast({
              title: "Login failed",
              description: error?.response?.data?.error,
              status: "error",
              duration: 4000,
              isClosable: true,
            });
        }
      })
    
       const handleSubmit = async(e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = inputs;
    
      if (!email || !password || !confirmPassword) {
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
          password:inputs?.password,
          confirm_password:inputs?.confirmPassword
        }
        submitLogin(payload)
      }
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', '#0f121c')}>
      <Stack 
      // border={"1px solid red"} 
      spacing={8} 
      mx={'auto'} 
      w={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading as={RouterLink} to={"/"} display={"flex"} alignItems={"center"} fontSize={'4xl'} textAlign={'center'}>
            <XpressAiLogo width="48px" height="49px"/>
            press AI
          </Heading>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', '#0f121c')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
          <Stack spacing={4} pt={2}>
            {/* <Button
               leftIcon={<FcGoogle/>}
               borderRadius="8px"
                border="1px solid rgba(158, 158, 158, 0.20)"
              >
             Continue with Google
           </Button> */}

            <GoogleAuth loadingMessage ="Signing up..."/>

           {/* <Button
               leftIcon={<FaApple/>}
               borderRadius="8px"
                border="1px solid rgba(158, 158, 158, 0.20)"
              >
             Continue with Apple
           </Button> */}
            </Stack>

            <Divider my={"32px"}/>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email" 
              placeholder='Enter your email'
              name="email"
              value={inputs?.email}
              onChange={handleChange}
               />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input 
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                name="password"
                value={inputs?.password}
                onChange={handleChange}
                 />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword">
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input 
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={inputs?.confirmPassword}
                onChange={handleChange}
                placeholder='Enter Confirm password'
                 />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() => setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword)}>
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
               <Button
               borderRadius="8px"
               bgGradient="linear(to-r, #173685 0%, rgba(23, 54, 133, 0.50) 50%, #718517 100%)"
               color="white"
              _hover={{
              bgGradient: "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)",
              }}
              isLoading={isLoading}
              onClick={handleSubmit}
              >
             Create Account
           </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Text color={'blue.400'} as={RouterLink} to="/login">Login</Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}