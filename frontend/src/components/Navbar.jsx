import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon, BellIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      bg={bgColor}
      px={4}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      position="fixed"
      width="100%"
      zIndex={1000}
    >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box fontWeight="bold" fontSize="xl">
          Money mag
        </Box>

        <InputGroup w="300px" size="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            bg={useColorModeValue('gray.100', 'gray.700')}
            border="none"
            _focus={{
              bg: useColorModeValue('gray.200', 'gray.600'),
              outline: 'none',
            }}
          />
        </InputGroup>

        <HStack spacing={4}>
          <Link to="/dashboard">
            <Box px={3} py={1} rounded="md" _hover={{ bg: 'gray.100' }}>
              Dashboard
            </Box>
          </Link>
          <Link to="/stocks">
            <Box px={3} py={1} rounded="md" _hover={{ bg: 'gray.100' }}>
              Stocks
            </Box>
          </Link>
          <Link to="/mutual-funds">
            <Box px={3} py={1} rounded="md" _hover={{ bg: 'gray.100' }}>
              Mutual funds
            </Box>
          </Link>
          <Link to="/fixed-deposits">
            <Box px={3} py={1} rounded="md" _hover={{ bg: 'gray.100' }}>
              Fixed deposits
            </Box>
          </Link>
          <Link to="/banks">
            <Box px={3} py={1} rounded="md" _hover={{ bg: 'gray.100' }}>
              Banks
            </Box>
          </Link>
          
          <IconButton
            aria-label="Notifications"
            icon={<BellIcon />}
            variant="ghost"
            size="md"
          />
          
          <IconButton
            aria-label="Profile"
            icon={
              <Box
                as="img"
                borderRadius="full"
                boxSize="32px"
                src="/profile-placeholder.png"
                fallbackSrc="https://via.placeholder.com/32"
              />
            }
            variant="ghost"
            size="md"
          />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;