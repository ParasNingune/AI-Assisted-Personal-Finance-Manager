import React from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
  Container,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell, 
  Legend
} from 'recharts';
import Navbar from '../../components/Navbar';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  VStack,
  useDisclosure,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { RiRobot2Fill } from 'react-icons/ri';
import { DownloadIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaWallet, FaArrowUp } from 'react-icons/fa';

// Move the data array inside the component
export default function Income() {
  const data = [
    { date: '3rd Jan', category: 'Salary', amount: 500 },
    { date: '4th Jan', category: 'Stocks', amount: 150 },
    { date: '5th Jan', category: 'Salary', amount: 250 },
    { date: '6th Jan', category: 'MF', amount: 150 },
    { date: '7th Jan', category: 'Returned', amount: 600 },
    { date: '8th Jan', category: 'MF', amount: 450 },
    { date: '10th Jan', category: 'Returned', amount: 750 },
    { date: '12th Jan', category: 'Salary', amount: 850 },
    { date: '10th Feb', category: 'Salary', amount: 600 },
    { date: '13th Feb', category: 'Stocks', amount: 650 },
    { date: '15th Feb', category: 'Stocks', amount: 250 },
  ];

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const lineColor = useColorModeValue('#805AD5', '#B794F4');
  const pageBg = useColorModeValue('rgb(236, 237, 243)', 'gray.900');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const iconBg = useColorModeValue('purple.50', 'purple.900');
  const amountBg = useColorModeValue('green.50', 'green.900');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const categoryData = Object.values(data.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { name: item.category, value: 0 };
    }
    acc[item.category].value += item.amount;
    return acc;
  }, {}));

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box bg={pageBg} minH="100vh">
      <Navbar />
      <Container maxW="9xl" p={10}>
        <Box display="flex" flexDirection="column" gap={8}>
          {/* Chart Box */}
          <Box
            bg={bgColor}
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.05)"
            _hover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            transition="all 0.3s ease"
            p={6}
            mt={16}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Box>
                <Heading size="lg" mb={2}>Income Overview</Heading>
                <Text color={textColor} fontSize="sm">
                  Track your income trends over time and gain insights into your earnings.
                </Text>
              </Box>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="purple"
                variant="solid"
                size="md"
                onClick={onOpen}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                Add Income
              </Button>
            </Flex>

            <Box h="300px" mt={8}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ bottom: 30 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fill: textColor, 
                      fontSize: 12,
                      angle: -45,
                      textAnchor: 'end',
                      dy: 10
                    }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: textColor, fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: bgColor,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke={lineColor}
                    fill={lineColor}
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: lineColor, strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          // Replace the existing donut chart Box with this new version
          <Box
            bg={bgColor}
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.05)"
            _hover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            transition="all 0.3s ease"
            p={6}
          >
            <VStack spacing={1} align="center" mb={4}>
              <Heading size="md">Income by Category</Heading>
              <Text color={textColor} fontSize="sm">January - December 2023</Text>
            </VStack>
            
            <Box h="300px" position="relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={110}
                    fill={lineColor}
                    paddingAngle={5}
                    strokeWidth={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        stroke={bgColor}
                      />
                    ))}
                    <Text
                      content={({ viewBox }) => (
                        <g>
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="central"
                            className="total-amount"
                            style={{
                              fontSize: '28px',
                              fontWeight: 'bold',
                              fill: textColor
                            }}
                          >
                            ${totalAmount}
                          </text>
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy + 25}
                            textAnchor="middle"
                            dominantBaseline="central"
                            style={{
                              fontSize: '14px',
                              fill: textColor,
                              opacity: 0.7
                            }}
                          >
                            Total Income
                          </text>
                        </g>
                      )}
                    />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: bgColor,
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                    formatter={(value) => [`$${value}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          {/* Table Box */}
          <Box
            bg={bgColor}
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.05)"
            _hover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            transition="all 0.3s ease"
            p={6}
          >
            <Flex justify="space-between" align="center" mb={3}>
              <Heading size="md">All Income</Heading>
              <Button
                leftIcon={<DownloadIcon />}
                variant="ghost"
                size="sm"
                color={textColor}
                _hover={{ bg: hoverBg }}
              >
                Download
              </Button>
            </Flex>

            <Box maxH="500px" overflowY="auto" borderRadius="lg">
              <Table variant="simple">
                <Thead position="sticky" top={0} bg={bgColor} zIndex={2}>
                  <Tr>
                    <Th borderTopRadius="lg" width="50%">Transaction</Th>
                    <Th borderTopRadius="lg" width="50%">Transaction</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Array.from({ length: Math.ceil(data.length / 2) }).map((_, rowIndex) => (
                    <Tr key={rowIndex}>
                      {[0, 1].map((colIndex) => {
                        const transaction = data[rowIndex * 2 + colIndex];
                        return transaction ? (
                          <Td key={colIndex}>
                            <Box
                              p={3}
                              borderRadius="lg"
                              transition="all 0.2s"
                              position="relative"
                              _hover={{ 
                                bg: hoverBg,
                                transform: 'translateY(-1px)',
                                boxShadow: 'sm',
                                '& .delete-icon': { opacity: 1 }
                              }}
                              border="1px solid"
                              borderColor={borderColor}
                            >
                              <Flex justify="space-between" align="center">
                                <HStack spacing={3}>
                                  <Box
                                    p={2}
                                    bg={iconBg}
                                    borderRadius="25"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                  >
                                    <Icon as={FaWallet} color="purple.500" boxSize={6} />
                                  </Box>
                                  <Box ml={10}>
                                    <Text fontSize="lg" fontWeight="semibold" mb={1.5}>
                                      Income
                                    </Text>
                                    <Text fontSize="sm" color={"gray.500"}>
                                      {transaction.date}
                                    </Text>
                                  </Box>
                                </HStack>
                                <HStack spacing={2}>
                                  <Icon
                                    as={DeleteIcon}
                                    color="red.400"
                                    boxSize={3.5}
                                    cursor="pointer"
                                    opacity={0}
                                    className="delete-icon"
                                    transition="all 0.2s"
                                    _hover={{ 
                                      color: 'red.500',
                                      transform: 'scale(1.1)'
                                    }}
                                  />
                                  <Box
                                    bg={amountBg}
                                    px={3}
                                    py={1.5}
                                    borderRadius="md"
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                  >
                                    <Text color="green.500" fontWeight="semibold" fontSize="md">
                                      +${transaction.amount}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Flex>
                            </Box>
                          </Td>
                        ) : <Td key={colIndex}></Td>;
                      })}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Add Modal here, before the closing Box tag */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Income</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Box w="full">
                <HStack spacing={4} mb={6}>
                  <Box
                    p={3}
                    bg={iconBg}
                    borderRadius="xl"
                    cursor="pointer"
                    _hover={{ bg: 'purple.100' }}
                  >
                    <Icon as={FaWallet} boxSize={6} color="purple.500" />
                  </Box>
                  <Text fontWeight="medium">Change Icon</Text>
                </HStack>
                
                <Text mb={2} fontWeight="medium">Income Source</Text>
                <Input 
                  placeholder="Freelance Development"
                  size="lg"
                  bg="gray.50"
                />
                
                <Text mt={4} mb={2} fontWeight="medium">Amount</Text>
                <InputGroup size="lg">
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    fontSize="lg"
                    children="$"
                  />
                  <Input 
                    placeholder="5000"
                    bg="gray.50"
                  />
                </InputGroup>
                
                <Text mt={4} mb={2} fontWeight="medium">Date</Text>
                <Input 
                  type="date"
                  size="lg"
                  bg="gray.50"
                />
                
                <HStack spacing={4} width="full" mt={8} mb={4}>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    width="full"
                    leftIcon={<RiRobot2Fill />}
                    variant="outline"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Add with AI
                  </Button>
                  <Button
                    colorScheme="purple"
                    size="lg"
                    width="full"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                  >
                    Add Income
                  </Button>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
