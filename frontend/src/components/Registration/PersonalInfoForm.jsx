import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../backend/config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {
  Box,
  VStack,
  Input,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Textarea,
  Container,
  Heading,
  useToast
} from '@chakra-ui/react';

const PersonalInfoForm = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    phoneNo: '',
    email: '',
    username: '',
    name: '',
    age: '',
    occupation: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  // ... validateForm function remains the same ...

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = await validateForm();
    
    if (isValid) {
      localStorage.setItem('personalInfo', JSON.stringify(formData));
      toast({
        title: 'Success',
        description: 'Personal information saved. Proceeding to financial details.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/financial-info');
    }
  };

  return (
    <Container maxW="xl" py={10}>
      <VStack spacing={8} align="stretch">
        <Heading textAlign="center">Personal Information</Heading>
        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isInvalid={errors.phoneNo}>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="tel"
                value={formData.phoneNo}
                onChange={(e) => setFormData({...formData, phoneNo: e.target.value})}
                placeholder="Enter phone number"
              />
              <FormErrorMessage>{errors.phoneNo}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter email"
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
                placeholder="Choose username"
              />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.name}>
              <FormLabel>Full Name</FormLabel>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter full name"
              />
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.age}>
              <FormLabel>Age</FormLabel>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                placeholder="Enter age"
              />
              <FormErrorMessage>{errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.occupation}>
              <FormLabel>Occupation</FormLabel>
              <Input
                value={formData.occupation}
                onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                placeholder="Enter occupation"
              />
              <FormErrorMessage>{errors.occupation}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.address}>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                placeholder="Enter address"
              />
              <FormErrorMessage>{errors.address}</FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="full"
              mt={6}
            >
              Next
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default PersonalInfoForm;