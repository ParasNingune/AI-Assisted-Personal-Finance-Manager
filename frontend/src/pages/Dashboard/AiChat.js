import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Input,
  Button,
  VStack,
  Text,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { RiRobotFill, RiUserFill } from 'react-icons/ri';
import Navbar from '../../components/Navbar';

export default function AiChat() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm your AI financial assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const pageBg = useColorModeValue('rgb(236, 237, 243)', 'gray.900');
  const userBubbleBg = useColorModeValue('purple.500', 'purple.200');
  const botBubbleBg = useColorModeValue('gray.100', 'gray.700');
  const userTextColor = useColorModeValue('white', 'gray.800');
  const botTextColor = useColorModeValue('gray.800', 'white');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const userMessage = input;
    setInput('');

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm processing your request. This is a placeholder response. In the actual implementation, this would be connected to your AI backend.",
        isBot: true
      }]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box bg={pageBg} minH="100vh">
      <Navbar />
      <Container maxW="5xl" p={{ base: 4, md: 10 }}>
        <Box
          bg={bgColor}
          borderRadius="2xl"
          boxShadow="xl"
          overflow="hidden"
          h="calc(100vh - 150px)"
          display="flex"
          flexDirection="column"
          p={8}
          mt={20}
        >
          {/* Messages Area */}
          <VStack
            flex="1"
            overflowY="auto"
            p={6}
            spacing={4}
            align="stretch"
            css={{
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#cbd5e0',
                borderRadius: '24px',
              },
            }}
          >
            {messages.map((message, index) => (
              <Flex
                key={index}
                justify={message.isBot ? 'flex-start' : 'flex-end'}
                align="center"
              >
                {message.isBot && (
                  <Box
                    mr={2}
                    bg="purple.500"
                    p={2}
                    borderRadius="full"
                    color="white"
                  >
                    <RiRobotFill size={20} />
                  </Box>
                )}
                <Box
                  maxW="70%"
                  bg={message.isBot ? botBubbleBg : userBubbleBg}
                  color={message.isBot ? botTextColor : userTextColor}
                  py={3}
                  px={6}
                  borderRadius="2xl"
                  fontSize="md"
                >
                  <Text>{message.text}</Text>
                </Box>
                {!message.isBot && (
                  <Box
                    ml={2}
                    bg="purple.500"
                    p={2}
                    borderRadius="full"
                    color="white"
                  >
                    <RiUserFill size={20} />
                  </Box>
                )}
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input Area */}
          <Box p={4} borderTop="1px" borderColor="gray.200">
            <InputGroup size="lg">
              <Input
                pr="4.5rem"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                bg={useColorModeValue('gray.50', 'gray.700')}
              />
              <InputRightElement width="4.5rem">
                <IconButton
                  h="1.75rem"
                  size="sm"
                  icon={<FiSend />}
                  colorScheme="purple"
                  onClick={handleSend}
                  isDisabled={!input.trim()}
                />
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}