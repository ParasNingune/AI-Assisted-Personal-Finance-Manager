import React, { useContext, useEffect, useState } from 'react'
import { 
  Box, 
  Container, 
  Flex, 
  Text,
  useColorModeValue,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
} from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import Navbar from '../../components/Navbar';
import SummaryCards from '../../components/SummaryCards';
import { UserContext } from '../../context/UserContext';
import { useUserAuth } from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';

export default function Homepage() {
  const toast = useToast();

  useUserAuth();

  const {user} = useContext(UserContext);
  const pageBg = useColorModeValue('rgb(236, 237, 243)', 'gray.900');
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const [transactions, setTransactions] = useState([]);
  const [incomeTransactions, setIncomeTransactions] = useState([]);
  const [expenseTransactions, setExpenseTransactions] = useState([]);


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/dashboard");
      if (response.data) {
        setTransactions(response.data);
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to fetch dashboard data. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchIncomeData = async () => {
    try {
      const response = await axiosInstance.get("/income/get");
      if (response.data) {
        setIncomeTransactions(response.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch income data. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const fetchExpenseData = async () => {
    try {
      const response = await axiosInstance.get("/expense/get");
      if (response.data) {
        setExpenseTransactions(response.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch expense data. Please try again later.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchData();
    fetchIncomeData();
    fetchExpenseData();
  }, []);

    const incomeTx = transactions?.last30Income?.transactions || [];
    const expenseTx = transactions?.last30Expenses?.transactions || [];

    const mergedMap = {};

    // Merge income
    incomeTx.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });

      if (!mergedMap[date]) mergedMap[date] = {};
      mergedMap[date].income = (mergedMap[date].income || 0) + tx.amount;
    });

    // Merge expense
    expenseTx.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });

      if (!mergedMap[date]) mergedMap[date] = {};
      mergedMap[date].expense = (mergedMap[date].expense || 0) + tx.amount;
    });

    // Only include dates that have at least one of income or expense
    const incomeData = Object.keys(mergedMap)
      .map(date => ({
        date,
        income: mergedMap[date].income || 0,
        expense: mergedMap[date].expense || 0,
      }))
      .filter(data => data.income !== 0 || data.expense !== 0); // Skip empty days

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    incomeData.sort((a, b) => {
      const [aDay, aMonth] = a.date.split(' ');
      const [bDay, bMonth] = b.date.split(' ');
      return new Date(2025, monthOrder.indexOf(aMonth), +aDay) -
            new Date(2025, monthOrder.indexOf(bMonth), +bDay);
    });





    // Create mapped list of overall income and expense
    const incomeTy = incomeTransactions;
    const expenseTy = expenseTransactions;

    const overallMergedMap = {};

    // Merge income
    incomeTy.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });

      if (!overallMergedMap[date]) overallMergedMap[date] = {};
      overallMergedMap[date].income = (overallMergedMap[date].income || 0) + tx.amount;
    });

    // Merge expense
    expenseTy.forEach(tx => {
      const date = new Date(tx.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });

      if (!overallMergedMap[date]) overallMergedMap[date] = {};
      overallMergedMap[date].expense = (overallMergedMap[date].expense || 0) + tx.amount;
    });

    // Only include dates that have at least one of income or expense
    const overAllData = Object.keys(overallMergedMap)
      .map(date => ({
        date,
        income: overallMergedMap[date].income || 0,
        expense: overallMergedMap[date].expense || 0,
      }))
      .filter(data => data.income !== 0 || data.expense !== 0);

      overAllData.sort((a, b) => {
      const [aDay, aMonth] = a.date.split(' ');
      const [bDay, bMonth] = b.date.split(' ');
      return new Date(2025, monthOrder.indexOf(aMonth), +aDay) -
            new Date(2025, monthOrder.indexOf(bMonth), +bDay);
    });

    const mergedTx = [
      ...incomeTransactions.map(tx => ({ ...tx, type: 'income' })),
      ...expenseTransactions.map(tx => ({ ...tx, type: 'expense' }))
    ];

    const barChartData = Object.values(
      mergedTx.reduce((acc, item) => {
        const month = new Date(item.date).toLocaleString('default', { month: 'short' });
    
        if (!acc[month]) {
          acc[month] = { month, income: 0, expense: 0 };
        }
    
        if (item.type === 'income') {
          acc[month].income += item.amount;
        } else {
          acc[month].expense += item.amount;
        }
    
        return acc;
      }, {})
    );
    barChartData.sort((a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month));
  return (
    <Box bg={pageBg} minH="100vh">
      <Navbar />
      { user && (
        <Container maxW="8xl" p={{ base: 4, md: 10 }}>
          <Box mb={12} />

          <SummaryCards />

          <Box mb={8} />
          
          {/* Overall Income vs Expense Chart Area Chart */}
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
              <Box>
                <Heading size="lg" mb={3} color={"black"}>
                  Overall Income vs Expense Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your overall financial flow and compare income against expenses
                </Text>
              </Box>
            </Flex>

            <Box h="300px" mt={6}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={overAllData} margin={{ bottom: 20 }}>
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
                    dataKey="income"
                    stroke="#68D391"
                    fill="#68D391"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: '#68D391', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#F87171"
                    fill="#F87171"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: '#F87171', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                    name="Expense"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

          <Box mb={8} />
          
          <Flex gap={8}>

            {/* Monthly Income Bar Chart */}
            <Box
              flex="0.7"
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
            >
              <Heading size="lg" mb={3} color={"black"}>
                Monthly Income Distribution
              </Heading>
              <Text color={textColor} fontSize="md" mb={6}>
                View your income patterns across months
              </Text>

              <Box h="275px">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={barChartData}
                  margin={{ bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ 
                        fill: textColor, 
                        fontSize: 12
                      }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: textColor, fontSize: 12 }}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: bgColor,
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                      formatter={(value) => [`$${value}`]}
                    />
                    <Legend />
                    <Bar
                      dataKey="income"
                      name="Income"
                      fill="#68D391"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                    <Bar
                      dataKey="expense"
                      name="Expense"
                      fill="#F87171"
                      radius={[4, 4, 0, 0]}
                      maxBarSize={40}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>

            {/* Income vs Expense DistributionPie Chart */}
            <Box
              flex="0.35"
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
            >
              <Heading size="lg" mb={3} color={"black"}>
                Income vs Expense
              </Heading>
              <Text color={textColor} fontSize="md" mb={3}>
                Understand the proportion of your money
              </Text>

              <Box h="275px" >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { 
                          name: 'Total Income', 
                          value: transactions.totalIncome
                        },
                        { 
                          name: 'Total Expense', 
                          value: transactions.totalExpenses
                        }
                      ]}
                      label
                      dataKey="value"
                    >
                      <Cell fill="#68D391" />
                      <Cell fill="#F87171" />
                    </Pie>
                    <Tooltip
                      formatter={(value) => `$${value}`}
                      contentStyle={{
                        backgroundColor: bgColor,
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend 
                      verticalAlign="bottom" 
                      height={10}
                      formatter={(value) => value === 'Total Income' ? 'Income' : 'Expense'}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </Flex>

          <Box mb={8} />

          <Flex gap={8}>
            {/* Monthly Overview */}
          <Box
            flex={0.5}
            bg={bgColor}
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="xl"
            _hover={{ boxShadow: '2xl' }}
            transition="all 0.3s ease"
            p={8}
          >
            <Flex justify="space-between" align="center" mb={6}>
              <Box>
                <Heading size="lg" mb={3} color={"black"}>
                  Monthly Income vs Expense Overview
                </Heading>
                <Text color={textColor} fontSize="md">
                  Track your financial flow and compare income against expenses for last 30 days
                </Text>
              </Box>
            </Flex>

            <Box h="300px" mt={6}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={incomeData} margin={{ bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ 
                      fill: textColor, 
                      fontSize: 12,
                      angle: -35,
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
                    dataKey="income"
                    stroke="#68D391"
                    fill="#68D391"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: '#68D391', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                    name="Income"
                  />
                  <Area
                    type="monotone"
                    dataKey="expense"
                    stroke="#F87171"
                    fill="#F87171"
                    fillOpacity={0.2}
                    strokeWidth={2}
                    dot={{ fill: '#F87171', strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                    name="Expense"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>

            {/* Recent Transactions Table */}
            <Box
              flex="0.5"
              bg={bgColor}
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="xl"
              _hover={{ boxShadow: '2xl' }}
              transition="all 0.3s ease"
              p={8}
            >
              <Heading size="lg" mb={3} color={"black"}>
                Recent Transactions
              </Heading>
              <Text color={textColor} fontSize="md" mb={6}>
                Your latest financial activities
              </Text>

              <TableContainer 
                height="300px" 
                overflowY="auto" 
                borderRadius="xl"
                boxShadow="md"
                sx={{
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-track': {
                    background: 'transparent',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'gray.400',
                    borderRadius: 'full',
                  },
                  '&::-webkit-scrollbar-thumb:hover': {
                    background: 'gray.500',
                  },
                }}
              >
                <Table variant="simple" >
                  <Thead position="sticky" top={0} bg={bgColor} zIndex={2}>
                    <Tr>
                      <Th py={4}>Date</Th>
                      <Th py={4}>Category</Th>
                      <Th py={4}>Type</Th>
                      <Th isNumeric py={4}>Amount</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(transactions?.recentTransactions || [])
                      .map((item) => ({
                        date: formatDate(item.date),
                        category: item.source,
                        amount: item.amount,
                        type: item.type === 'income' ? 'Income' : 'Expense',
                      }))
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .slice(0, 15)
                      .map((transaction, index) => (
                        <Tr
                          key={index}
                          bg={transaction.type === 'Income' ? 'green.50' : 'red.50'}
                        >
                          <Td py={4} color={transaction.type === 'Income' ? 'green.800' : 'red.800'}>
                            {transaction.date}
                          </Td>
                          <Td py={4} color={transaction.type === 'Income' ? 'green.800' : 'red.800'}>
                            {transaction.category}
                          </Td>
                          <Td py={4} fontWeight="medium" color={transaction.type === 'Income' ? 'green.800' : 'red.800'}>
                            {transaction.type}
                          </Td>
                          <Td isNumeric py={4} fontWeight="bold" color={transaction.type === 'Income' ? 'green.800' : 'red.800'}>
                            ${transaction.amount}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Flex>
        </Container>
      )};
    </Box>
  );
}
