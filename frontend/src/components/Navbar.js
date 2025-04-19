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
  import { PiChartLineUpBold, PiChartLineDownBold } from "react-icons/pi";
  import { 
    FaHome, 
    FaRobot, 
    FaChartPie, 
    FaFileAlt,
    FaRegCreditCard
  } from 'react-icons/fa';

  import { useLocation } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  
  const Navbar = () => {
    const location = useLocation();
    const bgColor = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const hoverBg = useColorModeValue('blue.50', 'gray.700');
    const activeBg = useColorModeValue('gray.400', 'gray.600');
    const textColor = useColorModeValue('black', 'white');
    const activeColor = 'purple.500';
  
    const isActive = (path) => location.pathname === path;
  
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
              mr={20}
            >
              Bitchessss
            </Box>
  
            <InputGroup w="275px" size="md" ml={15}>
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
  
            <HStack spacing={1} ml={20}>
              <Link to="/dashboard">
                <Tooltip label="Dashboard" placement="bottom" hasArrow>
                  <Button 
                    leftIcon={<FaHome />} 
                    variant="ghost" 
                    px={4} 
                    py={2} 
                    rounded="md" 
                    color={isActive('/dashboard') ? activeColor : textColor}
                    borderBottom={isActive('/dashboard') ? '2px solid' : 'none'}
                    borderColor={activeColor}
                    _hover={{ bg: hoverBg, color: activeColor }}
                    _active={{ bg: activeBg }}
                  >
                    Dashboard
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/income">
                <Tooltip label="Income" placement="bottom" hasArrow>
                  <Button 
                    leftIcon={<PiChartLineUpBold />} 
                    variant="ghost" 
                    px={4} 
                    py={2} 
                    rounded="md" 
                    color={isActive('/income') ? activeColor : textColor}
                    borderBottom={isActive('/income') ? '2px solid' : 'none'}
                    borderColor={activeColor}
                    _hover={{ bg: hoverBg, color: activeColor }}
                    _active={{ bg: activeBg }}
                  >
                    Income
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/expense">
                <Tooltip label="Expense" placement="bottom" hasArrow>
                  <Button 
                    leftIcon={<PiChartLineDownBold />} 
                    variant="ghost" 
                    px={4} 
                    py={2} 
                    rounded="md" 
                    color={isActive('/expense') ? activeColor : textColor}
                    borderBottom={isActive('/expense') ? '2px solid' : 'none'}
                    borderColor={activeColor}
                    _hover={{ bg: hoverBg, color: activeColor }}
                    _active={{ bg: activeBg }}
                  >
                    Expense
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/aiChat">
                <Tooltip label="Ai Chat" placement="bottom" hasArrow>
                  <Button 
                    leftIcon={<FaRobot />} 
                    variant="ghost" 
                    px={4} 
                    py={2} 
                    rounded="md" 
                    color={isActive('/aiChat') ? activeColor : textColor}
                    borderBottom={isActive('/aiChat') ? '2px solid' : 'none'}
                    borderColor={activeColor}
                    _hover={{ bg: hoverBg, color: activeColor }}
                    _active={{ bg: activeBg }}
                  >
                    AI-Chat
                  </Button>
                </Tooltip>
              </Link>
              <Link to="/report">
                <Tooltip label="Report" placement="bottom" hasArrow>
                  <Button 
                    leftIcon={<FaFileAlt />} 
                    variant="ghost" 
                    px={4} 
                    py={2} 
                    rounded="md" 
                    color={isActive('/report') ? activeColor : textColor}
                    borderBottom={isActive('/report') ? '2px solid' : 'none'}
                    borderColor={activeColor}
                    _hover={{ bg: hoverBg, color: activeColor }}
                    _active={{ bg: activeBg }}
                  >
                    Report
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
                  <MenuItem icon={<FaRobot />}>Transactions</MenuItem>
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