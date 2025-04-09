  import React from 'react';
import { Box, Text, HStack, Flex, Badge } from '@chakra-ui/react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const NetworthGraph = () => {
  const data = [
    { month: 'Jan', amount: 1.0 },
    { month: 'Feb', amount: 1.1 },
    { month: 'Mar', amount: 1.05 },
    { month: 'Apr', amount: 1.15 },
    { month: 'May', amount: 1.1 },
    { month: 'Jun', amount: 1.2 },
  ];

  const assetTypes = [
    { label: 'Equity', value: '₹1L' },
    { label: 'Cash', value: '₹10K' },
    { label: 'Gold', value: '₹10K' },
  ];

  return (
    <Box 
      bg="white" 
      p={7} 
      borderRadius="2xl" 
      boxShadow="sm"
      w="100%"
    >
      <Box mb={6}>
        <Text fontSize="xl" color="black" mb={2} fontWeight={"extrabold"}>
          My networth
        </Text>
        
        <Flex align="center" mb={4}>
          <Text fontSize="3xl" fontWeight="semibold" color="gray.900">
            ₹1.2 L
          </Text>
          <Text color="green.500" ml={3} fontSize="sm">
            ↑ 20.32%
          </Text>
        </Flex>

        <HStack spacing={4}>
          {assetTypes.map((asset, index) => (
            <Badge
              key={index}
              px={3}
              py={1}
              bg="gray.100"
              color="gray.600"
              borderRadius="full"
              fontWeight="normal"
            >
              {asset.label} {asset.value}
            </Badge>
          ))}
        </HStack>
      </Box>

      <Box h="200px" mb={4}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
            <defs>
              <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#48BB78" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#48BB78" stopOpacity={0.01}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A0AEC0', fontSize: 12 }}
              dy={10}
              tickMargin={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#A0AEC0', fontSize: 12 }}
              tickFormatter={(value) => `₹${value}L`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                padding: '8px',
              }}
              formatter={(value) => [`₹${value}L`, 'Amount']}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#48BB78"
              strokeWidth={1.5}
              fill="url(#colorAmount)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>

      <Flex justify="space-between" align="center">
        <Text fontSize="sm" color="gray.500">
          Projected networth by 2028
        </Text>
        <Text fontSize="sm" color="green.500">
          ₹10L
        </Text>
      </Flex>
    </Box>
  );
};

export default NetworthGraph;