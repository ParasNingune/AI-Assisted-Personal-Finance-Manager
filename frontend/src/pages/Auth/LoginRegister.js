import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Container,
  FormErrorMessage,
  Switch,
  Flex,
  Stack,
  Image,
  useColorModeValue,
  HStack,
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon, EmailIcon } from '@chakra-ui/icons';
import { FaUser, FaUserTag, FaPhone, FaBirthdayCake } from 'react-icons/fa';

const LoginRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const bgcolor = useColorModeValue('gray.50', 'gray.900');
  const borderColor = useColorModeValue('gray.300', 'gray.500');
  const inputBg = useColorModeValue('gray.50', 'gray.600');
  const containerBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('black', 'white');
  const formToggleBg = useColorModeValue('gray.100', 'gray.700');
  const hoverBg = useColorModeValue('gray.800', 'gray.600');

  
  const [loginData, setLoginData] = useState({
    identifier: '',
    password: '',
  });
  
  const [registerData, setRegisterData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    age: '',
  });
  
  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const validateLoginForm = () => {
    const newErrors = {};
    if (!loginData.identifier) newErrors.identifier = 'Email, username, or phone is required';
    if (!loginData.password) newErrors.password = 'Password is required';
    
    setLoginErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!registerData.name) newErrors.name = 'Name is required';
    if (!registerData.username) newErrors.username = 'Username is required';
    
    if (!registerData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!registerData.password) {
      newErrors.password = 'Password is required';
    } else if (registerData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (registerData.age && (isNaN(registerData.age) || registerData.age < 0)) {
      newErrors.age = 'Age must be a positive number';
    }

    setRegisterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    
    try {
      console.log(loginData);
      const response = await axios.post('http://localhost:2000/api/users/login', loginData);
      
      localStorage.setItem('token', response.data.token);
      console.log(response.data.token);
      
      toast({
        title: 'Login successful',
        description: 'Welcome back to Money Mag!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      toast({
        title: 'Login failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateRegisterForm()) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://localhost:2000/api/users/register', registerData);
      
      // Store token in localStorage
      localStorage.setItem('token', response.data.token);
      
      toast({
        title: 'Registration successful',
        description: 'Welcome to Money Mag!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      toast({
        title: 'Registration failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box 
      minH="100vh" 
      bg={bgcolor}
      py={12}
    >
      <Container 
        maxW="lg" 
        py={12} 
        px={6}
        bg={containerBg}
        boxShadow="xl"
        rounded="lg"
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={6} px={6}>
          <Stack align={'center'}>
            <Image 
              src="https://jcreatenz.com/cdn/shop/files/BadBitchesOnlyMulticolour.png?v=1711864994" 
              alt="Money Mag Logo" 
              boxSize="125px" 
              fallbackSrc="https://via.placeholder.com/80?text=Money+Mag"
              mb={2}
              mt={-10}
            />
            <Heading 
              fontSize={'3xl'} 
              textAlign={'center'} 
              color={textColor}
            >
              {isLogin ? 'Welcome Back' : 'Join Money Mag'}
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'} textAlign="center">
              {isLogin 
                ? 'to manage your personal finances ✌️' 
                : 'to start your financial journey today ✌️'}
            </Text>
          </Stack>
          
          <Center>
            <Flex 
              bg={formToggleBg} 
              p={1} 
              borderRadius="full" 
              alignItems="center" 
              justifyContent="center"
              position="relative"
              w="250px"
            >
              <Box
                position="absolute"
                left={isLogin ? '2px' : '50%'}
                bg={textColor}
                w="125px"
                h="85%"
                borderRadius="full"
                transition="all 0.3s ease"
              />
              <Button 
                variant="ghost" 
                flex="1" 
                onClick={() => setIsLogin(true)}
                color={isLogin ? 'white' : 'gray.500'}
                zIndex="1"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              >
                Login
              </Button>
              <Button 
                variant="ghost" 
                flex="1" 
                onClick={() => setIsLogin(false)}
                color={!isLogin ? 'white' : 'gray.500'}
                zIndex="1"
                _hover={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              >
                Register
              </Button>
            </Flex>
          </Center>
          
          {isLogin ? (
            <Box as="form" onSubmit={handleLoginSubmit} width="100%">
              <VStack spacing={4}>
                <FormControl isInvalid={loginErrors.identifier}>
                  <FormLabel>Email / Username / Phone</FormLabel>
                  <InputGroup>
                    <Input
                      name="identifier"
                      value={loginData.identifier}
                      onChange={handleLoginChange}
                      placeholder="Email, username, or phone"
                      bg={inputBg}
                      borderColor={borderColor}
                      color={textColor}
                      _focus={{
                        borderColor: textColor,
                        boxShadow: `0 0 0 1px ${textColor}`,
                      }}
                    />
                    <InputRightElement>
                      <Box as={FaUser} color="gray.500" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{loginErrors.identifier}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={loginErrors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={loginData.password}
                      onChange={handleLoginChange}
                      placeholder="Enter your password"
                      bg={inputBg}
                      borderColor={borderColor}
                      _focus={{
                        borderColor: 'blue.500',
                        boxShadow: '0 0 0 1px blue.500',
                      }}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="sm"
                        color="gray.500"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{loginErrors.password}</FormErrorMessage>
                </FormControl>
                
                <Stack spacing={6} width="100%">
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}>
                    <Text color={'blue.500'} cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                      Forgot password?
                    </Text>
                  </Stack>
                  
                  <Button
                    type="submit"
                    colorScheme="blackAlpha"
                    width="100%"
                    size="lg"
                    isLoading={isLoading}
                    _hover={{
                      bg: hoverBg,
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg'
                    }}
                    transition="all 0.2s"
                  >
                    Sign in
                  </Button>
                </Stack>
              </VStack>
            </Box>
          ) : (
            <Box as="form" onSubmit={handleRegisterSubmit} width="100%">
              <VStack spacing={4}>
                <HStack spacing={4} width="100%">
                  <FormControl isInvalid={registerErrors.name}>
                    <FormLabel>Full Name</FormLabel>
                    <InputGroup>
                      <Input
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        placeholder="Enter your full name"
                        bg={inputBg}
                        borderColor={borderColor}
                      />
                      <InputRightElement>
                        <Box as={FaUser} color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{registerErrors.name}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={registerErrors.username}>
                    <FormLabel>Username</FormLabel>
                    <InputGroup>
                      <Input
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                        placeholder="Choose a username"
                        bg={inputBg}
                        borderColor={borderColor}
                      />
                      <InputRightElement>
                        <Box as={FaUserTag} color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{registerErrors.username}</FormErrorMessage>
                  </FormControl>
                </HStack>
                
                <FormControl isInvalid={registerErrors.email}>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <Input
                      name="email"
                      type="email"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      placeholder="Enter your email"
                      bg={inputBg}
                      borderColor={borderColor}
                    />
                    <InputRightElement>
                      <EmailIcon color="gray.500" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{registerErrors.email}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={registerErrors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={registerData.password}
                      onChange={handleRegisterChange}
                      placeholder="Create a password"
                      bg={inputBg}
                      borderColor={borderColor}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                        variant="ghost"
                        size="sm"
                        color="gray.500"
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{registerErrors.password}</FormErrorMessage>
                </FormControl>
                
                <HStack spacing={4} width="100%">
                  <FormControl isInvalid={registerErrors.phone}>
                    <FormLabel>Phone</FormLabel>
                    <InputGroup>
                      <Input
                        name="phone"
                        value={registerData.phone}
                        onChange={handleRegisterChange}
                        placeholder="Enter your phone number"
                        bg={inputBg}
                        borderColor={borderColor}
                      />
                      <InputRightElement>
                        <Box as={FaPhone} color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{registerErrors.phone}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl isInvalid={registerErrors.age}>
                    <FormLabel>Age</FormLabel>
                    <InputGroup>
                      <Input
                        name="age"
                        type="number"
                        value={registerData.age}
                        onChange={handleRegisterChange}
                        placeholder="Enter your age"
                        bg={inputBg}
                        borderColor={borderColor}
                      />
                      <InputRightElement>
                        <Box as={FaBirthdayCake} color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{registerErrors.age}</FormErrorMessage>
                  </FormControl>
                </HStack>
                
                <Button
                  type="submit"
                  colorScheme="blackAlpha"
                  width="100%"
                  size="lg"
                  mt={4}
                  isLoading={isLoading}
                  _hover={{
                    bg: hoverBg,
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                  }}
                  transition="all 0.2s"
                >
                  Create Account
                </Button>
              </VStack>
            </Box>
          )}
          
          <Stack pt={6}>
            <Text align={'center'}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Text
                as="span"
                color={textColor}
                fontWeight="bold"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={toggleForm}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Text>
            </Text>
          </Stack>
        </Stack>
      </Container>
      <Box
        position={"absolute"}
        ml={730}
        mt={10}
      >
        testuser1 -> password123 \n
        paras123 -> paras123
      </Box>
    </Box>

    
  );
};

export default LoginRegister;