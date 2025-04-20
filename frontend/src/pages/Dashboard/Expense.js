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
  Grid,
  GridItem,
  Image,
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
  useToast,
} from '@chakra-ui/react';
import { DownloadIcon, DeleteIcon } from '@chakra-ui/icons';
import EmojiPicker from 'emoji-picker-react';
import axiosInstance from '../../utils/axiosInstance';

export default function Expense() {

  const [expenseData, setexpenseData] = useState([]);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const lineColor = useColorModeValue('#805AD5', '#B794F4');
  const pageBg = useColorModeValue('rgb(236, 237, 243)', 'gray.900');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
   const toast = useToast();
  
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const iconBg = useColorModeValue('purple.50', 'purple.900');
  const amountBg = useColorModeValue('green.50', 'green.900');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [expense, setexpense] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) => setexpense({...expense, [key]: value});

  const handleAddWithAI = () => {};

  const categoryData = Object.values(expenseData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { name: item.category, value: 0 };
    }
    acc[item.category].value += item.amount;
    return acc;
  }, {}));

  const totalAmount = categoryData.reduce((sum, item) => sum + item.value, 0);


  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('💰');
  const [selectedEmojiUrl, setSelectedEmojiUrl] = useState("");
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

  const formatexpenseChartData = () => {
    const grouped = {};
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    expenseData.forEach((entry) => {
      const entryDate = new Date(entry.date);
      if (entryDate >= thirtyDaysAgo && entryDate <= now) {
        const key = entryDate.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        });

        if (!grouped[key]) {
          grouped[key] = 0;
        }

        grouped[key] += entry.amount;
      }
    });

    // Return only days with transactions (no empty points)
    return Object.entries(grouped).map(([date, amount]) => ({
      date,
      amount,
    })).reverse();
  };

  let chartData = formatexpenseChartData();

  // Fetch expense details
  const fetchexpenseDetails = async () => {
    try {
      const response = await axiosInstance.get("/expense/get");

      if (response.data) {
        setexpenseData(response.data);
      }
    } catch (error) {
      console.error('Error fetching expense details:', error);
    }
  };

  const handleAddexpense = async () => { // Changed to use the expense state directly
    if (!expense.source) {
      toast({
        title: 'Source Required',
        description: 'Please enter an expense source',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!expense.amount || isNaN(expense.amount) || Number(expense.amount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount greater than 0',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (!expense.date) {
      toast({
        title: 'Date Required',
        description: 'Please select a date',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await axiosInstance.post("/expense/add", {
        source: expense.source,
        amount: Number(expense.amount),
        date: expense.date,
        icon: expense.icon || '💰', // Use default emoji if none selected
      });

      toast({
        title: 'Success',
        description: 'expense added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Reset form and refresh data
      setexpense({
        source: "",
        amount: "",
        date: "",
        icon: "",
      });
      onClose(); // Close the modal
      fetchexpenseDetails();
      chartData = formatexpenseChartData() // Refresh the expense data
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add expense. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleDeleteClick = async (id) => {
    try {
      await axiosInstance.delete(`/expense/${id}`);

      setIsDeleteAlertOpen(false);

      fetchexpenseDetails();
      chartData = formatexpenseChartData()
    } catch (error) {
      console.error('Error deleting expense transaction:', error);
    }
  };


  const formattedData = [...expenseData]
  .map(item => ({
    ...item,
    date: new Date(item.date),
  }))
  .sort((a, b) => a.date - b.date);

  const groupedBySource = Object.values(
    expenseData.reduce((acc, item) => {
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
    expenseData.reduce((acc, item) => {
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


  useEffect(() => {
    fetchexpenseDetails();
  }, []);

  return (
    <Box bg={pageBg} minH="100vh">
      {console.log(expenseData)}
      <Navbar />
      <Container maxW="9xl" p={{ base: 4, md: 10 }}>
        <Box display="flex" flexDirection="column" gap={6}>

          
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
                  Expense Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your expense trends over time and gain insights into your earnings.
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
                Add Expense
              </Button>
            </Flex>

            {/* Area Chart Overall expense */}
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
                    stroke="#E53E3E" 
                    fill="#FED7D7"
                    fillOpacity={0.7}
                    strokeWidth={2}
                    dot={{ fill: "#E53E3E", strokeWidth: 3 }}
                    activeDot={{ r: 8 }} 
                    />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Grid
            templateColumns="repeat(5, 1fr)"
            templateRows="repeat(2, 1fr)"
            gap={6}
          >
            <GridItem colSpan={2} rowSpan={1}>

          {/* Pie Chart */}
            <Box
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
              w={"85%"}
            >
              <VStack spacing={2} align="center" mb={6}>
                <Box>
                  <Heading size="lg" mb={3} color={"black"}>
                    Expense by Category
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand expense distribution across different sources.</Text>
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
                                Total expense
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
            </GridItem>

            <GridItem colSpan={2} rowSpan={1}>

            {/* Bar Chart */}
            <Box
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
              w={"117%"}
              ml={-"20"}
            >
              <VStack spacing={2} align="center" mb={6}>
                <Box>
                  <Heading size="lg" mb={3} color={"black"}>
                    Expense Distribution
                  </Heading>
                  <Text color={textColor} fontSize="md">Understand your spending analytics</Text>
                </Box>
              </VStack>


              <Box h="300px" position="relative">
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
                      formatter={(value) => [`$${value}`, 'Monthly expense']}
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
          </GridItem>


          <GridItem colSpan={1} rowSpan={2}>
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
              <Heading size="lg" color={"black"} fontWeight={"bold"}>
                All Expenses
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

            <Box
              maxH="795px"
              overflowY="auto"
              borderRadius="2xl"
              boxShadow="inner"
              maxW="400px"
            >
              <Table variant="simple">
                <Thead position="sticky" top={0} bg={bgColor} zIndex={2}>
                  <Tr>
                    <Th borderTopRadius="lg">Transaction</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {expenseData.map((transaction) => (
                    <Tr key={transaction._id}>
                      <Td>
                        <Box
                          p={3}
                          borderRadius="lg"
                          transition="all 0.2s"
                          position="relative"
                          _hover={{
                            bg: hoverBg,
                            transform: 'translateY(-1px)',
                            boxShadow: 'sm',
                            '& .delete-icon': { opacity: 1 },
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
                                {transaction.icon.startsWith('http') ? (
                                  <Image src={transaction.icon} alt="emoji" boxSize="24px" />
                                ) : (
                                  <Text fontSize="xl">{transaction.icon || '💰'}</Text>
                                )}
                              </Box>
                              <Box ml={4}>
                                <Text fontSize="lg" fontWeight="semibold" mb={1.5}>
                                  {transaction.source}
                                </Text>
                                <Text fontSize="sm" color="gray.500">
                                  {new Date(transaction.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric',
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
                                  transform: 'scale(1.1)',
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
                                <Text color="red.500" fontWeight="semibold" fontSize="md">
                                  -${transaction.amount}
                                </Text>
                              </Box>
                            </HStack>
                          </Flex>
                        </Box>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>

          </Box>
          </GridItem>

          <GridItem colSpan={4} rowSpan={1}>
          <Box
            bg={bgColor}
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="xl"
            _hover={{ boxShadow: '2xl' }}
            transition="all 0.3s ease"
            p={8}
          >
              <Box mb={2}>
                <Heading size="lg" mb={3} color={"black"}>
                  30 Day's Expense Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your last 30days expense trends over time and gain insights into your earnings.
                </Text>
              </Box>

            <Box h="300px">
              <ResponsiveContainer width="100%" height="95%">
              <AreaChart
                data={chartData}
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
                    stroke="#E53E3E"
                    fill="#FED7D7"
                    fillOpacity={0.7}
                    strokeWidth={2}
                    dot={{ fill: "#E53E3E", strokeWidth: 3 }}
                    activeDot={{ r: 8 }}
                  />

                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          </GridItem>
        </Grid>
        </Box>
      </Container>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent borderRadius="2xl" p={4}>
          <ModalHeader>
            <Heading size="lg" color={"black"}>
              Add Expense
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <VStack spacing={4}>
              <Box w="full">
                <HStack spacing={4} mb={6}>
                <Box
                  p={3}
                  bg="purple.100"
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
                  {selectedEmojiUrl ? (
                    <Image src={selectedEmojiUrl} alt="emoji" boxSize="30px" />
                  ) : (
                    <Text fontSize="3xl" lineHeight="1">
                      {selectedEmoji}
                    </Text>
                  )}

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
                          setSelectedEmoji(emojiObject.emoji); // emoji character
                          setSelectedEmojiUrl(emojiObject.imageUrl); // emoji image URL
                          handleChange("icon", emojiObject.imageUrl); // save URL to form
                          setShowEmojiPicker(false);
                        }}
                        lazyLoadEmojis={true}
                        searchPlaceholder="Search emoji..."
                        previewConfig={{
                          showPreview: true,
                          defaultCaption: "Pick an emoji for your expense category"
                        }}
                      />
                    </Box>
                  )}
                </Box>

                  <Text fontWeight="medium">Change Icon</Text>
                </HStack>
                
                <Text mb={2} fontWeight="medium">Expense Source</Text>
                <Input 
                  value={expense.source}
                  placeholder="Rent"
                  size="lg"
                  bg="gray.50"
                  onChange={({target}) => handleChange("source", target.value)}
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
                    value={expense.amount}
                    onChange={({target}) => handleChange("amount", target.value)}
                  />
                </InputGroup>
                
                <Text mt={4} mb={2} fontWeight="medium">Date</Text>
                <Input 
                  value={expense.date}
                  type="date"
                  size="lg"
                  bg="gray.50"
                  onChange={({target}) => handleChange("date", target.value)}
                />
                
                <HStack spacing={4} width="full" mt={8} mb={4}>
                  <Button
                    colorScheme="purple"
                    size="lg"
                    width="full"
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                    }}
                    onClick={handleAddexpense}
                  >
                    Add Expense
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