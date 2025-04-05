import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../backend/config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  Select,
  Container,
  Heading,
  Textarea,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

const FinancialInfoForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    savings: '',
    investments: '',
    expenses: '',
    financialGoals: '',
    riskTolerance: 'moderate'
  });

  useEffect(() => {
    const storedInfo = localStorage.getItem('personalInfo');
    if (!storedInfo) {
      toast({
        title: 'Error',
        description: 'Please complete personal information first',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      navigate('/register');
      return;
    }
    setPersonalInfo(JSON.parse(storedInfo));
  }, [navigate, toast]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // ... Firebase operations remain the same ...

      toast({
        title: 'Registration Complete',
        description: 'Welcome to AI-Assisted Personal Finance Manager!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to complete registration. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container maxW="xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Financial Information</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl>
              <FormLabel>Monthly Income</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({...formData, monthlyIncome: e.target.value})}
                  placeholder="Enter monthly income"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Current Savings</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  value={formData.savings}
                  onChange={(e) => setFormData({...formData, savings: e.target.value})}
                  placeholder="Enter current savings"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Current Investments</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  value={formData.investments}
                  onChange={(e) => setFormData({...formData, investments: e.target.value})}
                  placeholder="Enter current investments"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Monthly Expenses</FormLabel>
              <NumberInput min={0}>
                <NumberInputField
                  value={formData.expenses}
                  onChange={(e) => setFormData({...formData, expenses: e.target.value})}
                  placeholder="Enter monthly expenses"
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl>
              <FormLabel>Financial Goals</FormLabel>
              <Textarea
                value={formData.financialGoals}
                onChange={(e) => setFormData({...formData, financialGoals: e.target.value})}
                placeholder="Describe your financial goals"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Risk Tolerance</FormLabel>
              <Select
                value={formData.riskTolerance}
                onChange={(e) => setFormData({...formData, riskTolerance: e.target.value})}
              >
                <option value="low">Low Risk Tolerance</option>
                <option value="moderate">Moderate Risk Tolerance</option>
                <option value="high">High Risk Tolerance</option>
              </Select>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              mt={6}
            >
              Complete Registration
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default FinancialInfoForm;