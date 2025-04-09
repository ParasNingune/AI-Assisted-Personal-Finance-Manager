import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Button,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Tooltip,
  Divider,
} from '@chakra-ui/react';
import { 
  SearchIcon, 
  BellIcon, 
  ChevronDownIcon,
} from '@chakra-ui/icons';
import { 
  FaChartLine, 
  FaHome, 
  FaMoneyBillWave, 
  FaChartPie, 
  FaUniversity,
  FaRegCreditCard
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('blue.50', 'gray.700');
  const activeBg = useColorModeValue('gray.400', 'gray.600');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Box
      bg={bgColor}
      px={6}
      py={2}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      position="fixed"
      width="100%"
      zIndex={1000}
      boxShadow="sm"
    >
      <Flex h={14} alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems="center">
          <Box 
            fontWeight="bold" 
            fontSize="2xl" 
            color={textColor}
            mr={12}
          >
            Bitchessss
          </Box>

          <InputGroup w="235px" size="md" mr={28}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.400" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search"
              bg={useColorModeValue('gray.100', 'gray.700')}
              border="none"
              borderRadius="10"
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.600'),
                outline: 'none',
                boxShadow: 'sm',
              }}
            />
          </InputGroup>

          <HStack spacing={1}>
            <Link to="/dashboard">
              <Tooltip label="Dashboard" placement="bottom" hasArrow>
                <Button 
                  leftIcon={<FaHome />} 
                  variant="ghost" 
                  px={4} 
                  py={2} 
                  rounded="md" 
                  _hover={{ bg: hoverBg, color: 'gray.800' }}
                  _active={{ bg: activeBg }}
                >
                  Dashboard
                </Button>
              </Tooltip>
            </Link>
            <Link to="/stocks">
              <Tooltip label="Stocks" placement="bottom" hasArrow>
                <Button 
                  leftIcon={<FaChartLine />} 
                  variant="ghost" 
                  px={4} 
                  py={2} 
                  rounded="md" 
                  _hover={{ bg: hoverBg, color: 'blue.500' }}
                  _active={{ bg: activeBg }}
                >
                  Stocks
                </Button>
              </Tooltip>
            </Link>
            <Link to="/mutual-funds">
              <Tooltip label="Mutual Funds" placement="bottom" hasArrow>
                <Button 
                  leftIcon={<FaChartPie />} 
                  variant="ghost" 
                  px={4} 
                  py={2} 
                  rounded="md" 
                  _hover={{ bg: hoverBg, color: 'blue.500' }}
                  _active={{ bg: activeBg }}
                >
                  Mutual Funds
                </Button>
              </Tooltip>
            </Link>
            <Link to="/fixed-deposits">
              <Tooltip label="Fixed Deposits" placement="bottom" hasArrow>
                <Button 
                  leftIcon={<FaMoneyBillWave />} 
                  variant="ghost" 
                  px={4} 
                  py={2} 
                  rounded="md" 
                  _hover={{ bg: hoverBg, color: 'blue.500' }}
                  _active={{ bg: activeBg }}
                >
                  Fixed Deposits
                </Button>
              </Tooltip>
            </Link>
            <Link to="/banks">
              <Tooltip label="Banks" placement="bottom" hasArrow>
                <Button 
                  leftIcon={<FaUniversity />} 
                  variant="ghost" 
                  px={4} 
                  py={2} 
                  rounded="md" 
                  _hover={{ bg: hoverBg, color: 'blue.500' }}
                  _active={{ bg: activeBg }}
                >
                  Banks
                </Button>
              </Tooltip>
            </Link>
          </HStack>
        </Flex>

        <Flex alignItems="center">
          <HStack spacing={3}>
            <Tooltip label="Notifications" placement="bottom" hasArrow>
              <IconButton
                aria-label="Notifications"
                icon={<BellIcon boxSize={5} />}
                variant="ghost"
                colorScheme="blue"
                borderRadius="full"
                size="md"
              />
            </Tooltip>
            
            <Divider orientation="vertical" height="30px" />
            
            <Menu>
              <Tooltip label="Profile" placement="bottom" hasArrow>
                <MenuButton
                  as={Button}
                  variant="ghost"
                  borderRadius="full"
                  p={1}
                  _hover={{ bg: hoverBg }}
                >
                  <Flex alignItems="center">
                    <Avatar
                      size="sm"
                      src="/profile-placeholder.png"
                      name="User"
                      mr={2}
                    />
                    <ChevronDownIcon />
                  </Flex>
                </MenuButton>
              </Tooltip>
              <MenuList>
                <MenuItem icon={<FaRegCreditCard />}>My Account</MenuItem>
                <MenuItem icon={<FaChartPie />}>Portfolio</MenuItem>
                <MenuItem icon={<FaMoneyBillWave />}>Transactions</MenuItem>
                <Divider />
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;