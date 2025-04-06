import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  return (
    <Box>
      <Navbar />
      <Box pt="64px"> {/* Add padding top to account for fixed navbar */}
        {/* Dashboard content goes here */}
      </Box>
    </Box>
  );
};

export default Dashboard;