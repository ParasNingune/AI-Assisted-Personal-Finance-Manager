import { Box, Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import NetworthGraph from "../components/NetworthGraph";
import InvestmentsTable from "../components/InvestmentsTable";

const Dashboard = () => {
  return (
    <Box bg="rgb(236, 237, 243)" minH="100vh">
      <Navbar />
      <Container maxW="8xl" p={10}>
        <Box
          display="grid"
          gridTemplateColumns={{ base: '1fr', lg: '3fr 1fr' }}
          gap={6}
          mt={20}
        >
          <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 2px 5px rgba(0,0,0,0.05)"
            _hover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            transition="all 0.3s ease"
          >
            <NetworthGraph />
          </Box>
          <Box
            bg="white"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="0 1px 3px rgba(0,0,0,0.05)"
            _hover={{ boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}
            transition="all 0.3s ease"
          >
            <InvestmentsTable />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;