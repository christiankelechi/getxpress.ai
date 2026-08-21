import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Icon,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
  } from '@chakra-ui/react';
  import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    ChevronRightIcon,
  } from '@chakra-ui/icons';
  import { Link as RouterLink } from 'react-router-dom';
  import XpressAiLogo from '../../../assets/icons/XpressAiLogo';
import CustomButton from '../../../components/CustomButton';
  
  export default function NavBar() {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Box>
        <Flex
          // color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
          <Flex flex={{ base: 1 }} alignItems={"center"} justify={{ base: 'space-between'}}>
            <Box cursor={"pointer"} display={"flex"} alignItems={{base:"baseline", lg:"center"}} fontSize={{base:"0.85rem",lg:"1.5rem"}} fontWeight={"600"}>
            <XpressAiLogo width="34px" height="35px" />
             press AI
            </Box>
            <Flex  display={{ base: 'none', md: 'flex' }} mx={"auto"}>
              <DesktopNav />
            </Flex>
          </Flex>
          
          <Stack flex={{ base: 1, md: 0 }} justify={'center'} direction={'row'} spacing={6}>
            <Button 
            as={RouterLink} to={"/login"} 
            fontSize={"1rem"} 
            display={{ base: 'none', md: 'inline-flex' }} 
            variant="ghost" 
            _hover={{ bg: "transparent" }}
            color={useColorModeValue("#0b7cd9","#fff")}
            fontWeight="500"
            >
            Login
            </Button>
            {/* <Button
              as={RouterLink}
              bg={useColorModeValue("#0b7cd9","#0b7cd9")}
              borderRadius={"0px"}
              _hover={{ bg: "#0b7cd9" }}
              
              display={{ base: 'none', md: 'inline-flex' }}
              p={"12px"}
              fontSize={'1rem'}
              fontWeight="500"
              color={'white'}
              to="/signup"
              >
              Sign Up
            </Button> */}
            <CustomButton
             title="Sign Up"
             borderRadius={"full"}
             fontWeight="500"
             display={{ base: 'none', md: 'inline-flex' }} 
             as={RouterLink} to={"/register"}
            />
          </Stack>

          {/* ml={{ base: -2 }} display={{ base: 'flex', md: 'none' }}  */}
          <Flex flex={{ base: 1, md: 'auto' }} justify={'flex-end'} direction={'row'} spacing={6} display={{ base: 'flex', md: 'none' }} >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
        </Flex>
        
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      </Box>
    );
  }
  
  const DesktopNav = () => {
    const linkHoverColor = useColorModeValue('gray.800', '#fff');
    // const popoverContentBgColor = useColorModeValue('#fff', 'gray.800');
  
    return (
      <Stack direction={'row'} spacing={4}>
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.label}>
            <Popover trigger={'hover'} placement={'bottom-start'}>
              <PopoverTrigger>
                <Box 
                as={navItem.href === "signup" ? RouterLink : "a"} 
               {...(navItem.href === "signup" ? { to: navItem.href } : { href: navItem.href} )}
                p={2} 
                href={navItem.href} 
                fontSize={'sm'} 
                fontWeight={500} 
                _hover={{ textDecoration: 'none', color: linkHoverColor }}
                >
                  {navItem.label}
                </Box>
              </PopoverTrigger>
              {navItem.children && (
                <PopoverContent border={"0px"} boxShadow={'xl'}  p={4} rounded={'xl'} minW={'sm'}>
                  <Stack>
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        ))}
      </Stack>
    );
  };
  
  const DesktopSubNav = ({ label, subLabel }) => {
    return (
      <Box 
      role={'group'} display={'block'} p={2} rounded={'md'}
       _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text transition={'all .3s ease'} _groupHover={{ color: 'pink.400' }} fontWeight={500}>
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex transition={'all .3s ease'} transform={'translateX(-10px)'} opacity={0} _groupHover={{ opacity: 1, transform: 'translateX(0)' }} justify={'flex-end'} align={'center'} flex={1}>
            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    );
  };
  
  const MobileNav = () => {
    return (
      <Stack  minH={"100vh"} textAlign={{base:"left", md:"center"}} p={4} display={{base:"flex", md: 'none' }}>
        {NAV_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))}

        <Button
         as={RouterLink} to={"/login"} 
         fontSize={"1rem"} 
         color={useColorModeValue("#0b7cd9","#fff")}
         fontWeight="500"
        //  marginLeft={"2rem"}
         bg={"gray.800"}
        _hover={{ bg: "#908686" , color:"#fff"}}
         w={"full"}
         mb={4}
        >
          Login
        </Button>

         <CustomButton
             title="Sign Up"
             borderRadius={"full"}
             fontWeight="500"
             as={RouterLink} to={"/register"}
        />
      </Stack>
    );
  };
  
  const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();
  
    return (
      <Stack spacing={4} onClick={children && onToggle}>
        <Box 
        py={2}
        paddingLeft={"2rem"} 
         mb={"1rem"} 
         as={href === "register" ? RouterLink : "a"} 
         {...(href === "register" ? { to: href } : { href })} 
         justifyContent="space-between" alignItems="center" 
         _hover={{ textDecoration: 'none' }}>
          <Text fontWeight="600"  color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
          {children && (
            <Icon as={ChevronDownIcon} transition={'all .25s ease-in-out'} transform={isOpen ? 'rotate(180deg)' : ''} w={6} h={6} />
          )}
        </Box>
        <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
          <Stack mt={2} pl={4} borderLeft={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.800')} align={'start'}>
            {children &&
              children.map((child) => (
                <Box as="a" key={child.label} py={2} href={child.href}>
                  {child.label}
                </Box>
              ))}
          </Stack>
        </Collapse>
      </Stack>
    );
  };
  
  const NAV_ITEMS = [
    // {
    //   label: 'Inspiration',
    //   children: [
    //     { label: 'Explore Design Work', subLabel: 'Trending Design to inspire you', href: '#' },
    //     { label: 'New & Noteworthy', subLabel: 'Up-and-coming Designers', href: '#' },
    //   ],
    // },
    // { label: 'Find Work', children: [
    //     { label: 'Job Board', subLabel: 'Find your dream design job', href: '#' },
    //     { label: 'Freelance Projects', subLabel: 'An exclusive list for contract work', href: '#' },
    //   ] },
    { label: 'About Us', href: 'signup' },
    { label: 'Features', href: '#whyus' },
    { label: 'Resources', href: '#whyus' },
    { label: 'Pricing', href: '#ads' },
  ];
  