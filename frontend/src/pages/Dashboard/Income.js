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
  Label,
  BarChart,
  Bar
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
  FormLabel,
} from '@chakra-ui/react';
import { RiRobot2Fill } from 'react-icons/ri';
import { DownloadIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaWallet, FaArrowUp } from 'react-icons/fa';

export default function Income() {
  const data = [
    { date: '3rd Jan 2025', category: 'Salary', amount: 500 },
    { date: '4th Jan 2025', category: 'Stocks', amount: 150 },
    { date: '5th Jan 2025', category: 'Salary', amount: 250 },
    { date: '6th Jan 2025', category: 'MF', amount: 150 },
    { date: '7th Jan 2025', category: 'Returned', amount: 600 },
    { date: '8th Jan 2025', category: 'MF', amount: 450 },
    { date: '10th Jan 2025', category: 'Returned', amount: 750 },
    { date: '12th Jan 2025', category: 'Salary', amount: 850 },
    { date: '10th Feb 2025', category: 'Salary', amount: 600 },
    { date: '13th Feb 2025', category: 'Stocks', amount: 650 },
    { date: '15th Feb 2025', category: 'Stocks', amount: 250 },
    { date: '7th March 2025', category: 'Returned', amount: 600 },
    { date: '8th March 2025', category: 'MF', amount: 450 },
    { date: '10th March 2025', category: 'Returned', amount: 750 },
    { date: '12th March 2025', category: 'Salary', amount: 850 },
    { date: '10th April 2025', category: 'Salary', amount: 600 },
    { date: '13th April 2025', category: 'Stocks', amount: 650 },
    { date: '15th April 2025', category: 'Stocks', amount: 250 },
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

  const monthlyData = data.reduce((acc, item) => {
    const month = item.date.split(' ')[1];
    if (!acc[month]) {
      acc[month] = { month: month, amount: 0 };
    }
    acc[month].amount += item.amount;
    return acc;
  }, {});
  
  const monthlyChartData = Object.values(monthlyData);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <Box bg={pageBg} minH="100vh">
      <Navbar />
      <Container maxW="9xl" p={{ base: 4, md: 10 }}>
        <Box display="flex" flexDirection="column" gap={6}>
          {/* Chart Box */}
          <Box
            bg={bgColor}
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="xl"
            _hover={{ boxShadow: '2xl' }}
            transition="all 0.3s ease"
            p={8}
            mt={20}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Heading size="lg" mb={3} bgGradient="linear(to-r, purple.500, purple.300)" bgClip="text">
                  Income Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your income trends over time and gain insights into your earnings.
                </Text>
              </Box>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="purple"
                variant="solid"
                size="lg"
                onClick={onOpen}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                rounded="2xl"
              >
                Add Income
              </Button>
            </Flex>

            <Box h="350px" mt={8}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fill: textColor, 
                      fontSize: 12,
                      angle: -15,
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

          <Box display="flex" gap={8}>
            <Box
              flex="0.30"
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
            >
              <VStack spacing={2} align="center" mb={6}>
                <Box>
                  <Heading size="lg" mb={3} bgGradient="linear(to-r, purple.500, purple.300)" bgClip="text">
                    Income by Category
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand income distribution across different sources.</Text>
                </Box>
              </VStack>
              
              <Box h="280px" position="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={130}
                      fill={lineColor}
                      paddingAngle={3}
                      strokeWidth={2}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS[index % COLORS.length]}
                          stroke={bgColor}
                        />
                      ))}
                      <Label
                        content={({ viewBox }) => {
                          const { cx, cy } = viewBox;
                          return (
                            <g>
                              <text
                                x={cx}
                                y={cy - 10}
                                textAnchor="middle"
                                dominantBaseline="central"
                                style={{
                                  fontSize: '28px',
                                  fontWeight: 'bold',
                                  fill: textColor,
                                  textAlign: 'center'
                                }}
                              >
                                ${totalAmount}
                              </text>
                              <text
                                x={cx}
                                y={cy + 20}
                                textAnchor="middle"
                                dominantBaseline="central"
                                style={{
                                  fontSize: '14px',
                                  fill: textColor,
                                  opacity: 0.7,
                                  textAlign: 'center'
                                }}
                              >
                                Total Income
                              </text>
                            </g>
                          );
                        }}
                      />
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: bgColor,
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: 'lg',
                        padding: '8px 12px'
                      }}
                      formatter={(value, name) => [`$${value}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            <Box
              flex="0.40"
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
            >
              <VStack spacing={2} align="center" mb={6}>
                <Box>
                  <Heading size="lg" mb={3} bgGradient="linear(to-r, purple.500, purple.300)" bgClip="text">
                    Income Distribution
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand your spending analytics</Text>
                </Box>
              </VStack>
              
              <Box h="280px" position="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyChartData}
                    layout="horizontal"
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} opacity={0.5} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: textColor, fontSize: 12 }}
                    />
                    <YAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: textColor, fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                      width={50}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: bgColor,
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: 'lg',
                        padding: '8px 12px'
                      }}
                      formatter={(value) => [`$${value}`, 'Monthly Income']}
                    />
                    <Bar
                      dataKey="amount"
                      fill={lineColor}
                      radius={[4, 4, 0, 0]}
                      barSize={45}
                    >
                      {monthlyChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Box>

          {/* Table Box */}
          <Box
            bg={bgColor}
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="xl"
            _hover={{ boxShadow: '2xl' }}
            transition="all 0.3s ease"
            p={8}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Heading size="md" bgGradient="linear(to-r, purple.500, purple.300)" bgClip="text">
                All Income
              </Heading>
              <Button
                leftIcon={<DownloadIcon />}
                variant="ghost"
                size="md"
                color={textColor}
                _hover={{ 
                  bg: 'purple.50',
                  transform: 'translateY(-2px)',
                }}
                rounded="xl"
              >
                Download
              </Button>
            </Flex>

            <Box maxH="500px" overflowY="auto" borderRadius="2xl" boxShadow="inner">
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
                                      {transaction.category}
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

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="2xl" p={4}>
          <ModalHeader>
            <Heading size="lg" bgGradient="linear(to-r, purple.500, purple.300)" bgClip="text">
              Add Income
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
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