import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <Box p={{base:"1rem", lg:"60px 152px 0px"}}>
        <Flex flexDirection={{base:"column", lg:"row"}} justifyContent={"space-between"}>
            <Box>
                <Heading as={"h4"} fontWeight={"500"} mb={"32px"}>Do you have <br /> any questions?</Heading>
                <Text mb={"32px"}>Feel free to send us your questions or request a free consultation.</Text>
                <Button bg={"#173685"} display={"block"} mb={"32px"}>Send a message</Button>
                <Link display="block" to="mailto:codeblazeacademy@gmail.com">
                 Email: info.xpressai.com
                </Link>
            </Box>
            <Box>
            <Stack direction={{base:"column", lg:"row"}} spacing={4}>
            {FOOTER_NAV_ITEMS.map((navItem) => (
            <Box key={navItem.label}>
             <Link
            //     as={navItem.href === "signup" ? RouterLink : "a"} 
            //    {...(navItem.href === "signup" ? { to: navItem.href } : { href: navItem.href} )}
                p={2} 
                href={navItem.href} 
                fontSize={'sm'} 
                fontWeight={500} 
                // _hover={{ textDecoration: 'none', color: linkHoverColor }}
                >
                  {navItem.label}
                </Link>
           </Box>
            ))}
          </Stack>
            </Box>
        </Flex>
    </Box>
  )
}

export default Footer;




const FOOTER_NAV_ITEMS =  [
  { label: 'About Us', href: 'signup' },
  { label: 'Features', href: '#whyus' },
  { label: 'Pricing', href: '#ads' },
  { label: 'Resources', href: '#ads' },
];