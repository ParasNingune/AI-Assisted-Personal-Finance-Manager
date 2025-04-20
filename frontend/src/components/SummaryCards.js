import React, { useEffect, useState } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Icon,
} from '@chakra-ui/react';
import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import axiosInstance from '../utils/axiosInstance';

export default function SummaryCards() {

  const [total, setTotal] = useState([]);

  const fetchDetails = async () => {
    try{
      const response = await axiosInstance.get("/dashboard");

      if(response.data) {
        setTotal(response.data);
      }

    } catch (err) {
      console.log("Error fetching details", err);
    }
  }

  useEffect(() => {
    fetchDetails();

    return () => {}
  }, []);

    return (
        <Flex gap={20} mb={4} direction={{ base: 'column', md: 'row' }}>
          {/* Total Balance Card */}
          <Flex
            flex="1"
            bg="blue.100"
            borderRadius="2xl"
            boxShadow="lg"
            h="110px"
            px={6}
            py={4}
            align="center"
            justify="space-between"
            position="relative"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '2xl',
              '& .card-bg': { transform: 'scale(1.1)' },
            }}
            transition="all 0.3s ease"
            >
            {/* Background Blur Layer */}
            <Box
              className="card-bg"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="purple.50"
              opacity={0.1}
              zIndex={0}
              transition="transform 0.3s ease"
            />

            {/* Icon Section */}
            <Box
              p={4}
              bg="purple.50"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Icon as={FaWallet} color="purple.500" boxSize={7} />
            </Box>

            
            {/* Content Section */}
            <Flex direction="column" align="flex-start" justify="center" ml={10} flex="1">
              <Text fontSize="2xl" fontWeight="bold" color="black">
                Total Balance
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="black" ml="9">
                ${total.totalBalance}
              </Text>
            </Flex>
            </Flex>


          {/* Total Income Card */}
          <Flex
            flex="1"
            bg="green.100"
            borderRadius="2xl"
            boxShadow="lg"
            h="110px"
            px={6}
            py={4}
            align="center"
            justify="space-between"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '2xl',
              '& .card-bg': { transform: 'scale(1.1)' },
            }}
            transition="all 0.3s ease"
          >

            {/* Background Blur Layer */}
            <Box
              className="card-bg"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="purple.50"
              opacity={0.1}
              zIndex={0}
              transition="transform 0.3s ease"
            />

            {/* Icon Section */}
            <Box
              p={4}
              bg="green.50"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={FaArrowUp} color="green.500" boxSize={7} />
            </Box>

            {/* Content Section */}
            <Flex direction="column" align="flex-start" justify={"center"} ml={10} flex="1">
              <Text fontSize="2xl" fontWeight="bold" color="black">
                Total Income
              </Text>
              <Text fontSize="xl" align={"center"} fontWeight="bold" color="black" ml={9}>
                ${total.totalIncome}
              </Text>
            </Flex>
          </Flex>

          {/* Total Expense Card */}
          <Flex
            flex="1"
            bg="red.100"
            borderRadius="2xl"
            boxShadow="lg"
            h="110px"
            px={6}
            py={4}
            align="center"
            justify="space-between"
            position="relative"
            _hover={{
              transform: 'translateY(-5px)',
              boxShadow: '2xl',
              '& .card-bg': { transform: 'scale(1.1)' },
            }}
            transition="all 0.3s ease"
          >
            {/* Background Blur Layer */}
            <Box
              className="card-bg"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="red.50"
              opacity={0.1}
              zIndex={0}
              transition="transform 0.3s ease"
            />

            {/* Icon Section */}
            <Box
              p={4}
              bg="red.50"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={1}
            >
              <Icon as={FaArrowDown} color="red.500" boxSize={7} />
            </Box>

            {/* Content Section */}
            <Flex direction="column" align="flex-start" justify="center" ml={10} flex="1">
              <Text fontSize="2xl" fontWeight="bold" color="black">
                Total Expense
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="black" ml={9}>
                ${total.totalExpenses}
              </Text>
            </Flex>
          </Flex>

        </Flex>
    )
}