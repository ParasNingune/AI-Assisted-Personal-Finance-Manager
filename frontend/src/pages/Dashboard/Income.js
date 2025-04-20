import {React, useEffect, useState, useRef} from 'react';
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
  Box,
  Heading,
  Text,
  Button,
  useColorModeValue,
  Flex,
  Container,
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { RiRobot2Fill } from 'react-icons/ri';
import { DownloadIcon, DeleteIcon } from '@chakra-ui/icons';
import EmojiPicker from 'emoji-picker-react';
import axiosInstance from '../../utils/axiosInstance';

export default function Income() {

  const [incomeData, setIncomeData] = useState([]);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const lineColor = useColorModeValue('#805AD5', '#B794F4');
  const pageBg = useColorModeValue('rgb(236, 237, 243)', 'gray.900');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const iconBg = useColorModeValue('purple.50', 'purple.900');
  const amountBg = useColorModeValue('green.50', 'green.900');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const groupedIncomeData = Object.values(
    incomeData.reduce((acc, item) => {
      const dateObj = new Date(item.date);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth();
      const day = dateObj.getDate();
  
      let period = '';
      if (day <= 10) period = '1-10';
      else if (day <= 20) period = '10-20';
      else period = '20-30';
      const label = `${dateObj.toLocaleString('default', { month: 'short' })} ${year} (${period})`;
  
      if (!acc[label]) {
        acc[label] = { date: label, amount: 0 };
      }
  
      acc[label].amount += item.amount;
      return acc;
    }, {})
  ).sort((a, b) => {
    const getSortable = (str) => {
      const [monthName, yearPart] = str.split(' ');
      const month = new Date(`${monthName} 1, 2000`).getMonth();
      const year = parseInt(yearPart);
      const period = str.split('(')[1].replace(')', '');
  
      // Convert period into a numerical value (1-10, 10-20, 20-30 => 1, 2, 3)
      let periodValue = 0;
      if (period === '1-10') periodValue = 1;
      else if (period === '10-20') periodValue = 2;
      else if (period === '20-30') periodValue = 3;
  
      // Return a sortable value that factors in year, month, and period
      return year * 100 + month * 3 + periodValue;
    };
  
    return getSortable(a.date) - getSortable(b.date);
  });
  

  const categoryData = Object.values(incomeData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { name: item.category, value: 0 };
    }
    acc[item.category].value += item.amount;
    return acc;
  }, {}));

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);

  const monthlyData = incomeData.reduce((acc, item) => {
    const month = item.date.split(' ')[1];
    if (!acc[month]) {
      acc[month] = { month: month, amount: 0 };
    }
    acc[month].amount += item.amount;
    return acc;
  }, {});

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('💰');
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState(null);
  const cancelRef = useRef();

  const COLORS = [
    '#6EE7B7', // Emerald-300
    '#93C5FD', // Blue-300
    '#FDE68A', // Yellow-300
    '#FCA5A5', // Red-300
    '#C4B5FD', // Purple-300
    '#A5F3FC', // Cyan-200
    '#FBCFE8', // Pink-200
    '#DDD6FE', // Indigo-200
    '#BBF7D0', // Green-200
    '#FECDD3', // Rose-200
    '#FCD34D', // Amber-300
    '#F0ABFC', // Fuchsia-300
    '#67E8F9', // Sky-300
    '#FDBA74', // Orange-300
    '#BFDBFE', // Blue-200
  ];


  // Fetch Income details
  const fetchIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get("/income/get");

      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.error('Error fetching income details:', error);
    }
  };

  const handleAddIncome = async (income) => {
    // Add logic to handle adding income
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await axiosInstance.delete(`/income/${id}`);

      setIsDeleteAlertOpen(false);

      fetchIncomeDetails();
    } catch (error) {
      console.error('Error deleting income transaction:', error);
    }
  };

  useEffect(() => {
    fetchIncomeDetails();

    return () => {
    }
  }, []);

  
  const formattedData = [...incomeData]
  .map(item => ({
    ...item,
    date: new Date(item.date),
  }))
  .sort((a, b) => a.date - b.date);

  const groupedBySource = Object.values(
    incomeData.reduce((acc, item) => {
      if (!acc[item.source]) {
        acc[item.source] = {
          name: item.source,
          value: 0,
        };
      }
      acc[item.source].value += item.amount;
      return acc;
    }, {})
  );

  const monthlyGroupedData = Object.values(
    incomeData.reduce((acc, item) => {
      const dateObj = new Date(item.date);
      const month = dateObj.toLocaleString('default', { month: 'short' });
      const year = dateObj.getFullYear();
      const key = `${month} ${year}`;
  
      if (!acc[key]) {
        acc[key] = {
          month: key,
          amount: 0,
          sortDate: new Date(year, dateObj.getMonth()),
        };
      }
  
      acc[key].amount += item.amount;
      return acc;
    }, {})
  )
  .sort((a, b) => a.sortDate - b.sortDate)
  .map(({ sortDate, ...rest }) => rest); 


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
                <Heading size="lg" mb={3} color={"black"}>
                  Income Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your income trends over time and gain insights into your earnings.
                </Text>
              </Box>
              <Button
                leftIcon={<AddIcon />}
                colorScheme="purple"
                variant="outline"
                fill="purple.300"
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
              <AreaChart
                data={formattedData}
                margin={{ left: 10, right: 10, bottom: 25 }}
              >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      const d = new Date(date);
                      return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}`;
                    }}
                    stroke="black"
                    angle={-45}
                    textAnchor="end"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: textColor, fontSize: 12 }}
                  />
                  <Tooltip
                    labelFormatter={(value) => {
                      const d = new Date(value);
                      return `${d.getDate()}-${d.toLocaleString('default', { month: 'short' })}`;
                    }}
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
                    stroke="#38A169"
                    fill="#C6F6D5"
                    fillOpacity={0.7}
                    strokeWidth={2}
                    dot={{ fill: "#38A169", strokeWidth: 3 }}
                    activeDot={{ r: 8 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>


          {/* Pie Chart */}
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
                  <Heading size="lg" mb={3} color={"black"}>
                    Income by Category
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand income distribution across different sources.</Text>
                </Box>
              </VStack>
              <Box h="280px" position="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={groupedBySource}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={130}
                      fill={lineColor}
                      paddingAngle={3}
                      strokeWidth={2}
                      dataKey="value"
                      nameKey="name"
                    >
                      {groupedBySource.map((entry, index) => (
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

            {/* Bar Chart */}
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
                  <Heading size="lg" mb={3} color={"black"}>
                    Income Distribution
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand your spending analytics</Text>
                </Box>
              </VStack>


              <Box h="280px" position="relative">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyGroupedData}
                    layout="horizontal"
                    margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={true} opacity={0.5} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: textColor, fontSize: 14, fontWeight:'semibold' }}
                    />
                    <YAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: textColor, fontSize: 14, fontWeight:'semibold' }}
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
                      fill="#60A5FA"
                      radius={[4, 4, 0, 0]}
                      barSize={45}
                    />
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
              <Heading size="md" color={"black"}>
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
                  {Array.from({ length: Math.ceil(incomeData.length / 2) }).map((_, rowIndex) => (
                    <Tr key={rowIndex}>
                      {[0, 1].map((colIndex) => {
                        const transaction = incomeData[rowIndex * 2 + colIndex];
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
                                    <Icon as={transaction.icon} color="purple.500" boxSize={6} />
                                  </Box>
                                  <Box ml={10}>
                                    <Text fontSize="lg" fontWeight="semibold" mb={1.5}>
                                      {transaction.source}
                                    </Text>
                                    <Text fontSize="sm" color={"gray.500"}>
                                    {new Date(transaction.date).toLocaleDateString('en-GB', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
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
                                    onClick={() => {
                                      setTransactionToDelete(transaction._id);
                                      setIsDeleteAlertOpen(true);
                                    }}
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
            <Heading size="lg" color={"black"}>
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
                    bg={'purple.100'}
                    borderRadius="25"
                    cursor="pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    position="relative"
                    _hover={{ bg: 'purple.400' }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    boxSize="50px"
                  >
                    <Text fontSize="3xl" lineHeight="1">
                      {selectedEmoji}
                    </Text>
                    {showEmojiPicker && (
                      <Box
                        position="absolute"
                        top="100%"
                        left="0"
                        zIndex="dropdown"
                        mt={2}
                      >
                        <EmojiPicker
                          size={24}
                          onEmojiClick={(emojiObject) => {
                            setSelectedEmoji(emojiObject.emoji);
                            setShowEmojiPicker(false);
                          }}
                          lazyLoadEmojis={true}
                          searchPlaceholder="Search emoji..."
                          previewConfig={{
                            showPreview: true,
                            defaultCaption: "Pick an emoji for your income category"
                          }}
                        />
                      </Box>
                    )}
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

      <AlertDialog
        isOpen={isDeleteAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteAlertOpen(false)}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Transaction
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteAlertOpen(false)}>
                Cancel
              </Button>
              <Button 
                colorScheme="red" 
                onClick={() => handleDeleteClick(transactionToDelete)} 
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}