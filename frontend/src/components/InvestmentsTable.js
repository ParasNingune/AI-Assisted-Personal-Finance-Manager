import React, { useState } from 'react';
import {
  Box,
  Text,
  HStack,
  Progress,
  Button,
  Icon,
  Flex,
  VStack,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { 
  FaRupeeSign, 
  FaChartLine, 
  FaLandmark,
  FaDollarSign 
} from 'react-icons/fa';

const InvestmentItem = ({ icon, name, amount, percentage }) => (
  <Flex 
    w="100%" 
    justify="space-between" 
    align="center" 
    py={2}
  >
    <HStack spacing={3}>
      <Icon as={icon} color="gray.500" boxSize={5} />
      <Text fontSize="md" color="gray.700">{name}</Text>
    </HStack>
    <VStack align="flex-end" spacing={0.5}>
      <Text fontWeight="medium" color="gray.900">₹{amount}K</Text>
      <Box w="90px">
        <Progress
          value={percentage}
          size="xs"
          colorScheme="green"
          borderRadius="full"
          bg="gray.100"
        />
      </Box>
      <Text fontSize="xs" color="gray.400">{percentage}%</Text>
    </VStack>
  </Flex>
);

const InvestmentsTable = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  const investments = [
    { icon: FaRupeeSign, name: 'Stocks', amount: '20', percentage: 20 },
    { icon: FaChartLine, name: 'Mutual funds', amount: '50', percentage: 50 },
    { icon: FaLandmark, name: 'NPS', amount: '30', percentage: 30 },
  ];

  return (
    <Box bg="white" p={6} borderRadius="2xl" h="auto" boxShadow="md">
      <Flex justify="space-between" align="center" mb={2}>
        <Text fontSize="xl" fontWeight="extrabold" color="gray.800">
          My investments & goals
        </Text>
      </Flex>

      <Tabs variant="unstyled" mb={3} index={tabIndex} onChange={setTabIndex}>
        <TabList gap={2}>
          <Tab 
            px={0}
            _selected={{ color: 'black', borderBottom: '2px solid', borderColor: 'black' }}
            fontSize="sm"
            color="gray.500"
          >
            Investments
          </Tab>
          <Tab 
            px={0}
            ml={2}
            _selected={{ color: 'black', borderBottom: '2px solid', borderColor: 'black' }}
            fontSize="sm"
            color="gray.500"
          >
            Goals
          </Tab>
        </TabList>
      </Tabs>
      
      <VStack spacing={5} align="stretch">
        {investments.map((investment, index) => (
          <InvestmentItem key={index} {...investment} />
        ))}
        
        <Flex
          align="center"
          py={3}
          cursor="pointer"
          bg="gray.50"
          borderRadius="lg"
          px={3}
        >
          <HStack spacing={3}>
            <Icon as={FaDollarSign} color="gray.500" boxSize={5} />
            <Text color="gray.600">Add New</Text>
          </HStack>
          <Icon as={AddIcon} ml="auto" color="gray.400" />
        </Flex>
      </VStack>
    </Box>
  );
};

export default InvestmentsTable;