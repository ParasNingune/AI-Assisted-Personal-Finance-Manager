import React from 'react'
import { Box, Container } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import DashboardLayout from '../../components/DashboardLayout';

export default function Homepage() {
  return (
    <DashboardLayout activeMenu="Dashboard">
      <Box bg="rgb(236, 237, 243)" minH="100vh">
        <Navbar />
      </Box>
    </DashboardLayout>
  );
}
