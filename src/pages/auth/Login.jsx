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
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import XpressAiLogo from '../../assets/icons/XpressAiLogo'
import { FaApple } from 'react-icons/fa'
import GoogleAuth from './GoogleAuth'
import { useMutation } from '@tanstack/react-query'
import { loginAuth } from '../../store/auth/api'
import useUserStore from '../../hooks/storage/userStore'

export const Login = ()  => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
    const [inputs, setInputs] = useState({
     email: "",
    password:""
  });

 const { setUser } = useUserStore((state) => state );
 const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({...prev,[e.target.name]:e.target.value}))
  }

  // call use mutation
  
  const { mutate:submitLogin, isLoading } = useMutation(loginAuth,{
    onSuccess:(response) => {
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
      password:inputs?.password
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
           
           <GoogleAuth loadingMessage ="Signing in..."/>

           {/* <Button
               leftIcon={<FaApple/>}
               borderRadius="8px"
                border="1px solid rgba(158, 158, 158, 0.20)"
              //  border="1px solid rgba(158, 158, 158, 0.20)"
              _hover={{
              // bgGradient: "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)",
              }}
              >
             Continue with Apple
           </Button> */}
            </Stack>

            <Divider my={"32px"}/>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
              type="email" 
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
                name="password" 
                onChange={handleChange} 
                value={inputs?.password}
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
            <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Checkbox>Remember me</Checkbox>
              <Text color={'blue.500'} as={RouterLink} to="/forgot-password">Forgot password?</Text>
            </Stack>
            <Button
             borderRadius="8px"
             //  border="1px solid rgba(158, 158, 158, 0.20)"
              bgGradient="linear(to-r, #173685 0%, rgba(23, 54, 133, 0.50) 50%, #718517 100%)"
              color="white"
             _hover={{
             bgGradient: "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)",
             }}
             isLoading={isLoading}
             onClick={handleSubmit}
            >
              Log in
            </Button>
             </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Do not have an account ? <Text color={'blue.400'} as={RouterLink} to="/register">Signup</Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}